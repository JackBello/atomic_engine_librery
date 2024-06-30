import { AtomicGame } from "@/atomic-game"
import { AtomicEngine } from "../../atomic-engine"
import { MethodDispatchEvent, MethodReloadEvents } from "../../symbols"

export class EventController {
  private $app: AtomicEngine | AtomicGame

  constructor(app: AtomicEngine | AtomicGame) {
    this.$app = app

    this.init()
  }

  protected init() {
    if (this.$app.canvas && this.$app.canvas.event !== undefined) {
      this.$app.canvas.event.addEventListener("mousedown", (event) => {
        event.preventDefault()
        this.$app[MethodDispatchEvent]("canvas/mouse:down", this.$app, event)
      })

      window.addEventListener("mouseup", (event) => {
        event.preventDefault()
        this.$app[MethodDispatchEvent]("canvas/mouse:up", this.$app, event)
      })

      window.addEventListener("mousemove", (event) => {
        event.preventDefault()
        this.$app[MethodDispatchEvent]("canvas/mouse:move", this.$app, event)
      })

      this.$app.canvas.event.addEventListener("wheel", (event) => {
        event.preventDefault()
        this.$app[MethodDispatchEvent]("canvas/mouse:wheel", this.$app, event)
      })

      window.addEventListener("keydown", (event) => {
        if (this.$app.mode === "game") {
          event.preventDefault()

          if (event.key === "F11") {
            this.$app.canvas.main.requestFullscreen()
            ;(this.$app as AtomicGame).resize()
          }
        }
        this.$app[MethodDispatchEvent]("canvas/key:down", this.$app, event)
      })

      window.addEventListener("keyup", (event) => {
        if (this.$app.mode === "game") event.preventDefault()
        this.$app[MethodDispatchEvent]("canvas/key:up", this.$app, event)
      })

      window.addEventListener("keypress", (event) => {
        if (this.$app.mode === "game") event.preventDefault()
        this.$app[MethodDispatchEvent]("canvas/key:press", this.$app, event)
      })

      if (this.$app.mode === "game" && this.$app instanceof AtomicGame) {
        window.addEventListener("resize", () => {
          ;(this.$app as AtomicGame).resize()
        })
      }
    }
  }

  [MethodReloadEvents]() {
    this.init()
  }
}
