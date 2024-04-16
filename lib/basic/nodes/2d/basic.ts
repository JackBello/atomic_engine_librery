import { DEFAULT_CONFIG_BASIC_NODE } from "../../../configs/nodes/2D/node"
import { TFunction, TTypeDraws, TTypeInertNodes } from "../../../types"
import { IOptionsBasicNode } from "../types"
import { SetCore } from "../../../const"
import { AtomicEditor } from "../../atomic-editor"
import { AtomicGame } from "../../atomic-game"
import { GlobalNode } from "./global"

export class BasicNode extends GlobalNode {
  protected static $core: AtomicEditor | AtomicGame

  protected _type_draw: TTypeDraws | TTypeInertNodes
  protected _options: IOptionsBasicNode
  protected _initial: IOptionsBasicNode
  protected _type: string
  protected _redraw: boolean

  constructor(options: Partial<IOptionsBasicNode> = {}) {
    super({ ...DEFAULT_CONFIG_BASIC_NODE, ...options })
    this._options = { ...DEFAULT_CONFIG_BASIC_NODE, ...options }
    this._initial = { ...this._options }
    this._type = BasicNode.name
    this._redraw = true
    this._type_draw = "node:basic"
  }

  protected getCore() {
    return BasicNode.$core
  }

  get visible() {
    return this._options.visible
  }

  get selectable() {
    return this._options.selectable
  }

  get lock() {
    return this._options.lock
  }

  get x() {
    return this._options.x
  }

  get y() {
    return this._options.y
  }

  set visible(value: boolean) {
    this._options.visible = value
  }

  set selectable(value: boolean) {
    this._options.selectable = value
  }

  set lock(value: boolean) {
    this._options.lock = value
  }

  set x(value: number) {
    this._redraw = true
    this._options.x = value
  }

  set y(value: number) {
    this._redraw = true
    this._options.y = value
  }

  public move(x: number, y: number) {
    this._redraw = true
    this._options.x = x
    this._options.y = y
  }

  public reset() {
    this._redraw = true
    this._options = { ...this._initial }
  }

  public setOptions(options: Partial<IOptionsBasicNode>) {
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

  public static import(data: any) {
    const node = new BasicNode(data)

    return node
  }

  static [SetCore](core: AtomicEditor) {
    BasicNode.$core = core
  }
}
