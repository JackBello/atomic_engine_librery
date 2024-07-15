import { getNodeByDeep } from "@/app/utils/nodes"
import { TPlugin } from "./types"

const pluginSelection: TPlugin = {
  name: "selection",
  install(app, options) {},
  providers: {
    moveNodeByMouse(
      node: any,
      mouseCoords: { x: number; y: number },
      startCoords: { x: number; y: number },
      pan: { x: number; y: number },
      zoom: number
    ) {
      const dx = mouseCoords.x - pan.x / zoom - startCoords.x
      const dy = mouseCoords.y - pan.y / zoom - startCoords.y

      node.x += dx
      node.y += dy
    },
    moveNodeByKeyboard(
      node: any,
      direction: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight",
      pan: { x: number; y: number },
      zoom: number
    ) {
      if (direction === "ArrowUp") node.y -= 2 + pan.y / zoom
      if (direction === "ArrowDown") node.y += 2 - pan.y / zoom
      if (direction === "ArrowLeft") node.x -= 2 + pan.x / zoom
      if (direction === "ArrowRight") node.x += 2 - pan.x / zoom
    }
  },
  events: {
    "canvas/mouse:down": async (app, event: MouseEvent) => {
      const panAndZoomConfig = app.use("@config/pan-and-zoom")

      if (panAndZoomConfig.mode === "pan-and-zoom") return

      if (event.button !== 0) return

      const { left, top } = app.canvas.event.getBoundingClientRect()

      const mouseCoords = {
        x: event.clientX - left,
        y: event.clientY - top
      }

      const config = app.use("@config/selection")
      const result = await app.drawer.editor().selectNode(mouseCoords)

      if (!result) return

      const { node } = result

      if (node && node.options) {
        config.isDragging = true

        config.startCoords.x =
          (mouseCoords.x - panAndZoomConfig.pan.x) / panAndZoomConfig.zoom
        config.startCoords.y =
          (mouseCoords.y - panAndZoomConfig.pan.y) / panAndZoomConfig.zoom

        config._.node = node
      }

      if (!node) {
        config.isDragging = false
      }
    },
    "canvas/mouse:up": (app, event: MouseEvent) => {
      const panAndZoomConfig = app.use("@config/pan-and-zoom")

      if (panAndZoomConfig.mode === "pan-and-zoom") return

      if (event.button !== 0) return

      const { left, top } = app.canvas.event.getBoundingClientRect()

      const mouseCoords = {
        x: event.clientX - left,
        y: event.clientY - top
      }

      const config = app.use("@config/selection")

      config.isDragging = false
    },
    "canvas/mouse:move": async (app, event: MouseEvent) => {
      const panAndZoomConfig = app.use("@config/pan-and-zoom")

      if (panAndZoomConfig.mode === "pan-and-zoom") return

      const { left, top } = app.canvas.event.getBoundingClientRect()

      const mouseCoords = {
        x: event.clientX - left,
        y: event.clientY - top
      }

      const config = app.use("@config/selection")
      const providers = app.use("@providers/selection")

      if (!config.isDragging) {
        app.canvas.event.style.cursor = await app.drawer
          .editor()
          .cursorNode(mouseCoords)
      }

      if (config.isDragging && config._.node) {
        const node = getNodeByDeep(
          [app.scenes.currentScene],
          config._.node.deep
        )

        providers.moveNodeByMouse(
          node,
          mouseCoords,
          config.startCoords,
          panAndZoomConfig.pan,
          panAndZoomConfig.zoom
        )
      }

      config.startCoords.x =
        (mouseCoords.x - panAndZoomConfig.pan.x) / panAndZoomConfig.zoom
      config.startCoords.y =
        (mouseCoords.y - panAndZoomConfig.pan.y) / panAndZoomConfig.zoom
    },
    "canvas/key:down": (app, event: KeyboardEvent) => {
      const panAndZoomConfig = app.use("@config/pan-and-zoom")

      if (panAndZoomConfig.mode === "pan-and-zoom") return

      const config = app.use("@config/selection")
      const providers = app.use("@providers/selection")

      if (!config._.node) return

      const node = getNodeByDeep([app.scenes.currentScene], config._.node.deep)

      providers.moveNodeByKeyboard(
        node,
        event.key,
        panAndZoomConfig.pan,
        panAndZoomConfig.zoom
      )
    }
  },
  config: {
    _: {
      node: undefined
    },
    startCoords: {
      x: 0,
      y: 0
    },
    isDragging: false
  }
}

export default pluginSelection
