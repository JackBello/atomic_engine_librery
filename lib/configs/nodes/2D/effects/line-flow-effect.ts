import {
  ICoords2D,
  INode2D,
  ILineFlowEffect2D,
  ISize2D
} from "../../../../nodes/nodes-2d.types"
import { IControlEdition, IControlEditor } from "../../../../nodes/nodes.types"

export const DEFAULT_CONFIG_LINE_FLOW_EFFECT_2D: IControlEditor &
  IControlEdition &
  ICoords2D &
  ISize2D &
  INode2D &
  ILineFlowEffect2D = {
  cursor: "default",
  name: "LineFlowEffect2D",
  visible: true,
  lock: false,
  selectable: true,
  cellSize: 15,
  lineWidth: 5,
  spacing: 5,
  radius: 0,
  color: "white",
  description: "",
  title: "",
  rotationType: "degrees",
  rotation: 0,
  height: 10,
  originX: "center",
  originY: "center",
  centerRotation: true,
  centerScale: true,
  scaleX: 1,
  scaleY: 1,
  skewX: 1,
  skewY: 1,
  width: 10,
  flipX: false,
  flipY: false,
  x: 0,
  y: 0
}
