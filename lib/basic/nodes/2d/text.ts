import { DEFAULT_CONFIG_NODE_TEXT } from "../../../configs/nodes/2D/text"
import { TFunction } from "../../../types"
import { IOptionsNodeText } from "../types"
import { Node2D } from "./node"

export class NodeText extends Node2D {
  protected _options: IOptionsNodeText

  constructor(options: Partial<IOptionsNodeText> = {}) {
    super({ ...DEFAULT_CONFIG_NODE_TEXT, ...options })
    this._options = { ...DEFAULT_CONFIG_NODE_TEXT, ...options }
    this._type = NodeText.name
  }

  public setOptions(options: Partial<IOptionsNodeText>) {
    this._redraw = true
    this._options = { ...this._options, ...options }
  }

  public toObject() {
    return {
      ...this._options
    }
  }

  public render(): void {
    this.getCore().execute("canvas:save", this._canvas)

    this.getCore().execute("draw:text", this._canvas, {
      ...this._options
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
    this.getCore().execute("canvas:save", this._canvas)

    this.getCore().execute("draw:text", this._canvas, {
      ...this._options
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
