import type { TAnything, TClass, TFunction } from "@/app/types";
import type { EngineCore } from "./engine";
import type { GlobalNode } from "@/nodes";
import type { INodeOperation } from "@/nodes/global/types";
import { GetHidden } from "@/app/symbols";

export class Plugin {
	protected $app: EngineCore;
	protected NAME: string;
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

	constructor(app: EngineCore, name: string) {
		this.$app = app;
		this.NAME = name;
		this.HIDDEN = {};
		this.OPTIONS = {};
		this.CONFIGS = {};
		this.HELPERS = {};
		this.NODES = new Map();
	}

	install(options: TAnything) {
		options;
	}

	operations(): { after: INodeOperation[]; before: INodeOperation[] } {
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
