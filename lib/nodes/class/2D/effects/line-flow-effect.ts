import type { TAnything, TSerialize } from "@/app/types";
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

export class LineFlowEffect2D<T extends TCanvasNodeOptions["2D/line-flow-effect"] = TCanvasNodeOptions["2D/line-flow-effect"]> extends Node2D<T> {
	[NodePropType]: TCanvasNodes = "2D/line-flow-effect";

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

	get stroke() {
		return this._options.stroke;
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

	set stroke(value: string | undefined) {
		this._options.stroke = value;

		this[GetApp][_Render].draw = true;
	}

	set radius(value: number) {
		this._options.radius = value;

		this[GetApp][_Render].draw = true;
	}

	set width(value: number) {
		this._options.width = value;

		this.processOrigin()

		this[GetApp][_Render].draw = true;
	}

	set height(value: number) {
		this._options.height = value;

		this.processOrigin()

		this[GetApp][_Render].draw = true;
	}

	constructor(
		slug: string,
		options?: Partial<TCanvasNodeOptions["2D/line-flow-effect"]>,
	) {
		super(slug, { ...DEFAULT_CONFIG_LINE_FLOW_EFFECT_2D, ...options });
	}

	async clone(): Promise<LineFlowEffect2D> {
		return await this[NodeFunctionClone]() as TAnything;
	}

	reset(property?: keyof TCanvasNodeOptions["2D/line-flow-effect"]): void {
		this[NodeFunctionReset](property)
	}

	toObject(): T {
		return { ...super.toObject() };
	}

	set(
		property: keyof TCanvasNodeOptions["2D/line-flow-effect"],
		value: TAnything,
	): void;
	set(properties: Partial<TCanvasNodeOptions["2D/line-flow-effect"]>): void;
	set(properties?: unknown, value?: unknown): void {
		this[NodeFunctionSet](properties, value)
	}

	static async import(data: string, format: TSerialize = "JSON"): Promise<LineFlowEffect2D> {
		return await GlobalNode[NodeFunctionImport](data, format) as TAnything;
	}

	static async make(structure: TExportNode<TAnything>): Promise<LineFlowEffect2D> {
		return await GlobalNode[NodeFunctionMake](structure) as TAnything;
	}
}
