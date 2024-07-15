import { ICalculate } from "../../../class/nodes-2D.types"
import { TCanvasNodeOptions } from "@/nodes/types"

export const rectangle_2D = (
  context: CanvasRenderingContext2D,
  options: TCanvasNodeOptions["2D/rectangle"] & ICalculate
) => {
  const { calculate } = options

  context.globalAlpha = options.opacity

  context.fillStyle = options.background

  options.border ? (context.strokeStyle = options.borderColor) : 0
  options.border ? (context.lineWidth = options.borderWidth) : 0

  context.beginPath()

  if (options.radius) {
    if (typeof options.radius === "number")
      context.roundRect(
        -calculate.middleScaleFactor.width,
        -calculate.middleScaleFactor.height,
        calculate.scaleFactor.width,
        calculate.scaleFactor.height,
        options.radius
      )
    else if (Array.isArray(options.radius))
      context.roundRect(
        -calculate.middleScaleFactor.width,
        -calculate.middleScaleFactor.height,
        calculate.scaleFactor.width,
        calculate.scaleFactor.height,
        options.radius
      )
    else
      context.roundRect(
        -calculate.middleScaleFactor.width,
        -calculate.middleScaleFactor.height,
        calculate.scaleFactor.width,
        calculate.scaleFactor.height,
        [
          options.radius.topLeft,
          options.radius.topRight,
          options.radius.bottomLeft,
          options.radius.topRight
        ]
      )
  } else {
    context.rect(
      -calculate.middleScaleFactor.width,
      -calculate.middleScaleFactor.height,
      calculate.scaleFactor.width,
      calculate.scaleFactor.height
    )
  }

  context.fill()
  options.border ? context.stroke() : 0

  context.closePath()
}
