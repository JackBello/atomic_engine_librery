import { AtomicEngine } from "../atomic"
import { MethodDispatchEvent, MethodReloadEvents } from "../symbols"

export class EventController {
  private $app: AtomicEngine

  constructor(app: AtomicEngine) {
    this.$app = app

    this.init()
  }

  protected init() {
    if (this.$app.canvas && this.$app.canvas.instance !== undefined) {
      this.$app.canvas.instance.addEventListener("mousedown", (event) => {
        event.preventDefault()
        this.$app[MethodDispatchEvent]("canvas/mouse:down", this, event)
      })

      this.$app.canvas.instance.addEventListener("mouseup", (event) => {
        event.preventDefault()
        this.$app[MethodDispatchEvent]("canvas/mouse:up", this, event)
      })

      window.addEventListener("mousemove", (event) => {
        event.preventDefault()
        this.$app[MethodDispatchEvent]("canvas/mouse:move", this, event)
      })

      this.$app.canvas.instance.addEventListener("wheel", (event) => {
        event.preventDefault()
        this.$app[MethodDispatchEvent]("canvas/mouse:wheel", this, event)
      })

      window.addEventListener("keydown", (event) => {
        this.$app[MethodDispatchEvent]("canvas/key:down", this, event)
      })

      window.addEventListener("keyup", (event) => {
        this.$app[MethodDispatchEvent]("canvas/key:up", this, event)
      })

      window.addEventListener("keypress", (event) => {
        this.$app[MethodDispatchEvent]("canvas/key:press", this, event)
      })
    }
  }

  [MethodReloadEvents]() {
    this.init()
  }
}
