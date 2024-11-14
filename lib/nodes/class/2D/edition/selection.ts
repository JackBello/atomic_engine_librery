import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import type { TAnything, TFunction } from "@/app/types";

import type { TEventNode, TEventNode2D, TEventSelection } from "@/nodes/events";
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
	DispatchEvent,
	ExportWorker,
	GetApp,
} from "../../../../app/symbols";

import { Node2D } from "../node";
import { GlobalNode } from "@/nodes";

import { DEFAULT_CONFIG_SELECTION_2D } from "../../../../configs/nodes/2D/edition/selection";

export class Selection2D extends Node2D {
	[NodePropType]: TCanvasNodes = "2D/selection";

	protected _options: TCanvasNodeOptions["2D/selection"];
	protected _initial: TCanvasNodeOptions["2D/selection"];

	protected _selectedNodes: Set<Node2D> = new Set();

	protected _intersectionNode: (node: Node2D) => boolean = () => false;

	readonly NODE_NAME: TTypeNodes = "Selection2D";

	get endX() {
		return this._options.endX;
	}

	get endY() {
		return this._options.endY;
	}

	get startX() {
		return this._options.startX;
	}

	get startY() {
		return this._options.startY;
	}

	get shape() {
		return this._options.shape;
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

	set endX(value: number) {
		this._options.endX = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				endX: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();
	}

	set endY(value: number) {
		this._options.endY = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				endY: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();
	}

	set startX(value: number) {
		this._options.startX = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				startX: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();
	}

	set startY(value: number) {
		this._options.startY = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				startY: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();
	}

	set shape(value: "rectangle" | "circle" | "triangle" | "polygon") {
		this._options.shape = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				shape: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();
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
	}

	set width(value: number) {
		this._options.width = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				width: value,
				calculate: this.processCalculate(),
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}

	set height(value: number) {
		this._options.height = value;

		this[GetApp][_Worker].nodes.updateNode(
			this.id,
			{
				height: value,
				calculate: this.processCalculate(),
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
		options?: Partial<TCanvasNodeOptions["2D/selection"]>,
	) {
		super(slug, { ...DEFAULT_CONFIG_SELECTION_2D, ...options });

		this._initial = { ...DEFAULT_CONFIG_SELECTION_2D, ...options };
		this._options = this._initial;
	}

	setIntersectionNode(func: (node: Node2D) => boolean) {
		this._intersectionNode = func;
	}

	select(nodes: Node2D[]) {
		for (const childNode of nodes) {
			if (this._intersectionNode(childNode)) {
				this._selectedNodes.add(childNode);
			} else this._selectedNodes.delete(childNode);
		}

		this[DispatchEvent]("selection2D:nodes", [...this._selectedNodes]);
	}

	clone() {
		return this[NodeFunctionClone]() as Selection2D;
	}

	emit(
		event: TEventNode | TEventNode2D | TEventSelection,
		callback: TFunction,
	): void {
		this._events.addEventListener(event, callback);
	}

	reset(property?: keyof TCanvasNodeOptions["2D/selection"]): void {
		if (property) {
			this._options[property] = this._initial[property] as never;

			if (!this._omit.includes(property)) {
				const relative: Record<string, TAnything> = {};

				relative[property] = this._initial[property];
				relative.calculate = this.processCalculate();

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

			this[GetApp][_Worker].nodes.updateNode(
				this.id,
				options,
				this.path,
				"path",
				"index",
			);
		}

		this[GetApp][_Worker].render.draw();
	}

	toObject(): TCanvasNodeOptions["2D/selection"] {
		return { ...this._options };
	}

	set(
		property: keyof TCanvasNodeOptions["2D/selection"],
		value: TAnything,
	): void;
	set(properties: Partial<TCanvasNodeOptions["2D/selection"]>): void;
	set(properties?: unknown, value?: unknown): void {
		if (properties && typeof properties === "string" && value) {
			this._options[properties as keyof TCanvasNodeOptions["2D/selection"]] =
				value as never;

			if (!this._omit.includes(properties)) {
				const relative: Record<string, TAnything> = {};

				relative[properties] = value;
				relative.calculate = this.processCalculate();

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
				this._options[key as keyof TCanvasNodeOptions["2D/selection"]] =
					value as never;
			}

			const options = this.utils.omitKeys(properties, this._omit, [
				"calculate",
			]);
			options.calculate = this.processCalculate();

			this[GetApp][_Worker].nodes.updateNode(
				this.id,
				options,
				this.path,
				"path",
				"index",
			);
		}

		this[GetApp][_Worker].render.draw();
	}

	static import(data: string, format: "JSON" | "YAML" = "JSON") {
		return GlobalNode[NodeFunctionImport](data, format) as Selection2D;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[NodeFunctionMake](structure) as Selection2D;
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
