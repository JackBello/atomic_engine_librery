import { TTypeNodeOptionsContext2D } from "@/workers/types"
import { ICalculate } from "../../../nodes-2d.types"
import { validColor } from "../functions"

export const effect_line_flow_2D = (
  context: CanvasRenderingContext2D,
  options: TTypeNodeOptionsContext2D["draw:2D/line-flow-effect"] & ICalculate
) => {
  const { calculate } = options

  context.globalAlpha = options.opacity

  context.lineWidth = options.lineWidth
  context.strokeStyle = validColor(options.color, context, {
    width: options.width,
    height: options.height
  })

  for (
    let row = -calculate.middleScaleFactor.height;
    row < calculate.middleScaleFactor.height;
    row += options.cellSize
  ) {
    for (
      let column = -calculate.middleScaleFactor.width;
      column < calculate.middleScaleFactor.width;
      column += options.cellSize
    ) {
      context.beginPath()
      const angle =
        (Math.cos(column * 0.01) + Math.sin(row * 0.01)) * options.radius
      context.moveTo(column, row)
      context.lineTo(
        column + Math.cos(angle) * options.spacing,
        row + Math.sin(angle) * options.spacing
      )
      context.stroke()
    }
  }
}
