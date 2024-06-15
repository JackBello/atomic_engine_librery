import * as YAML from "yaml"
import JSON5 from "json5"
import EventObserver from "../utils/observer"
import { TFunction } from "../types"
import { IControlEditor, TExportNode } from "../nodes/nodes.types"
import { makerNodes2D } from "../nodes/maker-2d"
import { TEventScenes } from "./event.type"
import {
  MethodDispatchEvent,
  MethodExport,
  MethodStaticSetApp
} from "../symbols"
import { AtomicEngine } from "../atomic-engine"
import { AtomicGame } from "@/atomic-game"
import { AbstractNode } from "@/nodes/abstract/node.abstract"

export class SceneService {
  private $app: AtomicEngine | AtomicGame

  protected _scenes = new Map<string, any>()
  protected _scene?: any
  protected _events: EventObserver = new EventObserver()

  constructor(app: AtomicEngine | AtomicGame) {
    this.$app = app

    AbstractNode[MethodStaticSetApp](this.$app)
  }

  get currentScene() {
    return this._scene
  }

  get(uuid: string) {
    if (!this._scenes.has(uuid))
      throw new Error('not found scene "' + uuid + '"')

    return this._scenes.get(uuid)
  }

  add(...scenes: any[]) {
    for (let scene of scenes) {
      this._scenes.set(scene.uuid, scene)
    }

    this[MethodDispatchEvent]("scene:add", scenes)
  }

  delete(uuid: string) {
    this._scenes.delete(uuid)

    if (uuid === this.currentScene?.uuid) this._scene = undefined

    this[MethodDispatchEvent]("scene:delete", uuid)
  }

  change(uuid: string) {
    this._scene = this.get(uuid)

    this[MethodDispatchEvent]("scene:change", uuid)
  }

  reset(node: any = this._scene) {
    if (node) {
      node.reset()

      if (node.nodes.length > 0)
        for (const child of node.nodes) {
          this.reset(child)
        }
    }
  }

  getScenes() {
    return [...this._scenes.values()]
  }

  export(format: "JSON" | "YAML" = "JSON") {
    this[MethodDispatchEvent]("scene:export")
    return format === "YAML"
      ? YAML.stringify(this[MethodExport]())
      : JSON5.stringify(this[MethodExport]())
  }

  import(data: string, format: "JSON" | "YAML" = "JSON") {
    this[MethodDispatchEvent]("scene:import")

    const structure: TExportNode<IControlEditor>[] =
      format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    const scenes = (makerNodes2D(structure) as any[]).map((scene) => [
      scene.uuid,
      scene
    ]) as [string, any][]

    this._scenes = new Map(scenes)
  }

  emit(name: TEventScenes, callback: TFunction) {
    this._events.addEventListener(name, callback)
  }

  [MethodDispatchEvent](name: TEventScenes, ...args: any[]) {
    this._events.emitEvent(name, args)
  }

  [MethodExport]() {
    const scenes = []

    for (const scene of this.getScenes()) {
      scenes.push(scene[MethodExport]())
    }

    return scenes
  }
}
