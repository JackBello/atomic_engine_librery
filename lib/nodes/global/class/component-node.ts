import type { EngineCore } from "@/app/engine";
import type { GameCore } from "@/app/game";
import type { GlobalNode } from "../global-node";
import type { TAnything } from "@/app/types";
import { GetApp } from "@/app/symbols";

export class ComponentNode {
	protected $node: GlobalNode;
	protected $app: EngineCore | GameCore;

	protected _name = "";
	protected _description = "";
	protected _options: Record<string, TAnything> = {};

	get NODE() {
		return this.$node;
	}

	get name() {
		return this._name;
	}

	get description() {
		return this._description;
	}

	constructor($node: GlobalNode) {
		this.$node = $node;
		this.$app = this.$node[GetApp];
		this.init();
	}

	init() {}

	process() {}
}
