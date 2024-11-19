import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import type { TCursorOptions, TTypeNodes } from "../types";

import { GlobalNode } from "../global-node";
import { NodePropType } from "@/nodes/symbols";
import { DEFAULT_CONFIG_PRIMITIVE_CANVAS_NODE } from "@/configs/nodes/global/canvas-node";
import { _Render, GetApp } from "@/app/symbols";

export abstract class CanvasNode<T extends TCanvasNodeOptions["global/abstract/canvas-node"] = TCanvasNodeOptions["global/abstract/canvas-node"]> extends GlobalNode<T> {
	[NodePropType]: TCanvasNodes = "global/abstract/canvas-node";

	readonly NODE_NAME: TTypeNodes = "CanvasNode";

	constructor(
		slug: string,
		options?: Partial<TCanvasNodeOptions["global/abstract/canvas-node"]>,
	) {
		super(slug, { ...DEFAULT_CONFIG_PRIMITIVE_CANVAS_NODE, ...options });
	}

	get visible() {
		return this._options.visible;
	}

	get selectable() {
		return this._options.selectable;
	}

	get hovered() {
		return this._options.hovered;
	}

	get lock() {
		return this._options.lock;
	}

	get cursor() {
		return this._options.cursor;
	}

	get alpha() {
		return this._options.alpha;
	}

	set visible(value: boolean) {
		this._options.visible = value;

		this[GetApp][_Render].draw = true;
	}

	set selectable(value: boolean) {
		this._options.selectable = value;

		this[GetApp][_Render].draw = true;
	}

	set hovered(value: boolean) {
		this._options.hovered = value;

		this[GetApp][_Render].draw = true;
	}

	set lock(value: boolean) {
		this._options.lock = value;

		this[GetApp][_Render].draw = true;
	}

	set cursor(value: TCursorOptions) {
		this._options.cursor = value;

		this[GetApp][_Render].draw = true;
	}

	set alpha(value: number) {
		this._options.alpha = value;

		this[GetApp][_Render].draw = true;
	}
}
