import type { IHandleMetaKey, TMetaKey, TMetaKeyTuple } from "../types";
import type { GlobalNode } from "../global-node";
import type { GameCore } from "@/app/game";
import type { EngineCore } from "@/app/engine";

import { _Worker, GetApp } from "@/app/symbols";
import {
	NodeDestroy,
	NodePropHandlerMetaKeys,
	NodeSetHandlerMetaKeys,
} from "@/nodes/symbols";
import type { TAnything } from "@/app/types";

export class HandlerMetaKey implements IHandleMetaKey {
	private $node: GlobalNode;
	private $app: EngineCore | GameCore;

	[NodePropHandlerMetaKeys]: Map<string, TMetaKey>;

	constructor($node: GlobalNode) {
		this.$node = $node;
		this.$app = this.$node[GetApp];

		this[NodePropHandlerMetaKeys] = new Map();

		this.$app;
	}

	toEntries(): TMetaKeyTuple[] {
		return [...this[NodePropHandlerMetaKeys].entries()];
	}

	getAll(): TMetaKey[] {
		return [...this[NodePropHandlerMetaKeys].values()];
	}

	get(name: string): TMetaKey | undefined {
		return this[NodePropHandlerMetaKeys].get(name);
	}

	add(name: string, options: TMetaKey): void {
		this[NodePropHandlerMetaKeys].set(name, options);
	}

	has(name: string): boolean {
		return this[NodePropHandlerMetaKeys].has(name);
	}

	delete(name: string): boolean {
		return this[NodePropHandlerMetaKeys].delete(name);
	}

	clear(): void {
		this[NodePropHandlerMetaKeys].clear();
	}

	[NodeSetHandlerMetaKeys](metaKeys: TMetaKeyTuple[]): void {
		this[NodePropHandlerMetaKeys] = new Map(metaKeys);
	}

	[NodeDestroy]() {
		this.$node = null as TAnything;
		this.$app = null as TAnything;
	}
}
