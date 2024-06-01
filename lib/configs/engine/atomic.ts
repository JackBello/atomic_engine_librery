import { IOptionsAtomicEngine } from "../../types"

export const DEFAULT_CONFIG_ATOMIC: IOptionsAtomicEngine = {
  background: "#eeeeee",
  context: "2d",
  dimension: "2D",
  fps: {
    delay: 1000,
    velocity: 60
  },
  game: {
    full_screen: false,
    full_size: false,
    height: 400,
    width: 400,
    x: 0,
    y: 0,
    icon: null,
    center: true,
    title: undefined,
    resizable: false
  },
  height: 500,
  width: 500,
  selector: "[data-canvas]",
  export: {
    exclude: [],
    format: "JSON",
    include: []
  }
}
