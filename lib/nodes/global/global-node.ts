import * as YAML from "yaml";
import JSON5 from "json5";
import { uid } from "uid";

import type {
	IControlEditor,
	IControlHierarchy,
	IControlNode,
	IGlobalNode,
	INodeWorker,
	TExportNode,
	TTypeNodes,
} from "./node.types";
import type { TEventNode } from "../event.type";
import type { TCanvasNodes, TCanvasNodeOptions } from "../types";
import type { AllTypesSimple, TAnything, TFunction } from "@/types";

import {
	MethodSetIndex,
	MethodSetId,
	PropType,
	MethodSetParent,
	MethodSetRoot,
	MethodClone,
	MethodImport,
	$ConstructorNodes,
	MethodMake,
	$ConstructorScript,
} from "../symbols";
import {
	_Drawer,
	DispatchEvent,
	DispatchScript,
	ExportData,
	ExportWorker,
	GetApp,
	SetGlobal,
} from "@/symbols";

import EventObserver from "@/app/utils/observer";

import { HandlerAttribute } from "./handlers/attributes";
import { HandlerComponent } from "./handlers/components";
import { HandlerFunction } from "./handlers/functions";
import { HandlerMetaKey } from "./handlers/meta-keys";
import { HandlerNode } from "./handlers/nodes";

import AbstractNode from "../abstract/node.abstract";

import { DEFAULT_CONFIG_PRIMITIVE_NODE } from "@/configs/nodes/global/node";

export class GlobalNode
	extends AbstractNode
	implements IGlobalNode, IControlEditor, IControlNode, IControlHierarchy
{
	protected _omit: string[] = ["name", "description"];
	protected _add: string[] = [];

	protected _options: TCanvasNodeOptions["global/node"];
	protected _initial: TCanvasNodeOptions["global/node"];

	protected _root: undefined | GlobalNode = undefined;

	protected _parent: undefined | GlobalNode;

	protected _events: EventObserver;

	protected _index: number;
	protected _slug: string;
	protected _id: string;

	[PropType]: TCanvasNodes = "global/node";

	readonly NODE_NAME: TTypeNodes = "GlobalNode";

	readonly $attributes: HandlerAttribute;
	readonly $components: HandlerComponent;
	readonly $functions: HandlerFunction;
	readonly $metaKeys: HandlerMetaKey;
	readonly $nodes: HandlerNode;

	scriptMode: "class" | "function" = "function";
	script: string | URL | null;

	get ROOT() {
		return this._root;
	}

	get parent(): GlobalNode | undefined {
		return this._parent;
	}

	get first(): GlobalNode | undefined {
		if (this.parent) return this.parent.$nodes.all[0];
		return undefined;
	}

	get last(): GlobalNode | undefined {
		if (this.parent) return this.parent.$nodes.all[this.parent.$nodes.size - 1];
		return undefined;
	}

	get nextSibling(): GlobalNode | undefined {
		if (this.parent) return this.parent.$nodes.all[this.index + 1];
		return undefined;
	}

	get previousSibling(): GlobalNode | undefined {
		if (this.parent) return this.parent.$nodes.all[this.index - 1];
		return undefined;
	}

	get index(): number {
		return this._index;
	}

	get path(): string {
		if (this.parent) return `${this.parent.path}/${this._index}`;
		return this._index.toString();
	}

	get slug() {
		return this._slug;
	}

	get id(): string {
		return this._id;
	}

	set slug(value: string) {
		this._slug = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				slug: value,
			},
			this.path,
			"path",
			"index",
		);
	}

	get title() {
		return this._options.title;
	}

	get description() {
		return this._options.description;
	}

	set title(value: string) {
		this._options.title = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				title: value,
			},
			this.path,
			"path",
			"index",
		);
	}

	set description(value: string) {
		this._options.description = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				description: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	constructor(
		slug: string,
		options?: Partial<TCanvasNodeOptions["global/node"]>,
	) {
		super();

		this._initial = {
			...DEFAULT_CONFIG_PRIMITIVE_NODE,
			...options,
		};
		this._options = { ...this._initial };

		this._events = new EventObserver();

		this._index = 0;
		this._slug = slug;
		this._id = uid(12);

		this.script = null;

		this.$attributes = new HandlerAttribute(this);
		this.$components = new HandlerComponent(this);
		this.$functions = new HandlerFunction(this);
		this.$metaKeys = new HandlerMetaKey(this);
		this.$nodes = new HandlerNode(this);
	}

	clone(): GlobalNode {
		return this[MethodClone]();
	}

	emit(event: TEventNode, callback: TFunction): void {
		this._events.addEventListener(event, callback);
	}

	reset(property?: keyof TCanvasNodeOptions["global/node"]): void {
		if (property) {
			this._options[property] = this._initial[property];

			if (!this._omit.includes(property)) {
				const relative: Record<string, AllTypesSimple> = {};

				relative[property] = this._initial[property];

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

			this[GetApp]()[_Drawer].nodes.updateNode(
				this.id,
				this.utils.omitKeys(this._initial, this._omit),
				this.path,
				"path",
				"index",
			);
		}

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	toObject(): TCanvasNodeOptions["global/node"] {
		return { ...this._options };
	}

	set(
		property: keyof TCanvasNodeOptions["global/node"],
		value: AllTypesSimple,
	): void;
	set(properties: Partial<TCanvasNodeOptions["global/node"]>): void;
	set(properties?: unknown, value?: unknown): void {
		if (properties && typeof properties === "string" && value) {
			this._options[properties as keyof TCanvasNodeOptions["global/node"]] =
				value as never;

			if (!this._omit.includes(properties)) {
				const relative: Record<string, AllTypesSimple> = {};

				relative[properties] = value;

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
				this._options[key as keyof TCanvasNodeOptions["global/node"]] =
					value as never;
			}

			this[GetApp]()[_Drawer].nodes.updateNode(
				this.id,
				this.utils.omitKeys(properties, this._omit),
				this.path,
				"path",
				"index",
			);
		}

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	export(format: "JSON" | "YAML" = "JSON"): string {
		return format === "YAML"
			? YAML.stringify(this[ExportData]())
			: JSON5.stringify(this[ExportData]());
	}

	static import(data: string, format: "JSON" | "YAML" = "JSON"): GlobalNode {
		return GlobalNode[MethodImport](data, format);
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[MethodMake](structure) as GlobalNode;
	}

	static [MethodMake](structure: TExportNode<TAnything>) {
		return GlobalNode[$ConstructorNodes].makeNode(structure);
	}

	static [MethodImport](data: string, format: string) {
		const structure: TExportNode<TAnything> =
			format === "YAML" ? YAML.parse(data) : JSON5.parse(data);

		return GlobalNode[$ConstructorNodes].makeNode(structure);
	}

	[MethodClone]() {
		const node = GlobalNode[$ConstructorNodes].makeNode(this[ExportData](true));

		node[MethodSetId](uid(12));

		return node;
	}

	[MethodSetRoot](root: GlobalNode | undefined) {
		this._root = root;
	}

	[MethodSetParent](parent: GlobalNode | undefined) {
		this._parent = parent;
	}

	[MethodSetIndex](index: number): void {
		this._index = index;
	}

	[MethodSetId](id: string): void {
		this._id = id;
	}

	[DispatchEvent](event: string, ...args: TAnything[]): void {
		this._events.emitEvent(event, ...args);
	}

	async [DispatchScript]() {
		if (this.script === null) return;

		const { __FUNC__, __VARS__ } = await this[$ConstructorScript].executeScript(
			this,
			this[GetApp](),
		);

		for (const name of Object.keys(__VARS__)) {
			if (!this[name]) this[name] = __VARS__[name];
		}

		for (const name of Object.keys(__FUNC__)) {
			if (!name.startsWith("_")) this[name] = __FUNC__[name];
			this.$functions.add(name, __FUNC__[name]);
		}
	}

	[ExportWorker](childNode = true): INodeWorker {
		const nodes: INodeWorker[] = [];

		if (childNode && this.$nodes.size)
			for (const node of this.$nodes.all) {
				nodes.push(node[ExportWorker](true) as INodeWorker);
			}

		return {
			__type__: this[PropType],
			__path__: this.path,
			location: {
				id: this.id,
				index: this.index,
				slug: this.slug,
			},
			nodes: nodes,
			options: this.utils.omitKeys(this.toObject(), this._omit),
		};
	}

	[ExportData](childNode = true): TExportNode<TAnything> {
		const nodes: TExportNode<TAnything>[] = [];

		if (childNode && this.$nodes.size)
			for (const node of this.$nodes.all) {
				nodes.push(node[ExportData](childNode));
			}

		return {
			id: this.id,
			slug: this.slug,
			attributes: this.$attributes.toEntries(),
			metaKeys: this.$metaKeys.toEntries(),
			type: this.NODE_NAME,
			script: this.script,
			path: this.path,
			index: this.index,
			nodes,
			options: this.toObject(),
		};
	}
}
