import { TFunction } from "../../types"
import {
  TCanvasActions,
  TCanvasActionsContext2D,
  TDrawsContext2D
} from "../../workers/types"
import {
  clear_canvas_2D,
  restore_canvas_2D,
  save_canvas_2D,
  scale_canvas_2D,
  translate_canvas_2D
} from "./functions"
import { control_edition_2D } from "./nodes/control-edition"
import { effect_line_flow_2D } from "./nodes/effect-line-flow"
import { rectangle_2D } from "./nodes/rectangle"
import { selection_2D } from "./nodes/selection"
import { text_2D } from "./nodes/text"

export const handleContext2D = (
  action: TDrawsContext2D | TCanvasActionsContext2D | TCanvasActions,
  options: any,
  context: CanvasRenderingContext2D
) => {
  const actions: Record<
    TDrawsContext2D | TCanvasActionsContext2D | TCanvasActions,
    TFunction
  > = {
    "draw:2D/rectangle": rectangle_2D,
    "draw:2D/text": text_2D,
    "draw:2D/selection": selection_2D,
    "draw:2D/line-flow-effect": effect_line_flow_2D,
    "draw:2D/control-edition": control_edition_2D,
    "canvas:clear": clear_canvas_2D,
    "canvas:rotation": clear_canvas_2D,
    "canvas:scale": scale_canvas_2D,
    "canvas:translate": translate_canvas_2D,
    "canvas:save": save_canvas_2D,
    "canvas:restore": restore_canvas_2D
  }

  const exec = actions[action]

  if (exec) exec(context, options)
}
