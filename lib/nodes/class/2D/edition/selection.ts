import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import type { TAnything, TFunction, TSerialize } from "@/app/types";

import type { TEventNode, TEventNode2D, TEventSelection } from "@/nodes/events";
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
	DispatchEvent,
	GetApp,
} from "../../../../app/symbols";

import { Node2D } from "../node";
import { GlobalNode } from "@/nodes";

import { DEFAULT_CONFIG_SELECTION_2D } from "../../../../configs/nodes/2D/edition/selection";

export class Selection2D<T extends TCanvasNodeOptions["2D/selection"] = TCanvasNodeOptions["2D/selection"]> extends Node2D<T> {
	[NodePropType]: TCanvasNodes = "2D/selection";

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

	set endX(value: number) {
		this._options.endX = value;

		this[GetApp][_Render].draw = true;
	}

	set endY(value: number) {
		this._options.endY = value;

		this[GetApp][_Render].draw = true;
	}

	set startX(value: number) {
		this._options.startX = value;

		this[GetApp][_Render].draw = true;
	}

	set startY(value: number) {
		this._options.startY = value;

		this[GetApp][_Render].draw = true;
	}

	set shape(value: "rectangle" | "circle" | "triangle" | "polygon") {
		this._options.shape = value;

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

		this[GetApp][_Render].draw = true;
	}

	set height(value: number) {
		this._options.height = value;

		this[GetApp][_Render].draw = true;
	}

	constructor(
		slug: string,
		options?: Partial<TCanvasNodeOptions["2D/selection"]>,
	) {
		super(slug, { ...DEFAULT_CONFIG_SELECTION_2D, ...options });
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

	async clone(): Promise<Selection2D> {
		return await this[NodeFunctionClone]() as TAnything;
	}

	emit(
		event: TEventNode | TEventNode2D | TEventSelection,
		callback: TFunction,
	): void {
		this._events.addEventListener(event, callback);
	}

	reset(property?: keyof TCanvasNodeOptions["2D/selection"]): void {
		this[NodeFunctionReset](property)
	}

	toObject(): T {
		return { ...super.toObject() };
	}

	set(
		property: keyof TCanvasNodeOptions["2D/selection"],
		value: TAnything,
	): void;
	set(properties: Partial<TCanvasNodeOptions["2D/selection"]>): void;
	set(properties?: unknown, value?: unknown): void {
		this[NodeFunctionSet](properties, value)
	}

	static async import(data: string, format: TSerialize = "JSON"): Promise<Selection2D> {
		return await GlobalNode[NodeFunctionImport](data, format) as TAnything;
	}

	static async make(structure: TExportNode<TAnything>): Promise<Selection2D> {
		return await GlobalNode[NodeFunctionMake](structure) as TAnything;
	}
}
