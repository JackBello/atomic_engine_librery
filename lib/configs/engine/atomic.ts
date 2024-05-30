import { IOptionsEngine } from "../../types"

export const DEFAULT_CONFIG_ATOMIC: IOptionsEngine = {
  background: "#eeeeee",
  context: "2d",
  dimension: "2D",
  fps: {
    delay: 1000,
    velocity: 60
  },
  game: {
    full_screen: false,
    full_size: true,
    height: 400,
    width: 400,
    position_x: 400,
    position_y: 400
  },
  height: 500,
  width: 500,
  selector: "#canvas"
}
