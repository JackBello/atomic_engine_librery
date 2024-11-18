import type { TAnything } from "@/app/types";
import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import type {
	INodeProcess,
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
	ExportWorker,
	GetApp,
} from "../../../../app/symbols";

import { Node2D } from "../node";
import { GlobalNode } from "@/nodes";

import { DEFAULT_CONFIG_CONTROL_EDITION_2D } from "../../../../configs/nodes/2D/edition/control-edition";

export class ControlEdition2D extends Node2D {
	[NodePropType]: TCanvasNodes = "2D/control-edition";

	protected _options: TCanvasNodeOptions["2D/control-edition"];
	protected _initial: TCanvasNodeOptions["2D/control-edition"];

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
		options?: Partial<TCanvasNodeOptions["2D/control-edition"]>,
	) {
		super(slug, { ...DEFAULT_CONFIG_CONTROL_EDITION_2D, ...options });

		this._initial = { ...DEFAULT_CONFIG_CONTROL_EDITION_2D, ...options };
		this._options = this._initial;
	}

	clone() {
		return this[NodeFunctionClone]() as ControlEdition2D;
	}

	reset(property?: keyof TCanvasNodeOptions["2D/control-edition"]): void {
		this[NodeFunctionReset](property)
	}

	toObject(): TCanvasNodeOptions["2D/control-edition"] {
		return this._options;
	}

	set(
		property: keyof TCanvasNodeOptions["2D/control-edition"],
		value: TAnything,
	): void;
	set(properties: Partial<TCanvasNodeOptions["2D/control-edition"]>): void;
	set(properties?: unknown, value?: unknown): void {
		this[NodeFunctionSet](properties, value)
	}

	static import(data: string, format: "JSON" | "YAML" = "JSON") {
		return GlobalNode[NodeFunctionImport](data, format) as ControlEdition2D;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[NodeFunctionMake](structure) as ControlEdition2D;
	}
}
