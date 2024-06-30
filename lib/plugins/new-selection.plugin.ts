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
      // continuar con esto
      // const parentWidth = node.parentNode.width || 0
      // const parentHeight = node.parentNode.height || 0
      // const parentScaleX = node.parentNode.scaleX || 1
      // const parentScaleY = node.parentNode.scaleY || 1
      // const parentX = node.parentNode.x || 0
      // const parentY = node.parentNode.y || 0

      // const mouseCoordsAdjust = {
      //   x: mouseCoords.x / parentScaleX,
      //   y: mouseCoords.y / parentScaleY
      // }

      node.x = mouseCoords.x - pan.x / zoom - startCoords.x
      node.y = mouseCoords.y - pan.y / zoom - startCoords.y
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
      const node = await app.drawer.editor().selectNode(mouseCoords)

      if (node && node.options) {
        config.isDragging = true

        config.startCoords.x =
          (mouseCoords.x - panAndZoomConfig.pan.x) / panAndZoomConfig.zoom -
          node.options.x
        config.startCoords.y =
          (mouseCoords.y - panAndZoomConfig.pan.y) / panAndZoomConfig.zoom -
          node.options.y

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
