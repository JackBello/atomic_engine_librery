import { IOptionsAtomicEngine, TMode, TPropsAtomic } from "./types"
import { TPlugin } from "./plugins/types"
import { TEventCanvas } from "./event.type"
import {
  MethodDispatchEvent,
  MethodDispatchScript,
  MethodExportWorker,
  MethodGetAllInsideAtomic,
  MethodHasEvent,
  MethodReloadEvents,
  MethodSetOptions,
  MethodSetRootNode
} from "./symbols"
import EventObserver from "./app/utils/observer"
import { DEFAULT_CONFIG_ATOMIC } from "./configs/engine/atomic"
import { EventController } from "./app/controllers/event.controller"
import { DistributionController } from "./app/controllers/distribution.controller"
import { AnimationService } from "./app/services/animation.service"
import { SceneService } from "./app/services/scene.service"
import { CanvasService } from "./app/services/canvas.service"
import { WindowController } from "./app/controllers/window.controller"
import { ScriptService } from "./app/services/script.service"
import { DrawerService } from "./app/services/drawer.service"

export class AtomicEngine {
  [key: string]: any

  protected _options: IOptionsAtomicEngine
  protected _plugins: Map<
    string,
    Omit<TPlugin, "install" | "name" | "events" | "inject">
  > = new Map()
  protected _configs: Map<string, Record<any, any>> = new Map()
  protected _providers: Map<any, any> = new Map()
  protected _nodes: Map<any, any> = new Map()
  protected _controls: Map<string, any> = new Map()
  protected _global: Map<string, any> = new Map()
  protected _events: EventObserver = new EventObserver()

  protected $$events!: EventController
  protected $$distribution!: DistributionController
  protected $$window!: WindowController

  protected $animation!: AnimationService
  protected $scenes!: SceneService
  protected $canvas!: CanvasService
  protected $script!: ScriptService
  protected $drawer!: DrawerService

  readonly mode: TMode = "editor"

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
    return Object.freeze({ ...this._options })
  }

  get width() {
    return this.options.width
  }

  get height() {
    return this.options.height
  }

  constructor(options?: Partial<IOptionsAtomicEngine>) {
    this._options = { ...DEFAULT_CONFIG_ATOMIC, ...options }

    this.init()

    this.$$distribution = new DistributionController(this)
    this.$$window = new WindowController(this)
    this.$$events = new EventController(this)
  }

  protected init() {
    this.$scenes = new SceneService(this)
    this.$canvas = new CanvasService(this)
    this.$script = new ScriptService(this)
    this.$drawer = new DrawerService(this)
    this.$animation = new AnimationService(this)

    this._global.set("mode", "edition") // "edition" = 0 | "game" = 1 | "preview" = 2
    this._global.set("status", null) //  null | "play" | "pause" | "game-over" | "stop" | "start" | "intro" | "cinematic"
    this._global.set("fps", null)
    this._global.set("re-draw", true)
    this._global.set("scale-viewport", 1)

    this.animation.setDelayFrames(this.options.fps.delay)
    this.animation.setVelocityFrames(this.options.fps.velocity)

    this.scenes.emit("scene:change", () => {
      if (this.scenes.currentScene) {
        this.script[MethodSetRootNode](this.scenes.currentScene)

        this.drawer.setRootNode(this.scenes.currentScene[MethodExportWorker]())
      }
    })

    this.setSize(this._options.width, this._options.height)
  }

  setSize(width: number, height: number) {
    this._options.width = width
    this._options.height = height
    this.canvas.setSize(width, height)
    this.drawer.setSize(width, height)
    this.drawer.setSizeEditor(width, height)
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
    this._plugins.set(plugin.name, {
      config: plugin?.config,
      nodes: plugin?.nodes,
      providers: plugin?.providers
    })

    if (plugin.inject) {
      this[plugin.name] = {}
      for (const [name, method] of Object.entries(plugin.inject)) {
        this[plugin.name][name] = method.bind(this)
      }
    }

    if (plugin.events)
      for (const [event, callback] of Object.entries(plugin.events)) {
        if (callback) this._events.addEventListener(event, callback)
      }

    if (plugin.install) plugin.install(this, options)
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

  export(mode: "editor" | "game" = "editor", format: "JSON" | "YAML" = "JSON") {
    return this.$$distribution.export(mode, format)
  }

  import(text: string, format: "JSON" | "YAML" = "JSON") {
    this.$$distribution.import(text, format)
  }

  async start() {
    if (this.$scenes.currentScene) await this.$script[MethodDispatchScript]()
    this.animation.play()
  }

  changeGlobal(config: "mode" | "fps" | "status" | "re-draw", value: any) {
    this._global.set(config, value)
  }

  preview() {
    return {
      play: async () => {
        if (this.useGlobal("mode") === "edition") {
          this._global.set("mode", "preview")
          await this.$script.ready()
        }
      },
      stop: () => {
        if (this.useGlobal("mode") === "preview" && this.$scenes.currentScene) {
          this._global.set("mode", "edition")
          this.$scenes.reset(this.$scenes.currentScene)
        }
      },
      pause: () => {
        if (this.useGlobal("mode") === "preview")
          this._global.set("mode", "edition")
      }
    }
  }

  game() {
    return {
      play: () => {
        this.$$window.createWindow()
      },
      stop: () => {
        this.$$window.closeWindow()
      }
    }
  }

  [MethodSetOptions](options?: Partial<IOptionsAtomicEngine>) {
    this._options = { ...DEFAULT_CONFIG_ATOMIC, ...options }

    this.init()

    this.$$events[MethodReloadEvents]()
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
