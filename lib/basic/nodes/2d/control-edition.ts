import { DEFAULT_CONFIG_NODE_CONTROL_EDITION } from "../../../configs/nodes/2D/control-edition"
import { TFunction } from "../../../types"
import { IOptionsNodeControlEdition } from "../types"
import { Node2D } from "./node"

export class NodeControlEdition extends Node2D {
  protected _options: IOptionsNodeControlEdition

  constructor(options: Partial<IOptionsNodeControlEdition> = {}) {
    super({ ...DEFAULT_CONFIG_NODE_CONTROL_EDITION, ...options })
    this._options = { ...DEFAULT_CONFIG_NODE_CONTROL_EDITION, ...options }
    this._type = NodeControlEdition.name
  }

  public setOptions(options: Partial<IOptionsNodeControlEdition>) {
    this._redraw = true
    this._options = { ...this._options, ...options }
  }

  public toObject() {
    return {
      ...this._options
    }
  }

  public render(): void {
    const { translateX, translateY } = this.processNode()

    this.getCore().execute("canvas:save", this._canvas)

    this.getCore().execute("draw:control-edition", this._canvas, {
      ...this._options,
      translateX,
      translateY
    })

    if (
      this.hasFunction("_ready") &&
      (this.getCore().$global.MODE === "preview" ||
        this.getCore().$global.MODE === "game")
    )
      (this.getFunction("_ready") as TFunction)()

    if (
      this.hasFunction("_draw") &&
      (this.getCore().$global.MODE === "preview" ||
        this.getCore().$global.MODE === "game")
    )
      (this.getFunction("_draw") as TFunction)()

    this.getCore().execute("canvas:restore", this._canvas)
  }

  public update(object: {
    timestamp: number
    deltaTime: number
    frame: number
  }): void {
    const { translateX, translateY } = this.processNode()

    this.getCore().execute("canvas:save", this._canvas)

    this.getCore().execute("draw:control-edition", this._canvas, {
      ...this._options,
      translateX,
      translateY
    })

    if (
      this.hasFunction("_draw") &&
      (this.getCore().$global.MODE === "preview" ||
        this.getCore().$global.MODE === "game")
    )
      (this.getFunction("_draw") as TFunction)()

    if (
      this.hasFunction("_process") &&
      (this.getCore().$global.MODE === "preview" ||
        this.getCore().$global.MODE === "game")
    )
      (this.getFunction("_process") as TFunction)(object)

    this.getCore().execute("canvas:restore", this._canvas)
  }
}
