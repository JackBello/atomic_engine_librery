import * as YAML from "yaml"
import JSON5 from "json5"
import { EventController } from "./app/controllers/event.controller"
import { TEventCanvas } from "./event.type"
import { AnimationService } from "./app/services/animation.service"
import { SceneService } from "./app/services/scene.service"
import {
  MethodDispatchEvent,
  MethodDispatchScript,
  MethodExportWorker
} from "./symbols"
import { IOptionsAtomicGame, TMode } from "./types"
import EventObserver from "./app/utils/observer"
import { constructorNode } from "./nodes/global/constructor-node"
import { CanvasService } from "./app/services/canvas.service"
import { ScriptService } from "./app/services/script.service"
import { DrawerService } from "./app/services/drawer.service"
import { CollisionController } from "./app/controllers/collision.controller"

export class AtomicGame {
  [key: string]: any

  protected _options!: IOptionsAtomicGame
  protected _controls: Map<string, any> = new Map()
  protected _global: Map<string, any> = new Map()
  protected _events: EventObserver = new EventObserver()

  protected $$events!: EventController
  protected $$collision!: CollisionController

  protected $animation!: AnimationService
  protected $scenes!: SceneService
  protected $canvas!: CanvasService
  protected $script!: ScriptService
  protected $drawer!: DrawerService

  readonly mode: TMode = "game"

  get $collision() {
    return this.$$collision
  }

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

    this.drawer.render.setScaleViewport(this.useGlobal("scale-viewport"))
  }

  setSize(width: number, height: number) {
    this.canvas.setSize(width, height, true)
    this.drawer.render.setSize(width, height)
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
    this._global.set("status", "play") // "play" | "pause"
    // | "game-over" | "stop" | "start" | "intro" | "cinematic"
    this._global.set("scale-viewport", 1)
    this._global.set("re-draw", true)

    this.$scenes = new SceneService(this)
    this.$canvas = new CanvasService(this)
    this.$script = new ScriptService(this)
    this.$drawer = new DrawerService(this)
    this.$animation = new AnimationService(this)

    this.$$events = new EventController(this)
    this.$$collision = new CollisionController(this)

    this.drawer.render.setViewportGame(
      this.options.viewport.width,
      this.options.viewport.height
    )

    this.scenes.emit("scene:change", () => {
      if (this.scenes.currentScene) {
        this.drawer.nodes.setRoot(
          this.scenes.currentScene[MethodExportWorker]()
        )
      }
    })

    const scenes = constructorNode(structure.scenes)

    this.scenes.add(...scenes)

    this.scenes.change(structure.scene)

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
