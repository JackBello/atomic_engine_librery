import type {
	TExportNode,
	TTypeNodes,
	TTypeOrigin,
	TTypeOriginX,
	TTypeOriginY,
	TVec2,
} from "@/nodes/global/types";
import type {
	ICalculate,
	IControlNode2D,
	IHandleCoords2D,
} from "../nodes-2D.types";
import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import type { TEventNode, TEventNode2D } from "../../events";
import type { TAnything, TFunction, TSerialize } from "../../../app/types";

import {
	NodeFunctionClone,
	NodeFunctionImport,
	NodeFunctionMake,
	NodeFunctionReset,
	NodeFunctionSet,
	NodePropType,
} from "../../symbols";
import { _Render, ExportData, GetApp } from "../../../app/symbols";

import { GlobalNode } from "../../global/global-node";

import { DEFAULT_CONFIG_NODE_2D } from "../../../configs/nodes/2D/node";
import { Vector2 } from "@/nodes/vectors/vector-2";
import { CanvasNode } from "@/nodes/global/class/canvas-node";
import { serializers } from "@/app/utils/serialize";

export class Node2D<T extends TCanvasNodeOptions["2D/node"] = TCanvasNodeOptions["2D/node"]>
	extends CanvasNode<T>
	implements IControlNode2D, IHandleCoords2D {
	[NodePropType]: TCanvasNodes = "2D/node";

	protected _calculate: ICalculate = {
		angle: 0,
		origin: [0, 0]
	};

	readonly NODE_NAME: TTypeNodes = "Node2D";

	get position(): Vector2 {
		return this._options.position as Vector2
	}

	get scale(): Vector2 {
		return this._options.scale as Vector2
	}

	get skew(): Vector2 {
		return this._options.skew as Vector2
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

	get rotation() {
		return this._options.rotation;
	}

	get calculate() {
		return this._calculate;
	}

	get width() {
		return this._options.width
	}

	get height() {
		return this._options.height
	}

	set position(value: Vector2 | TVec2) {
		if (typeof value === "string") {
			this._options.position = Vector2.import(value)
		} else {
			this._options.position = value
		}
	}

	set scale(value: Vector2 | TVec2) {
		if (typeof value === "string") {
			this._options.scale = Vector2.import(value)
		} else {
			this._options.scale = value
		}
	}

	set skew(value: Vector2 | TVec2) {
		if (typeof value === "string") {
			this._options.skew = Vector2.import(value)
		} else {
			this._options.skew = value
		}
	}

	set flipX(value: boolean) {
		this._options.flipX = value;

		this[GetApp][_Render].draw = true;
	}

	set flipY(value: boolean) {
		this._options.flipY = value;

		this[GetApp][_Render].draw = true;
	}

	set originX(value: TTypeOriginX | number) {
		this._options.originX = value;

		this.processOrigin()

		this[GetApp][_Render].draw = true;
	}

	set originY(value: TTypeOriginY | number) {
		this._options.originY = value;

		this.processOrigin()

		this[GetApp][_Render].draw = true;
	}

	set rotation(value: number) {
		this._options.rotation = value;

		this.processRotation()

		this[GetApp][_Render].draw = true;
	}

	constructor(slug: string, options?: Partial<TCanvasNodeOptions["2D/node"]>) {
		super(slug, { ...DEFAULT_CONFIG_NODE_2D, ...options });

		this.processVector()
		this.processOrigin()
		this.processRotation()
	}

	protected processVector() {
		if (typeof this._initial.position === "string") {
			this._initial.position = Vector2.import(this._initial.position)
			this._options.position = this._initial.position
		}

		if (typeof this._initial.scale === "string") {
			this._initial.scale = Vector2.import(this._initial.scale)
			this._options.scale = this._initial.scale
		}

		if (typeof this._initial.skew === "string") {
			this._initial.skew = Vector2.import(this._initial.skew)
			this._options.skew = this._initial.skew
		}
	}

	protected processOrigin() {
		const originXNumber: Record<TTypeOriginX, number> = {
			left: 1,
			center: 0.5,
			right: 0,
		}

		const originYNumber: Record<TTypeOriginY, number> = {
			top: 1,
			center: 0.5,
			bottom: 0
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

	protected processRotation() {
		this._calculate.angle = (this._options.rotation * Math.PI) / 180;
	}

	setOrigin(origin: TTypeOrigin | number): void {
		if (typeof origin === "string" && origin === "center") {
			this.originX = origin;
			this.originY = origin;
		} else if (typeof origin === "string") {
			const [originY, originX] = origin.split("-") as [
				TTypeOriginY,
				TTypeOriginX,
			];
			this.originX = originX;
			this.originY = originY;
		} else {
			this.originX = origin
			this.originY = origin
		}
	}

	setScale(scale: number): void {
		this.scale.x = scale
		this.scale.y = scale
	}

	scaleToWidth(width: number): void {
		this.scale.x = width / this._options.width;
	}

	scaleToHeight(height: number): void {
		this.scale.y = height / this._options.height;
	}

	setSkew(skew: number): void {
		this.skew.x = skew;
		this.skew.y = skew;
	}

	center(): void {
		if (this._parent && this._parent instanceof Node2D) {
			this.position.x = (this._parent.width * this._parent.scaleX) / 2;
			this.position.y = (this._parent.height * this._parent.scaleY) / 2;
		} else {
			this.position.x = this[GetApp].size.width / 2;
			this.position.y = this[GetApp].size.height / 2;
		}
	}

	centerX() {
		if (this._parent && this._parent instanceof Node2D) {
			this.position.x = (this._parent.width * this._parent.scaleX) / 2;
		} else {
			this.position.x = this[GetApp].size.width / 2;
		}
	}

	centerY() {
		if (this._parent && this._parent instanceof Node2D) {
			this.position.y = (this._parent.height * this._parent.scaleY) / 2;
		} else {
			this.position.y = this[GetApp].size.height / 2;
		}
	}

	getBounds() {
		return {
			x: this.position.x - this.calculate.origin[0],
			y: this.position.y - this.calculate.origin[1],
			width: this.width * this.scale.x,
			height: this.height * this.scale.y
		}
	}

	clone() {
		return this[NodeFunctionClone]() as Node2D;
	}

	emit(event: TEventNode | TEventNode2D, callback: TFunction): void {
		this._events.addEventListener(event, callback);
	}

	reset(property?: keyof TCanvasNodeOptions["2D/node"]): void {
		this[NodeFunctionReset](property)

		this.processOrigin();
		this.processRotation();

		this[GetApp][_Render].draw = true;
	}

	toObject(): T {
		return { ...this._options };
	}

	set(property: keyof TCanvasNodeOptions["2D/node"], value: TAnything): void;
	set(properties: Partial<TCanvasNodeOptions["2D/node"]>): void;
	set(properties?: unknown, value?: unknown): void {
		this[NodeFunctionSet](properties, value)

		this.processOrigin();
		this.processRotation();

		this[GetApp][_Render].draw = true;
	}

	export(format: TSerialize = "JSON"): string {
		return serializers[format].stringify(this[ExportData]());
	}

	static import(data: string, format: "JSON" | "YAML" = "JSON") {
		return GlobalNode[NodeFunctionImport](data, format) as Node2D;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[NodeFunctionMake](structure) as Node2D;
	}

	[ExportData](childNode = true): TExportNode<TAnything> {
		const nodes: TExportNode<TAnything>[] = [];

		if (childNode && this.$nodes.size) {
			for (const node of this.$nodes.all) {
				nodes.push(node[ExportData](childNode));
			}
		}

		const options = this.toObject()

		if (options.position instanceof Vector2)
			options.position = options.position.export() as TVec2
		if (options.scale instanceof Vector2)
			options.scale = options.scale.export() as TVec2
		if (options.skew instanceof Vector2)
			options.skew = options.skew.export() as TVec2

		return {
			id: this.id,
			slug: this.slug,
			attributes: this.$attributes.toEntries(),
			metaKeys: this.$metaKeys.toEntries(),
			type: this.NODE_NAME,
			script: this.$script.source ?? 'NULL',
			path: this.path,
			index: this.index,
			nodes,
			options,
		};
	}
}
