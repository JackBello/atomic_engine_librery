import type {
	TExportNode,
	TTypeNodes,
	TTypeOrigin,
	TTypeOriginX,
	TTypeOriginY,
} from "@/nodes/global/types";
import type {
	ICalculate,
	IControlNode2D,
	IHandleCoords2D,
} from "../nodes-2D.types";
import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import type { TEventNode, TEventNode2D } from "../../events";
import type { TAnything, TFunction } from "../../../app/types";

import {
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
import { Transform2D } from "@/nodes/transforms/transform-2D";
import { Vector2 } from "@/nodes/vectors/vector-2";
import { CanvasNode } from "@/nodes/global/class/canvas-node";

export class Node2D
	extends CanvasNode
	implements IControlNode2D, IHandleCoords2D {
	[NodePropType]: TCanvasNodes = "2D/node";

	protected _options: TCanvasNodeOptions["2D/node"];
	protected _initial: TCanvasNodeOptions["2D/node"];

	protected _transform: Transform2D;

	protected _calculate: ICalculate = {
		angle: 0,
		origin: [0, 0]
	};

	readonly NODE_NAME: TTypeNodes = "Node2D";

	get x() {
		return this._options.x;
	}

	get y() {
		return this._options.y;
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

	get calculate() {
		return this._calculate;
	}

	set x(value: number) {
		this._options.x = value;

		this[GetApp][_Render].draw = true;
	}

	set y(value: number) {
		this._options.y = value;

		this[GetApp][_Render].draw = true;
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

	set scaleX(value: number) {
		this._options.scaleX = value;

		this[GetApp][_Render].draw = true;
	}

	set scaleY(value: number) {
		this._options.scaleY = value;

		this[GetApp][_Render].draw = true;
	}

	set skewX(value: number) {
		this._options.skewX = value;

		this[GetApp][_Render].draw = true;
	}

	set skewY(value: number) {
		this._options.skewY = value;

		this[GetApp][_Render].draw = true;
	}

	set rotation(value: number) {
		this._options.rotation = value;

		this.processRotation()

		this[GetApp][_Render].draw = true;
	}

	constructor(slug: string, options?: Partial<TCanvasNodeOptions["2D/node"]>) {
		super(slug, { ...DEFAULT_CONFIG_NODE_2D, ...options });

		this._initial = { ...DEFAULT_CONFIG_NODE_2D, ...options };
		this._options = { ...this._initial };

		this._transform = new Transform2D(
			new Vector2(this._options.x, this._options.y),
			this._options.rotation,
			new Vector2(this._options.scaleX, this._options.scaleY),
		);

		this.processOrigin()
		this.processRotation()
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
		this.scaleX = scale;
		this.scaleY = scale;
	}

	scaleToWidth(width: number): void {
		this.scaleX = width / this._options.width;
	}

	scaleToHeight(height: number): void {
		this.scaleY = height / this._options.height;
	}

	setSkew(skew: number): void {
		this.skewX = skew;
		this.skewY = skew;
	}

	center(): void {
		if (this._parent && this._parent instanceof Node2D) {
			this.x = (this._parent.width * this._parent.scaleX) / 2;
			this.y = (this._parent.height * this._parent.scaleY) / 2;
		} else {
			this.x = this[GetApp].size.width / 2;
			this.y = this[GetApp].size.height / 2;
		}
	}

	centerX() {
		if (this._parent && this._parent instanceof Node2D) {
			this.x = (this._parent.width * this._parent.scaleX) / 2;
		} else {
			this.x = this[GetApp].size.width / 2;
		}
	}

	centerY() {
		if (this._parent && this._parent instanceof Node2D) {
			this.y = (this._parent.height * this._parent.scaleY) / 2;
		} else {
			this.y = this[GetApp].size.height / 2;
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

	toObject(): TCanvasNodeOptions["2D/node"] {
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

	static import(data: string, format: "JSON" | "YAML" = "JSON") {
		return GlobalNode[NodeFunctionImport](data, format) as Node2D;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[NodeFunctionMake](structure) as Node2D;
	}
}
