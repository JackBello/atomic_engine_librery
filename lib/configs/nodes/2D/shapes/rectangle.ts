import { TTypeNodeOptions } from "@/workers/types"

export const DEFAULT_CONFIG_RECTANGLE_2D: TTypeNodeOptions["draw:2D/rectangle"] =
  {
    rotation: 0,
    cursor: "default",
    height: 100,
    name: "Rectangle2D",
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
    width: 100,
    x: 0,
    y: 0,
    background: "black",
    border: false,
    borderColor: "",
    borderWidth: 0,
    radius: 0,
    flipX: false,
    flipY: false,
    lock: false,
    selectable: true,
    rotationType: "degrees"
  }
