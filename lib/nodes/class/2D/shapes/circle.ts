import type { TAnything } from "@/app/types";
import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import type {
	TExportNode,
	TTypeNodes,
	TTypeOriginX,
	TTypeOriginY,
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

import { DEFAULT_CONFIG_CIRCLE_2D } from "@/configs/nodes/2D/shapes/circle";

export class Circle2D extends Node2D {
	[NodePropType]: TCanvasNodes = "2D/circle";

	protected _options: TCanvasNodeOptions["2D/circle"];
	protected _initial: TCanvasNodeOptions["2D/circle"];

	readonly NODE_NAME: TTypeNodes = "Circle2D";

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

	get startAngle() {
		return this._options.startAngle;
	}

	get endAngle() {
		return this._options.endAngle;
	}

	get counterclockwise() {
		return this._options.counterclockwise;
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

	set radius(value: number) {
		this._options.radius = value;

		this.processCircle()

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

	set startAngle(value: number) {
		this._options.startAngle = value;

		this[GetApp][_Render].draw = true;
	}

	set endAngle(value: number) {
		this._options.endAngle = value;

		this[GetApp][_Render].draw = true;
	}

	set counterclockwise(value: boolean) {
		this._options.counterclockwise = value;

		this[GetApp][_Render].draw = true;
	}

	constructor(
		slug: string,
		options?: Partial<
			Omit<TCanvasNodeOptions["2D/circle"], "width" | "height">
		>,
	) {
		super(slug, { ...DEFAULT_CONFIG_CIRCLE_2D, ...options });

		this._initial = { ...DEFAULT_CONFIG_CIRCLE_2D, ...options };
		this._options = { ...this._initial };

		this.processCircle(true);
	}

	protected processOrigin() {
		const originXNumber: Record<TTypeOriginX, number> = {
			left: 0.45,
			center: 0,
			right: -0.45,
		}

		const originYNumber: Record<TTypeOriginY, number> = {
			top: 0.45,
			center: 0,
			bottom: -0.45
		}

		if (typeof this._options.originX === "string") {
			this._calculate.origin[0] = this._options.width * originXNumber[this._options.originX]
		} else {
			this._calculate.origin[0] = this._options.width * this._options.originX
		}

		if (typeof this._options.originY === "string") {
			this._calculate.origin[1] = this._options.height * originYNumber[this._options.originY]
		} else {
			this._calculate.origin[1] = this._options.height * this._options.originY
		}
	}

	protected processCircle(changeInit = false) {
		const size = 2 * this._options.radius;

		if (changeInit) {
			this._initial.width = size;
			this._initial.height = size;
		}

		this._options.width = size;
		this._options.height = size;

		this.processOrigin()
	}

	clone() {
		return this[NodeFunctionClone]() as Circle2D;
	}

	reset(property?: keyof TCanvasNodeOptions["2D/circle"]): void {
		this[NodeFunctionReset](property)

		this.processCircle()

		this[GetApp][_Render].draw = true;
	}

	toObject(): TCanvasNodeOptions["2D/circle"] {
		return { ...this._options };
	}

	set(property: keyof TCanvasNodeOptions["2D/circle"], value: TAnything): void;
	set(properties: Partial<TCanvasNodeOptions["2D/circle"]>): void;
	set(properties?: unknown, value?: unknown): void {
		this[NodeFunctionSet](properties, value)

		this.processCircle()

		this[GetApp][_Render].draw = true;
	}

	static import(data: string, format: "JSON" | "YAML" = "JSON") {
		return GlobalNode[NodeFunctionImport](data, format) as Circle2D;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[NodeFunctionMake](structure) as Circle2D;
	}
}
