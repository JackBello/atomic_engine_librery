import { IOptionsCanvas, TCanvasType } from "../../types"
import { MainCanvas } from "./canvas"

export class CanvasBackground extends MainCanvas {
  protected _typeCanvas: TCanvasType = "background"

  protected _canvas!: HTMLCanvasElement

  protected _options: IOptionsCanvas = {
    height: 0,
    width: 0
  }

  constructor(options: IOptionsCanvas) {
    super()
    this._options = { ...this._options, ...options }

    this._canvas = document.createElement("canvas")

    this.init()
  }

  get type(): TCanvasType {
    return this._typeCanvas
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas
  }

  public load() {
    return this._canvas.transferControlToOffscreen()
  }

  protected init(): void {
    this._canvas.width = this._options.width
    this._canvas.height = this._options.height
    this._canvas.style.position = "absolute"
    this._canvas.style.left = "0px"
    this._canvas.style.top = "0px"
    this._canvas.style.cursor = "default"
    this._canvas.style.userSelect = "none"
    this._canvas.style.touchAction = "none"
    this._canvas.setAttribute("data-type-canvas", this.type)
  }
}
