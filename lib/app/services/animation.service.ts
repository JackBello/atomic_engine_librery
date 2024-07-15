import { AtomicGame } from "@/atomic-game"
import { AtomicEngine } from "../../atomic-engine"
import { MethodDispatchEvent } from "../../symbols"
import { TFunction } from "../../types"
import EventObserver from "../utils/observer"
import { TEventAnimation } from "./event.type"

export class AnimationService {
  private $app: AtomicEngine | AtomicGame

  protected _ref!: number
  protected _events: EventObserver = new EventObserver()

  protected _deltaTime: number = 0
  protected _lastTime: number = 0
  protected _status = {
    pause: false,
    playing: false
  }

  get DELTA_TIME() {
    return this._deltaTime
  }

  get TIME_STAMP() {
    return this._lastTime
  }

  get isPlaying() {
    return this._status.playing
  }

  get isPause() {
    return this._status.pause
  }

  constructor(app: AtomicEngine | AtomicGame) {
    this.$app = app
  }

  protected async loop(timestamp: number) {
    if (!this._lastTime) this._lastTime = timestamp
    this._deltaTime = timestamp - this._lastTime

    const mode = this.$app.useGlobal("mode") === "preview"
    const status = this.$app.useGlobal("status") === "play"

    if (this.$app.mode === "game" && status) {
      await this.$app.script.process({
        timestamp,
        deltaTime: this._deltaTime
      })

      await this.$app.drawer.process()
    } else if (this.$app.mode === "editor" || mode) {
      this.$app.$collision.checkCollisions(
        this.$app.scenes.currentScene?.$nodes.all ?? []
      )

      await this.$app.script.process({
        timestamp,
        deltaTime: this._deltaTime
      })

      await this.$app.drawer.process()

      this.$app.changeGlobal("re-draw", false)
    }

    this._ref = window.requestAnimationFrame(this.loop.bind(this))
  }

  play() {
    if (!this._status.playing) {
      this[MethodDispatchEvent]("animation:play")

      this._status.playing = true
      this._status.pause = false

      this._ref = window.requestAnimationFrame(this.loop.bind(this))
    }
  }

  pause() {
    if (this._status.playing) {
      this[MethodDispatchEvent]("animation:pause")

      window.cancelAnimationFrame(this._ref)

      this._status.playing = false
      this._status.pause = true

      this._lastTime = 0
      this._deltaTime = 0
    }
  }

  emit(name: TEventAnimation, callback: TFunction) {
    this._events.addEventListener(name, callback)
  }

  [MethodDispatchEvent](name: TEventAnimation, ...args: any[]) {
    this._events.emitEvent(name, args)
  }
}
