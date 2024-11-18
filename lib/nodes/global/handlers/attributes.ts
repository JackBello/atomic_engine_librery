import type { IHandleAttribute, TAttribute, TAttributeTuple } from "../types";
import type { GlobalNode } from "../global-node";
import type { GameCore } from "@/app/game";
import type { EngineCore } from "@/app/engine";

import {
	NodeDestroy,
	NodePropHandlerAttributes,
	NodeSetHandlerAttributes,
} from "@/nodes/symbols";
import { _Worker, GetApp } from "@/app/symbols";
import type { TAnything } from "@/app/types";

export class HandlerAttribute implements IHandleAttribute {
	private $node: GlobalNode;
	private $app: EngineCore | GameCore;

	[NodePropHandlerAttributes]: Map<string, TAttribute>;

	constructor($node: GlobalNode) {
		this.$node = $node;
		this.$app = this.$node[GetApp];

		this[NodePropHandlerAttributes] = new Map();

		this.$app
	}

	toEntries(): TAttributeTuple[] {
		return [...this[NodePropHandlerAttributes].entries()];
	}

	getAll(): TAttribute[] {
		return [...this[NodePropHandlerAttributes].values()];
	}

	get(name: string): TAttribute | undefined {
		return this[NodePropHandlerAttributes].get(name);
	}

	add(name: string, options: TAttribute): void {
		this[NodePropHandlerAttributes].set(name, options);
	}

	has(name: string): boolean {
		return this[NodePropHandlerAttributes].has(name);
	}

	delete(name: string): boolean {
		return this[NodePropHandlerAttributes].delete(name);
	}

	clear(): void {
		this[NodePropHandlerAttributes].clear();
	}

	[NodeSetHandlerAttributes](attributes: TAttributeTuple[]): void {
		this[NodePropHandlerAttributes] = new Map(attributes);
	}

	[NodeDestroy]() {
		this.$node = null as TAnything;
		this.$app = null as TAnything;
	}
}
