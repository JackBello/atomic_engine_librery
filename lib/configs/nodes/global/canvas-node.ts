import type { TCanvasNodeOptions } from "@/nodes/types";

export const DEFAULT_CONFIG_PRIMITIVE_CANVAS_NODE: TCanvasNodeOptions["global/abstract/canvas-node"] =
	{
		description: "",
		title: "",
		cursor: "auto",
		hovered: true,
		lock: false,
		selectable: true,
		visible: true,
		alpha: 1,
	};
