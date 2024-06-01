import * as YAML from "yaml"
import JSON5 from "json5"
import { EventController } from "./controllers/event.controller"
import { TEventCanvas } from "./event.type"
import { AnimationService } from "./services/animation.service"
import { CanvasService } from "./services/canvas.service"
import { SceneService } from "./services/scene.service"
import { MethodDispatchEvent } from "./symbols"
import { IOptionsAtomicGame } from "./types"
import EventObserver from "./utils/observer"
import { TOptionsDraw, TOptionsRenderCanvasWorker } from "./workers/types"
import MathWorker from "@/workers/math.worker?worker&inline"
import { makerNodes2D } from "./nodes/maker-2d"

export class AtomicGame {
  [key: string]: any

  protected _worker: Worker
  protected _options!: IOptionsAtomicGame
  protected _configs: Map<string, Record<any, any>> = new Map()
  protected _nodes: Map<any, any> = new Map()
  protected _controls: Map<string, any> = new Map()
  protected _global: Map<string, any> = new Map([
    ["mode", "game"], // "edition" = 0 | "game" = 1 | "preview" = 2
    ["status", "play"] // null | "play" | "pause" | "game-over" | "stop" | "start" | "intro" | "cinematic"
  ])
  protected _events: EventObserver = new EventObserver()

  protected $events!: EventController

  protected $animation!: AnimationService
  protected $scenes!: SceneService<any>
  protected $canvas!: CanvasService

  readonly mode: "editor" | "game" = "game"

  get animation() {
    return this.$animation
  }

  get scenes() {
    return this.$scenes
  }

  get canvas() {
    return this.$canvas
  }

  get options() {
    return Object.freeze(this._options)
  }

  constructor() {
    this._worker = new MathWorker()
  }

  setSize(width: number, height: number) {
    this._options.width = width
    this._options.height = height
    this.canvas.setSize(width, height)
  }

  useGlobal(name: string) {
    return this._global.get(name)
  }

  emit(name: TEventCanvas, callback: (app: AtomicGame, event: Event) => void) {
    this._events.addEventListener(name, callback)
  }

  config(name: string, config: Record<any, any>) {
    if (this._plugins.has(name)) return
    this._configs.set(name, config)
  }

  node(name: string, node: any) {
    if (this._plugins.has(name)) return
    this._nodes.set(name, node)
  }

  calculate() {
    this._worker
  }

  validation() {
    this._worker
  }

  execute<A extends TOptionsRenderCanvasWorker["action"]>(
    action: A,
    options?: TOptionsDraw[A]
  ) {
    this.canvas.execute({
      dimension: this.options.dimension,
      context: this.options.context,
      action,
      options
    })
  }

  async load(text: string, format: "JSON" | "YAML" = "JSON") {
    const structure = format === "JSON" ? JSON5.parse(text) : YAML.parse(text)

    this._options = structure.options

    this.$animation = new AnimationService(this)
    this.$scenes = new SceneService<any>(this)
    this.$canvas = new CanvasService(this)

    this.$events = new EventController(this)

    const scenes = makerNodes2D(structure.scenes)

    this.$scenes.add(...scenes)

    await this.$scenes.change(structure.scene, true)

    this.$animation.setDelayFrames(this.options.fps.delay)
    this.$animation.setVelocityFrames(this.options.fps.velocity)

    this.$animation.callback = (animation) => {
      this.execute("canvas:clear")
      this.$scenes.process(animation)
    }
  }

  async start() {
    this.$animation.play()
  }

  [MethodDispatchEvent](event: TEventCanvas, ...args: any[]): void {
    return this._events.emitEvent(event, ...args)
  }
}
