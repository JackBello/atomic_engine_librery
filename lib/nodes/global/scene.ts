import type { TCanvasNodeOptions, TCanvasNodes } from "../types";
import type { TExportNode, TTypeNodes } from "./types";
import type { TEventNode, TEventScene } from "../events";
import type { TAnything, TFunction, TSerialize } from "@/app/types";

import {
	NodeFunctionClone,
	NodeFunctionImport,
	NodeFunctionMake,
	NodeFunctionReset,
	NodeFunctionSet,
	NodePropType,
	PreloadResourcesFromScene,
	ScriptsNodeFromScene,
} from "../symbols";
import { _Render, _Worker } from "@/app/symbols";

import { GlobalNode } from "./global-node";

export class Scene extends GlobalNode {
	[NodePropType]: TCanvasNodes = "global/scene";

	[ScriptsNodeFromScene]: Set<GlobalNode>;

	readonly NODE_NAME: TTypeNodes = "Scene";

	constructor(
		slug: string,
		options?: Partial<TCanvasNodeOptions["global/scene"]>,
	) {
		super(slug, options);

		GlobalNode._top = this

		this[ScriptsNodeFromScene] = new Set();
	}

	[PreloadResourcesFromScene]() {

	}

	async clone(): Promise<Scene> {
		return await this[NodeFunctionClone]() as TAnything;
	}

	emit(event: TEventNode | TEventScene, callback: TFunction): void {
		this._events.addEventListener(event, callback);
	}

	reset(property?: keyof TCanvasNodeOptions["global/scene"]): void {
		this[NodeFunctionReset](property);
	}

	toObject(): TCanvasNodeOptions["global/scene"] {
		return { ...this._options };
	}

	set(
		property: keyof TCanvasNodeOptions["global/scene"],
		value: TAnything,
	): void;
	set(properties: Partial<TCanvasNodeOptions["global/scene"]>): void;
	set(properties?: unknown, value?: unknown): void {
		this[NodeFunctionSet](properties, value);
	}

	static async import(data: string, format: TSerialize = "JSON"): Promise<Scene> {
		return GlobalNode[NodeFunctionImport](data, format) as TAnything;
	}

	static async make(structure: TExportNode<TAnything>): Promise<Scene> {
		return GlobalNode[NodeFunctionMake](structure) as TAnything;
	}
}
