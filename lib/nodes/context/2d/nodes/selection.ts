import { TCanvasNodeOptions } from "@/nodes/types"
import { ICalculate } from "../../../class/nodes-2D.types"

export const selection_2D = (
  context: CanvasRenderingContext2D,
  options: TCanvasNodeOptions["2D/selection"] & ICalculate
) => {
  context.globalAlpha = options.opacity

  context.fillStyle = options.background

  options.border ? (context.strokeStyle = options.borderColor) : 0
  options.border ? (context.lineWidth = options.borderWidth) : 0

  context.beginPath()

  if (options.radius) {
    if (typeof options.radius === "number")
      context.roundRect(
        options.x,
        options.y,
        options.width,
        options.height,
        options.radius
      )
    else if (Array.isArray(options.radius))
      context.roundRect(
        options.x,
        options.y,
        options.width,
        options.height,
        options.radius
      )
    else
      context.roundRect(options.x, options.y, options.width, options.height, [
        options.radius.topLeft,
        options.radius.topRight,
        options.radius.bottomLeft,
        options.radius.topRight
      ])
  } else {
    context.rect(options.x, options.y, options.width, options.height)
  }
  context.fill()

  options.border ? context.stroke() : 0

  context.closePath()
}
