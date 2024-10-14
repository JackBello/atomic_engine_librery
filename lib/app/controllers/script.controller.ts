import type { GlobalNode } from "@/nodes";
import type { GameCore } from "../game";
import type { EngineCore } from "../engine";

import { $Scenes, _Input, DispatchScript } from "@/symbols";
import { PropType } from "@/nodes/symbols";

import EventObserver from "@/app/utils/observer";

export default class ScriptController {
	private $app: EngineCore | GameCore;

	protected _events: EventObserver = new EventObserver();

	constructor(app: EngineCore | GameCore) {
		this.$app = app;
	}

	async ready() {
		if (this.$app[$Scenes].currentScene)
			await this.executeFunctionReady(this.$app[$Scenes].currentScene);
	}

	async process(delta: number) {
		if (this.$app[$Scenes].currentScene && this.$app.mode === "game")
			await this.executeFunctionScriptGame(
				this.$app[$Scenes].currentScene,
				delta,
			);
		if (this.$app[$Scenes].currentScene && this.$app.mode === "editor")
			await this.executeFunctionScriptEditor(
				this.$app[$Scenes].currentScene,
				delta,
			);
	}

	protected async executeFunctionReady(node: GlobalNode) {
		const app = this.$app;

		const _ready = node.$functions.get("_ready");

		if (
			(app.mode === "editor" || app.mode === "game") &&
			node &&
			node?.visible &&
			_ready
		)
			await _ready();

		if (node.$nodes.size > 0)
			for (const child of node.$nodes.all) {
				await this.executeFunctionReady(child);
			}
	}

	protected async executeFunctionScriptEditor(node: GlobalNode, delta: number) {
		const app = this.$app;
		const mode = app.global("mode") === "preview";

		const _draw = node.$functions.get("_draw");
		const _process = node.$functions.get("_process");
		const _input = node.$functions.get("_input");

		if (mode && this.$app.global("dispatch-event") && _input)
			_input(this.$app[_Input]);

		if (node?.visible && mode && _process) await _process(delta);

		if (node?.[PropType].startsWith("2D") && mode && _draw) await _draw();

		if (node.$nodes.size > 0)
			for (const child of node.$nodes.all) {
				await this.executeFunctionScriptEditor(child, delta);
			}
	}

	protected async executeFunctionScriptGame(node: GlobalNode, delta: number) {
		const _draw = node.$functions.get("_draw");
		const _process = node.$functions.get("_process");

		if (node?.visible && _process) await _process(delta);

		if (node?.[PropType].startsWith("2D") && _draw) {
			await _draw();
		}

		if (node.$nodes.size > 0)
			for (const child of node.$nodes.all) {
				await this.executeFunctionScriptGame(child, delta);
			}
	}

	async [DispatchScript](
		node: GlobalNode | undefined = this.$app[$Scenes].currentScene,
	) {
		if (!node) return;

		node[DispatchScript]();

		if (node.$nodes.size > 0)
			for (const child of node.$nodes.all) {
				await this[DispatchScript](child);
			}
	}
}
