import type { AllTypesSimple, TAnything } from "@/types";
import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import type {
	INodeWorker,
	TExportNode,
	TTypeNodes,
} from "@/nodes/global/node.types";

import {
	MethodClone,
	MethodImport,
	MethodMake,
	PropType,
} from "../../../symbols";
import { _Drawer, ExportWorker, GetApp } from "../../../../symbols";

import { Node2D } from "../node";
import { GlobalNode } from "@/nodes";

import { DEFAULT_CONFIG_CONTROL_EDITION_2D } from "../../../../configs/nodes/2D/edition/control-edition";

export class ControlEdition2D extends Node2D {
	[PropType]: TCanvasNodes = "2D/control-edition";

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

	set padding(value:
		| number
		| [number, number]
		| [number, number, number, number]) {
		this._options.padding = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				padding: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set cornerSize(value: number) {
		this._options.cornerSize = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				cornerSize: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set cornerColor(value: string) {
		this._options.cornerColor = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				cornerColor: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set cornerBorder(value: boolean) {
		this._options.cornerBorder = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				cornerBorder: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set cornerColorBorder(value: string) {
		this._options.cornerColorBorder = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				cornerColorBorder: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
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

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				showCorner: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set background(value: string) {
		this._options.background = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				background: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
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

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				radius: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
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
		return this[MethodClone]() as ControlEdition2D;
	}

	reset(property?: keyof TCanvasNodeOptions["2D/control-edition"]): void {
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

		this[GetApp]()[_Drawer].render.reDraw();
	}

	toObject(): TCanvasNodeOptions["2D/control-edition"] {
		return this._options;
	}

	set(
		property: keyof TCanvasNodeOptions["2D/control-edition"],
		value: AllTypesSimple,
	): void;
	set(properties: Partial<TCanvasNodeOptions["2D/control-edition"]>): void;
	set(properties?: unknown, value?: unknown): void {
		if (properties && typeof properties === "string" && value) {
			this._options[
				properties as keyof TCanvasNodeOptions["2D/control-edition"]
			] = value as never;

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
				this._options[key as keyof TCanvasNodeOptions["2D/control-edition"]] =
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
	}

	static import(data: string, format: "JSON" | "YAML" = "JSON") {
		return GlobalNode[MethodImport](data, format) as ControlEdition2D;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[MethodMake](structure) as ControlEdition2D;
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
