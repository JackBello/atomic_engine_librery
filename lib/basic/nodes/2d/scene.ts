import { DEFAULT_CONFIG_SCENE_2D } from "../../../configs/nodes/2D/scene"
import { IOptionsScene2D } from "../types"
import { GlobalNode } from "./global"

export class Scene2D extends GlobalNode {
  protected _options: IOptionsScene2D

  constructor(name: string) {
    super({ ...DEFAULT_CONFIG_SCENE_2D })
    this._type = Scene2D.name
    this._options = { ...DEFAULT_CONFIG_SCENE_2D }
    this._options.name = name
  }

  public getQuantityNodesFromScene() {
    return this._nodes.length
  }

  public toObject() {
    return {
      ...this._options
    }
  }
}
