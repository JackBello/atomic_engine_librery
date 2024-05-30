import {
  IBorder2D,
  ICalculate,
  ICoords2D,
  INode2D,
  ISize2D,
  IText2D
} from "../../../nodes/nodes-2d.types"
import { IControlEdition, IControlEditor } from "../../../nodes/nodes.types"

export const text_2D = (
  context: CanvasRenderingContext2D,
  options: IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    IBorder2D &
    IText2D &
    ICalculate
) => {
  const { calculate } = options

  context.translate(calculate.translate.x, calculate.translate.y)
  context.rotate(calculate.rotation)

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

  if (options.border) {
    context.strokeText(options.text, options.x, options.y)
  } else {
    context.fillText(options.text, options.x, options.y)
  }
}
