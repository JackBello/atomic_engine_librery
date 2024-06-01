import * as YAML from "yaml"
import JSON5 from "json5"
import { Scene2D } from "../nodes/2D/scene"
import EventObserver from "../utils/observer"
import { TFunction } from "../types"
import { IControlEditor, TExportNode } from "../nodes/nodes.types"
import { makerNodes2D } from "../nodes/maker-2d"
import { TEventScenes } from "./event.type"
import {
  MethodDispatchEvent,
  MethodDispatchScript,
  MethodExport,
  MethodStaticSetApp
} from "../symbols"
import { AtomicEngine } from "../atomic-engine"
import { AtomicGame } from "@/atomic-game"
import { AbstractNode } from "@/nodes/abstract/node.abstract"

export class SceneService<T extends Scene2D> {
  private $app: AtomicEngine | AtomicGame

  protected _scenes = new Map<string, T>()
  protected _scene?: T
  protected _events: EventObserver = new EventObserver()

  constructor(app: AtomicEngine | AtomicGame) {
    this.$app = app

    this.$app
  }

  get currentScene() {
    return this._scene
  }

  get(uuid: string) {
    if (!this._scenes.has(uuid))
      throw new Error('not found scene "' + uuid + '"')

    return this._scenes.get(uuid) as T
  }

  async change(uuid: string, executeScript: boolean = false) {
    this._scene = this.get(uuid)
    if (this._scene && executeScript) await this[MethodDispatchScript]()
  }

  add(...scenes: T[]) {
    for (let scene of scenes) {
      this._scenes.set(scene.uuid, scene)
    }
  }

  delete(uuid: string) {
    this._scenes.delete(uuid)

    if (uuid === this.currentScene?.uuid) this._scene = undefined
  }

  process(
    animation?: { timestamp: number; deltaTime: number },
    reset: boolean = false
  ) {
    if (this._scene) this.executeProcess(this._scene, animation, reset)
  }

  protected executeProcess(
    node: any = this._scene,
    animation?: {
      timestamp: number
      deltaTime: number
    },
    reset: boolean = false
  ) {
    if (node.visible) AbstractNode[MethodStaticSetApp](this.$app)
    if (reset && node.visible) node.reset()
    if (node.visible) node.process(animation)

    if (node.nodes.length)
      for (const childNode of node.nodes) {
        this.executeProcess(childNode as any, animation, reset)
      }
  }

  getScenes() {
    return [...this._scenes.values()]
  }

  export(format: "JSON" | "YAML" = "JSON") {
    return format === "YAML"
      ? YAML.stringify(this[MethodExport]())
      : JSON5.stringify(this[MethodExport]())
  }

  import(data: string, format: "JSON" | "YAML" = "JSON") {
    const structure: TExportNode<IControlEditor>[] =
      format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    const scenes = (makerNodes2D(structure) as T[]).map((scene) => [
      scene.uuid,
      scene
    ]) as [string, T][]

    this._scenes = new Map(scenes)
  }

  emit(name: TEventScenes, callback: TFunction) {
    this._events.addEventListener(name, callback)
  }

  async [MethodDispatchScript](node: any = this._scene) {
    node[MethodDispatchScript]()

    if (node.nodes.length)
      for (const childNode of node.nodes) {
        await this[MethodDispatchScript](childNode)
      }
  }

  [MethodDispatchEvent](name: any, ...args: any[]) {
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
