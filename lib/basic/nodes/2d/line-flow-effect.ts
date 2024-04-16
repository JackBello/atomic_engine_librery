import { DEFAULT_CONFIG_NODE_LINE_FLOW_EFFECT } from "../../../configs/nodes/2D/line-flow-effect"
import { TFunction } from "../../../types"
import { IOptionsNodeLineFlowEffect } from "../types"
import { EmptyNode } from "./empty"

export class NodeLineFlowEffect extends EmptyNode {
  protected _options: IOptionsNodeLineFlowEffect
  protected _effect: string

  constructor(options: Partial<IOptionsNodeLineFlowEffect> = {}) {
    super({ ...DEFAULT_CONFIG_NODE_LINE_FLOW_EFFECT, ...options })
    this._options = { ...DEFAULT_CONFIG_NODE_LINE_FLOW_EFFECT, ...options }
    this._type = NodeLineFlowEffect.name
    this._effect = "line-flow"
  }

  get radius() {
    return this._options.radius
  }

  set radius(value: number) {
    this._options.radius = value
  }

  public setOptions(options: Partial<IOptionsNodeLineFlowEffect>) {
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

    this.getCore().execute("draw:effect", this._canvas, {
      ...this._options,
      effect: this._effect
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

    this.getCore().execute("draw:effect", this._canvas, {
      ...this._options,
      effect: this._effect
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
