import type { TCanvasNodes, TCanvasNodeOptions } from "../types";
import type { INodeWorker, TExportNode, TTypeNodes } from "./node.types";
import type { TEventNode, TEventScene } from "../event.type";
import type { AllTypesSimple, TAnything, TFunction } from "@/types";

import { MethodClone, MethodImport, MethodMake, PropType } from "../symbols";
import { _Drawer, ExportWorker, GetApp, SetGlobal } from "@/symbols";

import { GlobalNode } from "./global-node";

export class Scene extends GlobalNode {
	[PropType]: TCanvasNodes = "global/scene";

	readonly NODE_NAME: TTypeNodes = "Scene";

	constructor(
		slug: string,
		options?: Partial<TCanvasNodeOptions["global/scene"]>,
	) {
		super(slug, options);

		this._root = this;
	}

	clone(): Scene {
		return this[MethodClone]();
	}

	emit(event: TEventNode | TEventScene, callback: TFunction): void {
		this._events.addEventListener(event, callback);
	}

	reset(property?: keyof TCanvasNodeOptions["global/scene"]): void {
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

	toObject(): TCanvasNodeOptions["global/scene"] {
		return { ...this._options };
	}

	set(
		property: keyof TCanvasNodeOptions["global/scene"],
		value: AllTypesSimple,
	): void;
	set(properties: Partial<TCanvasNodeOptions["global/scene"]>): void;
	set(properties?: unknown, value?: unknown): void {
		if (properties && typeof properties === "string" && value) {
			this._options[properties as keyof TCanvasNodeOptions["global/scene"]] =
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
				this._options[key as keyof TCanvasNodeOptions["global/scene"]] =
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

	static import(data: string, format: "JSON" | "YAML" = "JSON"): Scene {
		return GlobalNode[MethodImport](data, format);
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[MethodMake](structure) as Scene;
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
		};
	}
}
