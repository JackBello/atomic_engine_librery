import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import { NodeFunctionClone, NodeFunctionImport, NodeFunctionMake, NodeFunctionReset, NodeFunctionSet, NodePropType } from "@/nodes/symbols";

import { Node2D } from "../node";
import type { TExportNode, TTypeNodes } from "@/nodes/global/types";
import { DEFAULT_CONFIG_IMAGE_2D } from "@/configs/nodes/2D/source/image";
import type { TEventNode, TEventNode2D } from "@/nodes/events";
import type { TAnything, TFunction, TSerialize } from "@/app/types";
import { _Render, GetApp } from "@/symbols";
import { GlobalNode } from "@/nodes";
import type { ResourceImage } from "@/app/services/resources/image.resource";

export class Image2D<T extends TCanvasNodeOptions["2D/image"] = TCanvasNodeOptions["2D/image"]> extends Node2D<T> {
	[NodePropType]: TCanvasNodes = "2D/image";

	protected _omit: string[] = ["loaded", "type", "format", "element"];

	readonly NODE_NAME: TTypeNodes = "Image2D";

	protected _resource?: ResourceImage;

	get smoothing() {
		return this._options.smoothing
	}

	get smoothingQuality() {
		return this._options.smoothingQuality
	}

	get resource() {
		return this._resource
	}

	get element() {
		return this._options.element
	}

	get format() {
		return this._options.format
	}

	get type() {
		return this._options.type
	}

	get loaded() {
		return this._options.loaded
	}

	get width() {
		return this._options.width;
	}

	get height() {
		return this._options.height;
	}

	set width(value: number) {
		this._options.width = value;

		this[GetApp][_Render].draw = true;
	}

	set height(value: number) {
		this._options.height = value;

		this[GetApp][_Render].draw = true;
	}

	set smoothing(value: boolean) {
		this._options.smoothing = value

		this[GetApp][_Render].draw = true;
	}

	set smoothingQuality(value: "low" | "medium" | "high") {
		this._options.smoothingQuality = value

		this[GetApp][_Render].draw = true;
	}

	constructor(slug: string, options?: Partial<Omit<TCanvasNodeOptions["2D/image"], 'element' | 'format'>>, resource?: ResourceImage) {
		super(slug, { ...DEFAULT_CONFIG_IMAGE_2D, ...options });

		this._resource = resource;

		this.loadResource()
	}

	protected loadResource() {
		if (!this._resource) return

		this._initial.loaded = this._resource.loaded
		this._initial.element = this._resource.element
		this._initial.format = this._resource.format
		this._initial.type = this._resource.type

		this._options.loaded = this._initial.loaded
		this._options.element = this._initial.element
		this._options.format = this._initial.format
		this._options.type = this._initial.type

		this._addons.set(`${this._resource.TYPE}/${this._resource.NAME_CLASS}`, this._resource)
	}

	removeResource() {
		if (!this._resource) return

		this._initial.loaded = false
		this._initial.element = undefined as TAnything
		this._initial.format = "" as TAnything
		this._initial.type = "image"

		this._options.loaded = this._initial.loaded
		this._options.element = this._initial.element
		this._options.format = this._initial.format
		this._options.type = this._initial.type

		this._addons.delete(`${this._resource.TYPE}/${this._resource.NAME_CLASS}`)

		this._resource = undefined

		this[GetApp][_Render].draw = true;
	}

	changeResource(resource: ResourceImage) {
		this._resource = resource
		this.loadResource()

		this[GetApp][_Render].draw = true;
	}

	originalWidth() {
		if (this.loaded) {
			this.width = this.element.width
		}
	}

	originalHeight() {
		if (this.loaded) {
			this.height = this.element.height
		}
	}

	originalSize() {
		this.originalWidth()
		this.originalHeight()
	}

	async clone(): Promise<Image2D> {
		return await this[NodeFunctionClone]() as TAnything;
	}

	emit(event: TEventNode | TEventNode2D, callback: TFunction): void {
		this._events.addEventListener(event, callback);
	}

	reset(property?: keyof Omit<TCanvasNodeOptions["2D/image"], 'element' | 'format'>): void {
		this[NodeFunctionReset](property)

		this.processOrigin();
		this.processRotation();

		this[GetApp][_Render].draw = true;
	}

	toObject(): T {
		const options = { ...super.toObject() }

		options.format = this._options.format

		return options
	}

	set(property: keyof Omit<TCanvasNodeOptions["2D/image"], 'element' | 'format'>, value: TAnything): void;
	set(properties: Partial<Omit<TCanvasNodeOptions["2D/image"], 'element' | 'format'>>): void;
	set(properties?: unknown, value?: unknown): void {
		this[NodeFunctionSet](properties, value)

		this.processOrigin();
		this.processRotation();

		this[GetApp][_Render].draw = true;
	}

	static async import(data: string, format: TSerialize = "JSON"): Promise<Image2D> {
		return await GlobalNode[NodeFunctionImport](data, format) as TAnything;
	}

	static async make(structure: TExportNode<TAnything>): Promise<Image2D> {
		return await GlobalNode[NodeFunctionMake](structure) as TAnything;
	}
}