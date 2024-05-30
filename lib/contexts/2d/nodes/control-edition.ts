import {
  IBorder2D,
  ICalculate,
  IControlEdition2D,
  ICoords2D,
  INode2D,
  IRectangle2D,
  ISize2D
} from "../../../nodes/nodes-2d.types"
import { IControlEdition, IControlEditor } from "../../../nodes/nodes.types"

export const control_edition_2D = (
  context: CanvasRenderingContext2D,
  options: IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    IRectangle2D &
    IBorder2D &
    IControlEdition2D &
    ICalculate
) => {
  const { calculate } = options

  context.translate(calculate.translate.x, calculate.translate.y)
  context.rotate(calculate.rotation)

  context.globalCompositeOperation = "destination-over"

  context.strokeStyle = options.borderColor
  context.lineWidth = options.borderWidth

  const scaleFactorWidth =
    calculate.scaleFactor.width + (options.padding as number) * 2
  const scaleFactorHeight =
    calculate.scaleFactor.height + (options.padding as number) * 2

  context.beginPath()

  context.strokeRect(
    -scaleFactorWidth / 2,
    -scaleFactorHeight / 2,
    scaleFactorWidth,
    scaleFactorHeight
  )

  if (options.showCorner) {
    context.fillStyle = options.cornerColor

    // top-left
    context.beginPath()
    context.arc(
      -scaleFactorWidth / 2,
      -scaleFactorHeight / 2,
      options.cornerSize,
      0,
      2 * Math.PI
    )
    context.fill()

    // top-center
    context.beginPath()
    context.arc(0, -scaleFactorHeight / 2, options.cornerSize, 0, 2 * Math.PI)
    context.fill()

    // top-right
    context.beginPath()
    context.arc(
      scaleFactorWidth / 2,
      -scaleFactorHeight / 2,
      options.cornerSize,
      0,
      2 * Math.PI
    )
    context.fill()

    // middle-left
    context.beginPath()
    context.arc(-scaleFactorWidth / 2, 0, options.cornerSize, 0, 2 * Math.PI)
    context.fill()

    // middle-center
    context.beginPath()
    context.arc(scaleFactorWidth / 2, 0, options.cornerSize, 0, 2 * Math.PI)
    context.fill()

    // bottom-left
    context.beginPath()
    context.arc(
      -scaleFactorWidth / 2,
      scaleFactorHeight / 2,
      options.cornerSize,
      0,
      2 * Math.PI
    )
    context.fill()

    // bottom-center
    context.beginPath()
    context.arc(0, scaleFactorHeight / 2, options.cornerSize, 0, 2 * Math.PI)
    context.fill()

    // bottom-right
    context.beginPath()
    context.arc(
      scaleFactorWidth / 2,
      scaleFactorHeight / 2,
      options.cornerSize,
      0,
      2 * Math.PI
    )
    context.fill()
  }

  context.closePath()
}
