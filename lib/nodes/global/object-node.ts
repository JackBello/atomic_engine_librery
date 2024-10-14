import type { INodeWorker, TExportNode } from "./node.types";
import type { TAnything } from "@/types";

import { ExportWorker } from "@/symbols";
import { MethodClone, MethodImport, MethodMake, PropType } from "../symbols";

import { GlobalNode, Node2D } from "@/nodes";
import type { TCanvasNodeOptions } from "../types";
import { DEFAULT_CONFIG_RECTANGLE_2D } from "@/configs/nodes/2D/shapes/rectangle";

export class ObjectNode extends Node2D {
	constructor(
		slug: string,
		options?: Partial<TCanvasNodeOptions["2D/rectangle"]>,
	) {
		super(slug, { ...DEFAULT_CONFIG_RECTANGLE_2D, ...options });

		this._initial = { ...DEFAULT_CONFIG_RECTANGLE_2D, ...options };
		this._options = { ...this._initial };
	}

	clone() {
		return this[MethodClone]() as ObjectNode;
	}

	static import(data: string, format: "JSON" | "YAML" = "JSON") {
		return GlobalNode[MethodImport](data, format) as ObjectNode;
	}

	static make(structure: TExportNode<TAnything>) {
		return GlobalNode[MethodMake](structure) as ObjectNode;
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
