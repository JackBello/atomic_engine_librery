import { IOptionsNodeText, TOptionsBasic } from "../../basic/nodes/types"

export const draw_text_context_2D = (
  context: CanvasRenderingContext2D,
  options: IOptionsNodeText & TOptionsBasic
) => {
  context.save()

  context.translate(options.translateX, options.translateY)
  context.rotate((options.rotation * Math.PI) / 180)

  context.fillStyle = options.color
  context.font = `${options.fontStretch ? options.fontStretch + " " : ""}${
    options.fontVariant ? options.fontVariant + " " : ""
  }${options.fontStyle ? options.fontStyle + " " : ""}${
    options.fontWeight ? options.fontWeight + " " : ""
  }${options.fontSize ? options.fontSize : ""}${
    options.lineHeight ? "/" + options.lineHeight + " " : ""
  }${options.fontFamily ? options.fontFamily : ""}`
  context.textAlign = options.textAlign
  context.textBaseline = options.textBaseline
  context.direction = options.textDirection
  context.wordSpacing = options.wordSpacing
  context.letterSpacing = options.letterSpacing

  options.border ? (context.strokeStyle = options.borderColor) : 0
  options.border ? (context.lineWidth = options.borderWidth) : 0

  // const scaleFactorWidth = options.width * options.scaleX
  // const scaleFactorHeight = options.height * options.scaleY

  if (options.border) {
    context.strokeText(options.text, options.x, options.y)
  } else {
    context.fillText(options.text, options.x, options.y)
  }

  context.restore()
}
