import type { TEventNode } from "@/nodes/event.type";
import type { AllTypesSimple, TAnything, TFunction } from "@/types";
import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import type {
	INodeWorker,
	TExportNode,
	TTypeNodes,
} from "@/nodes/global/node.types";

import { _Drawer, ExportWorker, GetApp, SetGlobal } from "@/symbols";
import {
	MethodClone,
	MethodImport,
	MethodMake,
	PropCollider,
	PropType,
} from "@/nodes/symbols";

import { GlobalNode } from "@/nodes";
import { Node2D } from "./node";

import { DEFAULT_CONFIG_NODE_2D } from "@/configs/nodes/2D/node";

export class Collision2D extends Node2D {
	[PropType]: TCanvasNodes = "2D/handler/collision";

	[PropCollider]: Node2D | null = null;

	protected _options: TCanvasNodeOptions["2D/handler/collision"];
	protected _initial: TCanvasNodeOptions["2D/handler/collision"];

	protected _omit: string[] = [
		"centerRotation",
		"centerScale",
		"flipX",
		"flipY",
		"originX",
		"originY",
		"rotationType",
		"title",
		"name",
	];

	readonly NODE_NAME: TTypeNodes = "Collision2D";

	constructor(
		slug: string,
		options?: Partial<TCanvasNodeOptions["2D/handler/collision"]>,
	) {
		super(slug, { ...DEFAULT_CONFIG_NODE_2D, ...options });

		this._initial = { ...DEFAULT_CONFIG_NODE_2D, ...options };
		this._options = { ...this._initial };
	}

	getCollider() {
		return this[PropCollider]?.parent;
	}

	clone() {
		return this[MethodClone]() as Collision2D;
	}

	emit(event: TEventNode, callback: TFunction): void {
		this._events.addEventListener(event, callback);
	}

	reset(property?: keyof TCanvasNodeOptions["2D/handler/collision"]): void {
		if (property) {
			this._options[property] = this._initial[property] as never;

			if (!this._omit.includes(property)) {
				const relative: Record<string, AllTypesSimple> = {};

				relative[property] = this._initial[property];
				relative.calculate = this.processCalculate();

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

			const options = this.utils.omitKeys(this._initial, this._omit, [
				"calculate",
			]);
			options.calculate = this.processCalculate();

			this[GetApp]()[_Drawer].nodes.updateNode(
				this.id,
				options,
				this.path,
				"path",
				"index",
			);
		}

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	toObject(): TCanvasNodeOptions["2D/handler/collision"] {
		return { ...this._options };
	}

	set(
		property: keyof TCanvasNodeOptions["2D/handler/collision"],
		value: AllTypesSimple,
	): void;
	set(properties: Partial<TCanvasNodeOptions["2D/handler/collision"]>): void;
	set(properties?: unknown, value?: unknown): void {
		if (properties && typeof properties === "string" && value) {
			this._options[
				properties as keyof TCanvasNodeOptions["2D/handler/collision"]
			] = value as never;

			if (!this._omit.includes(properties)) {
				const relative: Record<string, AllTypesSimple> = {};

				relative[properties] = value;
				relative.calculate = this.processCalculate();

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
				this._options[key as keyof TCanvasNodeOptions["2D/handler/collision"]] =
					value as never;
			}

			const options = this.utils.omitKeys(properties, this._omit, [
				"calculate",
			]);
			options.calculate = this.processCalculate();

			this[GetApp]()[_Drawer].nodes.updateNode(
				this.id,
				options,
				this.path,
				"path",
				"index",
			);
		}

		this[GetApp]()[_Drawer].render.reDraw();

		this[GetApp]()[SetGlobal]("re-draw", true);
	}

	static import(data: string, format: "JSON" | "YAML" = "JSON") {
		return GlobalNode[MethodImport](data, format) as Collision2D;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[MethodMake](structure) as Collision2D;
	}

	[ExportWorker](childNode = true): INodeWorker {
		const nodes: INodeWorker[] = [];

		if (childNode && this.$nodes.size)
			for (const node of this.$nodes.all) {
				nodes.push(node[ExportWorker](true) as INodeWorker);
			}

		const node = {
			__type__: this[PropType],
			__path__: this.path,
			location: {
				id: this.id,
				index: this.index,
				slug: this.slug,
			},
			nodes: nodes,
			options: this.utils.omitKeys(this.toObject(), this._omit, ["calculate"]),
		};

		node.options.calculate = this.processCalculate();

		return node;
	}
}
