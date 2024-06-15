import { AtomicEngine } from "../atomic-engine"
import { AbstractCanvas } from "../canvas/abstract/canvas.abstract"
import { CanvasEditor } from "../canvas/canvas-editor"
import { CanvasGame } from "../canvas/canvas-game"
import { TCanvasType } from "../canvas/canvas.types"
import { AtomicGame } from "@/atomic-game"

export class CanvasService {
  private $app: AtomicEngine | AtomicGame

  protected _canvas: Map<TCanvasType, AbstractCanvas> = new Map()
  protected _main?: HTMLElement
  protected _event?: HTMLDivElement

  get event(): HTMLDivElement {
    return this._event as HTMLDivElement
  }

  get main(): HTMLElement {
    return this._main as HTMLElement
  }

  get instance(): HTMLCanvasElement {
    let canvas: HTMLCanvasElement = document.createElement("canvas")

    if (this.$app.mode === "game")
      canvas = (this._canvas.get("game") as AbstractCanvas).canvas
    if (this.$app.mode === "editor")
      canvas = (this._canvas.get("editor") as AbstractCanvas).canvas

    return canvas
  }

  constructor(app: AtomicEngine | AtomicGame) {
    this.$app = app

    const { width, height } = this.processSize()

    if (this.$app.mode === "editor") {
      this._canvas.set(
        "editor",
        new CanvasEditor({
          width,
          height
        })
      )
    }

    if (this.$app.mode === "game") {
      this._canvas.set(
        "game",
        new CanvasGame({
          width,
          height
        })
      )
    }

    this.initLayerEvent(width, height)
    this.initLayerCanvas(this.$app.options.selector, width, height)
  }

  protected processSize() {
    if (this.$app.mode === "editor")
      return {
        width: (this.$app as AtomicEngine).options.width,
        height: (this.$app as AtomicEngine).options.height
      }

    return {
      width: (this.$app as AtomicGame).options.viewport.width,
      height: (this.$app as AtomicGame).options.viewport.height
    }
  }

  protected initLayerCanvas(selector: string, width: number, height: number) {
    if (this._main) return

    this._main = document.createElement("section")
    this._main.style.userSelect = "none"
    this._main.style.position = "relative"
    this._main.setAttribute("data-canvas-container", this.$app.mode)
    this._main.style.width = width + "px"
    this._main.style.height = height + "px"
    this._main.style.background = this.$app.options.background

    if (this.$app.mode === "editor") {
      const editor = this._canvas.get("editor") as AbstractCanvas
      this._main.appendChild(editor.canvas)
    }
    if (this.$app.mode === "game") {
      const game = this._canvas.get("game") as AbstractCanvas
      this._main.appendChild(game.canvas)
    }

    this._main.appendChild(this.event)

    document.querySelector(selector)?.appendChild(this._main)
  }

  protected initLayerEvent(width: number, height: number) {
    if (this._event) return

    this._event = document.createElement("div")
    this._event.style.width = width + "px"
    this._event.style.height = height + "px"
    this._event.style.position = "absolute"
    this._event.style.left = "0px"
    this._event.style.top = "0px"
    this._event.style.cursor = "default"
    this._event.style.userSelect = "none"
    this._event.style.touchAction = "none"
    this._event.setAttribute("data-type-canvas", "events")
  }

  setSize(width: number, height: number, ignoreInstance: boolean = false) {
    if (!this._main) return
    if (!this._event) return

    if (!ignoreInstance) {
      this.instance.width = width
      this.instance.height = height
    }

    this._event.style.width = width + "px"
    this._event.style.height = height + "px"

    this._main.style.width = width + "px"
    this._main.style.height = height + "px"
  }
}
