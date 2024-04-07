import {
  TOptionsCanvasWorker,
  TCanvasType,
  IOptionsCanvasController,
  IOptionsCanvas,
  TEventCanvas
} from "../types"
import CanvasEditorWorker from "../workers/canvas-editor.worker?worker"
import { MainCanvas } from "../basic/canvas/canvas"
import { CanvasGrid } from "../basic/canvas/canvas-grid"
import { CanvasBackground } from "../basic/canvas/canvas-background"
import { CanvasScene } from "../basic/canvas/canvas-scene"
import { CanvasUI } from "../basic/canvas/canvas-ui"
import { CanvasEditor } from "../basic/canvas/canvas-editor"
import EventObserver from "../utils/observer"
import { TCursorOptions } from "../basic/nodes/types"

export class ControllerCanvasEditor {
  protected _canvasMap = new Map<TCanvasType, MainCanvas>()
  protected _worker: Worker
  protected _options: IOptionsCanvasController = {
    background: "",
    width: 0,
    height: 0,
    context: "2d"
  }
  protected _container!: HTMLElement
  protected _typeEdition:
    | "edition-element-canvas"
    | "pan-and-zoom-element-canvas" = "edition-element-canvas"
  protected _observer = new EventObserver()
  protected _cursor: TCursorOptions = "default"

  get eventObserver() {
    return this._observer
  }

  get modeEdition() {
    return this._typeEdition
  }

  constructor(options: IOptionsCanvasController) {
    this._options = { ...this._options, ...options }
    this._worker = new CanvasEditorWorker()

    const optionsLayer: IOptionsCanvas = {
      height: this._options.height,
      width: this._options.width
    }

    this._worker.postMessage({
      context: this._options.context
    })

    this._canvasMap.set("grid", new CanvasGrid(optionsLayer))
    this._canvasMap.set("background", new CanvasBackground(optionsLayer))
    this._canvasMap.set("scene", new CanvasScene(optionsLayer))
    this._canvasMap.set("ui", new CanvasUI(optionsLayer))
    this._canvasMap.set("editor", new CanvasEditor(optionsLayer))
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

  public setTypeEdition(
    type: "edition-element-canvas" | "pan-and-zoom-element-canvas"
  ) {
    const editor = this.getCanvas("editor") as MainCanvas

    this._typeEdition = type

    if (type === "edition-element-canvas")
      editor.canvas.style.cursor = "default"
    else editor.canvas.style.cursor = "grab"
  }

  public setCursor(type: TCursorOptions) {
    this._cursor = type
  }

  public getCanvas(type: TCanvasType) {
    return this._canvasMap.get(type)
  }

  public values() {
    return [...this._canvasMap.values()]
  }

  public keys() {
    return [...this._canvasMap.keys()]
  }

  public on<T extends TEventCanvas>(
    event: T,
    callback: (...args: any[]) => void
  ) {
    this._observer.addEventListener(event, callback)
  }

  public dispatchEvent<T extends TEventCanvas>(event: T, ...args: any[]) {
    this._observer.emitEvent(event, ...args)
  }

  public execute(settings: TOptionsCanvasWorker) {
    this._worker.postMessage({
      settings
    })
  }
}
