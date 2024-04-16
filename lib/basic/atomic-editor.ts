import {
  IOptionsAtomCoreGame,
  TCanvasType,
  TFunction,
  TOptionsType,
  TTypeCanvasActions,
  TTypeDraws,
  TTypeEditor,
  TTypeGrid
} from "../types"
import { ControllerAnimation } from "../controllers/controller-animation"
import { ControllerCanvasEditor } from "../controllers/controller-canvas-edition"
import { ControllerScenes } from "../controllers/controller-scenes"
import { EditionElementCanvas } from "./editor/EditionElementCanvas"
import { PanAndZoomElementCanvas } from "./editor/PanAndZoomElementCanvas"
import {
  DispatchEventObserver,
  LoadEvents,
  NodeControlEditionDefault,
  NodeSelectionDefault,
  SetCanvas,
  SetCore
} from "../const"
import { NodeText } from "./nodes/2d/text"
import { NodeSelection } from "./nodes/2d/selection"
import { NodeControlEdition } from "./nodes/2d/control-edition"
import { ControllerGlobal } from "../controllers/controller-global"
import { ControllerEvents } from "../controllers/controller-events"
import { ControllerExport } from "../controllers/controller-export"
import { ControllerImport } from "../controllers/controller-import"
import EventObserver from "../utils/observer"
import { BasicNode } from "./nodes/2d/basic"
import { DEFAULT_CONFIG_EDITION } from "../configs/edition"

export class AtomicEditor {
  protected _options: IOptionsAtomCoreGame = {
    background: "#000",
    context: "2d",
    height: 500,
    width: 500,
    selector: "body",
    dimension: "2D"
  }

  protected _animationController: ControllerAnimation
  protected _scenesController: ControllerScenes
  protected _canvasController: ControllerCanvasEditor
  protected _eventsController: ControllerEvents
  protected _globalController: typeof ControllerGlobal
  protected _exportController: ControllerExport
  protected _importController: ControllerImport

  protected _eventObserver: EventObserver

  get DIMENSION() {
    return this._options.dimension
  }

  get CONTEXT() {
    return this._options.context
  }

  get width() {
    return this._options.width
  }

  get height() {
    return this._options.height
  }

  get $scenes() {
    return this._scenesController
  }

  get $animation() {
    return this._animationController
  }

  get $canvas() {
    return this._canvasController
  }

  get $events() {
    return this._eventsController
  }

  get $global() {
    return this._globalController
  }

  get $export() {
    return this._exportController
  }

  get $import() {
    return this._importController
  }

  constructor(options: Partial<IOptionsAtomCoreGame> = {}) {
    this._options = { ...this._options, ...options }

    this._eventObserver = new EventObserver()

    PanAndZoomElementCanvas[SetCore](this)
    EditionElementCanvas[SetCore](this)

    ControllerAnimation[SetCore](this)
    ControllerScenes[SetCore](this)
    ControllerCanvasEditor[SetCore](this)
    ControllerEvents[SetCore](this)
    ControllerGlobal[SetCore](this)
    ControllerExport[SetCore](this)
    ControllerImport[SetCore](this)

    BasicNode[SetCore](this)

    ControllerGlobal.setOptions(DEFAULT_CONFIG_EDITION)

    ControllerGlobal.NODES[NodeSelectionDefault] = new NodeSelection()
    ControllerGlobal.NODES[NodeSelectionDefault][SetCanvas]("editor")
    ControllerGlobal.NODES[NodeControlEditionDefault] = new NodeControlEdition()
    ControllerGlobal.NODES[NodeControlEditionDefault][SetCanvas]("editor")

    this._globalController = ControllerGlobal
    this._animationController = new ControllerAnimation()
    this._scenesController = new ControllerScenes()
    this._canvasController = new ControllerCanvasEditor({
      background: this._options.background,
      width: this._options.width,
      height: this._options.height,
      context: this._options.context
    })
    this._eventsController = new ControllerEvents()
    this._exportController = new ControllerExport()
    this._importController = new ControllerImport()

    this.$animation.setDelayFrames(this.$global.FPS.delay)
    this.$animation.setVelocityFrames(this.$global.FPS.velocity)

    this.$canvas.create(this._options.selector)
    this.$canvas.load()

    this.$events[LoadEvents]()

    this.$animation.animation = (object) => {
      this.clearSelective()
      this.renderGrid()
      this.updateScene(object)
      this.renderEditor()
    }

    this.$animation.play()
  }

  public setSize(width: number, height: number) {
    this._options.width = width
    this._options.height = height

    this.$canvas.setSize(width, height)
  }

  public execute<
    T extends TTypeDraws | TTypeCanvasActions | TTypeGrid | TTypeEditor
  >(action: T, canvas: TCanvasType, options?: Partial<TOptionsType[T]>) {
    this.$canvas.execute({
      action: action,
      canvas: canvas,
      options: options
    })
  }

  public draw(callback: string) {
    this.$canvas.draw(callback)
  }

  public startPreview() {
    this.$global.MODE = "preview"
    this.renderScene()
  }

  public pausePreview() {
    this.$global.MODE = "edition"
  }

  public on(name: any, callback: TFunction) {
    this._eventObserver.addEventListener(name, callback)
  }

  //

  public clearSelective() {
    this.execute("canvas:clear", "background")
    this.execute("canvas:clear", "ui")
  }

  public renderGrid() {
    this.execute("canvas:clear", "grid")
    this.execute("canvas:save", "grid")

    this.execute("grid:make", "grid", {
      grid: { ...this.$global.GRID },
      axis: { ...this.$global.AXIS },
      scale: this.$global.ZOOM.scale,
      translateX: this.$global.PAN.translateX,
      translateY: this.$global.PAN.translateY
    })

    this.execute("canvas:restore", "grid")
  }

  public renderEditor() {
    this.execute("canvas:clear", "editor")
    this.execute("canvas:save", "editor")

    this.execute("canvas:translate", "editor", {
      x: this.$global.PAN.translateX,
      y: this.$global.PAN.translateY
    })

    if (this.$global.SELECTION.active)
      this.$global.NODES[NodeSelectionDefault].render()

    if (this.$global.CONTROL.active)
      this.$global.NODES[NodeControlEditionDefault].render()

    const text = new NodeText({
      x: 10,
      y: -100,
      text: `start(x,y): ${this.$global.NODES[NodeSelectionDefault].startX}, ${this.$global.NODES[NodeSelectionDefault].startY} && end(x,y): ${this.$global.NODES[NodeSelectionDefault].endX}, ${this.$global.NODES[NodeSelectionDefault].endY}`,
      fontSize: "20px",
      textAlign: "center",
      color: "white"
    })

    const selection = new NodeText({
      x: 10,
      y: -50,
      text: `${this.$global.NODES[NodeSelectionDefault].nodesSelected
        .map((node: any) => node.background)
        .join(", ")}`,
      fontSize: "2pc",
      fontFamily: "arial",
      fontStyle: "italic",
      fontWeight: "bold",
      textAlign: "left",
      textDirection: "rtl",
      wordSpacing: "20px",
      color: "rgb(255,255,255,0.5)"
    })

    text[SetCanvas]("editor")
    selection[SetCanvas]("editor")
    text.render()
    selection.render()

    this.execute("canvas:restore", "editor")
  }

  public renderScene() {
    this.execute("canvas:clear", "scene")
    this.execute("canvas:save", "scene")

    this.execute("canvas:translate", "scene", {
      x: this.$global.PAN.translateX,
      y: this.$global.PAN.translateY
    })

    this.execute("canvas:scale", "scene", {
      scale: this.$global.ZOOM.scale
    })

    this.$scenes.render()

    this.execute("canvas:restore", "scene")
  }

  public updateScene(object: {
    timestamp: number
    deltaTime: number
    frame: number
  }) {
    this.execute("canvas:clear", "scene")
    this.execute("canvas:save", "scene")

    this.execute("canvas:translate", "scene", {
      x: this.$global.PAN.translateX,
      y: this.$global.PAN.translateY
    })

    this.execute("canvas:scale", "scene", {
      scale: this.$global.ZOOM.scale
    })

    this.$scenes.update(object)

    this.execute("canvas:restore", "scene")
  }

  [DispatchEventObserver](name: any, ...args: any[]) {
    this._eventObserver.emitEvent(name, args)
  }
}
