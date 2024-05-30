import { ICoords2D, INode2D, ISize2D } from "../../../nodes/nodes-2d.types"
import { IControlEdition, IControlEditor } from "../../../nodes/nodes.types"

export const DEFAULT_CONFIG_NODE_2D: IControlEdition &
  IControlEditor &
  ICoords2D &
  INode2D &
  ISize2D = {
  rotationType: "degrees",
  rotation: 0,
  cursor: "default",
  height: 10,
  name: "Node2D",
  description: "",
  title: "",
  originX: "center",
  originY: "center",
  centerRotation: true,
  centerScale: true,
  scaleX: 1,
  scaleY: 1,
  skewX: 1,
  skewY: 1,
  visible: true,
  lock: false,
  selectable: true,
  width: 10,
  flipX: false,
  flipY: false,
  x: 0,
  y: 0
}
