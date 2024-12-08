import type { TAnything, TClass, TFunction } from "@/app/types";
import type { EngineCore } from "./engine";
import type { GlobalNode, OperationNode } from "@/nodes";
import { GetHidden } from "@/app/symbols";

export class Plugin {
	protected $app: EngineCore;

	protected NAME = "plugin";

	protected HIDDEN: Record<string, TAnything>;
	protected OPTIONS: Record<string, TAnything>;
	protected CONFIGS: Record<string, TAnything>;
	protected HELPERS: Record<string, TFunction>;
	protected NODES: Map<string, TClass<GlobalNode>>;

	get name() {
		return this.NAME;
	}

	get configs() {
		return this.CONFIGS;
	}

	get helpers() {
		return this.HELPERS;
	}

	get nodes() {
		return [...this.NODES.values()];
	}

	constructor(app: EngineCore) {
		this.$app = app;
		this.HIDDEN = {};
		this.OPTIONS = {};
		this.CONFIGS = {};
		this.HELPERS = {};
		this.NODES = new Map();
	}

	install(options: TAnything) {
		options;
	}

	operations(): { after: OperationNode[]; before: OperationNode[] } {
		return {
			after: [],
			before: [],
		};
	}

	inject(): Record<string, TFunction> {
		return {};
	}

	get [GetHidden]() {
		return this.HIDDEN;
	}
}
