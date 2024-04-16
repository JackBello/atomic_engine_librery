import {
  TOptionsCanvasWorker,
  TCanvasType,
  IOptionsCanvasController,
  TEventCanvas,
  TFunction
} from "../types"
import CanvasEditorWorker from "../workers/canvas-edition.worker?worker"
import { MainCanvas } from "../basic/canvas/canvas"
import { CanvasGrid } from "../basic/canvas/canvas-grid"
import { CanvasBackground } from "../basic/canvas/canvas-background"
import { CanvasScene } from "../basic/canvas/canvas-scene"
import { CanvasUI } from "../basic/canvas/canvas-ui"
import { CanvasEditor } from "../basic/canvas/canvas-editor"
import { DispatchEventObserver, SetCore } from "../const"
import { PanAndZoomElementCanvas } from "../basic/editor/PanAndZoomElementCanvas"
import EventObserver from "../utils/observer"

export class ControllerCanvasEditor {
  protected static $core: any

  protected _canvasMap = new Map<TCanvasType, MainCanvas>()
  protected _worker: Worker
  protected _options: IOptionsCanvasController = {
    background: "",
    width: 0,
    height: 0,
    context: "2d"
  }
  protected _container!: HTMLElement
  protected _eventObserver: EventObserver = new EventObserver()

  constructor(options: IOptionsCanvasController) {
    this._options = { ...this._options, ...options }

    this._worker = new CanvasEditorWorker()

    this._worker.postMessage({
      context: this._options.context
    })

    this._canvasMap.set(
      "grid",
      new CanvasGrid({
        height: this._options.height,
        width: this._options.width
      })
    )
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
    this._canvasMap.set(
      "editor",
      new CanvasEditor({
        height: this._options.height,
        width: this._options.width
      })
    )
  }

  public create(selector: string) {
    this._container = document.createElement("section")
    this._container.style.userSelect = "none"
    this._container.style.position = "relative"
    this._container.setAttribute("data-canvas-container", "editor")

    this._container.style.background = this._options.background
    this._container.style.width = this._options.width + "px"
    this._container.style.height = this._options.height + "px"

    const grid = this.getCanvas("grid") as MainCanvas
    const background = this.getCanvas("background") as MainCanvas
    const scene = this.getCanvas("scene") as MainCanvas
    const ui = this.getCanvas("ui") as MainCanvas
    const editor = this.getCanvas("editor") as MainCanvas

    this._container.appendChild(grid.canvas)
    this._container.appendChild(background.canvas)
    this._container.appendChild(scene.canvas)
    this._container.appendChild(ui.canvas)
    this._container.appendChild(editor.canvas)

    document.querySelector(selector)?.appendChild(this._container)
  }

  public load() {
    const grid = (this.getCanvas("grid") as MainCanvas).load()
    const background = (this.getCanvas("background") as MainCanvas).load()
    const scene = (this.getCanvas("scene") as MainCanvas).load()
    const ui = (this.getCanvas("ui") as MainCanvas).load()
    const editor = (this.getCanvas("editor") as MainCanvas).load()

    this._worker.postMessage(
      {
        grid,
        background,
        scene,
        ui,
        editor
      },
      [grid, background, scene, ui, editor]
    )
  }

  public setSize(width: number, height: number) {
    this._options.width = width
    this._options.height = height

    this._container.style.width = this._options.width + "px"
    this._container.style.height = this._options.height + "px"

    this._worker.postMessage({
      size: {
        width,
        height
      }
    })
  }

  public setTypeEdition(
    type: "edition-element-canvas" | "pan-and-zoom-element-canvas"
  ) {
    const editor = this.getCanvas("editor") as MainCanvas

    if (type === "edition-element-canvas")
      editor.canvas.style.cursor = "default"
    else editor.canvas.style.cursor = "grab"
  }

  public getCanvas(type: TCanvasType) {
    return this._canvasMap.get(type)
  }

  public execute(settings: TOptionsCanvasWorker) {
    this._worker.postMessage({
      settings
    })
  }

  public draw(callback: string) {
    this._worker.postMessage({
      draw: callback
    })
  }

  public on(name: TEventCanvas, callback: TFunction) {
    this._eventObserver.addEventListener(name, callback)
  }

  public pan(x: number, y: number) {
    PanAndZoomElementCanvas.pan(x, y)
  }

  public zoom(scale: number) {
    PanAndZoomElementCanvas.zoom(scale)
  }

  static [SetCore](core: any) {
    ControllerCanvasEditor.$core = core
  }

  [DispatchEventObserver](name: TEventCanvas, ...args: any[]) {
    this._eventObserver.emitEvent(name, args)
  }
}
