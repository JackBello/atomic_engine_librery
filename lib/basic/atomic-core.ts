import * as YAML from "yaml"
import {
  IOptionsAtomCoreGame,
  TCanvasType,
  TOptionsType,
  TTypeCanvasActions,
  TTypeDraws,
  TTypeEditor,
  TTypeGrid
} from "../types"
import { BasicNode } from "./nodes/2d/node"
import { ControllerAnimationFrame } from "../controllers/controller-animation-frame"
import { ControllerCanvasEditor } from "../controllers/controller-canvas-edition"
import { ControllerScenes } from "../controllers/controller-scenes"
import { EditionElementCanvas } from "./editor/EditionElementCanvas"
import { PanAndZoomElementCanvas } from "./editor/PanAndZoomElementCanvas"
import {
  NodeControlEditionDefault,
  NodeSelectionDefault,
  PrepareExport,
  SetAttributesNode,
  SetUUIDNode
} from "../const"
import { NodeText } from "./nodes/2d/text"
import { EventsEditor } from "./events/editor-events"
import { AtomicGlobal } from "./atomic-global"
import { Scene2D } from "./nodes/2d/scene"
import { NodeRectangle } from "./nodes/2d/rectangle"
import { NodeSelection } from "./nodes/2d/selection"
import { NodeControlEdition } from "./nodes/2d/control-edition"

export class AtomicCore {
  protected _options: IOptionsAtomCoreGame = {
    background: "#000",
    context: "2d",
    height: 500,
    width: 500,
    selector: "body",
    dimension: "2D"
  }
  protected _animationController: ControllerAnimationFrame
  protected _scenesController: ControllerScenes
  protected _canvasEditorController: ControllerCanvasEditor
  protected _events: EventsEditor

  get DIMENSION() {
    return this._options.dimension
  }

  get $scenesGame() {
    return this._scenesController
  }

  get $animation() {
    return this._animationController
  }

  get $canvasEditor() {
    return this._canvasEditorController
  }

  get width() {
    return this._options.width
  }

  get height() {
    return this._options.height
  }

  constructor(options: Partial<IOptionsAtomCoreGame>) {
    this._options = { ...this._options, ...options }

    this.registerInstance()
    this.registerNodeDefault()

    this._animationController = new ControllerAnimationFrame()

    this._scenesController = new ControllerScenes()

    this._canvasEditorController = new ControllerCanvasEditor({
      background: this._options.background,
      width: this._options.width,
      height: this._options.height,
      context: this._options.context
    })

    this._events = new EventsEditor()

    this.initConfigAnimation()
  }

  protected initConfigAnimation() {
    this.$animation.delay = 1000
    this.$animation.fps = 60
  }

  protected registerNodeDefault() {
    AtomicGlobal.NODES[NodeSelectionDefault] = new NodeSelection()
    AtomicGlobal.NODES[NodeControlEditionDefault] = new NodeControlEdition()
  }

  protected registerInstance() {
    PanAndZoomElementCanvas.$core = this
    EditionElementCanvas.$core = this
    EventsEditor.$core = this
    BasicNode.$core = this
  }

  protected loadEvents() {
    let ref: any

    window.addEventListener("mousedown", (event) => {
      ref = (event.target as HTMLElement).dataset.typeCanvas

      if (ref === "editor") {
        event.preventDefault()
        this._events.mousedown(event)
      }
    })

    window.addEventListener("mouseup", (event) => {
      if (ref === "editor") {
        event.preventDefault()
        this._events.mouseup(event)
      }
    })

    window.addEventListener("mousemove", (event) => {
      if (ref === "editor") {
        event.preventDefault()
        this._events.mousemove(event)
      }
    })

    window.addEventListener("wheel", (event) => {
      if (ref === "editor") {
        event.preventDefault()
        this._events.wheel(event)
      }
    })

    window.addEventListener("keydown", (event) => {
      if (ref === "editor") {
        event.preventDefault()
        this._events.keydown(event)
      }
    })

    window.addEventListener("keyup", (event) => {
      if (ref === "editor") {
        event.preventDefault()
        this._events.keyup(event)
      }
    })

    window.addEventListener("keypress", (event) => {
      if (ref === "editor") {
        event.preventDefault()
        this._events.keypress(event)
      }
    })
  }

  public setSize(width: number, height: number) {
    this._options.width = width
    this._options.height = height

    this._canvasEditorController.setSize(width, height)
  }

  public pan(x: number, y: number) {
    PanAndZoomElementCanvas.pan(x, y)
  }

  public zoom(scale: number) {
    PanAndZoomElementCanvas.zoom(scale)
  }

  public execute<
    T extends TTypeDraws | TTypeCanvasActions | TTypeGrid | TTypeEditor
  >(action: T, canvas: TCanvasType, options?: Partial<TOptionsType[T]>) {
    this._canvasEditorController.execute({
      action: action,
      canvas: canvas,
      options: options
    })
  }

  public clearSelective() {
    this.execute("canvas:clear", "background")
    this.execute("canvas:clear", "ui")
  }

  public renderGrid() {
    this.execute("canvas:clear", "grid")
    this.execute("canvas:save", "grid")

    this.execute("grid:make", "grid", {
      grid: { ...AtomicGlobal.GRID },
      axis: { ...AtomicGlobal.AXIS },
      scale: AtomicGlobal.ZOOM.scale,
      translateX: AtomicGlobal.PAN.translateX,
      translateY: AtomicGlobal.PAN.translateY
    })

    this.execute("canvas:restore", "grid")
  }

  public renderEditor() {
    this.execute("canvas:clear", "editor")
    this.execute("canvas:save", "editor")

    this.execute("canvas:translate", "editor", {
      x: AtomicGlobal.PAN.translateX,
      y: AtomicGlobal.PAN.translateY
    })

    if (AtomicGlobal.SELECTION.active)
      AtomicGlobal.NODES[NodeSelectionDefault].render()

    if (AtomicGlobal.CONTROL.active)
      AtomicGlobal.NODES[NodeControlEditionDefault].render()

    const text = new NodeText({
      x: 10,
      y: -100,
      text: `start(x,y): ${AtomicGlobal.NODES[NodeSelectionDefault].startX}, ${AtomicGlobal.NODES[NodeSelectionDefault].startY} && end(x,y): ${AtomicGlobal.NODES[NodeSelectionDefault].endX}, ${AtomicGlobal.NODES[NodeSelectionDefault].endY}`,
      fontSize: "20px",
      textAlign: "center",
      color: "white"
    })

    const selection = new NodeText({
      x: 10,
      y: -50,
      text: `${AtomicGlobal.NODES[NodeSelectionDefault].nodesSelected
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

    text.render()
    selection.render()

    this.execute("canvas:restore", "editor")
  }

  public renderScene() {
    this.execute("canvas:clear", "scene")
    this.execute("canvas:save", "scene")

    this.execute("canvas:translate", "scene", {
      x: AtomicGlobal.PAN.translateX,
      y: AtomicGlobal.PAN.translateY
    })

    this.execute("canvas:scale", "scene", {
      scale: AtomicGlobal.ZOOM.scale
    })

    this.$scenesGame.render()

    this.execute("canvas:restore", "scene")
  }

  public updateScene(frame: number = 0, time = 0) {
    this.execute("canvas:clear", "scene")
    this.execute("canvas:save", "scene")

    this.execute("canvas:translate", "scene", {
      x: AtomicGlobal.PAN.translateX,
      y: AtomicGlobal.PAN.translateY
    })

    this.execute("canvas:scale", "scene", {
      scale: AtomicGlobal.ZOOM.scale
    })

    this.$scenesGame.update(frame, time)

    this.execute("canvas:restore", "scene")
  }

  public init() {
    this.$canvasEditor.create(this._options.selector)
    this.$canvasEditor.load()
    this.loadEvents()

    this.$animation.handler(({ frame, time }) => {
      this.clearSelective()
      this.renderGrid()
      this.updateScene(frame, time)
      this.renderEditor()
    })

    this.$animation.play()
  }

  public startPreview() {
    AtomicGlobal.MODE = "preview"
    this.renderScene()
  }

  public pausePreview() {
    AtomicGlobal.MODE = "edition"
  }

  public export(format: "JSON" | "YAML" = "JSON") {
    const $scenes = this.$scenesGame[PrepareExport]()

    if (format === "YAML")
      return YAML.stringify({
        background: this._options.background,
        context: this._options.context,
        dimension: this._options.dimension,
        width: this._options.width,
        height: this._options.height,
        $config: {
          currentScene: {
            name: this.$scenesGame.currentScene.name,
            uuid: this.$scenesGame.currentScene.uuid
          },
          pan: {
            translateX: AtomicGlobal.PAN.translateX,
            translateY: AtomicGlobal.PAN.translateY
          },
          zoom: {
            scale: AtomicGlobal.ZOOM.scale
          },
          selection: {
            background: AtomicGlobal.SELECTION.background,
            border: AtomicGlobal.SELECTION.border,
            borderColor: AtomicGlobal.SELECTION.borderColor,
            borderWidth: AtomicGlobal.SELECTION.borderWidth,
            radius: AtomicGlobal.SELECTION.radius
          },
          axis: {
            show: AtomicGlobal.AXIS.show,
            colorX: AtomicGlobal.AXIS.colorX,
            colorY: AtomicGlobal.AXIS.colorY
          },
          grid: {
            show: AtomicGlobal.GRID.show,
            cell: AtomicGlobal.GRID.cell,
            color: AtomicGlobal.GRID.color
          }
        },
        $scenes
      })

    return JSON.stringify({
      background: this._options.background,
      context: this._options.context,
      dimension: this._options.dimension,
      width: this._options.width,
      height: this._options.height,
      $config: {
        currentScene: {
          name: this.$scenesGame.currentScene?.name,
          uuid: this.$scenesGame.currentScene?.uuid
        },
        pan: {
          translateX: AtomicGlobal.PAN.translateX,
          translateY: AtomicGlobal.PAN.translateY
        },
        zoom: {
          scale: AtomicGlobal.ZOOM.scale
        },
        selection: {
          background: AtomicGlobal.SELECTION.background,
          border: AtomicGlobal.SELECTION.border,
          borderColor: AtomicGlobal.SELECTION.borderColor,
          borderWidth: AtomicGlobal.SELECTION.borderWidth,
          radius: AtomicGlobal.SELECTION.radius
        },
        axis: {
          show: AtomicGlobal.AXIS.show,
          colorX: AtomicGlobal.AXIS.colorX,
          colorY: AtomicGlobal.AXIS.colorY
        },
        grid: {
          show: AtomicGlobal.GRID.show,
          cell: AtomicGlobal.GRID.cell,
          color: AtomicGlobal.GRID.color
        }
      },
      $scenes
    })
  }

  public import(data: string, format: "JSON" | "YAML" = "JSON") {
    const convert = format === "JSON" ? JSON.parse(data) : YAML.parse(data)

    this._options.background = convert.background
    this._options.context = convert.context
    this._options.dimension = convert.dimension
    this._options.height = convert.height
    this._options.width = convert.width

    const $scenes = convert.$scenes
    const $config = convert.$config

    AtomicGlobal.AXIS.show = $config.axis.show
    AtomicGlobal.AXIS.colorX = $config.axis.colorX
    AtomicGlobal.AXIS.colorY = $config.axis.colorY

    AtomicGlobal.GRID.show = $config.grid.show
    AtomicGlobal.GRID.cell = $config.grid.cell
    AtomicGlobal.GRID.color = $config.grid.color

    AtomicGlobal.SELECTION.background = $config.selection.background
    AtomicGlobal.SELECTION.border = $config.selection.border
    AtomicGlobal.SELECTION.borderWidth = $config.selection.borderWidth
    AtomicGlobal.SELECTION.borderColor = $config.selection.borderColor
    AtomicGlobal.SELECTION.radius = $config.selection.radius

    this.executeNodes($scenes)

    this.$scenesGame.change($config.currentScene.uuid)

    this.pan($config.pan.translateX, $config.pan.translateY)
    this.zoom($config.zoom.scale)
  }

  protected executeNodes(nodes: any[], top: any = undefined) {
    let create

    for (const node of nodes) {
      if (node.type === "Scene2D") {
        create = new Scene2D(node.name)
        create[SetUUIDNode](node.uuid)

        this.executeNodes(node.nodes, create)

        this.$scenesGame.add(create)
      }

      if (node.type === "NodeRectangle" && top) {
        create = new NodeRectangle(node.options)
        create[SetUUIDNode](node.uuid)
        create[SetAttributesNode](node.attributes)
        create.setScript(node.script)

        top.addNode(create)

        this.executeNodes(node.nodes, create)
      }
    }
  }
}
