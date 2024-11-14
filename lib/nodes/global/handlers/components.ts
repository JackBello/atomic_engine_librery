import type { IHandleComponent, TComponentTuple } from "../types";
import type { GameCore } from "@/app/game";
import type { EngineCore } from "@/app/engine";
import type { GlobalNode } from "../global-node";

import {
	NodePropHandlerComponents,
	NodeSetHandlerComponents,
} from "@/nodes/symbols";
import { GetApp } from "@/app/symbols";
import type { ComponentNode } from "../class/component-node";
import type { TClass } from "@/app/types";

export class HandlerComponent implements IHandleComponent {
	private $node: GlobalNode;
	private $app: EngineCore | GameCore;

	[NodePropHandlerComponents]: Map<string, ComponentNode>;

	constructor($node: GlobalNode) {
		this.$node = $node;
		this.$app = this.$node[GetApp];

		this[NodePropHandlerComponents] = new Map();

		this.$app;
	}

	toEntries(): TComponentTuple[] {
		return [...this[NodePropHandlerComponents].entries()];
	}

	getAll(): ComponentNode[] {
		return [...this[NodePropHandlerComponents].values()];
	}

	get(name: string): ComponentNode | undefined {
		return this[NodePropHandlerComponents].get(name);
	}

	add(component: TClass<ComponentNode>): void {
		const abstract = new component(this.$node);

		this[NodePropHandlerComponents].set(abstract.name, abstract);
	}

	has(name: string): boolean {
		return this[NodePropHandlerComponents].has(name);
	}

	delete(name: string): boolean {
		return this[NodePropHandlerComponents].delete(name);
	}

	clear(): void {
		this[NodePropHandlerComponents].clear();
	}

	[NodeSetHandlerComponents](components: TComponentTuple[]): void {
		this[NodePropHandlerComponents] = new Map(components);
	}
}
