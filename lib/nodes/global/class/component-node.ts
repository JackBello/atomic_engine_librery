import type { EngineCore } from "@/app/engine";
import type { GameCore } from "@/app/game";
import type { GlobalNode } from "../global-node";
import type { TAnything, TSerialize } from "@/app/types";
import { ExportData, GetApp, SetApp, SetOptions } from "@/app/symbols";
import { NodeDestroy, NodeSetParent } from "@/nodes/symbols";
import type { TExportComponent } from "../types";
import { serializers } from "@/app/utils/serialize";

export class ComponentNode<O extends Record<string, TAnything> = Record<string, TAnything>> {
	protected $node: GlobalNode;
	protected $app: EngineCore | GameCore;

	readonly NAME_CLASS: string = "ComponentNode"

	protected _name = "";
	protected _description = "";
	protected _options!: O;
	protected _active = true

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
	}

	getOptions(): O {
		return { ...this._options }
	}

	init() { }

	startOptions() { }

	process(delta: number) { delta }

	reset() { }

	static import(data: string, format: TSerialize = "JSON"): ComponentNode {
		const structure: TExportComponent = serializers[format].parse(data);

		const invoke = new ComponentNode(null as TAnything)

		invoke[SetOptions](structure.name, structure.description, structure.options)

		return invoke
	}

	export(format: TSerialize = "JSON") {
		return serializers[format].stringify(this[ExportData]())
	}

	protected parseOptions(options: O) {
		return options
	}

	[NodeSetParent](node: GlobalNode) {
		this.$node = node;
	}

	[SetApp](app: EngineCore | GameCore) {
		this.$app = app
	}

	[SetOptions](name: string, description: string, options: O) {
		this._name = name
		this._description = description
		this._options = this.parseOptions(options)
	}

	[ExportData](): TExportComponent {
		return {
			description: this._description,
			name: this._name,
			options: this.getOptions(),
			type: this.NAME_CLASS
		}
	}

	[NodeDestroy]() {
		this.$node = null as TAnything;
		this.$app = null as TAnything;
	}
}
