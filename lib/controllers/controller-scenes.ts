import * as YAML from "yaml"
import { BasicNode, EmptyNode, Node2D } from "../basic/nodes/2d/node"
import { Scene2D } from "../basic/nodes/2d/scene"
import { PrepareExport } from "../const"

export class ControllerScenes {
  protected _scenes = new Map<string, Scene2D>()
  protected _scene!: Scene2D

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
    node: BasicNode | Node2D | EmptyNode = this._scene,
    { frame, time }: { frame: number; time: number }
  ) {
    if (node.visible) node.update(frame, time)

    for (let childNode of node.getNodes()) {
      this.executeUpdate(childNode, { frame, time })
    }
  }

  protected executeReset(node: BasicNode | Node2D | EmptyNode = this._scene) {
    if (node.visible) node.reset()

    for (let childNode of node.getNodes()) {
      this.executeReset(childNode)
    }
  }

  protected executeRender(node: BasicNode | Node2D | EmptyNode = this._scene) {
    if (node.visible) node.render()

    for (let childNode of node.getNodes()) {
      this.executeRender(childNode)
    }
  }

  protected async executeScript(
    node: BasicNode | Node2D | EmptyNode = this._scene
  ) {
    await node.script()

    for (let childNode of node.getNodes()) {
      this.executeScript(childNode)
    }
  }

  public update(frame: number, time: number) {
    if (this._scene) this.executeUpdate(this._scene, { frame, time })
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

  [PrepareExport]() {
    const scenes = []

    for (const scene of this.getScenes()) {
      scenes.push(scene[PrepareExport]())
    }

    return scenes
  }

  public export(format: "JSON" | "YAML" = "JSON") {
    if (format === "YAML") return YAML.stringify(this[PrepareExport]())
    return JSON.stringify(this[PrepareExport]())
  }
}
