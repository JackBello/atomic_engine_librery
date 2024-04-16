import { DEFAULT_CONFIG_NODE_2D } from "../../../configs/nodes/2D/node"
import { TFunction } from "../../../types"
import {
  IOptionsNode2D,
  TTypeOrigin,
  TTypeOriginX,
  TTypeOriginY
} from "../types"
import { BasicNode } from "./basic"

export class Node2D extends BasicNode {
  protected _options: IOptionsNode2D
  protected _parent: Node2D | null

  constructor(options: Partial<IOptionsNode2D> = {}) {
    super({ ...DEFAULT_CONFIG_NODE_2D, ...options })
    this._options = { ...DEFAULT_CONFIG_NODE_2D, ...options }
    this._type = Node2D.name
    this._parent = null
  }

  get width() {
    return this._options.width
  }

  get height() {
    return this._options.height
  }

  get centerScale() {
    return this._options.centerScale
  }

  get centerRotation() {
    return this._options.centerRotation
  }

  get flipX() {
    return this._options.flipX
  }

  get flipY() {
    return this._options.flipY
  }

  get origin() {
    return this._options.origin
  }

  get originX() {
    return this._options.originX
  }

  get originY() {
    return this._options.originY
  }

  get scale() {
    return this._options.scale
  }

  get scaleX() {
    return this._options.scaleX
  }

  get scaleY() {
    return this._options.scaleY
  }

  get skew() {
    return this._options.skew
  }

  get skewX() {
    return this._options.skewX
  }

  get skewY() {
    return this._options.skewY
  }

  get rotation() {
    return this._options.rotation
  }

  set width(value: number) {
    this._redraw = true
    this._options.width = value
  }

  set height(value: number) {
    this._redraw = true
    this._options.height = value
  }

  set centerScale(value: boolean) {
    this._redraw = true
    this._options.centerScale = value
  }

  set centerRotation(value: boolean) {
    this._redraw = true
    this._options.centerRotation = value
  }

  set flipX(value: boolean) {
    this._options.flipX = value
  }

  set flipY(value: boolean) {
    this._options.flipY = value
  }

  set origin(value: TTypeOrigin) {
    this._redraw = true
    this._options.origin = value
    this._options.originX = value as TTypeOriginX
    this._options.originY = value as TTypeOriginY
  }

  set originX(value: TTypeOriginX) {
    this._redraw = true
    this._options.originX = value
  }

  set originY(value: TTypeOriginY) {
    this._redraw = true
    this._options.originY = value
  }

  set scale(value) {
    this._redraw = true
    this._options.scale = value
    this._options.scaleX = value
    this._options.scaleY = value
  }

  set scaleX(value) {
    this._redraw = true
    this._options.scaleX = value
  }

  set scaleY(value) {
    this._redraw = true
    this._options.scaleY = value
  }

  set skew(value: number) {
    this._redraw = true
    this._options.skew = value
    this._options.skewX = value
    this._options.skewY = value
  }

  set skewX(value: number) {
    this._redraw = true
    this._options.skewX = value
  }

  set skewY(value: number) {
    this._redraw = true
    this._options.skewY = value
  }

  set rotation(value) {
    this._redraw = true
    this._options.rotation = value
  }

  public center() {
    this._redraw = true
    if (this._parent && this._parent instanceof Node2D) {
      this.x =
        ((this._parent.width * this._parent.scaleX) / 2 -
          (this.width * this.scaleX) / 2) /
        2
      this.y =
        ((this._parent.height * this._parent.scaleY) / 2 -
          (this.height * this.scaleY) / 2) /
        2
    } else {
      this.x = (this.getCore().width / 2 - (this.width * this.scaleX) / 2) / 2
      this.y = (this.getCore().height / 2 - (this.height * this.scaleY) / 2) / 2
    }
  }

  public centerX() {
    this._redraw = true
    if (this._parent && this._parent instanceof Node2D) {
      this.x =
        ((this._parent.width * this._parent.scaleX) / 2 -
          (this.width * this.scaleX) / 2) /
        2
    } else {
      this.x = (this.getCore().width / 2 - (this.width * this.scaleX) / 2) / 2
    }
  }

  public centerY() {
    this._redraw = true
    if (this._parent && this._parent instanceof Node2D) {
      this.y =
        ((this._parent.height * this._parent.scaleY) / 2 -
          (this.height * this.scaleY) / 2) /
        2
    } else {
      this.y = (this.getCore().height / 2 - (this.height * this.scaleY) / 2) / 2
    }
  }

  protected processNode() {
    let translateX = this.x
    let translateY = this.y

    if (this._parent && this._parent instanceof Node2D) {
      translateX = this._parent.x + this.x
      translateY = this._parent.y + this.y

      console.log(this._parent)
    }

    return {
      translateX,
      translateY
    }
  }

  public setOptions(options: Partial<IOptionsNode2D>) {
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
