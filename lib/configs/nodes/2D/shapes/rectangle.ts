import type { TCanvasNodeOptions } from "@/nodes/types";

export const DEFAULT_CONFIG_RECTANGLE_2D: TCanvasNodeOptions["2D/rectangle"] = {
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
	width: 100,
	fill: "#000000",
	stroke: "",
	lineWidth: 0,
	rounded: 0,
	flipX: false,
	flipY: false,
	lock: false,
	selectable: true,
	hovered: true,
	compositeOperation: "source-over"
};
