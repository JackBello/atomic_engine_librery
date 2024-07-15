import { TCanvasNodeOptions } from "@/nodes/types"

export const DEFAULT_CONFIG_COLLISION_SHAPE_2D: TCanvasNodeOptions["2D/handler/collision-shape"] =
  {
    opacity: 1,
    rotationType: "degrees",
    rotation: 0,
    cursor: "default",
    height: 10,
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
    y: 0,
    color: "rgb(0,0,0,.5)",
    shape: "rectangle"
  }
