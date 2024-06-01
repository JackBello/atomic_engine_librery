import { AtomicGame } from "@/atomic-game"
import { AtomicEngine } from "../atomic-engine"
import { MethodDispatchEvent, MethodReloadEvents } from "../symbols"

export class EventController {
  private $app: AtomicEngine | AtomicGame

  constructor(app: AtomicEngine | AtomicGame) {
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

      if (this.$app.mode === "editor")
        window.addEventListener("mousemove", (event) => {
          event.preventDefault()
          this.$app[MethodDispatchEvent]("canvas/mouse:move", this, event)
        })
      if (this.$app.mode === "game")
        this.$app.canvas.instance.addEventListener("mousemove", (event) => {
          event.preventDefault()
          this.$app[MethodDispatchEvent]("canvas/mouse:move", this, event)
        })

      this.$app.canvas.instance.addEventListener("wheel", (event) => {
        event.preventDefault()
        this.$app[MethodDispatchEvent]("canvas/mouse:wheel", this, event)
      })

      window.addEventListener("keydown", (event) => {
        if (this.$app.mode === "game") event.preventDefault()
        this.$app[MethodDispatchEvent]("canvas/key:down", this, event)
      })

      window.addEventListener("keyup", (event) => {
        if (this.$app.mode === "game") event.preventDefault()
        this.$app[MethodDispatchEvent]("canvas/key:up", this, event)
      })

      window.addEventListener("keypress", (event) => {
        if (this.$app.mode === "game") event.preventDefault()
        this.$app[MethodDispatchEvent]("canvas/key:press", this, event)
      })
    }
  }

  [MethodReloadEvents]() {
    this.init()
  }
}
