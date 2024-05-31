import { AtomicEngine } from "../atomic"
import { AbstractCanvas } from "../canvas/abstract/canvas.abstract"
import { CanvasEditor } from "../canvas/canvas-editor"
import { CanvasEvent } from "../canvas/canvas-event"
import { CanvasGame } from "../canvas/canvas-game"
import { TCanvasType } from "../canvas/canvas.types"
import RenderCanvasWorker from "@/workers/render-canvas.worker?worker&inline"
import { TOptionsRenderCanvasWorker } from "../workers/types"

export class CanvasService {
  private $app: AtomicEngine

  protected _worker: Worker
  protected _canvas: Map<TCanvasType, AbstractCanvas> = new Map()
  protected _main?: HTMLElement

  get instance(): HTMLCanvasElement {
    return (this._canvas.get(this.$app.options.mode) as AbstractCanvas).canvas
  }

  constructor(app: AtomicEngine) {
    this.$app = app

    this._worker = new RenderCanvasWorker()

    this._worker.postMessage({
      context: this.$app.options.context
    })

    const { width, height } = this.processSize()

    if (this.$app.options.mode === "editor") {
      this._canvas.set(
        "editor",
        new CanvasEditor({
          width,
          height
        })
      )
    }

    if (this.$app.options.mode === "game") {
      this._canvas.set(
        "game",
        new CanvasGame({
          width,
          height
        })
      )
    }

    this._canvas.set(
      "event",
      new CanvasEvent({
        width,
        height
      })
    )

    this.init(this.$app.options.selector, width, height)
    this.loadContext(width, height)
  }

  protected processSize() {
    if (this.$app.options.mode === "game") {
      return {
        width: this.$app.options.game.width,
        height: this.$app.options.game.height
      }
    }
    return {
      width: this.$app.options.width,
      height: this.$app.options.height
    }
  }

  protected init(selector: string, width: number, height: number) {
    if (this._main) return

    this._main = document.createElement("section")
    this._main.style.userSelect = "none"
    this._main.style.position = "relative"
    this._main.setAttribute("data-canvas-container", this.$app.options.mode)
    this._main.style.width = width + "px"
    this._main.style.height = height + "px"

    if (this.$app.options.mode === "editor") {
      const editor = this._canvas.get("editor") as AbstractCanvas
      this._main.appendChild(editor.canvas)
    }
    if (this.$app.options.mode === "game") {
      const editor = this._canvas.get("game") as AbstractCanvas
      this._main.appendChild(editor.canvas)
    }

    const event = this._canvas.get("event") as AbstractCanvas
    this._main.appendChild(event.canvas)

    document.querySelector(selector)?.appendChild(this._main)
  }

  protected loadContext(width: number, height: number) {
    let canvas: OffscreenCanvas = new OffscreenCanvas(width, height)

    if (this.$app.options.mode === "game")
      canvas = (this._canvas.get("game") as AbstractCanvas).load()
    if (this.$app.options.mode === "editor")
      canvas = (this._canvas.get("editor") as AbstractCanvas).load()

    this._worker.postMessage(
      {
        canvas
      },
      [canvas]
    )
  }

  setSize(width: number, height: number) {
    if (!this._main) return

    this._main.style.width = width + "px"
    this._main.style.height = height + "px"

    this._worker.postMessage({
      size: {
        width,
        height
      }
    })
  }

  execute(setting: TOptionsRenderCanvasWorker) {
    this._worker.postMessage({
      setting
    })
  }
}
