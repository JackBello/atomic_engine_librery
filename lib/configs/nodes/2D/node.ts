import {
  IOptionsEmptyNode,
  IOptionsBasicNode,
  IOptionsNode2D
} from "../../../basic/nodes/types"

export const DEFAULT_CONFIG_BASIC_NODE: IOptionsBasicNode = {
  cursor: "default",
  deep: "0",
  name: "BasicNode",
  visible: true,
  lock: false,
  selectable: true,
  x: 0,
  y: 0
}

export const DEFAULT_CONFIG_NODE_2D: IOptionsNode2D = {
  rotation: 0,
  cursor: "default",
  deep: "0",
  height: 10,
  name: "Node2D",
  origin: "center",
  originX: "center",
  originY: "center",
  centerRotation: true,
  centerScale: true,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  skew: 1,
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

export const DEFAULT_CONFIG_EMPTY_NODE: IOptionsEmptyNode = {
  cursor: "default",
  deep: "0",
  name: "EmptyNode",
  x: 0,
  y: 0,
  visible: true,
  lock: false,
  selectable: true
}
