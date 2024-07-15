import * as YAML from "yaml"
import JSON5 from "json5"
import { AtomicEngine, AtomicGame, GlobalNode } from "../../"
import { PropType } from "@/nodes/symbols"
import {
  MethodDispatchEvent,
  MethodDispatchScript,
  MethodExport
} from "@/symbols"
import EventObserver from "@/app/utils/observer"
import { TEventScript } from "./event.type"
import { TFunction } from "@/types"

export class ScriptService {
  private $app: AtomicEngine | AtomicGame

  protected _events: EventObserver = new EventObserver()

  constructor(app: AtomicEngine | AtomicGame) {
    this.$app = app
  }

  async ready() {
    if (this.$app.scenes.currentScene)
      await this.executeFunctionReady(this.$app.scenes.currentScene)
  }

  async process(animation: { timestamp: number; deltaTime: number }) {
    if (this.$app.scenes.currentScene && this.$app.mode === "game")
      await this.executeFunctionScriptGame(
        this.$app.scenes.currentScene,
        animation
      )
    if (this.$app.scenes.currentScene && this.$app.mode === "editor")
      await this.executeFunctionScriptEditor(
        this.$app.scenes.currentScene,
        animation
      )
  }

  protected async executeFunctionReady(node: GlobalNode) {
    const app = this.$app as AtomicEngine
    const mode = app.useGlobal("mode") === "preview"

    const _ready = node.$functions.get("_ready")

    if (app.mode === "editor" && node && node?.visible && mode && _ready)
      await _ready()
    if (app.mode === "game" && node && node?.visible && _ready) await _ready()

    if (node.$nodes.size > 0)
      for (const child of node.$nodes.all) {
        await this.executeFunctionReady(child)
      }
  }

  protected async executeFunctionScriptEditor(
    node: GlobalNode,
    animation: { timestamp: number; deltaTime: number }
  ) {
    const app = this.$app as AtomicEngine
    const mode = app.useGlobal("mode") === "preview"

    const _draw = node.$functions.get("_draw")
    const _process = node.$functions.get("_process")

    if (node && node?.visible && mode && _process) await _process(animation)

    if (node && node[PropType].startsWith("2D") && mode && _draw) await _draw()

    if (node.$nodes.size > 0)
      for (const child of node.$nodes.all) {
        await this.executeFunctionScriptEditor(child, animation)
      }
  }

  protected async executeFunctionScriptGame(
    node: GlobalNode,
    animation: { timestamp: number; deltaTime: number }
  ) {
    const _draw = node.$functions.get("_draw")
    const _process = node.$functions.get("_process")

    if (node && node?.visible && _process) await _process(animation)

    if (node && node[PropType].startsWith("2D") && _draw) {
      await _draw()
    }

    if (node.$nodes.size > 0)
      for (const child of node.$nodes.all) {
        await this.executeFunctionScriptGame(child, animation)
      }
  }

  async [MethodDispatchScript](
    node: GlobalNode | undefined = this.$app.scenes.currentScene
  ) {
    if (!node) return

    this[MethodDispatchEvent]("script:execute")

    node[MethodDispatchScript]()

    if (node.$nodes.size > 0)
      for (const child of node.$nodes.all) {
        await this[MethodDispatchScript](child)
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

  [MethodDispatchEvent](name: TEventScript, ...args: any[]) {
    this._events.emitEvent(name, args)
  }

  [MethodExport]() {
    return []
  }
}
