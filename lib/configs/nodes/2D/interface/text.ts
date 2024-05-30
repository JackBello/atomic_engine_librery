import {
  ICoords2D,
  INode2D,
  IBorder2D,
  IText2D,
  ISize2D
} from "../../../../nodes/nodes-2d.types"
import { IControlEdition, IControlEditor } from "../../../../nodes/nodes.types"

export const DEFAULT_CONFIG_TEXT_2D: IControlEditor &
  IControlEdition &
  ICoords2D &
  ISize2D &
  INode2D &
  IBorder2D &
  IText2D = {
  rotation: 0,
  cursor: "default",
  height: 0,
  name: "Text2D",
  originX: "center",
  originY: "center",
  centerRotation: true,
  centerScale: true,
  scaleX: 1,
  scaleY: 1,
  skewX: 1,
  skewY: 1,
  visible: true,
  width: 0,
  x: 0,
  y: 0,
  fontFamily: "system-ui",
  fontSize: "0px",
  fontStretch: "normal",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  lineHeight: "normal",
  textBaseline: "alphabetic",
  textDirection: "ltr",
  text: "",
  textAlign: "left",
  border: false,
  borderColor: "",
  borderWidth: 0,
  color: "black",
  wordSpacing: "0px",
  letterSpacing: "0px",
  flipX: false,
  flipY: false,
  lock: false,
  selectable: true,
  title: "",
  description: "",
  rotationType: "degrees"
}
