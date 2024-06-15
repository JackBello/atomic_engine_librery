import * as YAML from "yaml"
import JSON5 from "json5"
import { EventController } from "./controllers/event.controller"
import { TEventCanvas } from "./event.type"
import { AnimationService } from "./services/animation.service"
import { SceneService } from "./services/scene.service"
import {
  MethodDispatchEvent,
  MethodDispatchScript,
  MethodExportWorker,
  MethodSetRootNode
} from "./symbols"
import { IOptionsAtomicGame, TMode } from "./types"
import EventObserver from "./utils/observer"
import { makerNodes2D } from "./nodes/maker-2d"
import { CanvasService } from "./services/canvas.service"
import { ScriptService } from "./services/script.service"
import { DrawerService } from "./services/drawer.service"

export class AtomicGame {
  [key: string]: any

  protected _options!: IOptionsAtomicGame
  protected _controls: Map<string, any> = new Map()
  protected _global: Map<string, any> = new Map()
  protected _events: EventObserver = new EventObserver()

  protected $$events!: EventController

  protected $animation!: AnimationService
  protected $scenes!: SceneService
  protected $canvas!: CanvasService
  protected $script!: ScriptService
  protected $drawer!: DrawerService

  readonly mode: TMode = "game"

  get animation() {
    return this.$animation
  }

  get scenes() {
    return this.$scenes
  }

  get canvas() {
    return this.$canvas
  }

  get script() {
    return this.$script
  }

  get drawer() {
    return this.$drawer
  }

  get options() {
    return Object.freeze(this._options)
  }

  get width() {
    return this.options.viewport.width
  }

  get height() {
    return this.options.viewport.height
  }

  resize() {
    const windowAspect = window.innerWidth / window.innerHeight
    const gameAspect =
      this.options.viewport.width / this.options.viewport.height

    if (windowAspect > gameAspect) {
      this.canvas.instance.height = window.innerHeight
      this.canvas.instance.width =
        this.options.viewport.width *
        (this.canvas.instance.height / this.options.viewport.height)

      this.setSize(this.canvas.instance.width, this.canvas.instance.height)
    } else {
      this.canvas.instance.width = window.innerWidth
      this.canvas.instance.height =
        this.options.viewport.height *
        (this.canvas.instance.width / this.options.viewport.width)

      this.setSize(this.canvas.instance.width, this.canvas.instance.height)
    }

    this.changeGlobal(
      "scale-viewport",
      this.canvas.instance.width / this.options.viewport.width
    )

    this.drawer.setScaleViewport(this.useGlobal("scale-viewport"))
  }

  setSize(width: number, height: number) {
    this.canvas.setSize(width, height, true)
    this.drawer.setSize(width, height)
  }

  useGlobal(name: string) {
    return this._global.get(name)
  }

  emit(name: TEventCanvas, callback: (app: AtomicGame, event: Event) => void) {
    this._events.addEventListener(name, callback)
  }

  changeGlobal(
    config: "mode" | "scale-viewport" | "status" | "re-draw",
    value: any
  ) {
    this._global.set(config, value)
  }

  async load(text: string, format: "JSON" | "YAML" = "JSON") {
    const structure = format === "JSON" ? JSON5.parse(text) : YAML.parse(text)

    this._options = structure.options

    this._global.set("mode", "game") // "edition" = 0 | "game" = 1 | "preview" = 2
    this._global.set("status", null) //  null | "play" | "pause" | "game-over" | "stop" | "start" | "intro" | "cinematic"
    this._global.set("scale-viewport", 1)
    this._global.set("re-draw", true)

    this.$scenes = new SceneService(this)
    this.$canvas = new CanvasService(this)
    this.$script = new ScriptService(this)
    this.$drawer = new DrawerService(this)
    this.$animation = new AnimationService(this)

    this.$$events = new EventController(this)

    this.drawer.setViewportGame(
      this.options.viewport.width,
      this.options.viewport.height
    )

    this.scenes.emit("scene:change", () => {
      this.script[MethodSetRootNode](this.scenes.currentScene)

      this.drawer.setRootNode(this.scenes.currentScene[MethodExportWorker]())
    })

    const scenes = makerNodes2D(structure.scenes)

    this.scenes.add(...scenes)

    this.scenes.change(structure.scene)

    this.animation.setDelayFrames(this.options.fps.delay)
    this.animation.setVelocityFrames(this.options.fps.velocity)

    this.resize()
  }

  async start() {
    if (this.$scenes.currentScene) await this.$script[MethodDispatchScript]()
    await this.$script.ready()
    this.$animation.play()
  }

  [MethodDispatchEvent](event: TEventCanvas, ...args: any[]): void {
    return this._events.emitEvent(event, ...args)
  }
}
