import * as stdUlid from "@std/ulid";

import type {
	IControlEditor,
	IControlHierarchy,
	IControlNode,
	IGlobalNode,
	INodeProcess,
	TExportNode,
	TTypeNodes,
} from "./types";
import type { TEventNode } from "../events";
import type { TCanvasNodeOptions, TCanvasNodes } from "../types";
import type { TAnything, TFunction, TSerialize } from "@/app/types";

import {
	$ConstructorNodes,
	NodeFunctionClone,
	NodeFunctionImport,
	NodeFunctionMake,
	NodeFunctionReset,
	NodeFunctionSet,
	NodePropType,
	NodeSetId,
	NodeSetIndex,
	NodeSetParent,
} from "../symbols";
import {
	$Scenes,
	_Render,
	_Script,
	_Worker,
	DispatchEvent,
	ExportData,
	ExportWorker,
	GetApp,
} from "@/app/symbols";

import EventObserver from "@/app/utils/observer";

import { HandlerAttribute } from "./handlers/attributes";
import { HandlerComponent } from "./handlers/components";
import { HandlerFunction } from "./handlers/functions";
import { HandlerMetaKey } from "./handlers/meta-keys";
import { HandlerNode } from "./handlers/nodes";

import AbstractNode from "../abstract/node.abstract";

import { DEFAULT_CONFIG_PRIMITIVE_NODE } from "@/configs/nodes/global/node";
import { HandlerScript } from "./handlers/script";
import { serializers } from "@/app/utils/serialize";

export class GlobalNode
	extends AbstractNode
	implements IGlobalNode, IControlEditor, IControlNode, IControlHierarchy
{
	protected _omit: string[] = ["name", "description"];
	protected _add: string[] = [];

	protected _options: TCanvasNodeOptions["global/node"];
	protected _initial: TCanvasNodeOptions["global/node"];

	protected _parent: undefined | GlobalNode;

	protected _events: EventObserver;

	protected _index: number;
	protected _slug: string;
	protected _id: string;

	[NodePropType]: TCanvasNodes = "global/node";

	readonly NODE_NAME: TTypeNodes = "GlobalNode";

	readonly $attributes: HandlerAttribute;
	readonly $components: HandlerComponent;
	readonly $functions: HandlerFunction;
	readonly $metaKeys: HandlerMetaKey;
	readonly $nodes: HandlerNode;
	readonly $script: HandlerScript;

	get ROOT() {
		return this[GetApp].ROOT;
	}

	get parent(): GlobalNode | undefined {
		return this._parent;
	}

	get first(): GlobalNode | undefined {
		if (this.parent) return this.parent.$nodes.all[0];
		return undefined;
	}

	get last(): GlobalNode | undefined {
		if (this.parent) {
			return this.parent.$nodes.all[this.parent.$nodes.size - 1];
		}
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

		if (this[GetApp][$Scenes].currentScene) {
			this[GetApp][_Worker].nodes.updateNode(
				this.id,
				{
					slug: value,
				},
				this.path,
				"path",
				"index",
			);
		}
	}

	get title() {
		return this._options.title;
	}

	get description() {
		return this._options.description;
	}

	set title(value: string) {
		this._options.title = value;

		if (this[GetApp][$Scenes].currentScene) {
			this[GetApp][_Worker].nodes.updateNode(
				this.id,
				{
					title: value,
				},
				this.path,
				"path",
				"index",
			);
		}
	}

	set description(value: string) {
		this._options.description = value;

		if (this[GetApp][$Scenes].currentScene) {
			this[GetApp][_Worker].nodes.updateNode(
				this.id,
				{
					description: value,
				},
				this.path,
				"path",
				"index",
			);

			this[GetApp][_Worker].render.draw();

			this[GetApp][_Render].draw = true;
		}
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
		this._id = stdUlid.monotonicUlid(12);

		this._script = null;

		this.$attributes = new HandlerAttribute(this);
		this.$components = new HandlerComponent(this);
		this.$functions = new HandlerFunction(this);
		this.$metaKeys = new HandlerMetaKey(this);
		this.$nodes = new HandlerNode(this);
		this.$script = new HandlerScript(this);
	}

	clone(): GlobalNode {
		return this[NodeFunctionClone]();
	}

	emit(event: TEventNode, callback: TFunction): void {
		this._events.addEventListener(event, callback);
	}

	reset(property?: keyof TCanvasNodeOptions["global/node"]): void {
		this[NodeFunctionReset](property);
	}

	toObject(): TCanvasNodeOptions["global/node"] {
		return { ...this._options };
	}

	destroy() {
		this[GetApp].ROOT.deleteNodeByPath(this.path, "index");

		const _destroy = this.$functions.get("_destroy");

		if (_destroy) _destroy(this);
	}

	set(
		property: keyof TCanvasNodeOptions["global/node"],
		value: TAnything,
	): void;
	set(properties: Partial<TCanvasNodeOptions["global/node"]>): void;
	set(properties?: TAnything, value?: TAnything): void {
		this[NodeFunctionSet](properties, value);
	}

	export(format: TSerialize = "JSON"): string {
		return serializers[format].stringify(this[ExportData]());
	}

	static import(data: string, format: TSerialize = "JSON"): GlobalNode {
		return GlobalNode[NodeFunctionImport](data, format);
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[NodeFunctionMake](structure) as GlobalNode;
	}

	static [NodeFunctionMake](structure: TExportNode<TAnything>) {
		return GlobalNode[$ConstructorNodes].makeNode(structure);
	}

	static [NodeFunctionImport](data: string, format: TSerialize) {
		const structure: TExportNode<TAnything> = serializers[format].parse(data);

		return GlobalNode[$ConstructorNodes].makeNode(structure);
	}

	[NodeFunctionReset](property?: TAnything) {
		let change = {};

		if (property) {
			(this._options as TAnything)[property] = (this._initial as TAnything)[
				property
			];

			if (!this._omit.includes(property)) {
				const relative: Record<string, TAnything> = {};

				relative[property] = (this._initial as TAnything)[property];

				change = relative;
			}
		} else {
			this._options = { ...this._initial };

			change = this.utils.omitKeys(this._initial, this._omit);
		}

		if (this[GetApp][$Scenes].currentScene) {
			this[GetApp][_Worker].nodes.updateNode(
				this.id,
				change,
				this.path,
				"path",
				"index",
			);

			this[GetApp][_Worker].render.draw();

			this[GetApp][_Render].draw = true;
		}
	}

	[NodeFunctionSet](property: TAnything, value: TAnything): void;
	[NodeFunctionSet](properties: TAnything): void;
	[NodeFunctionSet](properties?: TAnything, value?: TAnything): void {
		let change = {};

		if (properties && typeof properties === "string" && value) {
			(this._options as TAnything)[properties] = value;

			if (!this._omit.includes(properties)) {
				const relative: Record<string, TAnything> = {};

				relative[properties] = value;

				change = relative;
			}
		}

		if (properties && typeof properties !== "object") {
			for (const [key, value] of Object.entries(properties)) {
				(this._options as TAnything)[key] = value;
			}

			change = this.utils.omitKeys(properties, this._omit);
		}

		if (this[GetApp][$Scenes].currentScene) {
			this[GetApp][_Worker].nodes.updateNode(
				this.id,
				change,
				this.path,
				"path",
				"index",
			);

			this[GetApp][_Worker].render.draw();

			this[GetApp][_Render].draw = true;
		}
	}

	[NodeFunctionClone]() {
		const node = GlobalNode[$ConstructorNodes].makeNode(this[ExportData](true));

		node[NodeSetId](stdUlid.ulid(12));

		return node;
	}

	[NodeSetParent](parent: GlobalNode | undefined) {
		this._parent = parent;
	}

	[NodeSetIndex](index: number): void {
		this._index = index;
	}

	[NodeSetId](id: string): void {
		this._id = id;
	}

	[DispatchEvent](event: string, ...args: TAnything[]): void {
		this._events.emitEvent(event, ...args);
	}

	[ExportWorker](childNode = true): INodeProcess {
		const nodes: INodeProcess[] = [];

		if (childNode && this.$nodes.size) {
			for (const node of this.$nodes.all) {
				nodes.push(node[ExportWorker](true) as INodeProcess);
			}
		}

		return {
			__type__: this[NodePropType],
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

		if (childNode && this.$nodes.size) {
			for (const node of this.$nodes.all) {
				nodes.push(node[ExportData](childNode));
			}
		}

		return {
			id: this.id,
			slug: this.slug,
			attributes: this.$attributes.toEntries(),
			metaKeys: this.$metaKeys.toEntries(),
			type: this.NODE_NAME,
			script: this._script,
			path: this.path,
			index: this.index,
			nodes,
			options: this.toObject(),
		};
	}
}
