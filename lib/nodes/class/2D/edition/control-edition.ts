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

import { DEFAULT_CONFIG_CONTROL_EDITION_2D } from "../../../../configs/nodes/2D/edition/control-edition";

export class ControlEdition2D<T extends TCanvasNodeOptions["2D/control-edition"] = TCanvasNodeOptions["2D/control-edition"]> extends Node2D<T> {
	[NodePropType]: TCanvasNodes = "2D/control-edition";

	readonly NODE_NAME: TTypeNodes = "ControlEdition2D";

	get padding() {
		return this._options.padding;
	}

	get cornerSize() {
		return this._options.cornerSize;
	}

	get cornerColor() {
		return this._options.cornerColor;
	}

	get cornerBorder() {
		return this._options.cornerBorder;
	}

	get cornerColorBorder() {
		return this._options.cornerColorBorder;
	}

	get showCorner() {
		return this._options.showCorner;
	}

	get fill() {
		return this._options.fill;
	}

	get stroke() {
		return this._options.stroke;
	}

	get lineWidth() {
		return this._options.lineWidth;
	}

	get rounded() {
		return this._options.rounded;
	}


	get width() {
		return this._options.width;
	}

	get height() {
		return this._options.height;
	}

	set padding(value:
		| number
		| [number, number]
		| [number, number, number, number]) {
		this._options.padding = value;

		this[GetApp][_Render].draw = true;
	}

	set cornerSize(value: number) {
		this._options.cornerSize = value;

		this[GetApp][_Render].draw = true;
	}

	set cornerColor(value: string) {
		this._options.cornerColor = value;

		this[GetApp][_Render].draw = true;
	}

	set cornerBorder(value: boolean) {
		this._options.cornerBorder = value;

		this[GetApp][_Render].draw = true;
	}

	set cornerColorBorder(value: string) {
		this._options.cornerColorBorder = value;

		this[GetApp][_Render].draw = true;
	}

	set showCorner(value:
		| boolean
		| {
			"top-left": boolean;
			"top-center": boolean;
			"top-right": boolean;
			"middle-left": boolean;
			"middle-center": boolean;
			"middle-right": boolean;
			"bottom-left": boolean;
			"bottom-center": boolean;
			"bottom-right": boolean;
		}) {
		this._options.showCorner = value;

		this[GetApp][_Render].draw = true;
	}

	set fill(value: string) {
		this._options.fill = value;

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
		options?: Partial<TCanvasNodeOptions["2D/control-edition"]>,
	) {
		super(slug, { ...DEFAULT_CONFIG_CONTROL_EDITION_2D, ...options });
	}

	async clone(): Promise<ControlEdition2D> {
		return await this[NodeFunctionClone]() as TAnything;
	}

	reset(property?: keyof TCanvasNodeOptions["2D/control-edition"]): void {
		this[NodeFunctionReset](property)
	}

	toObject(): T {
		return { ...super.toObject() };
	}

	set(
		property: keyof TCanvasNodeOptions["2D/control-edition"],
		value: TAnything,
	): void;
	set(properties: Partial<TCanvasNodeOptions["2D/control-edition"]>): void;
	set(properties?: unknown, value?: unknown): void {
		this[NodeFunctionSet](properties, value)
	}

	static async import(data: string, format: TSerialize = "JSON"): Promise<ControlEdition2D> {
		return await GlobalNode[NodeFunctionImport](data, format) as TAnything;
	}

	static async make(structure: TExportNode<TAnything>): Promise<ControlEdition2D> {
		return await GlobalNode[NodeFunctionMake](structure) as TAnything;
	}
}
