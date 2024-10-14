import type {
	IHandleAttribute,
	TAttribute,
	TAttributeTuple,
} from "../node.types";
import type { GlobalNode } from "@/nodes";
import type { GameCore } from "@/app/game";
import type { EngineCore } from "@/app/engine";

import { MethodSetAttributes, PropAttributes } from "@/nodes/symbols";
import { _Drawer, GetApp } from "@/symbols";

export class HandlerAttribute implements IHandleAttribute {
	private $node: GlobalNode;
	private $app: EngineCore | GameCore;

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
	}

	has(name: string): boolean {
		return this[PropAttributes].has(name);
	}

	delete(name: string): boolean {
		this.$app[_Drawer].render.reDraw();

		return this[PropAttributes].delete(name);
	}

	clear(): void {
		this[PropAttributes].clear();

		this.$app[_Drawer].render.reDraw();
	}

	[MethodSetAttributes](attributes: TAttributeTuple[]): void {
		this[PropAttributes] = new Map(attributes);
	}
}
