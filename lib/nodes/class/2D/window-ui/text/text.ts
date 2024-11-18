import type { TAnything } from "@/app/types";
import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import type {
	TExportNode,
	TTypeGlobalFont,
	TTypeNodes,
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

import { DEFAULT_CONFIG_TEXT_2D } from "../../../../../configs/nodes/2D/interface/text";

export class Text2D extends Node2D {
	[NodePropType]: TCanvasNodes = "2D/text";

	protected _options: TCanvasNodeOptions["2D/text"];
	protected _initial: TCanvasNodeOptions["2D/text"];

	readonly NODE_NAME: TTypeNodes = "Text2D";

	get border() {
		return this._options.border;
	}

	get borderColor() {
		return this._options.borderColor;
	}

	get borderWidth() {
		return this._options.borderWidth;
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

	get lineHeight() {
		return this._options.lineHeight;
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

	get wordSpacing() {
		return this._options.wordSpacing;
	}

	get letterSpacing() {
		return this._options.letterSpacing;
	}

	get color() {
		return this._options.color;
	}

	get font() {
		return `${this._options.fontStretch ? `${this._options.fontStretch} ` : ""
			}${this._options.fontVariant ? `${this._options.fontVariant} ` : ""}${this._options.fontStyle ? `${this._options.fontStyle} ` : ""
			}${this._options.fontWeight ? `${this._options.fontWeight} ` : ""}${this._options.fontSize ? `${this._options.fontSize} ` : ""
			}${this._options.lineHeight ? `${this._options.lineHeight} ` : ""}${this._options.fontFamily ? this._options.fontFamily : ""
			}`;
	}

	get width() {
		return this._options.width;
	}

	get height() {
		return this._options.height;
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

	set lineHeight(value:
		| `${string}px`
		| `${string}em`
		| `${string}pc`
		| `${string}cm`
		| `${string}rem`
		| `${string}pt`
		| `${string}inch`
		| `${string}%`
		| "normal"
		| TTypeGlobalFont) {
		this._options.lineHeight = value;

		this.processText();

		this[GetApp][_Render].draw = true;
	}

	set textAlign(value: "center" | "left" | "right") {
		this._options.textAlign = value;

		this[GetApp][_Render].draw = true;
	}

	set textBaseline(value:
		| "top"
		| "bottom"
		| "hanging"
		| "middle"
		| "alphabetic"
		| "ideographic") {
		this._options.textBaseline = value;

		this[GetApp][_Render].draw = true;
	}

	set textDirection(value: "inherit" | "ltr" | "rtl") {
		this._options.textDirection = value;

		this[GetApp][_Render].draw = true;
	}

	set wordSpacing(value:
		| `${string}px`
		| `${string}em`
		| `${string}pc`
		| `${string}cm`
		| `${string}rem`
		| `${string}pt`
		| `${string}inch`
		| `${string}%`) {
		this._options.wordSpacing = value;

		this[GetApp][_Render].draw = true;
	}

	set letterSpacing(value:
		| `${string}px`
		| `${string}em`
		| `${string}pc`
		| `${string}cm`
		| `${string}rem`
		| `${string}pt`
		| `${string}inch`
		| `${string}%`) {
		this._options.letterSpacing = value;

		this[GetApp][_Render].draw = true;
	}

	set color(value: string) {
		this._options.color = value;

		this[GetApp][_Render].draw = true;
	}

	constructor(
		slug: string,
		options?: Partial<Omit<TCanvasNodeOptions["2D/text"], "width" | "height">>,
	) {
		super(slug, { ...DEFAULT_CONFIG_TEXT_2D, ...options });

		this._initial = { ...DEFAULT_CONFIG_TEXT_2D, ...options };
		this._options = this._initial;

		this.processText(true);
	}

	protected processText(changeInit = false) {
		const metrics = this.utils.infoText(this._options.text, this.font);

		const width = Math.floor(
			Math.abs(metrics.actualBoundingBoxLeft) +
			Math.abs(metrics.actualBoundingBoxRight),
		);
		const height = Math.floor(
			Math.abs(metrics.actualBoundingBoxAscent) +
			Math.abs(metrics.actualBoundingBoxDescent),
		);

		const ascent = Math.abs(metrics.actualBoundingBoxAscent)
		const descent = Math.abs(metrics.actualBoundingBoxDescent)

		if (changeInit) {
			this._initial.width = width;
			this._initial.height = height;
		}

		this._options.width = width;
		this._options.height = height;

		this.processOrigin()

		const originXWithTextAlign: Record<"center" | "left" | "right", number> = {
			"left": width / 2,
			"center": 0,
			"right": -width / 2
		}

		const originXWithTextBaseline: Record<"top" | "bottom" | "hanging" | "middle" | "alphabetic" | "ideographic", number> = {
			"top": -ascent / 2,
			"middle": 0,
			"bottom": descent / 2,
			"alphabetic": descent / 2 - ascent / 2,
			"hanging": -ascent / 2,
			"ideographic": descent / 2
		}

		this._calculate.origin[0] = originXWithTextAlign[this.textAlign]
		this._calculate.origin[1] = originXWithTextBaseline[this.textBaseline]
	}

	clone() {
		return this[NodeFunctionClone]() as Text2D;
	}

	reset(property?: keyof TCanvasNodeOptions["2D/text"]): void {
		this[NodeFunctionReset](property)

		this.processText()

		this[GetApp][_Render].draw = true;
	}

	toObject(): TCanvasNodeOptions["2D/text"] {
		return { ...this._options };
	}

	set(property: keyof TCanvasNodeOptions["2D/text"], value: TAnything): void;
	set(properties: Partial<TCanvasNodeOptions["2D/text"]>): void;
	set(properties?: unknown, value?: unknown): void {
		this[NodeFunctionSet](properties, value)

		this.processText()

		this[GetApp][_Render].draw = true;
	}

	static import(data: string, format: "JSON" | "YAML" = "JSON") {
		return GlobalNode[NodeFunctionImport](data, format) as Text2D;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[NodeFunctionMake](structure) as Text2D;
	}
}
