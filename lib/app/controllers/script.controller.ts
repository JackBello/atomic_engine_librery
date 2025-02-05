import { GlobalNode } from "@/nodes";
import type { TAnything, TFunction, TSerialize } from "@/app/types";

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
import type { Camera2DComponent } from "@/nodes/class/components/2D/camera.component";
import type { CharacterBody2DComponent, TransitionComponent } from "@/components";

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

	public existHelper(name: string) {
		return this._helpers.has(name)
	}

	public getHelpers(): Record<string, TAnything> {
		return Object.fromEntries(this._helpers);
	}

	public addHelper(name: string, helper: TAnything) {
		if (this.existHelper(name)) throw new Error("You cannot add an existing helper")

		this._helpers.set(
			name,
			helper,
		);
	}

	public modifyHelper(name: string, helper: TAnything, force = false) {
		const defaultHelpers = "Timers,Game,Logger,Window,Time,Input,CurrentScene,$import,preload"

		if (defaultHelpers.includes(name) && !force) throw new Error("You cannot modify the helpers that are defective unless you pass the last parameter as true")

		this._helpers.set(
			name,
			helper,
		);
	}

	public initHelpers() {
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
			viewport: () => this.$app instanceof EngineCore ? this.$app[GetOptions]().game.viewport : this.$app[GetOptions]().viewport,
			size: () => this.$app instanceof EngineCore ? this.$app.size : this.$app.viewport
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
				new URL(path, `${this.$app.global("base-url")}`).href
			)
		})

		this._helpers.set("preload", async (path: string, format: TSerialize = "TOML") => {
			const response = await fetch(`${this.$app.global("base-url")}${path}`)

			if (!response.ok)
				throw new Error("this resource not found")

			const text = await response.text()

			const node = await GlobalNode.import(text, format)

			if (node.$script.source) {
				node.$script.modeExecute = "none"

				await node.$script.executeScript()
			}

			return node
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
			if (node.NODE_NAME === "Scene" && this.$app.scenes.currentScene?.id !== node.id) continue

			if (!this.$app.ROOT.hasNodeByPath(node.getPath("id"), "id")) continue

			const _ready = node.$functions.get("_ready");

			if (
				(app.mode === "editor" || app.mode === "game") &&
				node.visible &&
				_ready
			) {
				_ready.bind(node)();
			} else if ((app.mode === "editor" || app.mode === "game") && node.NODE_NAME === "Scene" && _ready) {
				_ready.bind(node)();
			}
		}
	}

	protected executeFunctionsScript(delta: number) {
		if (this._scripts.size === 0) return;

		const mode =
			this.$app.global("mode") === "preview" || this.$app.mode === "game";

		for (const node of this._scripts.values()) {
			if (node.NODE_NAME === "Scene" && this.$app.scenes.currentScene?.id !== node.id) continue

			if (!this.$app.ROOT.hasNodeByPath(node.getPath("id"), "id")) continue

			const _draw = node.$functions.get("_draw");
			const _process = node.$functions.get("_process");
			const _process_physics = node.$functions.get("_process_physics");
			const _input = node.$functions.get("_input");

			if (mode && this.$app.global("dispatch-event") && _input) {
				_input.bind(node)(this.$app[_Input]);
			}

			if (mode && node?.visible && _process_physics) {
				_process_physics.bind(node)(delta);
			} else if (mode && node?.visible && _process) {
				_process.bind(node)(delta);
			}

			if (mode && node?.[NodePropType].startsWith("2D") && _draw) {
				_draw.bind(node)();
			}

			this.handlerComponents(node, delta)
		}
	}

	protected handlerComponents(node: GlobalNode, delta: number) {
		if (node.$components.has("camera")) {
			const camera = node.$components.get("camera") as Camera2DComponent

			camera.process();
		}

		if (node.$components.has("transition")) {
			const transition = node.$components.get("transition") as TransitionComponent

			transition.process(delta)
		}

		if (node.$components.has("character-body")) {
			const characterBody = node.$components.get("character-body") as CharacterBody2DComponent

			characterBody.process(delta)
		}
	}

	async [DispatchScript]() {
		const scene = this.$app.scenes.currentScene;

		if (!scene) return;

		const scriptsDispatch = scene[ScriptsNodeFromScene];

		if (scriptsDispatch.size === 0) return;

		for (const node of scriptsDispatch.values()) {
			await node.$script[DispatchScript](node.$script.source);
		}

		scriptsDispatch.clear();
	}
}
