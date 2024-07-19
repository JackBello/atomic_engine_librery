import * as YAML from "yaml"
import JSON5 from "json5"
import EventObserver from "../utils/observer"
import { TFunction } from "../../types"
import { constructorNodes } from "../../nodes/global/constructor-node"
import { TEventScenes } from "./event.type"
import {
  MethodDispatchEvent,
  MethodExport,
  MethodStaticSetApp
} from "../../symbols"
import { AtomicEngine } from "../../atomic-engine"
import { AtomicGame } from "@/atomic-game"
import { AbstractNode } from "@/nodes/abstract/node.abstract"
import { GlobalNode, Scene } from "@/nodes"
import { IControlEditor, TExportNode } from "@/nodes/global/node.types"

export class SceneService {
  private $app: AtomicEngine | AtomicGame

  protected _scenes = new Map<string, Scene>()
  protected _scene?: Scene
  protected _events: EventObserver = new EventObserver()

  constructor(app: AtomicEngine | AtomicGame) {
    this.$app = app

    AbstractNode[MethodStaticSetApp](this.$app)
  }

  get currentScene() {
    return this._scene
  }

  get(slug: string) {
    if (!this._scenes.has(slug))
      throw new Error('not found scene "' + slug + '"')

    return this._scenes.get(slug)
  }

  add(...scenes: Scene[]) {
    for (let scene of scenes) {
      if (scene instanceof Scene) this._scenes.set(scene.slug, scene)
      else throw new Error("this instance is not a scene")
    }

    this[MethodDispatchEvent]("scenes:add", scenes)
  }

  delete(slug: string) {
    this._scenes.delete(slug)

    if (slug === this.currentScene?.uuid) this._scene = undefined

    this[MethodDispatchEvent]("scenes:delete", slug)
  }

  change(slug: string) {
    if (this._scene) this._scene[MethodDispatchEvent]("finish")

    const preScene = this.get(slug)

    if (preScene) preScene[MethodDispatchEvent]("preload")

    this._scene = preScene

    this[MethodDispatchEvent]("scenes:change", slug)
  }

  reset(node: GlobalNode) {
    if (node) {
      node.reset()

      if (node.$nodes.size > 0)
        for (const child of node.$nodes.all) {
          this.reset(child)
        }
    }
  }

  getScenes() {
    return [...this._scenes.values()]
  }

  export(format: "JSON" | "YAML" = "JSON") {
    this[MethodDispatchEvent]("scenes:export")
    return format === "YAML"
      ? YAML.stringify(this[MethodExport]())
      : JSON5.stringify(this[MethodExport]())
  }

  import(data: string, format: "JSON" | "YAML" = "JSON") {
    this[MethodDispatchEvent]("scenes:import")

    const structure: TExportNode<IControlEditor>[] =
      format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    const scenes = constructorNodes(structure).map((scene) => [
      scene.slug,
      scene
    ]) as [string, Scene][]

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
