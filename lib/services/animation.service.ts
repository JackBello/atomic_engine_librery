import { AtomicGame } from "@/atomic-game"
import { AtomicEngine } from "../atomic-engine"
import { MethodDispatchEvent } from "../symbols"
import { TFunction } from "../types"
import EventObserver from "../utils/observer"
import { TEventAnimation } from "./event.type"

export class AnimationService {
  private $app: AtomicEngine | AtomicGame

  protected _ref!: number
  protected _events: EventObserver = new EventObserver()
  protected _framesPerSeconds = {
    delay: 0, // 1000 ms to delay
    velocity: 0 // 60 fps per 1000 ms
  }
  protected _deltaTime: number = 0
  protected _lastTime: number = 0
  protected _frame: number = 0
  protected _status = {
    pause: false,
    playing: false
  }
  protected _state = {
    frames: 0,
    startTime: performance.now(),
    fps: 0
  }

  protected _callback: (object: {
    timestamp: number
    deltaTime: number
  }) => void = () => {}

  protected _editor: () => void = () => {}

  get DELTA_TIME() {
    return this._deltaTime
  }

  get TIME_STAMP() {
    return this._lastTime
  }

  get FRAME() {
    return this._frame
  }

  get FPS() {
    return this._state.fps
  }

  get framesPerSeconds() {
    return Object.freeze({
      delay: this._framesPerSeconds.delay,
      velocity: this._framesPerSeconds.velocity
    })
  }

  set callback(
    func: (object: { timestamp: number; deltaTime: number }) => void
  ) {
    this._callback = func
  }

  set editor(func: () => void) {
    this._editor = func
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

  /**
   *
   * pasar a otro worker
   */
  // protected calculateFPS() {
  //   const time = performance.now()
  //   const delayTime = time - this._state.startTime

  //   if (delayTime > this._framesPerSeconds.delay) {
  //     this._state.fps = Math.round(
  //       (this._state.frames * this._framesPerSeconds.delay) / delayTime
  //     )

  //     this._state.frames = 0
  //     this._state.startTime = time
  //   }

  //   this._state.frames++
  // }

  protected loop(timestamp: number) {
    this._ref = window.requestAnimationFrame(this.loop.bind(this))

    if (!this._lastTime) this._lastTime = timestamp

    this._deltaTime = timestamp - this._lastTime

    let framePerSecond = Math.floor(
      this._deltaTime /
        (this._framesPerSeconds.delay / this._framesPerSeconds.velocity)
    )

    if (this.$app.mode === "editor") this._editor()

    // this.$app.canvas.animation({
    //   timestamp,
    //   deltaTime: this._deltaTime
    // })

    if (framePerSecond > this._frame) {
      this._frame = framePerSecond

      // this.calculateFPS()

      this._callback({
        timestamp,
        deltaTime: this._deltaTime
      })
    }

    // this._lastTime = timestamp
  }

  play() {
    if (!this._status.playing) {
      this._status.playing = true
      this._status.pause = false

      this._ref = window.requestAnimationFrame(this.loop.bind(this))
    }
  }

  pause() {
    if (this._status.playing) {
      window.cancelAnimationFrame(this._ref)

      this._status.playing = false
      this._status.pause = true

      this._frame = 0
      this._lastTime = 0
      this._deltaTime = 0
    }
  }

  setDelayFrames(value: number) {
    this._framesPerSeconds.delay = value
    this._frame = 0
    this._lastTime = 0
    this._deltaTime = 0

    // this.$app.canvas.fps({
    //   delay: this._framesPerSeconds.delay,
    //   velocity: this.framesPerSeconds.velocity
    // })
  }

  setVelocityFrames(value: number) {
    this._framesPerSeconds.velocity = value
    this._frame = 0
    this._lastTime = 0
    this._deltaTime = 0

    // this.$app.canvas.fps({
    //   delay: this._framesPerSeconds.delay,
    //   velocity: this.framesPerSeconds.velocity
    // })
  }

  emit(name: TEventAnimation, callback: TFunction) {
    this._events.addEventListener(name, callback)
  }

  [MethodDispatchEvent](name: any, ...args: any[]) {
    this._events.emitEvent(name, args)
  }
}
