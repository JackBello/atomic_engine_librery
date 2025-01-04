import type { TCanvasNodeOptions } from "@/nodes/types";

export const DEFAULT_CONFIG_CONTROL_EDITION_2D: TCanvasNodeOptions["2D/control-edition"] =
{
	alpha: 1,
	fill: "#ffffff",
	stroke: "#eeeeee",
	lineWidth: 1,
	cornerBorder: true,
	cornerColor: "#0000ff",
	cornerColorBorder: "#ff0000",
	cornerSize: 2,
	cursor: "default",
	description: "",
	flipX: false,
	flipY: false,
	height: 0,
	width: 0,
	lock: false,
	originX: "center",
	originY: "center",
	padding: 10,
	rounded: 0,
	rotation: 0,
	position: "Vec2(0, 0)",
	scale: "Vec2(1, 1)",
	skew: "Vec2(0, 0)",
	selectable: true,
	showCorner: true,
	title: "",
	visible: true,
	hovered: true,
	compositeOperation: "source-over"
};
