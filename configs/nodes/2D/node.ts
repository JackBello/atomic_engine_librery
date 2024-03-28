import { IOptionsEmptyNode, IOptionsNode, IOptionsNode2D } from "../../../basic/nodes/types";

export const DEFAULT_CONFIG_BASIC_NODE: IOptionsNode = {
  cursor: "default",
  deep: "0",
  height: 0,
  name: "BasicNode",
  visible: true,
  width: 0,
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
  angleOrigin: "center",
  angleOriginX: "center",
  angleOriginY: "center",
  scaleOrigin: "center",
  scaleOriginX: "center",
  scaleOriginY: "center",
  translateOrigin: "center",
  translateOriginX: "center",
  translateOriginY: "center",
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  skew: 1,
  skewX: 1,
  skewY: 1,
  visible: true,
  width: 10,
  x: 0,
  y: 0,
}

export const DEFAULT_CONFIG_EMPTY_NODE: IOptionsEmptyNode = {
  cursor: "default",
  deep: "0",
  height: 10,
  name: "EmptyNode",
  width: 10,
  x: 0,
  y: 0,
  visible: true
}
