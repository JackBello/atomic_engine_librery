import {
  IOptionsNodeControlEdition,
  TOptionsBasic
} from "../../basic/nodes/types"

export const draw_control_edition_context_2D = (
  context: CanvasRenderingContext2D,
  options: IOptionsNodeControlEdition & TOptionsBasic
) => {
  context.translate(options.translateX, options.translateY)
  context.rotate((options.rotation * Math.PI) / 180)

  context.globalCompositeOperation = "destination-over"

  context.strokeStyle = options.borderColor
  context.lineWidth = options.borderWidth

  const scaleFactorWidth =
    (options.width + options.padding * 2) * options.scaleX
  const scaleFactorHeight =
    (options.height + options.padding * 2) * options.scaleY

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
  } else {
  }

  context.closePath()
}
