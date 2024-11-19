import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import { NodePropType } from "@/nodes/symbols";

import { Node2D } from "../node";
import type { TTypeNodes } from "@/nodes/global/types";
import { DEFAULT_CONFIG_NODE_2D } from "@/configs/nodes/2D/node";

export default class Image2D<T extends TCanvasNodeOptions["2D/image"] = TCanvasNodeOptions["2D/image"]> extends Node2D<T> {
	[NodePropType]: TCanvasNodes = "2D/image";

	readonly NODE_NAME: TTypeNodes = "Image2D";

	constructor(slug: string, options?: Partial<TCanvasNodeOptions["2D/node"]>) {
		super(slug, { ...DEFAULT_CONFIG_NODE_2D, ...options });
	}
}