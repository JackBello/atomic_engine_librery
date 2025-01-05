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

import { GlobalNode } from "@/nodes";
import { Node2D } from "../node";

import { DEFAULT_CONFIG_RECTANGLE_2D } from "../../../../configs/nodes/2D/shapes/rectangle";

export class Rectangle2D<T extends TCanvasNodeOptions["2D/rectangle"] = TCanvasNodeOptions["2D/rectangle"]> extends Node2D<T> {
	[NodePropType]: TCanvasNodes = "2D/rectangle";

	readonly NODE_NAME: TTypeNodes = "Rectangle2D";

	get fill() {
		return this._options.fill;
	}

	get rounded() {
		return this._options.rounded;
	}

	get stroke() {
		return this._options.stroke;
	}

	get lineWidth() {
		return this._options.lineWidth;
	}

	get width() {
		return this._options.width;
	}

	get height() {
		return this._options.height;
	}

	set fill(value: string) {
		this._options.fill = value;

		this[GetApp][_Render].draw = true;
	}

	set rounded(value:
		| number
		| [number, number]
		| {
			topLeft: number;
			topRight: number;
			bottomLeft: number;
			bottomRight: number;
		}) {
		this._options.rounded = value;

		this[GetApp][_Render].draw = true;
	}

	set stroke(value: string | undefined) {
		this._options.stroke = value;

		this[GetApp][_Render].draw = true;
	}

	set lineWidth(value: number) {
		this._options.lineWidth = value;


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
		options?: Partial<TCanvasNodeOptions["2D/rectangle"]>,
	) {
		super(slug, { ...DEFAULT_CONFIG_RECTANGLE_2D, ...options });
	}

	async clone(): Promise<Rectangle2D> {
		return await this[NodeFunctionClone]() as TAnything;
	}

	reset(property?: keyof TCanvasNodeOptions["2D/rectangle"]): void {
		this[NodeFunctionReset](property)
	}

	toObject(): T {
		return { ...super.toObject() };
	}

	set(
		property: keyof TCanvasNodeOptions["2D/rectangle"],
		value: TAnything,
	): void;
	set(properties: Partial<TCanvasNodeOptions["2D/rectangle"]>): void;
	set(properties?: unknown, value?: unknown): void {
		this[NodeFunctionSet](properties, value)

		this[GetApp][_Render].draw = true;
	}

	static async import(data: string, format: TSerialize = "JSON"): Promise<Rectangle2D> {
		return await GlobalNode[NodeFunctionImport](data, format) as TAnything;
	}

	static async make(structure: TExportNode<TAnything>): Promise<Rectangle2D> {
		return await GlobalNode[NodeFunctionMake](structure) as TAnything;
	}
}
