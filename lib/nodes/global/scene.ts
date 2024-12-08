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

		this[ScriptsNodeFromScene] = new Set();
	}

	clone() {
		return this[NodeFunctionClone]() as Scene;
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

	static import(data: string, format: TSerialize = "JSON") {
		return GlobalNode[NodeFunctionImport](data, format) as Scene;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[NodeFunctionMake](structure) as Scene;
	}
}
