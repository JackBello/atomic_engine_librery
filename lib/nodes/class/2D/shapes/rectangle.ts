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

import { GlobalNode } from "@/nodes";
import { Node2D } from "../node";

import { DEFAULT_CONFIG_RECTANGLE_2D } from "../../../../configs/nodes/2D/shapes/rectangle";

export class Rectangle2D extends Node2D {
	[NodePropType]: TCanvasNodes = "2D/rectangle";

	protected _options: TCanvasNodeOptions["2D/rectangle"];
	protected _initial: TCanvasNodeOptions["2D/rectangle"];

	readonly NODE_NAME: TTypeNodes = "Rectangle2D";

	get background() {
		return this._options.background;
	}

	get radius() {
		return this._options.radius;
	}

	get border() {
		return this._options.border;
	}

	get borderColor() {
		return this._options.borderColor;
	}

	get borderWidth() {
		return this._options.borderWidth;
	}

	get width() {
		return this._options.width;
	}

	get height() {
		return this._options.height;
	}

	set background(value: string) {
		this._options.background = value;

		this[GetApp][_Render].draw = true;
	}

	set radius(value:
		| number
		| [number, number]
		| {
			topLeft: number;
			topRight: number;
			bottomLeft: number;
			bottomRight: number;
		}) {
		this._options.radius = value;

		this[GetApp][_Render].draw = true;
	}

	set border(value: boolean) {
		this._options.border = value;

		this[GetApp][_Render].draw = true;
	}

	set borderColor(value: string) {
		this._options.borderColor = value;

		this[GetApp][_Render].draw = true;
	}

	set borderWidth(value: number) {
		this._options.borderWidth = value;

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
		options?: Partial<TCanvasNodeOptions["2D/rectangle"]>,
	) {
		super(slug, { ...DEFAULT_CONFIG_RECTANGLE_2D, ...options });

		this._initial = { ...DEFAULT_CONFIG_RECTANGLE_2D, ...options };
		this._options = { ...this._initial };
	}

	clone() {
		return this[NodeFunctionClone]() as Rectangle2D;
	}

	reset(property?: keyof TCanvasNodeOptions["2D/rectangle"]): void {
		this[NodeFunctionReset](property)
	}

	toObject(): TCanvasNodeOptions["2D/rectangle"] {
		return { ...this._options };
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

	static import(data: string, format: "JSON" | "YAML" = "JSON") {
		return GlobalNode[NodeFunctionImport](data, format) as Rectangle2D;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[NodeFunctionMake](structure) as Rectangle2D;
	}
}
