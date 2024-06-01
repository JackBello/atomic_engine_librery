import { AtomicEngine } from "../atomic-engine"
import { AbstractCanvas } from "../canvas/abstract/canvas.abstract"
import { CanvasEditor } from "../canvas/canvas-editor"
import { CanvasEvent } from "../canvas/canvas-event"
import { CanvasGame } from "../canvas/canvas-game"
import { TCanvasType } from "../canvas/canvas.types"
import RenderCanvasWorker from "@/workers/render-canvas.worker?worker&inline"
import { TOptionsRenderCanvasWorker } from "../workers/types"
import { AtomicGame } from "@/atomic-game"

export class CanvasService {
  private $app: AtomicEngine | AtomicGame

  protected _worker: Worker
  protected _canvas: Map<TCanvasType, AbstractCanvas> = new Map()
  protected _main?: HTMLElement

  get instance(): HTMLCanvasElement {
    return (this._canvas.get(this.$app.mode) as AbstractCanvas).canvas
  }

  constructor(app: AtomicEngine | AtomicGame) {
    this.$app = app

    this._worker = new RenderCanvasWorker()

    this._worker.postMessage({
      context: this.$app.options.context
    })

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
    this._main.setAttribute("data-canvas-container", this.$app.mode)
    this._main.style.width = width + "px"
    this._main.style.height = height + "px"

    if (this.$app.mode === "editor") {
      const editor = this._canvas.get("editor") as AbstractCanvas
      this._main.appendChild(editor.canvas)
    }
    if (this.$app.mode === "game") {
      const editor = this._canvas.get("game") as AbstractCanvas
      this._main.appendChild(editor.canvas)
    }

    const event = this._canvas.get("event") as AbstractCanvas
    this._main.appendChild(event.canvas)

    document.querySelector(selector)?.appendChild(this._main)
  }

  protected loadContext(width: number, height: number) {
    let canvas: OffscreenCanvas = new OffscreenCanvas(width, height)

    if (this.$app.mode === "game")
      canvas = (this._canvas.get("game") as AbstractCanvas).load()
    if (this.$app.mode === "editor")
      canvas = (this._canvas.get("editor") as AbstractCanvas).load()

    this._worker.postMessage(
      {
        canvas,
        width,
        height
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

  // fps(object: { velocity: number; delay: number }) {
  //   this._worker.postMessage({
  //     fps: object
  //   })
  // }

  // animation(object?: { timestamp: number; deltaTime: number }) {
  //   this._worker.postMessage({
  //     animation: object
  //   })
  // }

  execute(setting: TOptionsRenderCanvasWorker) {
    this._worker.postMessage({
      setting
    })
  }
}
