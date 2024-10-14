import type {
	INodeWorker,
	TCursorOptions,
	TExportNode,
	TTypeNodes,
	TTypeOrigin,
	TTypeOriginX,
	TTypeOriginY,
} from "@/nodes/global/node.types";
import type {
	ICalculate,
	IControlNode2D,
	IHandleCoords2D,
} from "../nodes-2D.types";
import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import type { TEventNode, TEventNode2D } from "../../event.type";
import type { AllTypesSimple, TAnything, TFunction } from "../../../types";

import { MethodClone, MethodImport, MethodMake, PropType } from "../../symbols";
import { _Drawer, ExportWorker, GetApp } from "../../../symbols";

import { GlobalNode } from "../../global/global-node";

import { DEFAULT_CONFIG_NODE_2D } from "../../../configs/nodes/2D/node";

export class Node2D
	extends GlobalNode
	implements IControlNode2D, IHandleCoords2D
{
	[PropType]: TCanvasNodes = "2D/node";

	protected _omit: string[] = [
		"centerRotation",
		"centerScale",
		"flipX",
		"flipY",
		"originX",
		"originY",
		"title",
		"name",
	];
	protected _options: TCanvasNodeOptions["2D/node"];
	protected _initial: TCanvasNodeOptions["2D/node"];

	readonly NODE_NAME: TTypeNodes = "Node2D";

	get visible() {
		return this._options.visible;
	}

	get selectable() {
		return this._options.selectable;
	}

	get hovered() {
		return this._options.hovered;
	}

	get lock() {
		return this._options.lock;
	}

	get cursor() {
		return this._options.cursor;
	}

	get opacity() {
		return this._options.opacity;
	}

	get x() {
		return this._options.x;
	}

	get y() {
		return this._options.y;
	}

	get width() {
		return this._options.width;
	}

	get height() {
		return this._options.height;
	}

	get centerScale() {
		return this._options.centerScale;
	}

	get centerRotation() {
		return this._options.centerRotation;
	}

	get flipX() {
		return this._options.flipX;
	}

	get flipY() {
		return this._options.flipY;
	}

	get originX() {
		return this._options.originX;
	}

	get originY() {
		return this._options.originY;
	}

	get scaleX() {
		return this._options.scaleX;
	}

	get scaleY() {
		return this._options.scaleY;
	}

	get skewX() {
		return this._options.skewX;
	}

	get skewY() {
		return this._options.skewY;
	}

	get rotation() {
		return this._options.rotation;
	}

	set visible(value: boolean) {
		this._options.visible = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				visible: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set selectable(value: boolean) {
		this._options.selectable = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				selectable: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set hovered(value: boolean) {
		this._options.hovered = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				hovered: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set lock(value: boolean) {
		this._options.lock = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				lock: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set cursor(value: TCursorOptions) {
		this._options.cursor = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				cursor: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set opacity(value: number) {
		this._options.opacity = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				opacity: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set x(value: number) {
		this._options.x = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				x: value,
				calculate: this.processCalculate(),
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set y(value: number) {
		this._options.y = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				y: value,
				calculate: this.processCalculate(),
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set width(value: number) {
		this._options.width = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				width: value,
				calculate: this.processCalculate(),
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set height(value: number) {
		this._options.height = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				height: value,
				calculate: this.processCalculate(),
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set centerScale(value: boolean) {
		this._options.centerScale = value;

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set centerRotation(value: boolean) {
		this._options.centerRotation = value;

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set flipX(value: boolean) {
		this._options.flipX = value;

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set flipY(value: boolean) {
		this._options.flipY = value;

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set originX(value: TTypeOriginX) {
		this._options.originX = value;

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set originY(value: TTypeOriginY) {
		this._options.originY = value;

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set scaleX(value: number) {
		this._options.scaleX = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				scaleX: value,
				calculate: this.processCalculate(),
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set scaleY(value: number) {
		this._options.scaleY = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				scaleY: value,
				calculate: this.processCalculate(),
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set skewX(value: number) {
		this._options.skewX = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				skewX: value,
				calculate: this.processCalculate(),
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set skewY(value: number) {
		this._options.skewY = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				skewY: value,
				calculate: this.processCalculate(),
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set rotation(value: number) {
		this._options.rotation = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				rotation: value,
				calculate: this.processCalculate(),
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	constructor(slug: string, options?: Partial<TCanvasNodeOptions["2D/node"]>) {
		super(slug, { ...DEFAULT_CONFIG_NODE_2D, ...options });

		this._initial = { ...DEFAULT_CONFIG_NODE_2D, ...options };
		this._options = { ...this._initial };
	}

	setOrigin(origin: TTypeOrigin): void {
		if (origin === "center") {
			this.originX = origin;
			this.originY = origin;
		} else {
			const [originY, originX] = origin.split("-") as [
				TTypeOriginY,
				TTypeOriginX,
			];
			this.originX = originX;
			this.originY = originY;
		}
	}

	setScale(scale: number): void {
		this.scaleX = scale;
		this.scaleY = scale;
	}

	scaleToWidth(width: number): void {
		this.scaleX = width / this.width;
	}

	scaleToHeight(height: number): void {
		this.scaleY = height / this.height;
	}

	setSkew(skew: number): void {
		this.skewX = skew;
		this.skewY = skew;
	}

	center(): void {
		if (this._parent && this._parent instanceof Node2D) {
			this.x =
				((this._parent.width * this._parent.scaleX) / 2 -
					(this.width * this.scaleX) / 2) /
				2;
			this.y =
				((this._parent.height * this._parent.scaleY) / 2 -
					(this.height * this.scaleY) / 2) /
				2;
		} else {
			this.x = this[GetApp]().size.width / 2;
			this.y = this[GetApp]().size.height / 2;
		}
	}

	centerX() {
		if (this._parent && this._parent instanceof Node2D) {
			this.x =
				((this._parent.width * this._parent.scaleX) / 2 -
					(this.width * this.scaleX) / 2) /
				2;
		} else {
			this.x = (this[GetApp]().size.width / 2 - (this.width * this.scaleX) / 2) / 2;
		}
	}

	centerY() {
		if (this._parent && this._parent instanceof Node2D) {
			this.y =
				((this._parent.height * this._parent.scaleY) / 2 -
					(this.height * this.scaleY) / 2) /
				2;
		} else {
			this.y =
				(this[GetApp]().size.height / 2 - (this.height * this.scaleY) / 2) / 2;
		}
	}

	processCalculate() {
		const calculate: ICalculate["calculate"] = {
			middleScaleFactor: {
				height: 0,
				width: 0,
			},
			rotation: 0,
			scaleFactor: {
				height: 0,
				width: 0,
			},
			translate: {
				x: 0,
				y: 0,
			},
			scale: {
				x: 0,
				y: 0,
			},
		};

		calculate.scale = {
			x: this._options.scaleX,
			y: this._options.scaleY,
		};

		calculate.translate = {
			x: this._options.x,
			y: this._options.y,
		};

		calculate.rotation = (this._options.rotation * Math.PI) / 180;

		calculate.scaleFactor = {
			width: this._options.width,
			height: this._options.height,
		};

		calculate.middleScaleFactor = {
			width: calculate.scaleFactor.width / 2,
			height: calculate.scaleFactor.height / 2,
		};

		return calculate;
	}

	clone() {
		return this[MethodClone]() as Node2D;
	}

	emit(event: TEventNode | TEventNode2D, callback: TFunction): void {
		this._events.addEventListener(event, callback);
	}

	reset(property?: keyof TCanvasNodeOptions["2D/node"]): void {
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

	toObject(): TCanvasNodeOptions["2D/node"] {
		return { ...this._options };
	}

	set(
		property: keyof TCanvasNodeOptions["2D/node"],
		value: AllTypesSimple,
	): void;
	set(properties: Partial<TCanvasNodeOptions["2D/node"]>): void;
	set(properties?: unknown, value?: unknown): void {
		if (properties && typeof properties === "string" && value) {
			this._options[properties as keyof TCanvasNodeOptions["2D/node"]] =
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
				this._options[key as keyof TCanvasNodeOptions["2D/node"]] =
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
		return GlobalNode[MethodImport](data, format) as Node2D;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[MethodMake](structure) as Node2D;
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
