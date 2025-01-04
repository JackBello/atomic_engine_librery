import type { TAnything, TSerialize } from "@/app/types";
import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import type {
	TExportNode,
	TTypeGlobalFont,
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
} from "../../../../symbols";
import {
	_Render,
	_Worker,
	GetApp,
} from "../../../../../app/symbols";

import { Node2D } from "../../node";
import { GlobalNode } from "@/nodes";

import { DEFAULT_CONFIG_TEXT_2D } from "../../../../../configs/nodes/2D/window-ui/text/text";

export class Text2D<T extends TCanvasNodeOptions["2D/text"] = TCanvasNodeOptions["2D/text"]> extends Node2D<T> {
	[NodePropType]: TCanvasNodes = "2D/text";

	readonly NODE_NAME: TTypeNodes = "Text2D";

	get stroke() {
		return this._options.stroke;
	}

	get lineWidth() {
		return this._options.lineWidth;
	}

	get fill() {
		return this._options.fill;
	}

	get text() {
		return this._options.text;
	}

	get fontSize() {
		return this._options.fontSize;
	}

	get fontFamily() {
		return this._options.fontFamily;
	}

	get fontStretch() {
		return this._options.fontStretch;
	}

	get fontStyle() {
		return this._options.fontStyle;
	}

	get fontWeight() {
		return this._options.fontWeight;
	}

	get fontVariant() {
		return this._options.fontVariant;
	}

	get textAlign() {
		return this._options.textAlign;
	}

	get textBaseline() {
		return this._options.textBaseline;
	}

	get textDirection() {
		return this._options.textDirection;
	}

	get font() {
		return `${this._options.fontStyle} ${this._options.fontVariant} ${this._options.fontWeight} ${this._options.fontSize} ${this._options.fontFamily}`
	}

	get width() {
		return this._options.width;
	}

	get height() {
		return this._options.height;
	}

	get origin() {
		return super.calculateOrigin()
	}

	set stroke(value: string | undefined) {
		this._options.stroke = value;

		this[GetApp][_Render].draw = true;
	}

	set lineWidth(value: number) {
		this._options.lineWidth = value;

		this[GetApp][_Render].draw = true;
	}

	set fill(value: string) {
		this._options.fill = value;

		this[GetApp][_Render].draw = true;
	}

	set text(value: string) {
		this._options.text = value;

		this.processText();

		this[GetApp][_Render].draw = true;
	}

	set fontSize(value:
		| `${string}px`
		| `${string}em`
		| `${string}pc`
		| `${string}cm`
		| `${string}rem`
		| `${string}pt`
		| `${string}inch`
		| `${string}%`) {
		this._options.fontSize = value;

		this.processText();

		this[GetApp][_Render].draw = true;
	}

	set fontFamily(value: string) {
		this._options.fontFamily = value;

		this.processText();

		this[GetApp][_Render].draw = true;
	}

	set fontStretch(value:
		| `${string}%`
		| "normal"
		| "ultra-condensed"
		| "extra-condensed"
		| "condensed"
		| "semi-condensed"
		| "semi-expanded"
		| "expanded"
		| "extra-expanded"
		| "ultra-expanded"
		| TTypeGlobalFont) {
		this._options.fontStretch = value;

		this.processText();

		this[GetApp][_Render].draw = true;
	}

	set fontStyle(value:
		| "normal"
		| TTypeGlobalFont
		| "italic"
		| "oblique"
		| `oblique ${string}deg`) {
		this._options.fontStyle = value;

		this.processText();

		this[GetApp][_Render].draw = true;
	}

	set fontWeight(value:
		| number
		| "normal"
		| TTypeGlobalFont
		| "bold"
		| "lighter"
		| "bolder") {
		this._options.fontWeight = value;

		this.processText();

		this[GetApp][_Render].draw = true;
	}

	set fontVariant(value: string) {
		this._options.fontVariant = value;

		this.processText();

		this[GetApp][_Render].draw = true;
	}

	set textAlign(value: "center" | "left" | "right") {
		this._options.textAlign = value;

		this.processText();

		this[GetApp][_Render].draw = true;
	}

	set textBaseline(value:
		| "top"
		| "bottom"
		| "hanging"
		| "middle"
		| "alphabetic"
		| "ideographic") {
		this._options.textBaseline = value

		this.processText();

		this[GetApp][_Render].draw = true;
	}

	set textDirection(value: "inherit" | "ltr" | "rtl") {
		this._options.textDirection = value;

		this.processText();

		this[GetApp][_Render].draw = true;
	}

	constructor(
		slug: string,
		options?: Partial<Omit<TCanvasNodeOptions["2D/text"], "width" | "height">>,
	) {
		super(slug, { ...DEFAULT_CONFIG_TEXT_2D, ...options });

		this.processText(true);
	}

	protected calculateOrigin(): [number, number] {
		const metrics = this.utils.infoText(this._options.text, `${this._options.fontStyle} ${this._options.fontVariant} ${this._options.fontWeight} ${this._options.fontSize} ${this._options.fontFamily}`);

		const width = Math.floor(
			Math.abs(metrics.actualBoundingBoxLeft) +
			Math.abs(metrics.actualBoundingBoxRight),
		);

		const ascent = Math.abs(metrics.actualBoundingBoxAscent)
		const descent = Math.abs(metrics.actualBoundingBoxDescent)

		const originXWithTextAlign: Record<"center" | "left" | "right", number> = {
			"left": width,
			"center": 0,
			"right": -width
		}

		const originYWithTextBaseline: Record<"top" | "bottom" | "hanging" | "middle" | "alphabetic" | "ideographic", number> = {
			"top": -ascent,
			"middle": 0,
			"bottom": descent,
			"alphabetic": descent - ascent,
			"hanging": -ascent,
			"ideographic": descent
		}

		const originXNumber: Record<TTypeOriginX, number> = {
			left: 1,
			center: .5,
			right: 0,
		}

		const originYNumber: Record<TTypeOriginY, number> = {
			top: 0,
			center: .5,
			bottom: 1
		}

		const originXTextAlign = originXWithTextAlign[this.textAlign]
		const originYTextBaseline = originYWithTextBaseline[this.textBaseline]

		let originX = 0
		let originY = 0

		if (typeof this._options.originX === "string") {
			originX = originXTextAlign * originXNumber[this._options.originX]
		} else {
			originX = originXTextAlign * this._options.originX
		}

		if (typeof this._options.originY === "string") {
			originY = originYTextBaseline * originYNumber[this._options.originY]
		} else {
			originY = originYTextBaseline * this._options.originY
		}

		return [originX, originY]
	}

	protected processText(changeInit = false) {
		const metrics = this.utils.infoText(this._options.text, `${this._options.fontStyle} ${this._options.fontVariant} ${this._options.fontWeight} ${this._options.fontSize} ${this._options.fontFamily}`);

		const width = Math.floor(
			Math.abs(metrics.actualBoundingBoxLeft) +
			Math.abs(metrics.actualBoundingBoxRight),
		);
		const height = Math.floor(
			Math.abs(metrics.actualBoundingBoxAscent) +
			Math.abs(metrics.actualBoundingBoxDescent),
		);

		if (changeInit) {
			this._initial.width = width;
			this._initial.height = height;
		}

		this._options.width = width;
		this._options.height = height;

		this.processOrigin()
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

	async clone(): Promise<Text2D> {
		return await this[NodeFunctionClone]() as TAnything;
	}

	reset(property?: keyof TCanvasNodeOptions["2D/text"]): void {
		this[NodeFunctionReset](property)

		this.processText()

		this[GetApp][_Render].draw = true;
	}

	toObject(): T {
		return { ...super.toObject() };
	}

	set(property: keyof TCanvasNodeOptions["2D/text"], value: TAnything): void;
	set(properties: Partial<TCanvasNodeOptions["2D/text"]>): void;
	set(properties?: unknown, value?: unknown): void {
		this[NodeFunctionSet](properties, value)

		this.processText()

		this[GetApp][_Render].draw = true;
	}

	static async import(data: string, format: TSerialize = "JSON"): Promise<Text2D> {
		return await GlobalNode[NodeFunctionImport](data, format) as TAnything;
	}

	static async make(structure: TExportNode<TAnything>): Promise<Text2D> {
		return await GlobalNode[NodeFunctionMake](structure) as TAnything;
	}
}
