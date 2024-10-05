import type {
	IHandleComponent,
	TComponent,
	TComponentTuple,
} from "../node.types";
import type { GameCore } from "@/app/game";
import type { EngineCore } from "@/app/engine";
import type { GlobalNode } from "@/nodes";

import { MethodSetComponents, PropComponents } from "@/nodes/symbols";
import { GetApp } from "@/symbols";

export class HandlerComponent implements IHandleComponent {
	private $node: GlobalNode;
	private $app: EngineCore | GameCore;

	[PropComponents]: Map<string, TComponent>;

	constructor($node: GlobalNode) {
		this.$node = $node;
		this.$app = this.$node[GetApp]();

		this[PropComponents] = new Map();

		this.$app;
	}

	toEntries(): TComponentTuple[] {
		return [...this[PropComponents].entries()];
	}

	getAll(): TComponent[] {
		return [...this[PropComponents].values()];
	}

	get(name: string): TComponent | undefined {
		return this[PropComponents].get(name);
	}

	add(name: string, component: TComponent): void {
		this[PropComponents].set(name, component);
	}

	has(name: string): boolean {
		return this[PropComponents].has(name);
	}

	delete(name: string): boolean {
		return this[PropComponents].delete(name);
	}

	clear(): void {
		this[PropComponents].clear();
	}

	[MethodSetComponents](components: TComponentTuple[]): void {
		this[PropComponents] = new Map(components);
	}
}
