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

	getAll(): Omit<TAttribute, 'update'>[] {
		return [...this[NodePropHandlerAttributes].values()];
	}

	get(name: string): Omit<TAttribute, 'update'> | undefined {
		return this[NodePropHandlerAttributes].get(name);
	}

	set(name: string, options: Omit<TAttribute, 'update'>): boolean {
		if (this.has(name)) {
			const attr = this[NodePropHandlerAttributes].get(name) as TAttribute

			attr.update = false

			this[NodePropHandlerAttributes].set(name, attr);

			return false
		}

		const defaultOptions: TAttribute = { ...options }
		defaultOptions.update = false

		this[NodePropHandlerAttributes].set(name, defaultOptions);

		return true
	}

	change(name: string, options: Omit<TAttribute, 'update'>): boolean {
		if (!this.has(name)) return false

		const defaultOptions: TAttribute = { ...options }
		defaultOptions.update = true

		this[NodePropHandlerAttributes].set(name, defaultOptions);

		return true
	}

	clear() {
		for (const [name, attr] of this[NodePropHandlerAttributes]) {
			if (!attr.update) {
				this[NodePropHandlerAttributes].delete(name)
			}
		}
	}

	has(name: string): boolean {
		return this[NodePropHandlerAttributes].has(name);
	}

	[NodeSetHandlerAttributes](attributes: TAttributeTuple[]): void {
		this[NodePropHandlerAttributes] = new Map(attributes);
	}

	[NodeDestroy]() {
		this.$node = null as TAnything;
		this.$app = null as TAnything;
	}
}
