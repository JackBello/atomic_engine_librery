import type { IHandleComponent, TComponentTuple, TExportComponent } from "../types";
import type { GameCore } from "@/app/game";
import type { EngineCore } from "@/app/engine";
import type { GlobalNode } from "../global-node";

import {
	NodeDestroy,
	NodePropHandlerComponents,
	NodeSetHandlerComponents,
} from "@/nodes/symbols";
import { _Collision, ExportData, GetApp } from "@/app/symbols";
import type { ComponentNode } from "../class/component-node";
import type { TAnything, TClass } from "@/app/types";

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

	resetAll(): void {
		if (this[NodePropHandlerComponents].size === 0) return

		for (const [_, component] of this[NodePropHandlerComponents]) {
			component.reset()
		}
	}

	get(name: string): ComponentNode | undefined {
		return this[NodePropHandlerComponents].get(name);
	}

	add(component: TClass<ComponentNode>): void {
		const abstract = new component(this.$node);

		abstract.startOptions()
		abstract.init()

		this[NodePropHandlerComponents].set(abstract.name, abstract);
	}

	has(name: string): boolean {
		return this[NodePropHandlerComponents].has(name);
	}

	delete(name: string): boolean {
		return this[NodePropHandlerComponents].delete(name);
	}

	reset(name: string): void {
		const component = this.get(name)

		if (!component) return

		component.reset()
	}

	clear(): void {
		this[NodePropHandlerComponents].clear();
	}

	[ExportData]() {
		const components: TExportComponent[] = []

		for (const [_, component] of this[NodePropHandlerComponents]) {
			components.push(component[ExportData]())
		}

		return components;
	}

	[NodeSetHandlerComponents](components: TComponentTuple[]): void {
		this[NodePropHandlerComponents] = new Map(components);
	}

	[NodeDestroy]() {
		for (const [_, component] of this[NodePropHandlerComponents]) {
			component[NodeDestroy]();
		}

		this.$node = null as TAnything;
		this.$app = null as TAnything;
	}
}
