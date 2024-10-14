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
	PropType,
} from "@/nodes/symbols";

import { GlobalNode } from "@/nodes";
import { Collision2D } from "./collision";

import { DEFAULT_CONFIG_COLLISION_SHAPE_2D } from "@/configs/nodes/2D/collision-shape";

export class CollisionShape2D extends Collision2D {
	[PropType]: TCanvasNodes = "2D/handler/collision-shape";

	protected _options: TCanvasNodeOptions["2D/handler/collision-shape"];
	protected _initial: TCanvasNodeOptions["2D/handler/collision-shape"];

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

	readonly NODE_NAME: TTypeNodes = "CollisionShape2D";

	get shape() {
		return this._options.shape;
	}

	get color() {
		return this._options.color;
	}

	set shape(value: "rectangle" | "circle" | "triangle" | "polygon") {
		this._options.shape = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				shape: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	set color(value: string) {
		this._options.color = value;

		this[GetApp]()[_Drawer].nodes.updateNode(
			this.id,
			{
				color: value,
			},
			this.path,
			"path",
			"index",
		);

		this[GetApp]()[_Drawer].render.reDraw();
	}

	constructor(
		slug: string,
		options?: Partial<TCanvasNodeOptions["2D/handler/collision-shape"]>,
	) {
		super(slug, { ...DEFAULT_CONFIG_COLLISION_SHAPE_2D, ...options });

		this._initial = { ...DEFAULT_CONFIG_COLLISION_SHAPE_2D, ...options };
		this._options = { ...this._initial };
	}

	clone() {
		return this[MethodClone]() as CollisionShape2D;
	}

	emit(event: TEventNode, callback: TFunction): void {
		this._events.addEventListener(event, callback);
	}

	reset(
		property?: keyof TCanvasNodeOptions["2D/handler/collision-shape"],
	): void {
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
	}

	toObject(): TCanvasNodeOptions["2D/handler/collision-shape"] {
		return { ...this._options };
	}

	set(
		property: keyof TCanvasNodeOptions["2D/handler/collision-shape"],
		value: AllTypesSimple,
	): void;
	set(
		properties: Partial<TCanvasNodeOptions["2D/handler/collision-shape"]>,
	): void;
	set(properties?: unknown, value?: unknown): void {
		if (properties && typeof properties === "string" && value) {
			this._options[
				properties as keyof TCanvasNodeOptions["2D/handler/collision-shape"]
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
				this._options[
					key as keyof TCanvasNodeOptions["2D/handler/collision-shape"]
				] = value as never;
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
	}

	static import(data: string, format: "JSON" | "YAML" = "JSON") {
		return GlobalNode[MethodImport](data, format) as CollisionShape2D;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[MethodMake](structure) as CollisionShape2D;
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
