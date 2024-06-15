import { AtomicEngine } from ".."
import { TPlugin } from "./types"

const pluginPanAndZoom: TPlugin = {
  name: "pan-and-zoom",
  events: {
    "canvas/mouse:down": (app, event: MouseEvent) => {
      const config = app.use("@config/pan-and-zoom")

      if (config.mode === "node") return

      if (event.button !== 0) return

      app.canvas.event.style.cursor = "grabbing"

      config._.isPanning = true

      config._.startCoords.x = event.clientX
      config._.startCoords.y = event.clientY
    },
    "canvas/mouse:up": (app, event: MouseEvent) => {
      const config = app.use("@config/pan-and-zoom")

      if (config.mode === "node") return

      if (event.button !== 0) return

      app.canvas.event.style.cursor = "grab"

      config._.isPanning = false
    },
    "canvas/mouse:move": (app, event: MouseEvent) => {
      const config = app.use("@config/pan-and-zoom")

      if (config.mode === "node") return

      if (!config._.isPanning) return

      app.changeGlobal("re-draw", true)

      app.canvas.event.style.cursor = "grabbing"

      const dx = event.clientX - config._.startCoords.x
      const dy = event.clientY - config._.startCoords.y

      config._.pan.x += dx
      config._.pan.y += dy

      config.pan.x = config._.pan.x
      config.pan.y = config._.pan.y

      config._.startCoords.x = event.clientX
      config._.startCoords.y = event.clientY
    },
    "canvas/mouse:wheel": (app, event: WheelEvent) => {
      const config = app.use("@config/pan-and-zoom")

      if (config.mode === "node") return

      app.changeGlobal("re-draw", true)

      const delta = event.deltaY > 0 ? -1 : 1

      config._.zoom.scale += delta * config._.zoom.speed
      config._.zoom.scale = Math.max(
        config._.zoom.min,
        Math.min(config._.zoom.max, config._.zoom.scale)
      )

      config.zoom = config._.zoom.scale
    }
  },
  config: {
    mode: "node", // node | pan-and-zoom
    pan: {
      x: 0,
      y: 0
    },
    zoom: 1,
    _: {
      isPanning: false,
      startCoords: {
        x: 0,
        y: 0
      },
      pan: {
        x: 0,
        y: 0
      },
      zoom: {
        scale: 1.0,
        speed: 0.01,
        min: 0.009,
        max: 15.0,
        scaleFactor: 1.1
      }
    }
  },
  inject: {
    zoom(this: AtomicEngine, scale: number) {
      const config = this.use("@config/pan-and-zoom")

      config.zoom = scale

      config._.zoom.scale = scale
    },
    pan(this: AtomicEngine, x: number, y: number) {
      const config = this.use("@config/pan-and-zoom")

      config.pan = {
        x,
        y
      }

      config._.pan = {
        x,
        y
      }
    },
    toggleMode(this: AtomicEngine) {
      const config = this.use("@config/pan-and-zoom")

      if (config.mode === "node") {
        config.mode = "pan-and-zoom"
        this.canvas.event.style.cursor = "grab"
      } else if (config.mode === "pan-and-zoom") {
        config.mode = "node"
        this.canvas.event.style.cursor = "default"
      }
    }
  },
  process: {
    after: (app) => {
      const config = app.use("@config/pan-and-zoom")

      return [
        {
          __type__: "canvas:translate",
          options: {
            x: config.pan.x,
            y: config.pan.y
          }
        },
        {
          __type__: "canvas:scale",
          options: {
            scaleX: config.zoom,
            scaleY: config.zoom
          }
        }
      ]
    }
  }
}

export default pluginPanAndZoom
