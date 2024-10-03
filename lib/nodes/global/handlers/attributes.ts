import type {
	IHandleAttribute,
	TAttribute,
	TAttributeTuple,
} from "../node.types";
import type { GlobalNode } from "@/nodes";
import type { AtomicEngine } from "@/atomic-engine";
import type { AtomicGame } from "@/atomic-game";

import { MethodSetAttributes, PropAttributes } from "@/nodes/symbols";
import { _Drawer, GetApp, SetGlobal } from "@/symbols";

export class HandlerAttribute implements IHandleAttribute {
	private $node: GlobalNode;
	private $app: AtomicEngine | AtomicGame;

	[PropAttributes]: Map<string, TAttribute>;

	constructor($node: GlobalNode) {
		this.$node = $node;
		this.$app = this.$node[GetApp]();

		this[PropAttributes] = new Map();
	}

	toEntries(): TAttributeTuple[] {
		return [...this[PropAttributes].entries()];
	}

	getAll(): TAttribute[] {
		return [...this[PropAttributes].values()];
	}

	get(name: string): TAttribute | undefined {
		return this[PropAttributes].get(name);
	}

	add(name: string, options: TAttribute): void {
		this[PropAttributes].set(name, options);

		this.$app[_Drawer].render.reDraw();

		this.$app[SetGlobal]("re-draw", true);
	}

	has(name: string): boolean {
		return this[PropAttributes].has(name);
	}

	delete(name: string): boolean {
		this.$app[_Drawer].render.reDraw();

		this.$app[SetGlobal]("re-draw", true);

		return this[PropAttributes].delete(name);
	}

	clear(): void {
		this[PropAttributes].clear();

		this.$app[_Drawer].render.reDraw();

		this.$app[SetGlobal]("re-draw", true);
	}

	[MethodSetAttributes](attributes: TAttributeTuple[]): void {
		this[PropAttributes] = new Map(attributes);
	}
}
