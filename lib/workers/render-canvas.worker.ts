import { handleContext2D } from "../contexts/2d/handle"
import { TContextName, TContextObject } from "../types"

let frame = 0

let frameConfig = {
  velocity: 0,
  delay: 0
}

let animation: {
  timestamp: number
  deltaTime: number
} = {
  deltaTime: 0,
  timestamp: 0
}

let globalContext: TContextName

let bufferCanvas: OffscreenCanvas
let bufferDrawer: TContextObject[TContextName]

let workerCanvas: OffscreenCanvas
let workerDrawer: TContextObject[TContextName]

const loadAnimation = ({
  deltaTime,
  timestamp
}: {
  timestamp: number
  deltaTime: number
}) => {
  if (deltaTime === undefined && timestamp === undefined) return

  animation = {
    timestamp,
    deltaTime
  }
}

const loadFrameConfig = ({
  velocity,
  delay
}: {
  velocity: number
  delay: number
}) => {
  if (frameConfig.delay !== 0 && frameConfig.velocity !== 0) return

  if (velocity === undefined && delay === undefined) return

  frameConfig = {
    velocity,
    delay
  }
}

const loadContext = ({ context }: { context: TContextName }) => {
  if (globalContext !== undefined) return

  globalContext = context
}

const loadCanvas = ({
  canvas,
  width,
  height
}: {
  canvas: OffscreenCanvas
  width: number
  height: number
}) => {
  if (canvas === undefined) return

  if (!width && !height) return

  if (workerCanvas) return

  workerCanvas = canvas
  bufferCanvas = new OffscreenCanvas(width, height)
}

const loadDrawers = () => {
  if (workerCanvas === undefined) return

  if (workerDrawer !== undefined) return

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

const handleFramePerSecond = (setting: any) => {
  if (setting === undefined) return

  if (frameConfig.delay === 0 || frameConfig.velocity === 0) return
  if (animation.timestamp === 0 || animation.deltaTime === 0) return
  let framePerSecond = Math.floor(
    animation.deltaTime / (frameConfig.delay / frameConfig.velocity)
  )
  if (framePerSecond > frame) {
    frame = framePerSecond
    handleActions(setting.action, setting.options)
  }
}

self.onmessage = function (event) {
  // loadFrameConfig(event.data.fps ?? {})
  loadContext(event.data)
  loadCanvas(event.data)
  loadDrawers()
  resizeCanvas(event.data)
  // loadAnimation(event.data.animation ?? {})
  // handleFramePerSecond(event.data.setting)

  const setting = event.data.setting
  if (setting) handleActions(setting.action, setting.options)
}
