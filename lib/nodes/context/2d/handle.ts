import {
  TCanvasActions,
  TCanvasActionsContext2D,
  TCanvasNode2D
} from "@/nodes/types"
import { TFunction } from "../../../types"
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
  action:
    | Exclude<
        TCanvasNode2D,
        "2D/node" | "2D/handler/collision" | "2D/handler/collision-shape"
      >
    | TCanvasActionsContext2D
    | TCanvasActions,
  options: any,
  context: CanvasRenderingContext2D
) => {
  const actions: Record<
    | Exclude<
        TCanvasNode2D,
        "2D/node" | "2D/handler/collision" | "2D/handler/collision-shape"
      >
    | TCanvasActionsContext2D
    | TCanvasActions,
    TFunction
  > = {
    "2D/rectangle": rectangle_2D,
    "2D/text": text_2D,
    "2D/selection": selection_2D,
    "2D/line-flow-effect": effect_line_flow_2D,
    "2D/control-edition": control_edition_2D,
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
