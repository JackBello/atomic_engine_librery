import { TFunction } from "../../types"
import { TDrawsContext2D } from "../../workers/types"
import { control_edition_2D } from "./nodes/control-edition"
import { effect_line_flow_2D } from "./nodes/effect-line-flow"
import { rectangle_2D } from "./nodes/rectangle"
import { selection_2D } from "./nodes/selection"
import { text_2D } from "./nodes/text"

export const handleContext2D = (
  action: TDrawsContext2D,
  options: any,
  context: CanvasRenderingContext2D,
  buffer: { context: CanvasRenderingContext2D; canvas: OffscreenCanvas }
) => {
  const actions: Record<TDrawsContext2D, TFunction> = {
    "draw:2D/rectangle": rectangle_2D,
    "draw:2D/text": text_2D,
    "draw:2D/selection": selection_2D,
    "draw:2D/line-flow-effect": effect_line_flow_2D,
    "draw:2D/control-edition": control_edition_2D
  }

  const exec = actions[action]

  if (exec) exec(buffer.context, options)

  context.clearRect(0, 0, buffer.canvas.width, buffer.canvas.height)
  context.drawImage(buffer.canvas, 0, 0)
}
