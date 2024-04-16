import * as YAML from "yaml"
import { Scene2D } from "../basic/nodes/2d/scene"
import { DispatchEventObserver, PrepareExport, SetCore } from "../const"
import EventObserver from "../utils/observer"
import { TEventScene, TFunction } from "../types"
import { AtomicEditor } from "../basic/atomic-editor"
import { AtomicGame } from "../basic/atomic-game"

export class ControllerScenes {
  protected static $core: AtomicEditor | AtomicGame

  protected _scenes = new Map<string, Scene2D>()
  protected _scene!: Scene2D

  protected _eventObserver: EventObserver = new EventObserver()

  get currentScene() {
    return this._scene
  }

  public get(id: string) {
    if (!this._scenes.has(id)) throw new Error('not found scene "' + id + '"')

    return this._scenes.get(id) as Scene2D
  }

  public change(id: string) {
    this._scene = this.get(id)
  }

  public changeAndRender(id: string) {
    this._scene = this.get(id)
    this.executeRender()
  }

  public changeAndReset(id: string) {
    this.executeReset()
    this._scene = this.get(id)
  }

  public changeComplete(id: string) {
    this.executeReset()
    this._scene = this.get(id)
    this.executeRender()
  }

  public add(scene: Scene2D) {
    this._scenes.set(scene.uuid, scene)
  }

  public delete(id: string) {
    this._scenes.delete(id)
    if (id === this.currentScene?.uuid) this._scene = undefined as any
  }

  public resetAndRender() {
    this.executeReset()
    this.executeRender()
  }

  protected executeUpdate(
    node: any = this._scene,
    object: {
      timestamp: number
      deltaTime: number
      frame: number
    }
  ) {
    if (node.visible) node.update(object)

    for (let childNode of node.getNodes()) {
      this.executeUpdate(childNode, object)
    }
  }

  protected executeReset(node: any = this._scene) {
    if (node.visible) node.reset()

    for (let childNode of node.getNodes()) {
      this.executeReset(childNode)
    }
  }

  protected executeRender(node: any = this._scene) {
    if (node.visible) node.render()

    for (let childNode of node.getNodes()) {
      this.executeRender(childNode)
    }
  }

  protected async executeScript(node: any = this._scene) {
    await node.runScript()

    for (let childNode of node.getNodes()) {
      this.executeScript(childNode)
    }
  }

  public update(object: {
    timestamp: number
    deltaTime: number
    frame: number
  }) {
    if (this._scene) this.executeUpdate(this._scene, object)
  }

  public render() {
    if (this._scene) this.executeRender()
  }

  public reset() {
    if (this._scene) this.executeReset()
  }

  public async script() {
    if (this._scene) await this.executeScript()
  }

  public getScenesName() {
    return [...this._scenes.values()].map((scene) => scene.name)
  }

  public getScenes() {
    return [...this._scenes.values()]
  }

  public getQuantityScene() {
    return this._scenes.size
  }

  public export(format: "JSON" | "YAML" = "JSON") {
    if (format === "YAML") return YAML.stringify(this[PrepareExport]())
    return JSON.stringify(this[PrepareExport]())
  }

  public on(name: TEventScene, callback: TFunction) {
    this._eventObserver.addEventListener(name, callback)
  }

  [PrepareExport]() {
    const scenes = []

    for (const scene of this.getScenes()) {
      scenes.push(scene[PrepareExport]())
    }

    return scenes
  }

  static [SetCore](core: AtomicEditor) {
    ControllerScenes.$core = core
  }

  [DispatchEventObserver](name: TEventScene, ...args: any[]) {
    this._eventObserver.emitEvent(name, args)
  }
}
