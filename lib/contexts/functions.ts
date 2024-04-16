import { TContextCanvasName } from "../types"
import {
  clear_window_context_2D,
  save_window_context_2D,
  restore_window_context_2D,
  translate_window_context_2D,
  draw_rectangle_context_2D,
  grid_make_context_2D,
  draw_selection_context_2D,
  scale_window_context_2D,
  draw_text_context_2D,
  draw_control_edition_context_2D,
  draw_effect_context_2D
} from "./2d/functions"
import { draw_rectangle_context_webgl2 } from "./web-gl2/functions"

export const useFunctionsContext = (type: TContextCanvasName) => {
  if (type === "web-gl2") {
    return {
      draw_rectangle: draw_rectangle_context_webgl2,
      draw_selection: undefined,
      draw_text: undefined,
      draw_control_edition: undefined,
      draw_effect: undefined,
      save_window: undefined,
      restore_window: undefined,
      clear_window: undefined,
      translate_window: undefined,
      scale_window: undefined,
      grid_make: undefined
    }
  }

  return {
    draw_selection: draw_selection_context_2D,
    draw_rectangle: draw_rectangle_context_2D,
    draw_text: draw_text_context_2D,
    draw_control_edition: draw_control_edition_context_2D,
    draw_effect: draw_effect_context_2D,
    save_window: save_window_context_2D,
    restore_window: restore_window_context_2D,
    clear_window: clear_window_context_2D,
    translate_window: translate_window_context_2D,
    scale_window: scale_window_context_2D,
    grid_make: grid_make_context_2D
  }
}
