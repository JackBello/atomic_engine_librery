import { DEFAULT_CONFIG_SCENE_2D } from "../../../configs/nodes/2D/scene"
import { IOptionsScene2D } from "../types"
import { Node2D } from "./node"

export class Scene2D extends Node2D {
  protected _options: IOptionsScene2D

  constructor(name: string) {
    super({ ...DEFAULT_CONFIG_SCENE_2D })
    this._type = Scene2D.name
    this._options = { ...DEFAULT_CONFIG_SCENE_2D }
    this._options.name = name
  }

  public getQuantityNodesFromScene() {
    return this._nodes.size
  }

  public setOptions(options: Partial<IOptionsScene2D>) {
    this._redraw = true
    this._options = { ...this._options, ...options }
  }

  public toObject() {
    return {
      ...this._options
    }
  }
}
