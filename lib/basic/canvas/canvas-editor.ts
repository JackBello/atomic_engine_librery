import { IOptionsCanvas, TCanvasType } from "../../types"
import { MainCanvas } from "./canvas"

export class CanvasEditor extends MainCanvas {
  protected _typeCanvas: TCanvasType = "editor"

  protected _canvas!: HTMLCanvasElement

  protected _options: IOptionsCanvas = {
    height: 0,
    width: 0
  }

  constructor(options: IOptionsCanvas) {
    super()
    this._options = { ...this._options, ...options }

    this.create()
  }

  get type(): TCanvasType {
    return this._typeCanvas
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas
  }

  get width(): number {
    return this._options.width
  }

  set width(value: number) {
    this._options.width = value
    this._canvas.width = value
  }

  get height(): number {
    return this._options.height
  }

  set height(value: number) {
    this._options.height = value
    this._canvas.height = value
  }

  public setSize(width: number, height: number): void {
    this._options.width = width
    this._canvas.width = width
    this._options.height = height
    this._canvas.height = height
  }

  public setOptions(options: Partial<IOptionsCanvas>): void {
    this._options = { ...this._options, ...options }
  }

  public load(): OffscreenCanvas {
    return this._canvas.transferControlToOffscreen()
  }

  protected create(): void {
    this._canvas = document.createElement("canvas")

    this.init()
  }

  protected init(): void {
    this._canvas.width = this.width
    this._canvas.height = this.height
    this._canvas.style.position = "absolute"
    this._canvas.style.left = "0px"
    this._canvas.style.top = "0px"
    this._canvas.style.cursor = "default"
    this._canvas.style.userSelect = "none"
    this._canvas.style.touchAction = "none"
    this._canvas.setAttribute("data-type-canvas", this.type)
  }
}
