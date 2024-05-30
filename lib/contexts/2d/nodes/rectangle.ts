import {
  ICalculate,
  IBorder2D,
  ICoords2D,
  INode2D,
  IRectangle2D,
  ISize2D
} from "../../../nodes/nodes-2d.types"
import { IControlEdition, IControlEditor } from "../../../nodes/nodes.types"

export const rectangle_2D = (
  context: CanvasRenderingContext2D,
  options: IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    IRectangle2D &
    IBorder2D &
    ICalculate
) => {
  const { calculate } = options

  context.translate(calculate.translate.x, calculate.translate.y)
  if (calculate.rotation === 0) context.rotate(calculate.rotation)

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
