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
	NodePropType,
} from "../../../symbols";
import {
	_Render,
	_Worker,
	ExportWorker,
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

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				background: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}

	set radius(value: number) {
		this._options.radius = value;

		this.applySizeCircle();

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				radius: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}

	set border(value: boolean) {
		this._options.border = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				border: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}

	set borderColor(value: string) {
		this._options.borderColor = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				borderColor: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}

	set borderWidth(value: number) {
		this._options.borderWidth = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				borderWidth: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}

	set startAngle(value: number) {
		this._options.startAngle = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				startAngle: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}

	set endAngle(value: number) {
		this._options.endAngle = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				endAngle: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}

	set counterclockwise(value: boolean) {
		this._options.counterclockwise = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				counterclockwise: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();

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

		this.applySizeCircle(true);
	}

	protected applySizeCircle(changeInit = false) {
		const size = 2 * this._options.radius;

		if (changeInit) {
			this._initial.width = size;
			this._initial.height = size;
		}

		this._options.width = size;
		this._options.height = size;
	}

	clone() {
		return this[NodeFunctionClone]() as Circle2D;
	}

	reset(property?: keyof TCanvasNodeOptions["2D/circle"]): void {
		if (property) {
			this._options[property] = this._initial[property] as never;

			if (!this._omit.includes(property)) {
				const relative: Record<string, TAnything> = {};

				relative[property] = this._initial[property];
				relative.calculate = this.processCalculate();

				this.applySizeCircle();

				this[GetApp][_Worker].nodes.updateNode(
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

			this.applySizeCircle();

			this[GetApp][_Worker].nodes.updateNode(
				this.id,
				options,
				this.path,
				"path",
				"index",
			);
		}

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}

	toObject(): TCanvasNodeOptions["2D/circle"] {
		return { ...this._options };
	}

	set(property: keyof TCanvasNodeOptions["2D/circle"], value: TAnything): void;
	set(properties: Partial<TCanvasNodeOptions["2D/circle"]>): void;
	set(properties?: unknown, value?: unknown): void {
		if (properties && typeof properties === "string" && value) {
			this._options[properties as keyof TCanvasNodeOptions["2D/circle"]] =
				value as never;

			if (!this._omit.includes(properties)) {
				const relative: Record<string, TAnything> = {};

				relative[properties] = value;
				relative.calculate = this.processCalculate();

				this.applySizeCircle();

				this[GetApp][_Worker].nodes.updateNode(
					this.id,
					relative,
					this.path,
					"path",
					"index",
				);
			}
		} else if (typeof properties !== "string" && properties) {
			for (const [key, value] of Object.entries(properties)) {
				this._options[key as keyof TCanvasNodeOptions["2D/circle"]] =
					value as never;
			}

			const options = this.utils.omitKeys(properties, this._omit, [
				"calculate",
			]);
			options.calculate = this.processCalculate();

			this.applySizeCircle();

			this[GetApp][_Worker].nodes.updateNode(
				this.id,
				options,
				this.path,
				"path",
				"index",
			);
		}

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}

	static import(data: string, format: "JSON" | "YAML" = "JSON") {
		return GlobalNode[NodeFunctionImport](data, format) as Circle2D;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[NodeFunctionMake](structure) as Circle2D;
	}

	[ExportWorker](childNode = true): INodeProcess {
		const nodes: INodeProcess[] = [];

		if (childNode && this.$nodes.size) {
			for (const node of this.$nodes.all) {
				nodes.push(node[ExportWorker](true) as INodeProcess);
			}
		}

		const node = {
			__type__: this[NodePropType],
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
