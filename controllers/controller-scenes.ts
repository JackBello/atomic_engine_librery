import { BasicNode, EmptyNode, Node2D } from "../basic/nodes/2d/node";
import { Scene2D } from "../basic/nodes/2d/scene";

export class ControllerScenes {
  protected _scenes = new Map<string, Scene2D>()
  protected _scene!: Scene2D;

  get currentScene() {
    return this._scene;
  }

  public get(id: string) {
    if (!this._scenes.has(id)) throw new Error(`not found scene "${id}"`)

    return this._scenes.get(id) as Scene2D;
  }

  public change(id: string) {
    this._scene = this.get(id);
  }

  public changeAndRender(id: string) {
    this._scene = this.get(id);
    this.render()
  }

  public changeAndReset(id: string) {
    this.reset()
    this._scene = this.get(id);
  }

  public changeComplete(id: string) {
    this.reset()
    this._scene = this.get(id);
    this.render()
  }

  public add(scene: Scene2D) {
    this._scenes.set(scene.uuid, scene);
  }

  public delete(id: string) {
    this._scenes.delete(id)
    if (id === this.currentScene?.uuid) this._scene = (undefined as any)
  }

  public resetAndRender() {
    this.reset()
    this.render()
  }

  public render(node: BasicNode | Node2D | EmptyNode = this._scene) {
    if (node.visible) node.render()

    for (let childNode of node.getNodes()) {
      this.render(childNode)
    }
  }

  public reset(node: BasicNode | Node2D | EmptyNode = this._scene) {
    if (node.visible) node.reset()

    for (let childNode of node.getNodes()) {
      this.reset(childNode)
    }
  }

  public update(frame: number, time: number) {
    frame
    time

    if (this._scene)
      this.render()
  }

  public getScenesName() {
    return [...this._scenes.values()].map(scene => scene.name);
  }

  public getScenes() {
    return [...this._scenes.values()];
  }

  public getQuantityScene() {
    return this._scenes.size;
  }
}
