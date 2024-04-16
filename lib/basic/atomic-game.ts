import {
  IOptionsGame,
  TCanvasType,
  TFunction,
  TOptionsType,
  TTypeCanvasActions,
  TTypeDraws,
  TTypeEditor,
  TTypeGrid
} from "../types"
import { ControllerAnimation } from "../controllers/controller-animation"
import { ControllerCanvasGame } from "../controllers/controller-canvas-game"
import { ControllerScenes } from "../controllers/controller-scenes"
import { DispatchEventObserver, SetCore } from "../const"
import { ControllerGlobal } from "../controllers/controller-global"
import EventObserver from "../utils/observer"
import { BasicNode } from "./nodes/2d/basic"
import { DEFAULT_CONFIG_GAME } from "../configs/game"

export class AtomicGame {
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

  protected _animationController: ControllerAnimation
  protected _scenesController: ControllerScenes
  protected _canvasController: ControllerCanvasGame
  protected _globalController: typeof ControllerGlobal

  protected _eventObserver: EventObserver

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

  get $global() {
    return this._globalController
  }

  constructor(options: Partial<IOptionsGame>) {
    this._options = { ...this._options, ...options }

    this._eventObserver = new EventObserver()

    const self = this as any

    ControllerAnimation[SetCore](self)
    ControllerScenes[SetCore](self)
    ControllerCanvasGame[SetCore](self)
    ControllerGlobal[SetCore](self)

    BasicNode[SetCore](self)

    ControllerGlobal.setOptions(DEFAULT_CONFIG_GAME)

    this._globalController = ControllerGlobal
    this._animationController = new ControllerAnimation()
    this._scenesController = new ControllerScenes()
    this._canvasController = new ControllerCanvasGame({
      background: this._options.background,
      width: this._options.width,
      height: this._options.height,
      context: this._options.context
    })

    this.$animation.setDelayFrames(this.$global.FPS.delay)
    this.$animation.setVelocityFrames(this.$global.FPS.velocity)

    this.$canvas.create()
    this.$canvas.load()

    this.renderScene()

    this.$animation.animation = ({ frame, timestamp, deltaTime }) => {
      deltaTime
      this.clearSelective()
      this.updateScene(frame, timestamp)
    }

    this.$animation.play()
  }

  public setSize(width: number, height: number) {
    this._options.width = width
    this._options.height = height

    this._canvasController.setSize(width, height)
  }

  public execute<
    T extends TTypeDraws | TTypeCanvasActions | TTypeGrid | TTypeEditor
  >(action: T, canvas: TCanvasType, options?: Partial<TOptionsType[T]>) {
    this._canvasController.execute({
      action: action,
      canvas: canvas,
      options: options
    })
  }

  public draw(accessor: string, ...args: any[]) {
    this.$canvas.draw(accessor, args)
  }

  public on(name: any, callback: TFunction) {
    this._eventObserver.addEventListener(name, callback)
  }

  public clearSelective() {
    this.execute("canvas:clear", "background")
    this.execute("canvas:clear", "ui")
  }

  public renderScene() {
    this.execute("canvas:clear", "scene")
    this.execute("canvas:save", "scene")

    this.$scenes.render()

    this.execute("canvas:restore", "scene")
  }

  public updateScene(frame: number = 0, time = 0) {
    this.execute("canvas:clear", "scene")
    this.execute("canvas:save", "scene")

    this.$scenes.update(frame, time)

    this.execute("canvas:restore", "scene")
  }

  [DispatchEventObserver](name: any, ...args: any[]) {
    this._eventObserver.emitEvent(name, args)
  }
}
