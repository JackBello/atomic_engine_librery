import type { GlobalNode, Scene } from "@/nodes";
import type { TAnything, TFunction } from "@/app/types";

import { GameCore } from "../game";
import { EngineCore } from "../engine";

import {
	$Scenes,
	_Frame,
	_Input,
	DispatchScript,
	GetOptions,
	SetGlobal,
} from "@/app/symbols";
import { NodePropType, ScriptsNodeFromScene } from "@/nodes/symbols";

import EventObserver from "@/app/utils/observer";
import ConstructorNodes from "@/nodes/global/constructors/constructor-nodes";
import { ExecuteProcess } from "./symbols";

export default class ScriptController {
	private $app: EngineCore | GameCore;

	protected _events: EventObserver = new EventObserver();
	protected _helpers = new Map();
	protected _scripts = new Set<GlobalNode>();

	constructor(app: EngineCore | GameCore) {
		this.$app = app;
	}

	public addScript(node: GlobalNode) {
		if (!this.existScript(node)) {
			this._scripts.add(node);
		}
	}

	public removeScript(node: GlobalNode) {
		if (this.existScript(node)) {
			this._scripts.delete(node);
		}
	}

	public existScript(node: GlobalNode) {
		return this._scripts.has(node);
	}

	public clearScripts() {
		if (this._scripts.size > 0) {
			this._scripts.clear();
		}
	}

	public getHelpersScript() {
		return Object.fromEntries(this._helpers);
	}

	public setHelperScript(name: string, helper: TAnything) {
		this._helpers.set(
			`$${name.charAt(0).toLowerCase()}${name.slice(1)}`,
			helper,
		);
	}

	public initHelpersScript() {
		this._helpers.set("$Timer", {
			timeout: (time: number, callback: TFunction) =>
				setTimeout(callback, time),
			interval: (time: number, callback: TFunction) =>
				setInterval(callback, time),
			clear: (reference: number, type: "interval" | "timeout") =>
				type === "interval"
					? clearInterval(reference)
					: clearTimeout(reference),
		});

		this._helpers.set("$Game", {
			finish: () => {
				this.$app[SetGlobal]("status", "pause");
			},
			reset: () => {
				this.$app[SetGlobal]("reset", true);
				this.$app[$Scenes].reset(this.$app[$Scenes].currentScene as Scene);
				this.$app[SetGlobal]("status", "play");
			},
			reload: () => {},
			pause: () => {
				this.$app[SetGlobal]("status", "pause");
			},
		});

		this._helpers.set("$Logger", {
			message: (...data: TAnything[]) => {
				console.log(...data);
			},
			error: (...data: TAnything[]) => {
				console.error(...data);
			},
			warning: (...data: TAnything[]) => {
				console.warn(...data);
			},
			info: (...data: TAnything[]) => {
				console.info(...data);
			},
		});

		this._helpers.set("$Window", {
			viewport: () => {
				let viewport = {
					width: 0,
					height: 0,
				};

				if (this.$app instanceof EngineCore) {
					viewport = this.$app[GetOptions]().game.viewport;
				} else if (this.$app instanceof GameCore) {
					viewport = this.$app[GetOptions]().viewport;
				}

				return viewport;
			},
		});

		this._helpers.set("$Time", {
			delta: () => this.$app[_Frame].DELTA,
			frame: () => this.$app[_Frame].FRAME,
			fps: () => this.$app[_Frame].FPS,
		});

		this._helpers.set("$Input", this.$app[_Input]);

		this._helpers.set("$Nodes", ConstructorNodes.getNodes());

		this._helpers.set("$Scene", () => this.$app.scenes.currentScene);
	}

	ready() {
		if (this.$app[$Scenes].currentScene) {
			this.executeFunctionReady();
		}
	}

	[ExecuteProcess](delta: number) {
		if (this.$app[$Scenes].currentScene) {
			this.executeFunctionsScript(delta);
		}
	}

	protected executeFunctionReady() {
		if (this._scripts.size === 0) return;

		const app = this.$app;

		for (const node of this._scripts.values()) {
			const _ready = node.$functions.get("_ready");

			if (
				(app.mode === "editor" || app.mode === "game") &&
				node &&
				node?.visible &&
				_ready
			) {
				_ready.bind(node)();
			}
		}
	}

	protected executeFunctionsScript(delta: number) {
		if (this._scripts.size === 0) return;

		const mode =
			this.$app.global("mode") === "preview" || this.$app.mode === "game";

		for (const node of this._scripts.values()) {
			const _draw = node.$functions.get("_draw");
			const _process = node.$functions.get("_process");
			const _input = node.$functions.get("_input");

			if (mode && this.$app.global("dispatch-event") && _input) {
				_input.bind(node)(this.$app[_Input]);
			}

			if (mode && node?.visible && _process) _process.bind(node)(delta);

			if (mode && node?.[NodePropType].startsWith("2D") && _draw) {
				_draw.bind(node)();
			}
		}
	}

	async [DispatchScript]() {
		const scene = this.$app.scenes.currentScene;

		if (!scene) return;

		const scriptsDispatch = scene[ScriptsNodeFromScene];

		if (scriptsDispatch.size === 0) return;

		for (const node of scriptsDispatch.values()) {
			await node[DispatchScript](node.script);
		}

		scriptsDispatch.clear();
	}
}
