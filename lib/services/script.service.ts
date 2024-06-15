import * as YAML from "yaml"
import JSON5 from "json5"
import { nodeIsInEditor, nodeIsInViewport } from "@/utils/nodes"
import { AtomicEngine, AtomicGame } from ".."
import { PropType } from "@/nodes/symbols"
import {
  MethodDispatchEvent,
  MethodDispatchScript,
  MethodExport,
  MethodSetRootNode
} from "@/symbols"
import EventObserver from "@/utils/observer"
import { TEventScript } from "./event.type"
import { TFunction } from "@/types"

export class ScriptService {
  private $app: AtomicEngine | AtomicGame

  protected root_node!: any

  protected _events: EventObserver = new EventObserver()

  constructor(app: AtomicEngine | AtomicGame) {
    this.$app = app
  }

  async ready() {
    if (this.root_node) await this.executeFunctionReady(this.root_node)
  }

  async process(animation: { timestamp: number; deltaTime: number }) {
    if (this.root_node && this.$app.mode === "game")
      await this.executeFunctionScriptGame(this.root_node, animation)
    if (this.root_node && this.$app.mode === "editor")
      await this.executeFunctionScriptEditor(this.root_node, animation)
  }

  protected async executeFunctionReady(node: any) {
    const app = this.$app as AtomicEngine
    const mode = app.useGlobal("mode") === "preview"

    const _ready = node.getFunction("_ready")

    if (app.mode === "editor" && node && node?.visible && mode && _ready)
      await _ready()
    if (app.mode === "game" && node && node?.visible && _ready) await _ready()

    if (node.nodes.length > 0)
      for (const child of node.nodes) {
        await this.executeFunctionReady(child)
      }
  }

  protected async executeFunctionScriptEditor(
    node: any,
    animation: { timestamp: number; deltaTime: number }
  ) {
    const app = this.$app as AtomicEngine
    const mode = app.useGlobal("mode") === "preview"
    const panAndZoomConfig = app.use("@config/pan-and-zoom")
    const pan = panAndZoomConfig?.pan ?? { x: 0, y: 0 }
    const zoom = panAndZoomConfig?.zoom ?? 1

    const _draw = node.getFunction("_draw")
    const _process = node.getFunction("_process")

    if (node && node?.visible && mode && _process) await _process(animation)

    if (
      nodeIsInEditor(
        node,
        {
          height: app.options.width,
          width: app.options.height
        },
        pan,
        zoom
      ) &&
      node &&
      node[PropType].startsWith("draw:2D") &&
      mode &&
      _draw
    ) {
      await _draw()
    }

    if (node.nodes.length > 0)
      for (const child of node.nodes) {
        await this.executeFunctionScriptEditor(child, animation)
      }
  }

  protected async executeFunctionScriptGame(
    node: any,
    animation: { timestamp: number; deltaTime: number }
  ) {
    const app = this.$app as AtomicGame

    const _draw = node.getFunction("_draw")
    const _process = node.getFunction("_process")

    if (node && node?.visible && _process) await _process(animation)

    if (
      nodeIsInViewport(node, {
        x: 0,
        y: 0,
        height: app.options.viewport.height,
        width: app.options.viewport.width
      }) &&
      node &&
      node[PropType].startsWith("draw:2D") &&
      _draw
    ) {
      await _draw()
    }

    if (node.nodes.length > 0)
      for (const child of node.nodes) {
        await this.executeFunctionScriptGame(child, animation)
      }
  }

  async [MethodDispatchScript](node: any = this.root_node) {
    this[MethodDispatchEvent]("script:execute")

    node[MethodDispatchScript]()

    if (node.nodes.length > 0)
      for (const childNode of node.nodes) {
        await this[MethodDispatchScript](childNode)
      }
  }

  export(format: "JSON" | "YAML" = "JSON") {
    this[MethodDispatchEvent]("script:export")

    return format === "YAML"
      ? YAML.stringify(this[MethodExport]())
      : JSON5.stringify(this[MethodExport]())
  }

  import(data: string, format: "JSON" | "YAML" = "JSON") {
    this[MethodDispatchEvent]("script:import")
  }

  emit(name: TEventScript, callback: TFunction) {
    this._events.addEventListener(name, callback)
  }

  [MethodSetRootNode](root: any) {
    this.root_node = root
  }

  [MethodDispatchEvent](name: TEventScript, ...args: any[]) {
    this._events.emitEvent(name, args)
  }

  [MethodExport]() {
    return []
  }
}
