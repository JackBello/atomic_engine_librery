import type { TAnything, TSerialize } from "@/app/types";
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
import { convertOffsetRectangleToCircle } from "@/app/utils/shapes";

export class Circle2D<T extends TCanvasNodeOptions["2D/circle"] = TCanvasNodeOptions["2D/circle"]> extends Node2D<T> {
	[NodePropType]: TCanvasNodes = "2D/circle";

	readonly NODE_NAME: TTypeNodes = "Circle2D";

	get fill() {
		return this._options.fill;
	}

	get radius() {
		return this._options.radius;
	}

	get stroke() {
		return this._options.stroke;
	}

	get lineWidth() {
		return this._options.lineWidth;
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

	set fill(value: string) {
		this._options.fill = value;

		this[GetApp][_Render].draw = true;
	}

	set radius(value: number) {
		this._options.radius = value;

		this.processCircle()

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

		this.processCircle(true);
	}

	protected calculateOrigin(): [number, number] {
		const originXNumber: Record<TTypeOriginX, number> = {
			left: .5,
			center: 0,
			right: -.5,
		}

		const originYNumber: Record<TTypeOriginY, number> = {
			top: .5,
			center: 0,
			bottom: -.5
		}

		let originX = 0
		let originY = 0

		if (typeof this._options.originX === "string") {
			originX = this._options.width * originXNumber[this._options.originX]
		} else {
			originX = this._options.width * convertOffsetRectangleToCircle(this._options.originX)
		}

		if (typeof this._options.originY === "string") {
			originY = this._options.height * originYNumber[this._options.originY]
		} else {
			originY = this._options.height * convertOffsetRectangleToCircle(this._options.originY)
		}

		return [originX, originY]
	}

	protected processCircle(changeInit = false) {
		const size = 2 * this._options.radius;

		if (changeInit) {
			this._initial.width = size;
			this._initial.height = size;
		}

		this._options.width = size;
		this._options.height = size;
	}

	getBounds() {
		const [originX, originY] = super.calculateOrigin()

		if (this.parent && this.parent instanceof Node2D) {
			const parentBounds = this.parent.getBounds()

			return {
				x: parentBounds.x + this.position.x - Math.abs(originX * this.scale.x),
				y: parentBounds.y + this.position.y - Math.abs(originY * this.scale.y),
				width: Math.abs(this.width * this.scale.x),
				height: Math.abs(this.height * this.scale.y)
			}
		}

		return {
			x: this.position.x - Math.abs(originX * this.scale.x),
			y: this.position.y - Math.abs(originY * this.scale.y),
			width: Math.abs(this.width * this.scale.x),
			height: Math.abs(this.height * this.scale.y)
		}
	}

	async clone(): Promise<Circle2D> {
		return await this[NodeFunctionClone]() as TAnything;
	}

	reset(property?: keyof TCanvasNodeOptions["2D/circle"]): void {
		this[NodeFunctionReset](property)

		this.processCircle()

		this[GetApp][_Render].draw = true;
	}

	toObject(): T {
		return { ...super.toObject() };
	}

	set(property: keyof TCanvasNodeOptions["2D/circle"], value: TAnything): void;
	set(properties: Partial<TCanvasNodeOptions["2D/circle"]>): void;
	set(properties?: unknown, value?: unknown): void {
		this[NodeFunctionSet](properties, value)

		this.processCircle()

		this[GetApp][_Render].draw = true;
	}

	static async import(data: string, format: TSerialize = "JSON"): Promise<Circle2D> {
		return await GlobalNode[NodeFunctionImport](data, format) as TAnything;
	}

	static async make(structure: TExportNode<TAnything>): Promise<Circle2D> {
		return await GlobalNode[NodeFunctionMake](structure) as TAnything;
	}
}
