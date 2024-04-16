import { AtomicEditor } from "../basic/atomic-editor"
import { AtomicGame } from "../basic/atomic-game"
import { DispatchEventObserver, SetCore } from "../const"
import { TEventAnimation, TFunction } from "../types"
import EventObserver from "../utils/observer"

export class ControllerAnimation {
  protected static $core: AtomicEditor | AtomicGame

  protected _eventObserver: EventObserver = new EventObserver()

  protected _ref!: number

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

  protected _animation: (object: {
    timestamp: number
    deltaTime: number
    frame: number
  }) => void = () => {}

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

  get animation() {
    return this._animation
  }

  set animation(
    animation: (object: {
      timestamp: number
      deltaTime: number
      frame: number
    }) => void
  ) {
    this._animation = animation
  }

  get isPlaying() {
    return this._status.playing
  }

  get isPause() {
    return this._status.pause
  }

  protected calculateFPS() {
    const time = performance.now()
    const delayTime = time - this._state.startTime

    if (delayTime > this._framesPerSeconds.delay) {
      this._state.fps = Math.round(
        (this._state.frames * this._framesPerSeconds.delay) / delayTime
      )

      this._state.frames = 0
      this._state.startTime = time
    }

    this._state.frames++
  }

  protected loop(timestamp: number) {
    if (this._lastTime === 0) this._lastTime = timestamp

    this._deltaTime = timestamp - this._lastTime

    let framePerSecond = Math.floor(
      this._deltaTime /
        (this._framesPerSeconds.delay / this._framesPerSeconds.velocity)
    )

    if (framePerSecond > this._frame) {
      this._frame = framePerSecond

      this.calculateFPS()

      this.animation({
        timestamp,
        deltaTime: this._deltaTime,
        frame: this._frame
      })
    }

    this._ref = window.requestAnimationFrame(this.loop.bind(this))
  }

  public play() {
    if (!this._status.playing) {
      this._status.playing = true
      this._status.pause = false

      this._ref = window.requestAnimationFrame(this.loop.bind(this))
    }
  }

  public pause() {
    if (this._status.playing) {
      window.cancelAnimationFrame(this._ref)

      this._status.playing = false
      this._status.pause = true

      this._frame = 0
      this._lastTime = 0
      this._deltaTime = 0
    }
  }

  public setDelayFrames(value: number) {
    this._framesPerSeconds.delay = value
    this._frame = 0
    this._lastTime = 0
    this._deltaTime = 0
  }

  public setVelocityFrames(value: number) {
    this._framesPerSeconds.velocity = value
    this._frame = 0
    this._lastTime = 0
    this._deltaTime = 0
  }

  public on(name: TEventAnimation, callback: TFunction) {
    this._eventObserver.addEventListener(name, callback)
  }

  static [SetCore](core: AtomicEditor) {
    ControllerAnimation.$core = core
  }

  [DispatchEventObserver](name: TEventAnimation, ...args: any[]) {
    this._eventObserver.emitEvent(name, args)
  }
}
