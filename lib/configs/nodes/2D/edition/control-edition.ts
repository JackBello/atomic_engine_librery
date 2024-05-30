import {
  IBorder2D,
  IControlEdition2D,
  ICoords2D,
  INode2D,
  IRectangle2D,
  ISize2D
} from "../../../../nodes/nodes-2d.types"
import { IControlEdition, IControlEditor } from "../../../../nodes/nodes.types"

export const DEFAULT_CONFIG_CONTROL_EDITION_2D: IControlEditor &
  IControlEdition &
  ICoords2D &
  ISize2D &
  INode2D &
  IRectangle2D &
  IBorder2D &
  IControlEdition2D = {
  background: "#fff",
  border: true,
  borderColor: "#eee",
  borderWidth: 1,
  centerRotation: true,
  centerScale: true,
  cornerBorder: true,
  cornerColor: "blue",
  cornerColorBorder: "red",
  cornerSize: 2,
  cursor: "default",
  description: "",
  flipX: false,
  flipY: false,
  height: 0,
  width: 0,
  lock: false,
  name: "ControlEdition2D",
  originX: "center",
  originY: "center",
  padding: 10,
  radius: 0,
  rotation: 0,
  rotationType: "degrees",
  scaleX: 1,
  scaleY: 1,
  selectable: true,
  showCorner: true,
  skewX: 1,
  skewY: 1,
  title: "",
  visible: true,
  x: 0,
  y: 0
}
