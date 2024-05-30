import * as YAML from "yaml"
import { TCanvasType } from "../canvas/canvas.types"
import { Scene2D } from "../nodes/2D/scene"
import EventObserver from "../utils/observer"
import { TFunction } from "../types"
import { IControlEditor, TExportNode } from "../nodes/nodes.types"
import { makerNodes2D } from "../nodes/maker-2d"
import { TEventScenes } from "./event.type"
import { MethodDispatchEvent, MethodExport } from "../symbols"

export class SceneService<T extends Scene2D> {
  protected _scenes = new Map<string, T>()
  protected _scene!: T
  protected _events: EventObserver = new EventObserver()
  protected _canvas: TCanvasType

  constructor(canvas: TCanvasType) {
    this._canvas = canvas
  }

  get currentScene() {
    return this._scene
  }

  get(uuid: string) {
    if (!this._scenes.has(uuid))
      throw new Error('not found scene "' + uuid + '"')

    return this._scenes.get(uuid) as T
  }

  change(uuid: string) {
    this._scene = this.get(uuid)
  }

  changeAndRender(uuid: string) {
    this._scene = this.get(uuid)
    this.executeRender()
  }

  changeAndReset(uuid: string) {
    this.executeReset()
    this._scene = this.get(uuid)
  }

  changeComplete(uuid: string) {
    this.executeReset()
    this._scene = this.get(uuid)
    this.executeRender()
  }

  add(scene: T) {
    this._scenes.set(scene.uuid, scene)
  }

  public delete(uuid: string) {
    this._scenes.delete(uuid)
    if (uuid === this.currentScene?.uuid) this._scene = undefined as any
  }

  resetAndRender() {
    this.executeReset()
    this.executeRender()
  }

  update(animation: { timestamp: number; deltaTime: number; frame: number }) {
    if (this._scene) this.executeUpdate(this._scene, animation)
  }

  render() {
    if (this._scene) this.executeRender()
  }

  reset() {
    if (this._scene) this.executeReset()
  }

  async script() {
    if (this._scene) await this.executeScript()
  }

  protected executeUpdate(
    node: any = this._scene,
    animation: {
      timestamp: number
      deltaTime: number
      frame: number
    }
  ) {
    if (node?.process) node.process()
    if (node?.visible) node.update(this._canvas, animation)

    if (node.getNodes().length)
      for (let childNode of node.getNodes()) {
        this.executeUpdate(childNode, animation)
      }
  }

  protected executeReset(node: any = this._scene) {
    if (node?.process) node.process()
    if (node?.visible) node.reset()

    if (node.getNodes().length)
      for (let childNode of node.getNodes()) {
        this.executeReset(childNode)
      }
  }

  protected executeRender(node: any = this._scene) {
    if (node?.process) node.process()
    if (node?.visible) node.render(this._canvas)

    if (node.getNodes().length)
      for (let childNode of node.getNodes()) {
        this.executeRender(childNode)
      }
  }

  protected async executeScript(node: any = this._scene) {
    if (node.script) await node.runScript()

    if (node.getNodes().length)
      for (let childNode of node.getNodes()) {
        this.executeScript(childNode)
      }
  }

  getScenesName() {
    return [...this._scenes.values()].map((scene) => scene.name)
  }

  getScenes() {
    return [...this._scenes.values()]
  }

  getQuantityScene() {
    return this._scenes.size
  }

  export(format: "JSON" | "YAML" = "JSON") {
    return format === "YAML"
      ? YAML.stringify(this[MethodExport]())
      : JSON.stringify(this[MethodExport]())
  }

  import(data: string, format: "JSON" | "YAML" = "JSON") {
    const structure: TExportNode<IControlEditor>[] =
      format === "YAML" ? YAML.parse(data) : JSON.parse(data)

    const scenes = (makerNodes2D(structure) as T[]).map((scene) => [
      scene.uuid,
      scene
    ]) as [string, T][]

    this._scenes = new Map(scenes)
  }

  emit(name: TEventScenes, callback: TFunction) {
    this._events.addEventListener(name, callback)
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
