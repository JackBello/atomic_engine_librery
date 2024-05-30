import { ICoords2D } from "../../../nodes/nodes-2d.types"
import { IControlEdition, IControlEditor } from "../../../nodes/nodes.types"

export const DEFAULT_CONFIG_EMPTY_2D: Omit<IControlEdition, "visible"> &
  ICoords2D &
  IControlEditor = {
  cursor: "default",
  name: "Empty2D",
  description: "",
  title: "",
  lock: false,
  selectable: true,
  x: 0,
  y: 0
}
