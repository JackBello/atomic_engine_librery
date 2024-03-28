import { IOptionsAtomCoreGame, IOptionsGame, TCanvasType, TOptionsType, TTypeCanvasActions, TTypeDraws, TTypeEditor, TTypeGrid } from "../types";
import { BasicNode } from "./nodes/2d/node";
import { ControllerAnimationFrame } from "../controllers/controller-animation-frame";
import { ControllerCanvasEditor } from "../controllers/controller-canvas-edition";
import { ControllerScenes } from "../controllers/controller-scenes";
import { EditionElementCanvas } from "./editor/EditionElementCanvas";

export class AtomicGame {
  public static Scenes: ControllerScenes;

  protected $animation: ControllerAnimationFrame

  protected _options: IOptionsGame = {
    context: "2d",
    dimension: "2D",
    background: "#000",
    height: 500,
    width: 500,
    full_size: false,
    full_screen: false,
    position_x: 500,
    position_y: 500
  };

  constructor(options: Partial<IOptionsGame>) {
    this._options = { ...this._options, ...options }

    this.$animation = new ControllerAnimationFrame()
  }

  get width() {
    return this._options.width
  }

  get height() {
    return this._options.height
  }

  protected initConfigAnimation() {
    this.$animation.delay = 1000
    this.$animation.fps = 60
  }

  protected registerInstance() {
    BasicNode.$game = this;
  }

  public execute<T extends TTypeDraws | TTypeCanvasActions | TTypeGrid | TTypeEditor>(action: T, canvas: TCanvasType, options?: Partial<TOptionsType[T]>) {
    action
    canvas
    options
    // this._canvasEditorController.on({
    //   action: action,
    //   canvas: canvas,
    //   options: options,
    // })
  }

  public render(frame: number = 0, time = 0) {
    this.execute("canvas:clear", "background")
    this.execute("canvas:clear", "scene")
    this.execute("canvas:clear", "ui")

    this.execute("canvas:save", "scene")

    AtomicGame.Scenes.update(frame, time)

    this.execute("canvas:restore", "scene")
  }

  public start() {
    // this._canvasEditorController.create(this._options.selector)
    // this._canvasEditorController.load()

    this.$animation.handler(({ frame, time }) => {
      this.render(frame, time)
    })
  }

  public play() {
    this.$animation.play()
  }

  public pause() {
    this.$animation.pause()
  }
}

export class AtomicCore {
  protected _options: IOptionsAtomCoreGame = {
    background: "#000",
    context: "2d",
    height: 500,
    width: 500,
    selector: "body",
    dimension: "2D",
  };
  protected _animationController: ControllerAnimationFrame
  protected _scenesController: ControllerScenes
  protected _canvasEditorController: ControllerCanvasEditor
  protected _mode: "edition" | "game" = "edition"

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

  get MODE() {
    return this._mode
  }

  constructor(options: Partial<IOptionsAtomCoreGame>) {
    this._options = { ...this._options, ...options }

    this.registerInstance()

    this._animationController = new ControllerAnimationFrame()

    this._scenesController = new ControllerScenes()

    this._canvasEditorController = new ControllerCanvasEditor({
      background: this._options.background,
      width: this._options.width,
      height: this._options.height,
      context: this._options.context
    })

    this.initConfigAnimation()
  }

  public setSize(width: number, height: number) {
    this._options.width = width;
    this._options.height = height;

    this._canvasEditorController.setSize(width, height)
  }

  protected initConfigAnimation() {
    this.$animation.delay = 1000
    this.$animation.fps = 60
  }

  protected registerInstance() {
    EditionElementCanvas.$core = this;
    BasicNode.$core = this;
  }

  public execute<T extends TTypeDraws | TTypeCanvasActions | TTypeGrid | TTypeEditor>(action: T, canvas: TCanvasType, options?: Partial<TOptionsType[T]>) {
    this._canvasEditorController.execute({
      action: action,
      canvas: canvas,
      options: options,
    })
  }

  public clearSelective() {
    this.execute("canvas:clear", "background")
    this.execute("canvas:clear", "ui")
    this.execute("canvas:clear", "editor")
  }

  public renderGrid() {
    this.execute("canvas:clear", "grid")
    this.execute("canvas:save", "grid")

    this.execute("grid:make", "grid", {
      grid: 30,
      background: "#eeeeee"
    })

    this.execute("canvas:restore", "grid")
  }

  public renderEditor() {
    this.execute("canvas:clear", "editor")

    if (this.$canvasEditor.edition.selection.active) {
      this.$canvasEditor.edition.selection.node.render()
    }
  }

  public renderScene(frame: number = 0, time = 0) {
    this.execute("canvas:clear", "scene")
    this.execute("canvas:save", "scene")

    this.$scenesGame.update(frame, time)

    this.execute("canvas:restore", "scene")
  }

  public renderAll(frame: number = 0, time = 0) {
    this.execute("canvas:clear", "grid")
    this.execute("canvas:clear", "background")
    this.execute("canvas:clear", "scene")
    this.execute("canvas:clear", "ui")
    this.execute("canvas:clear", "editor")

    this.execute("canvas:save", "grid")
    this.execute("canvas:save", "scene")

    this.execute("grid:make", "grid", {
      grid: 30,
      background: "#eeeeee"
    })

    this.$scenesGame.update(frame, time)

    if (this.$canvasEditor.edition.selection.active) {
      this.$canvasEditor.edition.selection.node.render()
    }

    this.execute("canvas:restore", "grid")
    this.execute("canvas:restore", "scene")
  }

  public translateCanvas(x: number, y: number) {
    this.execute("canvas:translate", "grid", {
      x,
      y
    })
    this.execute("canvas:translate", "background", {
      x,
      y
    })
    this.execute("canvas:translate", "scene", {
      x,
      y
    })
    this.execute("canvas:translate", "ui", {
      x,
      y
    })
    this.execute("canvas:translate", "editor", {
      x,
      y
    })
  }

  public start() {
    this._canvasEditorController.create(this._options.selector)
    this._canvasEditorController.load()
    this._canvasEditorController.events()

    this.$animation.handler(({ frame, time }) => {
      this.renderAll(frame, time)
    })
  }

  public play() {
    this.$animation.play()
  }

  public pause() {
    this.$animation.pause()
  }
}