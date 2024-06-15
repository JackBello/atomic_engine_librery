import { TTypeNodeOptions } from "@/workers/types"

export const DEFAULT_CONFIG_NODE_2D: TTypeNodeOptions["primitive:2D/node"] = {
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
