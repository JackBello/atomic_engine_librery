import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import type { TCursorOptions, TTypeNodes } from "../types";

import { GlobalNode } from "../global-node";
import { NodePropType } from "@/nodes/symbols";
import { DEFAULT_CONFIG_PRIMITIVE_CANVAS_NODE } from "@/configs/nodes/global/canvas-node";
import { _Render, _Worker, GetApp } from "@/app/symbols";

export abstract class CanvasNode extends GlobalNode {
	protected _options: TCanvasNodeOptions["global/abstract/canvas-node"];
	protected _initial: TCanvasNodeOptions["global/abstract/canvas-node"];

	[NodePropType]: TCanvasNodes = "global/abstract/canvas-node";

	readonly NODE_NAME: TTypeNodes = "CanvasNode";

	constructor(
		slug: string,
		options?: Partial<TCanvasNodeOptions["global/abstract/canvas-node"]>,
	) {
		super(slug, options);

		this._initial = { ...DEFAULT_CONFIG_PRIMITIVE_CANVAS_NODE, ...options };
		this._options = { ...this._initial };
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

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				visible: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}

	set selectable(value: boolean) {
		this._options.selectable = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				selectable: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}

	set hovered(value: boolean) {
		this._options.hovered = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				hovered: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}

	set lock(value: boolean) {
		this._options.lock = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				lock: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}

	set cursor(value: TCursorOptions) {
		this._options.cursor = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				cursor: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}

	set alpha(value: number) {
		this._options.alpha = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				alpha: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}
}
