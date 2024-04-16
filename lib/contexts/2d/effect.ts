import {
  IOptionsNodeLineFlowEffect,
  TOptionsBasic
} from "../../basic/nodes/types"
import { validColor } from "./functions"

export const draw_effect_context_2D = (
  context: CanvasRenderingContext2D,
  options: IOptionsNodeLineFlowEffect & TOptionsBasic
) => {
  context.translate(options.translateX, options.translateY)
  context.rotate((options.rotation * Math.PI) / 180)

  if (options.effect === "line-flow") effectLineFlow(context, options)
}

const effectLineFlow = (
  context: CanvasRenderingContext2D,
  options: IOptionsNodeLineFlowEffect & TOptionsBasic
) => {
  context.lineWidth = options.lineWidth
  context.strokeStyle = validColor(options.color, context, {
    width: options.x,
    height: options.y
  })

  for (let y = 0; y < options.y; y += options.cellSize) {
    for (let x = 0; x < options.x; x += options.cellSize) {
      const angle = (Math.cos(x * 0.01) + Math.sin(y * 0.01)) * options.radius
      context.beginPath()
      context.moveTo(x, y)
      context.lineTo(
        x + Math.cos(angle) * options.spacing,
        y + Math.sin(angle) * options.spacing
      )
      context.stroke()
    }
  }
}
