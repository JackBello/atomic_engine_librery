import type { IHandleFunction, TFunctionTuple } from "../types";
import type { GlobalNode } from "../global-node";
import type { GameCore } from "@/app/game";
import type { EngineCore } from "@/app/engine";
import type { TAnything, TFunction } from "@/app/types";

import {
	NodePropHandlerFunctions,
	NodeSetHandlerFunctions,
} from "@/nodes/symbols";
import { _Worker, GetApp } from "@/app/symbols";

export class HandlerFunction implements IHandleFunction {
	private $node: GlobalNode;
	private $app: EngineCore | GameCore;

	[NodePropHandlerFunctions]: Map<string, TFunction>;

	constructor($node: GlobalNode) {
		this.$node = $node;
		this.$app = this.$node[GetApp];

		this[NodePropHandlerFunctions] = new Map();
	}

	toEntries(): TFunctionTuple[] {
		return [...this[NodePropHandlerFunctions].entries()];
	}

	gelAll(): TFunction[] {
		return [...this[NodePropHandlerFunctions].values()];
	}

	get(name: string): TFunction | undefined {
		return this[NodePropHandlerFunctions].get(name);
	}

	add(name: string, func: TFunction): void {
		this[NodePropHandlerFunctions].set(name, func);

		this.$app[_Worker].render.draw();
	}

	has(name: string): boolean {
		return this[NodePropHandlerFunctions].has(name);
	}

	delete(name: string): boolean {
		this.$app[_Worker].render.draw();

		return this[NodePropHandlerFunctions].delete(name);
	}

	execute(name: string, ...args: TAnything[]): void {
		const func = this.get(name);

		if (!func) return;

		func(args);
	}

	clear(): void {
		this[NodePropHandlerFunctions].clear();

		this.$app[_Worker].render.draw();
	}

	[NodeSetHandlerFunctions](functions: TFunctionTuple[]): void {
		this[NodePropHandlerFunctions] = new Map(functions);
	}
}
