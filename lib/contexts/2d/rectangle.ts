import { IOptionsNodeRectangle, TOptionsBasic } from "../../basic/nodes/types"

export const draw_rectangle_context_2D = (
  context: CanvasRenderingContext2D,
  options: IOptionsNodeRectangle & TOptionsBasic
) => {
  context.translate(options.translateX, options.translateY)
  context.rotate((options.rotation * Math.PI) / 180)

  context.fillStyle = options.background

  options.border ? (context.strokeStyle = options.borderColor) : 0
  options.border ? (context.lineWidth = options.borderWidth) : 0

  const scaleFactorWidth = options.width * options.scaleX
  const scaleFactorHeight = options.height * options.scaleY

  context.beginPath()

  if (options.radius) {
    if (typeof options.radius === "number")
      context.roundRect(
        -scaleFactorWidth / 2,
        -scaleFactorHeight / 2,
        scaleFactorWidth,
        scaleFactorHeight,
        options.radius
      )
    else if (Array.isArray(options.radius))
      context.roundRect(
        -scaleFactorWidth / 2,
        -scaleFactorHeight / 2,
        scaleFactorWidth,
        scaleFactorHeight,
        options.radius
      )
    else
      context.roundRect(
        -scaleFactorWidth / 2,
        -scaleFactorHeight / 2,
        scaleFactorWidth,
        scaleFactorHeight,
        [
          options.radius.topLeft,
          options.radius.topRight,
          options.radius.bottomLeft,
          options.radius.topRight
        ]
      )
  } else {
    context.rect(
      -scaleFactorWidth / 2,
      -scaleFactorHeight / 2,
      scaleFactorWidth,
      scaleFactorHeight
    )
  }
  context.fill()

  options.border ? context.stroke() : 0

  context.closePath()
}
