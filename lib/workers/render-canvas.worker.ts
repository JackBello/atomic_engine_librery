import { handleContext2D } from "../contexts/2d/handle"
import { TContextName, TContextObject } from "../types"

let globalContext: TContextName

let bufferCanvas: OffscreenCanvas
let bufferDrawer: TContextObject[TContextName]

let workerCanvas: OffscreenCanvas
let workerDrawer: TContextObject[TContextName]

const loadCanvas = ({
  canvas,
  width,
  height
}: {
  canvas: OffscreenCanvas
  width: number
  height: number
}) => {
  if (!workerCanvas) return

  workerCanvas = canvas
  bufferCanvas = new OffscreenCanvas(width, height)
}

const loadContext = ({ context }: { context: TContextName }) => {
  if (context) globalContext = context
}

const loadDrawers = () => {
  if (!workerCanvas) return

  const context = globalContext.replace("-", "") as
    | "2d"
    | "webgl"
    | "webgl2"
    | "webgpu"

  workerDrawer = workerCanvas.getContext(
    context
  ) as TContextObject[TContextName]

  bufferDrawer = bufferCanvas.getContext(
    context
  ) as TContextObject[TContextName]
}

const resizeCanvas = ({
  size
}: {
  size: { width: number; height: number }
}) => {
  if (!size) return

  if (workerCanvas) {
    workerCanvas.width = size.width
    workerCanvas.height = size.height

    bufferCanvas.width = size.width
    bufferCanvas.height = size.height
  }
}

const handleActions = (action: any, options: any) => {
  if (!workerCanvas) return

  if (globalContext === "2d") {
    handleContext2D(action, options, workerDrawer as CanvasRenderingContext2D, {
      context: bufferDrawer as CanvasRenderingContext2D,
      canvas: bufferCanvas
    })
  }
}

self.onmessage = function (event) {
  loadContext(event.data)
  loadCanvas(event.data)
  loadDrawers()
  resizeCanvas(event.data)

  if (event.data.settings)
    handleActions(event.data.settings.action, event.data.settings.options)
}
