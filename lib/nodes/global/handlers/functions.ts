import type { IHandleFunction, TFunctionTuple } from "../node.types";
import type { GlobalNode } from "@/nodes";
import type { GameCore } from "@/app/game";
import type { EngineCore } from "@/app/engine";
import type { TAnything, TFunction } from "@/types";

import { MethodSetFunctions, PropFunctions } from "@/nodes/symbols";
import { _Drawer, GetApp } from "@/symbols";

export class HandlerFunction implements IHandleFunction {
	private $node: GlobalNode;
	private $app: EngineCore | GameCore;

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
	}

	has(name: string): boolean {
		return this[PropFunctions].has(name);
	}

	delete(name: string): boolean {
		this.$app[_Drawer].render.reDraw();

		return this[PropFunctions].delete(name);
	}

	execute(name: string, ...args: TAnything[]): void {
		const func = this.get(name);

		if (!func) return;

		func(args);
	}

	clear(): void {
		this[PropFunctions].clear();

		this.$app[_Drawer].render.reDraw();
	}

	[MethodSetFunctions](functions: TFunctionTuple[]): void {
		this[PropFunctions] = new Map(functions);
	}
}
