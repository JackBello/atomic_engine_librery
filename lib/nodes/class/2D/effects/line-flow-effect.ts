import type { TAnything } from "@/app/types";
import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import type {
	TExportNode,
	TTypeNodes,
} from "@/nodes/global/types";

import {
	NodeFunctionClone,
	NodeFunctionImport,
	NodeFunctionMake,
	NodeFunctionReset,
	NodeFunctionSet,
	NodePropType,
} from "../../../symbols";
import {
	_Render,
	_Worker,
	GetApp,
} from "../../../../app/symbols";

import { Node2D } from "../node";
import { GlobalNode } from "@/nodes";

import { DEFAULT_CONFIG_LINE_FLOW_EFFECT_2D } from "../../../../configs/nodes/2D/effects/line-flow-effect";

export class LineFlowEffect2D extends Node2D {
	[NodePropType]: TCanvasNodes = "2D/line-flow-effect";

	protected _options: TCanvasNodeOptions["2D/line-flow-effect"];
	protected _initial: TCanvasNodeOptions["2D/line-flow-effect"];

	readonly NODE_NAME: TTypeNodes = "LineFlowEffect2D";

	get cellSize() {
		return this._options.cellSize;
	}

	get lineWidth() {
		return this._options.lineWidth;
	}

	get spacing() {
		return this._options.spacing;
	}

	get color() {
		return this._options.color;
	}

	get radius() {
		return this._options.radius;
	}

	get width() {
		return this._options.width;
	}

	get height() {
		return this._options.height;
	}

	set cellSize(value: number) {
		this._options.cellSize = value;

		this[GetApp][_Render].draw = true;
	}

	set lineWidth(value: number) {
		this._options.lineWidth = value;

		this[GetApp][_Render].draw = true;
	}

	set spacing(value: number) {
		this._options.spacing = value;

		this[GetApp][_Render].draw = true;
	}

	set color(value: string) {
		this._options.color = value;

		this[GetApp][_Render].draw = true;
	}

	set radius(value: number) {
		this._options.radius = value;

		this[GetApp][_Render].draw = true;
	}

	set width(value: number) {
		this._options.width = value;

		this[GetApp][_Render].draw = true;
	}

	set height(value: number) {
		this._options.height = value;

		this[GetApp][_Render].draw = true;
	}

	constructor(
		slug: string,
		options?: Partial<TCanvasNodeOptions["2D/line-flow-effect"]>,
	) {
		super(slug, { ...DEFAULT_CONFIG_LINE_FLOW_EFFECT_2D, ...options });

		this._initial = { ...DEFAULT_CONFIG_LINE_FLOW_EFFECT_2D, ...options };
		this._options = { ...this._initial };
	}

	clone() {
		return this[NodeFunctionClone]() as LineFlowEffect2D;
	}

	reset(property?: keyof TCanvasNodeOptions["2D/line-flow-effect"]): void {
		this[NodeFunctionReset](property)
	}

	toObject(): TCanvasNodeOptions["2D/line-flow-effect"] {
		return { ...this._options };
	}

	set(
		property: keyof TCanvasNodeOptions["2D/line-flow-effect"],
		value: TAnything,
	): void;
	set(properties: Partial<TCanvasNodeOptions["2D/line-flow-effect"]>): void;
	set(properties?: unknown, value?: unknown): void {
		this[NodeFunctionSet](properties, value)
	}

	static import(data: string, format: "JSON" | "YAML" = "JSON") {
		return GlobalNode[NodeFunctionImport](data, format) as LineFlowEffect2D;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[NodeFunctionMake](structure) as LineFlowEffect2D;
	}
}
