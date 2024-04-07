import { DEFAULT_CONFIG_NODE_RECTANGLE } from "../../../configs/nodes/2D/rectangle"
import { AtomicGlobal } from "../../atomic-global"
import { IOptionsNodeRectangle } from "../types"
import { Node2D } from "./node"

export class NodeRectangle extends Node2D {
  protected _options: IOptionsNodeRectangle

  constructor(options: Partial<IOptionsNodeRectangle>) {
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

  public render() {
    if (this._redraw) {
      const { translateX, translateY } = this.processNode()

      this.getCore().execute("draw:rectangle", "scene", {
        ...this._options,
        translateX,
        translateY
      })

      // this._redraw = false
    }

    if (
      this._functions?._ready &&
      (AtomicGlobal.MODE === "preview" || AtomicGlobal.MODE === "game")
    )
      this._functions._ready()
  }

  public update(frame: number, time: number) {
    if (this._redraw) {
      const { translateX, translateY } = this.processNode()

      this.getCore().execute("draw:rectangle", "scene", {
        ...this._options,
        translateX,
        translateY
      })

      // this._redraw = false
    }

    if (
      this._functions?._process &&
      (AtomicGlobal.MODE === "preview" || AtomicGlobal.MODE === "game")
    )
      this._functions._process(frame, time)
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
}
