import { Render2D } from "@/nodes/context/2d/render"
import { TContextName, TContextObject, TDimension, TMode } from "../types"
import { ISize2D } from "@/nodes/nodes-2d.types"
import { INodeWorker } from "@/nodes/nodes.types"
import { AbstractRender } from "@/contexts/render.abstract"

const rendered: {
  mode: TMode
  dimension: TDimension
  context: TContextName
  canvas: OffscreenCanvas
  drawer: TContextObject[TContextName]
} = {
  dimension: undefined,
  mode: undefined,
  context: undefined,
  canvas: undefined,
  drawer: undefined
} as any

let reDraw = true

let scaleViewport: number = 1

let viewportGame: ISize2D = {
  width: 0,
  height: 0
}

let sizeEditor: ISize2D = {
  width: 0,
  height: 0
}

let animationController: {
  timestamp: number
  deltaTime: number
} = {
  deltaTime: 0,
  timestamp: 0
}

let frameController: {
  control: {
    delay: number
    velocity: number
  }
  frame: number
} = {
  control: {
    delay: 0,
    velocity: 0
  },
  frame: 0
}

let beforeDraw: any[] = []
let afterDraw: any[] = []
let configs: Record<string, any> = {}

const loadRendered = ({
  context,
  mode,
  dimension,
  width,
  height
}: {
  context: TContextName
  mode: TMode
  dimension: TDimension
  width: number
  height: number
}) => {
  rendered.mode = mode
  rendered.dimension = dimension
  rendered.context = context
  rendered.canvas = new OffscreenCanvas(width, height)
  rendered.drawer = rendered.canvas.getContext(
    rendered.context.replace("-", "") as "2d" | "webgl" | "webgl2" | "webgpu"
  ) as TContextObject[TContextName]
}
const resizeDrawer = ({ width, height }: { width: number; height: number }) => {
  rendered.canvas.width = width
  rendered.canvas.height = height
}

const handleRender = (root: INodeWorker[]) => {
  if (!root) return
  if (!rendered.context) return
  if (!rendered.canvas) return
  if (!rendered.drawer) return

  animationController
  frameController

  const _: Record<string, AbstractRender> = {
    "2d": new Render2D(
      rendered.drawer as CanvasRenderingContext2D,
      configs,
      rendered.mode
    )
  }

  const render = _[rendered.context as any]

  if (render) {
    if (rendered.mode === "editor") {
      render.setEditorSize(sizeEditor)
    }
    if (rendered.mode === "game") {
      render.setGameSize(viewportGame)
      render.setScaleViewport(scaleViewport)
    }

    render.setAfterDraw(afterDraw)
    render.setBeforeDraw(beforeDraw)

    render.loadNode(root[0])

    render.clear()

    render.draw()

    const imageBitMap = rendered.canvas.transferToImageBitmap()

    self.postMessage({ imageBitMap }, [imageBitMap] as any)
  }
}

self.onmessage = function (event) {
  if (event.data.action === "load:rendered") {
    loadRendered(event.data.options)
  } else if (event.data.action === "resize:drawer") {
    resizeDrawer(event.data.options)
  } else if (event.data.action === "set:after-draw") {
    afterDraw = event.data.list
  } else if (event.data.action === "set:before-draw") {
    beforeDraw = event.data.list
  } else if (event.data.action === "set:size-editor") {
    sizeEditor = event.data.size
  } else if (event.data.action === "set:viewport-game") {
    viewportGame = event.data.viewport
  } else if (event.data.action === "set:scale-viewport") {
    scaleViewport = event.data.scaleViewport
  } else if (event.data.action === "set:animation") {
    animationController = event.data.animation
  } else if (event.data.action === "set:frame") {
    frameController.control = event.data.control
  } else if (event.data.action === "set:configs") {
    configs = event.data.configs
  } else if (event.data.action === "re-draw") {
    reDraw = true
  } else if (event.data.action === "render") {
    if (reDraw) {
      handleRender(event.data.root)
      reDraw = false
    }
  }
}
