import type { TCanvasNodeOptions, TCanvasNodes } from "../types";
import type { INodeProcess, TExportNode, TTypeNodes } from "./types";
import type { TEventNode, TEventScene } from "../events";
import type { TAnything, TFunction } from "@/app/types";

import {
	NodeFunctionClone,
	NodeFunctionImport,
	NodeFunctionMake,
	NodePropType,
	ScriptsNodeFromScene,
} from "../symbols";
import { _Render, _Worker, ExportWorker, GetApp } from "@/app/symbols";

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
		if (property) {
			this._options[property] = this._initial[property];

			if (!this._omit.includes(property)) {
				const relative: Record<string, TAnything> = {};

				relative[property] = this._initial[property];

				this[GetApp][_Worker].nodes.updateNode(
					this.id,
					relative,
					this.path,
					"path",
					"index",
				);
			}
		} else {
			this._options = { ...this._initial };

			this[GetApp][_Worker].nodes.updateNode(
				this.id,
				this.utils.omitKeys(this._initial, this._omit),
				this.path,
				"path",
				"index",
			);
		}

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
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
		if (properties && typeof properties === "string" && value) {
			this._options[properties as keyof TCanvasNodeOptions["global/scene"]] =
				value as never;

			if (!this._omit.includes(properties)) {
				const relative: Record<string, TAnything> = {};

				relative[properties] = value;

				this[GetApp][_Worker].nodes.updateNode(
					this.id,
					relative,
					this.path,
					"path",
					"index",
				);
			}
		} else if (typeof properties !== "string" && properties) {
			for (const [key, value] of Object.entries(properties)) {
				this._options[key as keyof TCanvasNodeOptions["global/scene"]] =
					value as never;
			}

			this[GetApp][_Worker].nodes.updateNode(
				this.id,
				this.utils.omitKeys(properties, this._omit),
				this.path,
				"path",
				"index",
			);
		}

		this[GetApp][_Worker].render.draw();

		this[GetApp][_Render].draw = true;
	}

	static import(data: string, format: "JSON" | "YAML" = "JSON") {
		return GlobalNode[NodeFunctionImport](data, format) as Scene;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[NodeFunctionMake](structure) as Scene;
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
		};
	}
}
