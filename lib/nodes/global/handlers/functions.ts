import type { IHandleFunction, TFunctionTuple } from "../node.types";
import type { GlobalNode } from "@/nodes";
import type { AtomicGame } from "@/atomic-game";
import type { AtomicEngine } from "@/atomic-engine";
import type { TFunction } from "@/types";

import { MethodSetFunctions, PropFunctions } from "@/nodes/symbols";
import { _Drawer, GetApp, SetGlobal } from "@/symbols";

export class HandlerFunction implements IHandleFunction {
	private $node: GlobalNode;
	private $app: AtomicEngine | AtomicGame;

	[PropFunctions]: Map<string, TFunction>;

	constructor($node: GlobalNode) {
		this.$node = $node;
		this.$app = this.$node[GetApp]();

		this[PropFunctions] = new Map();
	}

	toEntries(): TFunctionTuple[] {
		return [...this[PropFunctions].entries()];
	}

	gelAll(): TFunction[] {
		return [...this[PropFunctions].values()];
	}

	get(name: string): TFunction | undefined {
		return this[PropFunctions].get(name);
	}

	add(name: string, func: TFunction): void {
		this[PropFunctions].set(name, func);

		this.$app[_Drawer].render.reDraw();

		this.$app[SetGlobal]("re-draw", true);
	}

	has(name: string): boolean {
		return this[PropFunctions].has(name);
	}

	delete(name: string): boolean {
		this.$app[_Drawer].render.reDraw();

		this.$app[SetGlobal]("re-draw", true);

		return this[PropFunctions].delete(name);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	execute(name: string, ...args: any[]): void {
		const func = this.get(name);

		if (!func) return;

		func(args);
	}

	clear(): void {
		this[PropFunctions].clear();

		this.$app[_Drawer].render.reDraw();

		this.$app[SetGlobal]("re-draw", true);
	}

	[MethodSetFunctions](functions: TFunctionTuple[]): void {
		this[PropFunctions] = new Map(functions);
	}
}
