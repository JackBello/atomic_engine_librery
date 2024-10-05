import type { IHandleMetaKey, TMetaKey, TMetaKeyTuple } from "../node.types";
import type { GlobalNode } from "@/nodes";
import type { GameCore } from "@/app/game";
import type { EngineCore } from "@/app/engine";

import { _Drawer, GetApp, SetGlobal } from "@/symbols";
import { MethodSetMetaKeys, PropMetaKeys } from "@/nodes/symbols";

export class HandlerMetaKey implements IHandleMetaKey {
	private $node: GlobalNode;
	private $app: EngineCore | GameCore;

	[PropMetaKeys]: Map<string, TMetaKey>;

	constructor($node: GlobalNode) {
		this.$node = $node;
		this.$app = this.$node[GetApp]();

		this[PropMetaKeys] = new Map();
	}

	toEntries(): TMetaKeyTuple[] {
		return [...this[PropMetaKeys].entries()];
	}

	getAll(): TMetaKey[] {
		return [...this[PropMetaKeys].values()];
	}

	get(name: string): TMetaKey | undefined {
		return this[PropMetaKeys].get(name);
	}

	add(name: string, options: TMetaKey): void {
		this[PropMetaKeys].set(name, options);

		this.$app[_Drawer].render.reDraw();

		this.$app[SetGlobal]("re-draw", true);
	}

	has(name: string): boolean {
		return this[PropMetaKeys].has(name);
	}

	delete(name: string): boolean {
		this.$app[_Drawer].render.reDraw();

		this.$app[SetGlobal]("re-draw", true);

		return this[PropMetaKeys].delete(name);
	}

	clear(): void {
		this[PropMetaKeys].clear();

		this.$app[_Drawer].render.reDraw();

		this.$app[SetGlobal]("re-draw", true);
	}

	[MethodSetMetaKeys](metaKeys: TMetaKeyTuple[]): void {
		this[PropMetaKeys] = new Map(metaKeys);
	}
}
