import { ControllerAnimationFrame } from "../controllers/controller-animation-frame"
import { ControllerScenes } from "../controllers/controller-scenes"
import {
  IOptionsGame,
  TCanvasType,
  TOptionsType,
  TTypeCanvasActions,
  TTypeDraws,
  TTypeEditor,
  TTypeGrid
} from "../types"
import { BasicNode } from "./nodes/2d/node"

export class AtomicGame {
  public static Scenes: ControllerScenes

  protected _animationController: ControllerAnimationFrame
  protected _canvasGameController: any
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
  }

  constructor(options: Partial<IOptionsGame>) {
    this._options = { ...this._options, ...options }

    this.registerInstance()

    this._animationController = new ControllerAnimationFrame()
    this._canvasGameController = {}

    this.initConfigAnimation()
  }

  get $canvasGame() {
    return this._canvasGameController
  }

  get $animation() {
    return this._animationController
  }

  get width() {
    return this._options.width
  }

  get height() {
    return this._options.height
  }

  protected initConfigAnimation() {
    this.$animation.delay = 1000
    this._animationController.fps = 60
  }

  protected registerInstance() {
    BasicNode.$game = this
  }

  public execute<
    T extends TTypeDraws | TTypeCanvasActions | TTypeGrid | TTypeEditor
  >(action: T, canvas: TCanvasType, options?: Partial<TOptionsType[T]>) {
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
    this.$canvasGame.create()
    this.$canvasGame.load()

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
