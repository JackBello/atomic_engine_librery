import { DEFAULT_CONFIG_NODE_RECTANGLE } from "../../../configs/nodes/2D/rectangle"
import { TFunction } from "../../../types"
import { IOptionsNodeRectangle } from "../types"
import { Node2D } from "./node"

export class NodeRectangle extends Node2D {
  protected _options: IOptionsNodeRectangle

  constructor(options: Partial<IOptionsNodeRectangle> = {}) {
    super({ ...DEFAULT_CONFIG_NODE_RECTANGLE, ...options })
    this._options = { ...DEFAULT_CONFIG_NODE_RECTANGLE, ...options }
    this._type = NodeRectangle.name
  }

  get background() {
    return this._options.background
  }

  get border() {
    return this._options.border
  }

  get borderColor() {
    return this._options.borderColor
  }

  get borderWidth() {
    return this._options.borderWidth
  }

  get radius() {
    return this._options.radius
  }

  set background(value: string) {
    this._redraw = true
    this._options.background = value
  }

  set border(value: boolean) {
    this._redraw = true
    this._options.border = value
  }

  set borderColor(value: string) {
    this._redraw = true
    this._options.borderColor = value
  }

  set borderWidth(value: number) {
    this._redraw = true
    this._options.borderWidth = value
  }

  set radius(
    value:
      | number
      | [number, number]
      | {
          topLeft: number
          topRight: number
          bottomLeft: number
          bottomRight: number
        }
  ) {
    this._redraw = true
    this._options.radius = value
  }

  public setOptions(options: Partial<IOptionsNodeRectangle>) {
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

    const { translateX, translateY } = this.processNode()

    this.getCore().execute("draw:rectangle", this._canvas, {
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
    this.getCore().execute("canvas:save", this._canvas)

    const { translateX, translateY } = this.processNode()

    this.getCore().execute("draw:rectangle", this._canvas, {
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
