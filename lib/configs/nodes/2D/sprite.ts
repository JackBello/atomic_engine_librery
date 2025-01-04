import type { TCanvasNodeOptions } from "@/nodes/types";

export const DEFAULT_CONFIG_SPRITE_2D: Omit<TCanvasNodeOptions["2D/sprite"], 'element' | 'format' | 'settings'> = {
    alpha: 1,
    rotation: 0,
    cursor: "default",
    height: 100,
    description: "",
    title: "",
    originX: "center",
    originY: "center",
    position: "Vec2(0, 0)",
    scale: "Vec2(1, 1)",
    skew: "Vec2(0, 0)",
    visible: true,
    lock: false,
    selectable: true,
    width: 100,
    flipX: false,
    flipY: false,
    hovered: true,
    type: "image",
    smoothing: false,
    smoothingQuality: "low",
    loaded: false,
    compositeOperation: "source-over",
    frameCoords: "Vec2(0, 0)",
    frame: 0
};
