import {
  TOptionsCanvasWorker,
  TCanvasType,
  IOptionsCanvasController
} from "../types"
import CanvasGameWorker from "../workers/canvas-game.worker?worker"
import { MainCanvas } from "../basic/canvas/canvas"
import { CanvasBackground } from "../basic/canvas/canvas-background"
import { CanvasScene } from "../basic/canvas/canvas-scene"
import { CanvasUI } from "../basic/canvas/canvas-ui"
import { SetCore } from "../const"
import { AtomicGame } from "../basic/atomic-game"

export class ControllerCanvasGame {
  protected static $core: AtomicGame

  protected _canvasMap = new Map<TCanvasType, MainCanvas>()
  protected _worker: Worker
  protected _options: IOptionsCanvasController = {
    background: "",
    width: 0,
    height: 0,
    context: "2d"
  }
  protected _container!: HTMLElement

  constructor(options: IOptionsCanvasController) {
    this._options = { ...this._options, ...options }
    this._worker = new CanvasGameWorker()

    this._worker.postMessage({
      context: this._options.context
    })

    this._canvasMap.set(
      "background",
      new CanvasBackground({
        height: this._options.height,
        width: this._options.width
      })
    )
    this._canvasMap.set(
      "scene",
      new CanvasScene({
        height: this._options.height,
        width: this._options.width
      })
    )
    this._canvasMap.set(
      "ui",
      new CanvasUI({
        height: this._options.height,
        width: this._options.width
      })
    )
  }

  public create() {
    this._container = document.createElement("section")
    this._container.style.userSelect = "none"
    this._container.style.position = "relative"
    this._container.setAttribute("data-canvas-container", "game")

    this._container.style.background = this._options.background
    this._container.style.width = this._options.width + "px"
    this._container.style.height = this._options.height + "px"

    const background = this.getCanvas("background") as MainCanvas
    const scene = this.getCanvas("scene") as MainCanvas
    const ui = this.getCanvas("ui") as MainCanvas

    this._container.appendChild(background.canvas)
    this._container.appendChild(scene.canvas)
    this._container.appendChild(ui.canvas)

    document.body.appendChild(this._container)
  }

  public load() {
    const background = (this.getCanvas("background") as MainCanvas).load()
    const scene = (this.getCanvas("scene") as MainCanvas).load()
    const ui = (this.getCanvas("ui") as MainCanvas).load()

    this._worker.postMessage(
      {
        background,
        scene,
        ui
      },
      [background, scene, ui]
    )
  }

  public setSize(width: number, height: number) {
    this._worker.postMessage({
      size: {
        width,
        height
      }
    })

    this._options.width = width
    this._options.height = height

    this._container.style.width = this._options.width + "px"
    this._container.style.height = this._options.height + "px"
  }

  public getCanvas(type: TCanvasType) {
    return this._canvasMap.get(type)
  }

  public execute(settings: TOptionsCanvasWorker) {
    this._worker.postMessage({
      settings
    })
  }

  public draw(accessor: string, ...args: any[]) {
    this._worker.postMessage({
      draw: {
        accessor,
        args: args
      }
    })
  }

  static [SetCore](core: AtomicGame) {
    ControllerCanvasGame.$core = core
  }
}
