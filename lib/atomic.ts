import { IOptionsEngine, TPropsAtomic } from "./types"
import { TPlugin } from "./plugins/types"
import { TEventCanvas } from "./event.type"
import {
  MethodDispatchEvent,
  MethodDispatchScript,
  MethodGetAllInsideAtomic,
  MethodHasEvent,
  MethodReloadEvents,
  MethodSetOptions,
  MethodStaticSetApp
} from "./symbols"
import EventObserver from "./utils/observer"
import { DEFAULT_CONFIG_ATOMIC } from "./configs/engine/atomic"
import { EventController } from "./controllers/event.controller"
import { DistributionController } from "./controllers/distribution.controller"
import { AnimationService } from "./services/animation.service"
import { SceneService } from "./services/scene.service"
import { CanvasService } from "./services/canvas.service"
import MathWorker from "@/workers/math.worker?worker&inline"
import { AbstractNode } from "./nodes/abstract/node.abstract"
import { TOptionsDraw, TOptionsRenderCanvasWorker } from "./workers/types"
import { WindowController } from "./controllers/window.controller"

export class AtomicEngine {
  [key: string]: any

  protected _worker: Worker
  protected _options: IOptionsEngine
  protected _plugins: Map<
    string,
    Omit<TPlugin, "install" | "name" | "events" | "inject">
  > = new Map()
  protected _configs: Map<string, Record<any, any>> = new Map()
  protected _providers: Map<any, any> = new Map()
  protected _nodes: Map<any, any> = new Map()
  protected _controls: Map<string, any> = new Map()
  protected _global: Map<string, any> = new Map([
    ["mode", "edition"], // "edition"| "game" | "preview"
    ["status", null], // null | "play" | "pause" | "game-over" | "stop" | "start" | "intro" | "cinematic"
    ["fps", null]
  ])
  protected _events: EventObserver = new EventObserver()

  protected $events!: EventController
  protected $distribution!: DistributionController
  protected $window!: WindowController

  protected $animation!: AnimationService
  protected $scenes!: SceneService<any>
  protected $canvas!: CanvasService

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

  constructor(options?: Partial<IOptionsEngine>, isImport: boolean = false) {
    this._worker = new MathWorker()

    this._options = { ...DEFAULT_CONFIG_ATOMIC, ...options }

    if (!isImport) this.init()

    this.$distribution = new DistributionController(this)
    this.$window = new WindowController(this)
    this.$events = new EventController(this)

    AbstractNode[MethodStaticSetApp](this)
  }

  protected init() {
    this.$animation = new AnimationService(this)
    this.$scenes = new SceneService<any>(this)
    this.$canvas = new CanvasService(this)

    this.initAnimation()
  }

  protected initAnimation() {
    this.animation.setDelayFrames(this.options.fps.delay)
    this.animation.setVelocityFrames(this.options.fps.velocity)

    this.animation.callback = (animation) => {
      this.execute("canvas:clear")
      this.scenes.process(animation)
    }
  }

  setSize(width: number, height: number) {
    this._options.width = width
    this._options.height = height
    this.canvas.setSize(width, height)
  }

  setExport(
    format: "JSON" | "YAML",
    exclude: TPropsAtomic[] = [],
    include: TPropsAtomic[] = []
  ) {
    this._options.export.format = format
    this._options.export.exclude = exclude
    this._options.export.include = include
  }

  plugin(plugin: TPlugin, options?: any) {
    plugin.install(this, options)

    this._plugins.set(plugin.name, {
      config: plugin?.config,
      nodes: plugin?.nodes,
      providers: plugin?.providers
    })

    if (plugin.inject) {
      this[plugin.name] = {}
      for (const [name, propOrMethod] of Object.entries(plugin.inject)) {
        this[plugin.name][name] = propOrMethod
      }
    }

    if (plugin.events)
      for (const [event, callback] of Object.entries(plugin.events)) {
        if (callback) this._events.addEventListener(event, callback)
      }
  }

  use(
    path:
      | `@${"config" | "providers" | "nodes"}/${string}`
      | `@${"config" | "providers" | "nodes"}/${string}/${string}`
  ) {
    const app: Record<string, Map<any, any>> = {
      config: this._configs,
      providers: this._providers,
      nodes: this._nodes
    }

    let plugin

    if (
      /@(config|providers|nodes)\/[a-zA-Z-_)(.$]+\/[a-zA-Z-_)(.$]+/g.test(path)
    ) {
      const [type, name, prop] = path.substring(1).split("/") as [
        "config" | "providers" | "nodes",
        string,
        string
      ]

      plugin = this._plugins.get(name)

      return plugin ? plugin[type]?.[prop] : app[type].get(name)?.[prop]
    }

    if (/@(config|providers|nodes)\/[a-zA-Z-_)(.$]+/g.test(path)) {
      const [type, name] = path.substring(1).split("/") as [
        "config" | "providers" | "nodes",
        string
      ]

      plugin = this._plugins.get(name)

      return plugin ? plugin[type] : app[type].get(name)
    }
  }

  useGlobal(name: string) {
    return this._global.get(name)
  }

  emit(
    name: TEventCanvas,
    callback: (app: AtomicEngine, event: Event) => void
  ) {
    this._events.addEventListener(name, callback)
  }

  config(name: string, config: Record<any, any>) {
    if (this._plugins.has(name)) return
    this._configs.set(name, config)
  }

  provide(name: string, provider: any) {
    if (this._plugins.has(name)) return
    this._providers.set(name, provider)
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

  export(mode: IOptionsEngine["mode"] = "editor") {
    return this.$distribution.export(mode)
  }

  import(text: string) {
    this.$distribution.import(text)
  }

  async start() {
    if (this.$scenes.currentScene) this.$scenes[MethodDispatchScript]()
    this.animation.play()
  }

  preview() {
    return {
      play: () => {
        this._global.set("mode", "preview")
      },
      pause: () => {
        this._global.set("mode", "edition")
      }
    }
  }

  game() {
    return {
      play: () => {
        this.$window.createWindow()
      },
      stop: () => {
        this.$window.closeWindow()
      }
    }
  }

  [MethodSetOptions](options?: Partial<IOptionsEngine>) {
    this._options = { ...DEFAULT_CONFIG_ATOMIC, ...options }

    this.init()

    this.$events[MethodReloadEvents]()
  }

  [MethodGetAllInsideAtomic]() {
    return JSON.parse(
      JSON.stringify({
        options: this._options,
        plugins: this._plugins,
        configs: this._configs,
        global: this._global,
        controls: this._controls,
        nodes: this._nodes,
        providers: this._providers
      })
    )
  }

  [MethodDispatchEvent](event: TEventCanvas, ...args: any[]): void {
    return this._events.emitEvent(event, ...args)
  }

  [MethodHasEvent](event: TEventCanvas): boolean {
    return this._events.hasEventListener(event)
  }
}
