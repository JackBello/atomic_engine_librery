import type { GlobalNode } from "@/nodes";
import type { TAnything, TFunction } from "@/app/types";

import type { GameCore } from "../game";
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
import { ExecuteProcess } from "./symbols";
import type { CameraComponent } from "@/nodes/class/components/2D/camera.component";

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

	public getHelpersScript(): Record<string, TAnything> {
		return Object.fromEntries(this._helpers);
	}

	public setHelperScript(name: string, helper: TAnything) {
		this._helpers.set(
			`$${name.charAt(0).toLowerCase()}${name.slice(1)}`,
			helper,
		);
	}

	public initHelpersScript() {
		this._helpers.set("Timers", {
			timeout: (time: number, callback: TFunction) =>
				setTimeout(callback, time),
			interval: (time: number, callback: TFunction) =>
				setInterval(callback, time),
			clear: (reference: number, type: "interval" | "timeout") =>
				type === "interval"
					? clearInterval(reference)
					: clearTimeout(reference),
		});

		this._helpers.set("Game", {
			finish: () => {
				this.$app[SetGlobal]("status", "pause");
			},
			restart: () => {
				this.$app[SetGlobal]("status", "pause");
				this.ready();
				this.$app[$Scenes].reset(this.$app[$Scenes].currentScene);
				this.$app[SetGlobal]("status", "play");
			},
			play: () => {
				this.$app[SetGlobal]("status", "play");
			},
			pause: () => {
				this.$app[SetGlobal]("status", "pause");
			},
		});

		this._helpers.set("Logger", {
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

		this._helpers.set("Window", {
			viewport: () => this.$app instanceof EngineCore ? this.$app[GetOptions]().game.viewport : this.$app[GetOptions]().viewport
		});

		this._helpers.set("Time", {
			delta: () => this.$app[_Frame].DELTA,
			frame: () => this.$app[_Frame].FRAME,
		});

		this._helpers.set("Input", this.$app[_Input]);

		this._helpers.set("CurrentScene", undefined);

		this._helpers.set("$import", async (path: string) => {
			return await import(
				/* @vite-ignore */
				new URL(path, `${location.href}src/`).href
			)
		})
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

			if (mode && node?.visible && _process) {
				_process.bind(node)(delta);
			}

			if (mode && node?.[NodePropType].startsWith("2D") && _draw) {
				_draw.bind(node)();
			}

			this.handlerComponents(node)
		}
	}

	protected handlerComponents(node: GlobalNode) {
		if (node.$components.has("camera")) {
			const camera = node.$components.get("camera") as CameraComponent

			camera.process();
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
