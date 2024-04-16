import { AtomicEditor } from "../basic/atomic-editor"
import { AtomicGame } from "../basic/atomic-game"
import { InternalSettings, SetCore } from "../const"

export class ControllerGlobal {
  protected static $core: AtomicEditor | AtomicGame

  protected static _options: Record<string, any> = {}

  static [InternalSettings] = {
    modeEdition: "edition-element-canvas" // or "pan-and-zoom-element-canvas"
  }

  static get MODE(): "edition" | "game" | "preview" {
    return this._options.MODE
  }

  static set MODE(value: "edition" | "game" | "preview") {
    this._options.MODE = value
  }

  static get STATUS_GAME() {
    return this._options.STATUS_GAME
  }

  static set STATUS_GAME(value: string) {
    this._options.STATUS_GAME = value
  }

  static get PAN() {
    return this._options.PAN
  }

  static set PAN(value: any) {
    this._options.PAN = value
  }

  static get ZOOM() {
    return this._options.ZOOM
  }

  static set ZOOM(value: any) {
    this._options.ZOOM = value
  }

  static get SELECTION() {
    return this._options.SELECTION
  }

  static set SELECTION(value: any) {
    this._options.SELECTION = value
  }

  static get CONTROL() {
    return this._options.CONTROL
  }

  static set CONTROL(value: any) {
    this._options.CONTROL = value
  }

  static get GRID() {
    return this._options.GRID
  }

  static set GRID(value: any) {
    this._options.GRID = value
  }

  static get AXIS() {
    return this._options.AXIS
  }

  static set AXIS(value: any) {
    this._options.AXIS = value
  }

  static get NODES() {
    return this._options.NODES
  }

  static get FPS() {
    return this._options.FPS
  }

  public static setOptions(options: any) {
    this._options = {
      ...this._options,
      ...options
    }
  }

  static [SetCore](core: AtomicEditor) {
    this.$core = core
  }
}
