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
	CalculateNode2D,
	NodeFunctionClone,
	NodeFunctionImport,
	NodeFunctionMake,
	NodeFunctionReset,
	NodeFunctionSet,
	NodePropType,
} from "../../symbols";
import { _Render, GetApp } from "../../../app/symbols";

import { GlobalNode } from "../../global/global-node";

import { DEFAULT_CONFIG_NODE_2D } from "../../../configs/nodes/2D/node";
import { Vector2 } from "@/nodes/vectors/vector-2";
import { CanvasNode } from "@/nodes/global/class/canvas-node";

export class Node2D<T extends TCanvasNodeOptions["2D/node"] = TCanvasNodeOptions["2D/node"]>
	extends CanvasNode<T>
	implements IControlNode2D, IHandleCoords2D {
	[NodePropType]: TCanvasNodes = "2D/node";

	[CalculateNode2D]: ICalculate = {
		angle: 0,
		origin: [0, 0]
	}

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

	get origin() {
		return this[CalculateNode2D].origin
	}

	get rotation() {
		return this._options.rotation;
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

		this[GetApp][_Render].draw = true;
	}

	set scale(value: Vector2 | TVec2) {
		if (typeof value === "string") {
			this._options.scale = Vector2.import(value)
		} else {
			this._options.scale = value
		}

		this[GetApp][_Render].draw = true;
	}

	set skew(value: Vector2 | TVec2) {
		if (typeof value === "string") {
			this._options.skew = Vector2.import(value)
		} else {
			this._options.skew = value
		}

		this[GetApp][_Render].draw = true;
	}

	set flipX(value: boolean) {
		this._options.flipX = value;

		if (value)
			this.scale.x = -Math.abs(this.scale.x)
		else
			this.scale.x = Math.abs(this.scale.x)

		this[GetApp][_Render].draw = true;
	}

	set flipY(value: boolean) {
		this._options.flipY = value;

		if (value)
			this.scale.y = -Math.abs(this.scale.y)
		else
			this.scale.y = Math.abs(this.scale.y)

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

	protected calculateOrigin(): [number, number] {
		const originXNumber: Record<TTypeOriginX, number> = {
			left: 1,
			center: .5,
			right: 0,
		}

		const originYNumber: Record<TTypeOriginY, number> = {
			top: 1,
			center: .5,
			bottom: 0
		}

		let originX = 0
		let originY = 0

		if (typeof this._options.originX === "string") {
			originX = this._options.width * originXNumber[this._options.originX]
		} else {
			originX = this._options.width * this._options.originX
		}

		if (typeof this._options.originY === "string") {
			originY = this._options.height * originYNumber[this._options.originY]
		} else {
			originY = this._options.height * this._options.originY
		}

		return [originX, originY]
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
		this[CalculateNode2D].origin = this.calculateOrigin()
	}

	protected processRotation() {
		this[CalculateNode2D].angle = (this._options.rotation * Math.PI) / 180;
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
			this.position.x = (this._parent.width * this._parent.scale.x) / 2;
			this.position.y = (this._parent.height * this._parent.scale.y) / 2;
		} else {
			this.position.x = this[GetApp].size.width / 2;
			this.position.y = this[GetApp].size.height / 2;
		}
	}

	centerX() {
		if (this._parent && this._parent instanceof Node2D) {
			this.position.x = (this._parent.width * this._parent.scale.x) / 2;
		} else {
			this.position.x = this[GetApp].size.width / 2;
		}
	}

	centerY() {
		if (this._parent && this._parent instanceof Node2D) {
			this.position.y = (this._parent.height * this._parent.scale.y) / 2;
		} else {
			this.position.y = this[GetApp].size.height / 2;
		}
	}

	getBounds(): { x: number; y: number; width: number; height: number } {
		if (this.parent && this.parent instanceof Node2D) {
			const parentBounds = this.parent.getBounds();

			return {
				x: parentBounds.x + this.position.x - Math.abs(this[CalculateNode2D].origin[0] * this.scale.x),
				y: parentBounds.y + this.position.y - Math.abs(this[CalculateNode2D].origin[1] * this.scale.y),
				width: Math.abs(this.width * this.scale.x),
				height: Math.abs(this.height * this.scale.y)
			}
		}

		return {
			x: this.position.x - Math.abs(this[CalculateNode2D].origin[0] * this.scale.x),
			y: this.position.y - Math.abs(this[CalculateNode2D].origin[1] * this.scale.y),
			width: Math.abs(this.width * this.scale.x),
			height: Math.abs(this.height * this.scale.y)
		}
	}

	async clone(): Promise<Node2D> {
		return await this[NodeFunctionClone]() as TAnything;
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
		const options = { ...this._options };

		options.position = this.position.export() as TVec2
		options.scale = this.scale.export() as TVec2
		options.skew = this.skew.export() as TVec2

		return options
	}

	set(property: keyof TCanvasNodeOptions["2D/node"], value: TAnything): void;
	set(properties: Partial<TCanvasNodeOptions["2D/node"]>): void;
	set(properties?: unknown, value?: unknown): void {
		this[NodeFunctionSet](properties, value)

		this.processOrigin();
		this.processRotation();

		this[GetApp][_Render].draw = true;
	}

	static async import(data: string, format: TSerialize = "JSON"): Promise<Node2D> {
		return await GlobalNode[NodeFunctionImport](data, format) as TAnything;
	}

	static async make(structure: TExportNode<TAnything>): Promise<Node2D> {
		return await GlobalNode[NodeFunctionMake](structure) as TAnything;
	}
}
