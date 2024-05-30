import {
  ICalculate,
  ICoords2D,
  ILineFlowEffect2D,
  INode2D,
  ISize2D
} from "../../../nodes/nodes-2d.types"
import { IControlEdition, IControlEditor } from "../../../nodes/nodes.types"
import { validColor } from "../functions"

export const effect_line_flow_2D = (
  context: CanvasRenderingContext2D,
  options: IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    ILineFlowEffect2D &
    ICalculate
) => {
  const { calculate } = options

  context.translate(calculate.translate.x, calculate.translate.y)
  context.rotate(calculate.rotation)

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
