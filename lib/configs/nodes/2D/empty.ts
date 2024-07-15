import { IControlEdition, IControlEditor } from "@/nodes/@global/node.types"
import { ICoords2D } from "../../../nodes/class/nodes-2D.types"

export const DEFAULT_CONFIG_EMPTY_2D: Omit<IControlEdition, "visible"> &
  ICoords2D &
  IControlEditor = {
  cursor: "default",
  description: "",
  title: "",
  lock: false,
  selectable: true,
  x: 0,
  y: 0
}
