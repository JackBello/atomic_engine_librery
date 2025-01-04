import type { TCanvasNodeOptions } from "@/nodes/types";

export const DEFAULT_CONFIG_LINE_FLOW_EFFECT_2D: TCanvasNodeOptions["2D/line-flow-effect"] =
{
	alpha: 1,
	cursor: "default",
	visible: true,
	lock: false,
	selectable: true,
	cellSize: 15,
	lineWidth: 5,
	spacing: 5,
	radius: 0,
	fill: "#000000",
	description: "",
	title: "",
	rotation: 0,
	height: 10,
	originX: "center",
	originY: "center",
	position: "Vec2(0, 0)",
	scale: "Vec2(1, 1)",
	skew: "Vec2(0, 0)",
	width: 10,
	flipX: false,
	flipY: false,
	hovered: true,
	compositeOperation: "source-over"
};
