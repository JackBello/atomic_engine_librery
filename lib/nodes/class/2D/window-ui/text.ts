import type { AllTypesSimple, TAnything } from "@/types";
import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import type {
	INodeWorker,
	TExportNode,
	TTypeGlobalFont,
	TTypeNodes,
} from "@/nodes/global/node.types";

import {
	MethodClone,
	MethodImport,
	MethodMake,
	PropType,
} from "../../../symbols";
import { _Drawer, ExportWorker, GetApp, SetGlobal } from "../../../../symbols";

import { Node2D } from "../node";
import { GlobalNode } from "@/nodes";

import { DEFAULT_CONFIG_TEXT_2D } from "../../../../configs/nodes/2D/interface/text";

export class Text2D extends Node2D {
	[PropType]: TCanvasNodes = "2D/text";

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

	set border(value: boolean) {
		this._options.border = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				border: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	set borderColor(value: string) {
		this._options.borderColor = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				borderColor: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	set borderWidth(value: number) {
		this._options.borderWidth = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				borderWidth: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	set text(value: string) {
		this._options.text = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				text: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
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

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				fontSize: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	set fontFamily(value: string) {
		this._options.fontFamily = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				fontFamily: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
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

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				fontStretch: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	set fontStyle(value:
		| "normal"
		| TTypeGlobalFont
		| "italic"
		| "oblique"
		| `oblique ${string}deg`) {
		this._options.fontStyle = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				fontStyle: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	set fontWeight(value:
		| number
		| "normal"
		| TTypeGlobalFont
		| "bold"
		| "lighter"
		| "bolder") {
		this._options.fontWeight = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				fontWeight: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	set fontVariant(value: string) {
		this._options.fontVariant = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				fontVariant: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
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

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				lineHeight: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	set textAlign(value: "center" | "left" | "right" | "start" | "end") {
		this._options.textAlign = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				textAlign: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	set textBaseline(value:
		| "top"
		| "bottom"
		| "hanging"
		| "middle"
		| "alphabetic"
		| "ideographic") {
		this._options.textBaseline = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				textBaseline: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	set textDirection(value: "inherit" | "ltr" | "rtl") {
		this._options.textDirection = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				textDirection: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
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

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				wordSpacing: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
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

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				letterSpacing: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	set color(value: string) {
		this._options.color = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				color: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	constructor(slug: string, options?: Partial<TCanvasNodeOptions["2D/text"]>) {
		super(slug, { ...DEFAULT_CONFIG_TEXT_2D, ...options });

		this._initial = { ...DEFAULT_CONFIG_TEXT_2D, ...options };
		this._options = this._initial;
	}

	clone() {
		return this[MethodClone]() as Text2D;
	}

	reset(property?: keyof TCanvasNodeOptions["2D/text"]): void {
		if (property) {
			this._options[property] = this._initial[property] as never;

			if (!this._omit.includes(property)) {
				const relative: Record<string, AllTypesSimple> = {};

				relative[property] = this._initial[property];
				relative.calculate = this.processCalculate();

				this[GetApp]()[_Drawer].nodes.updateNode(
					this.id,
					relative,
					this.path,
					"path",
					"index",
				);
			}
		} else {
			this._options = { ...this._initial };

			const options = this.utils.omitKeys(this._initial, this._omit, [
				"calculate",
			]);
			options.calculate = this.processCalculate();

			this[GetApp]()[_Drawer].nodes.updateNode(
				this.id,
				options,
				this.path,
				"path",
				"index",
			);
		}
	}

	toObject(): TCanvasNodeOptions["2D/text"] {
		return { ...this._options };
	}

	set(
		property: keyof TCanvasNodeOptions["2D/text"],
		value: AllTypesSimple,
	): void;
	set(properties: Partial<TCanvasNodeOptions["2D/text"]>): void;
	set(properties?: unknown, value?: unknown): void {
		if (properties && typeof properties === "string" && value) {
			this._options[properties as keyof TCanvasNodeOptions["2D/text"]] =
				value as never;

			if (!this._omit.includes(properties)) {
				const relative: Record<string, AllTypesSimple> = {};

				relative[properties] = value;
				relative.calculate = this.processCalculate();

				this[GetApp]()[_Drawer].nodes.updateNode(
					this.id,
					relative,
					this.path,
					"path",
					"index",
				);
			}
		} else if (typeof properties !== "string" && properties) {
			for (const [key, value] of Object.entries(properties)) {
				this._options[key as keyof TCanvasNodeOptions["2D/text"]] =
					value as never;
			}

			const options = this.utils.omitKeys(properties, this._omit, [
				"calculate",
			]);
			options.calculate = this.processCalculate();

			this[GetApp]()[_Drawer].nodes.updateNode(
				this.id,
				options,
				this.path,
				"path",
				"index",
			);
		}

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	static import(data: string, format: "JSON" | "YAML" = "JSON") {
		return GlobalNode[MethodImport](data, format) as Text2D;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[MethodMake](structure) as Text2D;
	}

	[ExportWorker](childNode = true): INodeWorker {
		const nodes: INodeWorker[] = [];

		if (childNode && this.$nodes.size)
			for (const node of this.$nodes.all) {
				nodes.push(node[ExportWorker](true) as INodeWorker);
			}

		const node = {
			__type__: this[PropType],
			__path__: this.path,
			location: {
				id: this.id,
				index: this.index,
				slug: this.slug,
			},
			nodes: nodes,
			options: this.utils.omitKeys(this.toObject(), this._omit, ["calculate"]),
		};

		node.options.calculate = this.processCalculate();

		return node;
	}
}
