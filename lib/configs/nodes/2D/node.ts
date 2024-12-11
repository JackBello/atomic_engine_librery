import type { TCanvasNodeOptions } from "@/nodes/types";

export const DEFAULT_CONFIG_NODE_2D: TCanvasNodeOptions["2D/node"] = {
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
};
