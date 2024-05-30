import {
  IBorder2D,
  ICoords2D,
  INode2D,
  IRectangle2D,
  ISelection2D,
  ISize2D
} from "../../../../nodes/nodes-2d.types"
import { IControlEdition, IControlEditor } from "../../../../nodes/nodes.types"

export const DEFAULT_CONFIG_SELECTION_2D: IControlEditor &
  IControlEdition &
  ICoords2D &
  ISize2D &
  INode2D &
  ISelection2D &
  IRectangle2D &
  IBorder2D = {
  background: "#000",
  border: true,
  borderColor: "#eee",
  borderWidth: 1,
  centerRotation: true,
  centerScale: true,
  cursor: "default",
  description: "",
  endX: 0,
  endY: 0,
  flipX: false,
  flipY: false,
  height: 100,
  width: 100,
  lock: false,
  name: "Selection2D",
  originX: "center",
  originY: "center",
  radius: 0,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  selectable: true,
  shape: "rectangle",
  skewX: 1,
  skewY: 1,
  startX: 0,
  startY: 0,
  title: "",
  rotationType: "degrees",
  visible: true,
  x: 0,
  y: 0
}
