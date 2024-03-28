import { TOptionsCanvasWorker, TCanvasType, IOptionsCanvasController, IOptionsCanvas, TEventCanvas } from "../types";
import CanvasEditorWorker from "../workers/canvas-editor.worker?worker"
import { MainCanvas } from "../basic/canvas/canvas";
import { CanvasGrid } from "../basic/canvas/canvas-grid";
import { CanvasBackground } from "../basic/canvas/canvas-background";
import { CanvasScene } from "../basic/canvas/canvas-scene";
import { CanvasUI } from "../basic/canvas/canvas-ui";
import { CanvasEditor } from "../basic/canvas/canvas-editor";
import { EditionElementCanvas } from "../basic/editor/EditionElementCanvas";
import { NodeSelection } from "../basic/nodes/2d/selection";
import EventObserver from "../utils/observer";

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
  protected _typeEdition: "edition-element-canvas" | "pan-and-zoom-element-canvas" = "edition-element-canvas"
  protected _observer = new EventObserver()
  protected _cursor: "default" | "pointer" | "move" | "auto" = "default"

  get eventObserver() {
    return this._observer
  }

  public edition = {
    selection: {
      active: false,
      node: new NodeSelection({
        background: "rgba(52, 131, 235, 0.3)",
        radius: 0,
        border: false,
        borderColor: "rgba(52, 131, 235, 0.8)",
        borderWidth: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        endX: 0,
        endY: 0
      })
    }
  }

  constructor(options: IOptionsCanvasController) {
    this._options = { ...this._options, ...options }
    this._worker = new CanvasEditorWorker();

    const optionsLayer: IOptionsCanvas = {
      background: this._options.background,
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
    this._container.setAttribute("data-canvas-container", "editor");

    this._container.style.width = `${this._options.width}px`
    this._container.style.height = `${this._options.height}px`

    const grid = this.getCanvas("grid") as MainCanvas;
    const background = this.getCanvas("background") as MainCanvas;
    const scene = this.getCanvas("scene") as MainCanvas;
    const ui = this.getCanvas("ui") as MainCanvas;
    const editor = this.getCanvas("editor") as MainCanvas;

    this._container.appendChild(grid.canvas)
    this._container.appendChild(background.canvas)
    this._container.appendChild(scene.canvas)
    this._container.appendChild(ui.canvas)
    this._container.appendChild(editor.canvas)

    document.querySelector(selector)?.appendChild(this._container);
  }

  public load() {
    const grid = (this.getCanvas("grid") as MainCanvas).load();
    const background = (this.getCanvas("background") as MainCanvas).load();
    const scene = (this.getCanvas("scene") as MainCanvas).load();
    const ui = (this.getCanvas("ui") as MainCanvas).load();
    const editor = (this.getCanvas("editor") as MainCanvas).load();

    this._worker.postMessage({
      grid,
      background,
      scene,
      ui,
      editor
    }, [grid, background, scene, ui, editor])
  }

  public events() {
    const editor = (this.getCanvas("editor") as MainCanvas);

    editor.canvas.addEventListener('mousedown', (event) => {
      event.preventDefault();

      if (this._typeEdition === "edition-element-canvas")
        EditionElementCanvas.mousedown(event)
      if (this._typeEdition === "pan-and-zoom-element-canvas") {
        // PanAndZoomCanvasScene.mousedown(event)
      }
    })

    editor.canvas.addEventListener('touchstart', (event) => {
      event.preventDefault();
      event.stopPropagation();
    })

    editor.canvas.addEventListener('mouseup', (event) => {
      event.preventDefault();

      if (this._typeEdition === "edition-element-canvas")
        EditionElementCanvas.mouseup(event)
      if (this._typeEdition === "pan-and-zoom-element-canvas") {
        // PanAndZoomCanvasScene.mouseup(event)
      }
    })

    editor.canvas.addEventListener('touchend', (event) => {
      event.preventDefault();
      event.stopPropagation();
    })

    editor.canvas.addEventListener('mousemove', (event) => {
      event.preventDefault();

      if (this._typeEdition === "edition-element-canvas")
        EditionElementCanvas.mousemove(event)
      if (this._typeEdition === "pan-and-zoom-element-canvas") {
        // PanAndZoomCanvasScene.mousemove(event)
      }
    })

    editor.canvas.addEventListener('touchmove', (event) => {
      event.preventDefault();
      event.stopPropagation();
    })

    editor.canvas.addEventListener('wheel', (event) => {
      event.preventDefault();

      if (this._typeEdition === "pan-and-zoom-element-canvas") {
        // PanAndZoomCanvasScene.wheel(event)
      }
    })
  }

  public setSize(width: number, height: number) {
    this._worker.postMessage({
      size: {
        width,
        height
      }
    })

    this._options.width = width;
    this._options.height = height;

    this._container.style.width = `${this._options.width}px`
    this._container.style.height = `${this._options.height}px`
  }

  public setTypeEdition(type: "edition-element-canvas" | "pan-and-zoom-element-canvas") {
    this._typeEdition = type;
  }

  public setCursor(type: "default" | "pointer" | "move" | "auto") {
    this._cursor = type
  }

  public getCanvas(type: TCanvasType) {
    return this._canvasMap.get(type);
  }

  public values() {
    return [...this._canvasMap.values()]
  }

  public keys() {
    return [...this._canvasMap.keys()]
  }

  public on<T extends TEventCanvas>(event: T, callback: (...args: any[]) => void) {
    this._observer.addEventListener(event, callback);
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
