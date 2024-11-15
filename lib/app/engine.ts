import type {
	IOptionsEngineCore,
	TAnything,
	TClass,
	TEventApp,
	TFunction,
	TMode,
} from "./types";

import {
	$Animation,
	$Canvas,
	$Scenes,
	_Collision,
	_Distribution,
	_Events,
	_Frame,
	_Input,
	_Render,
	_ROOT_,
	_Script,
	_Window,
	_Worker,
	DispatchEvent,
	GetOptions,
	SetApp,
	SetGlobal,
	SetOptions,
} from "./symbols";

import type { Plugin } from "./plugin";

import EventObserver from "./utils/observer";

import AnimationService from "./services/animation.service";
import CanvasService from "./services/canvas.service";
import ScenesService from "./services/scenes.service";

import DistributionController from "./controllers/distribution.controller";
import CollisionController from "./controllers/collision.controller";
import EventController from "./controllers/event.controller";
import WindowController from "./controllers/window.controller";
import ScriptController from "./controllers/script.controller";
import WorkerController from "./controllers/worker.controller";
import RenderController from "./controllers/render.controller";
import FrameController from "./controllers/frame.controller";
import InputController from "./controllers/input.controller";

import ConstructorNodes from "../nodes/global/constructors/constructor-nodes";

import AbstractNode from "../nodes/abstract/node.abstract";
import RootNodeMainProcess from "../nodes/global/root/root-node.main";

import {
	Circle2D,
	ControlEdition2D,
	GlobalNode,
	LineFlowEffect2D,
	Node2D,
	Rectangle2D,
	Scene,
	Selection2D,
	Text2D,
} from "@/nodes";

import { DEFAULT_CONFIG_ATOMIC_ENGINE } from "../configs/engine/editor";

export class EngineCore {
	[key: string]: TAnything;

	readonly VERSION = "1.0.0";

	protected _options: IOptionsEngineCore;
	protected _plugins: Map<string, Plugin> = new Map();
	protected _global: Map<string, TAnything> = new Map();
	protected _events: EventObserver = new EventObserver();

	readonly mode: TMode = "editor";

	[_ROOT_]!: RootNodeMainProcess;

	[$Animation]!: AnimationService;
	[$Canvas]!: CanvasService;
	[$Scenes]!: ScenesService;

	[_Frame]!: FrameController;
	[_Worker]!: WorkerController;
	[_Render]!: RenderController;
	[_Input]!: InputController;
	[_Events]!: EventController;
	[_Window]!: WindowController;
	[_Script]!: ScriptController;
	[_Collision]!: CollisionController;
	[_Distribution]!: DistributionController;

	get control() {
		return {
			preview: {
				play: async () => {
					if (this.global("mode") === "edition") {
						if (this.global("reset")) {
							await this[_Script].ready();
							this._global.set("reset", false);
						}

						this._global.set("mode", "preview");
					}
				},
				stop: () => {
					if (this[$Scenes].currentScene) {
						this._global.set("mode", "edition");
						this._global.set("reset", true);

						this[$Scenes].reset(this[$Scenes].currentScene);
					}
				},
				pause: () => {
					if (this.global("mode") === "preview") {
						this._global.set("mode", "edition");
					}
				},
			},
			game: {
				play: () => {
					this[_Window].createWindow();
				},
				stop: () => {
					this[_Window].closeWindow();
				},
			},
		};
	}

	get ROOT() {
		return this[_ROOT_];
	}

	get animation() {
		return this[$Animation];
	}

	get canvas() {
		return this[$Canvas];
	}

	get scenes() {
		return this[$Scenes];
	}

	get input() {
		return this[_Input];
	}

	get size() {
		return {
			width: this._options.width,
			height: this._options.height,
		};
	}

	get viewport() {
		return {
			width: this._options.game.viewport.width,
			height: this._options.game.viewport.height,
		};
	}

	constructor(options?: Partial<IOptionsEngineCore>) {
		this._options = { ...DEFAULT_CONFIG_ATOMIC_ENGINE, ...options };

		this.init();
	}

	protected init() {
		this._global.set("mode", "edition"); // "edition" = 0 | "game" = 1 | "preview" = 2
		this._global.set("status", null); //  null | "play" | "pause" | "game-over" | "stop" | "start" | "intro" | "cinematic"
		this._global.set("fps", null);
		this._global.set("scale-viewport", 1);
		this._global.set("reset", true);
		this._global.set("dispatch-event", false);

		AbstractNode[SetApp](this);

		ConstructorNodes.addNodes({
			GlobalNode,
			ControlEdition2D,
			LineFlowEffect2D,
			Node2D,
			Rectangle2D,
			Scene,
			Selection2D,
			Text2D,
			Circle2D,
		});

		this[$Animation] = new AnimationService(this);
		this[$Canvas] = new CanvasService(this);
		this[$Scenes] = new ScenesService(this);

		this[_Frame] = new FrameController(this);
		this[_Worker] = new WorkerController(this);
		this[_Render] = new RenderController(this);
		this[_Input] = new InputController(this);
		this[_Events] = new EventController(this);
		this[_Window] = new WindowController(this);
		this[_Script] = new ScriptController(this);
		this[_Collision] = new CollisionController(this);
		this[_Distribution] = new DistributionController(this);

		this[_ROOT_] = new RootNodeMainProcess(this);

		this[_Script].initHelpersScript();

		if (this._options.renderProcess === "main-thread") {
			this[_Render].load({
				context: this._options.context,
				dimension: this._options.dimension,
				mode: this.mode,
			});
			this[_Render].init(this._options.width, this._options.height);
		}

		this.setSize(this._options.width, this._options.height);

		this[$Animation].play();
	}

	setSize(width: number, height: number) {
		this._options.width = width;
		this._options.height = height;

		this[$Canvas].setSize(width, height);

		if (this._options.renderProcess === "sub-thread") {
			this[_Worker].render.setSize(width, height);
		}

		if (this._options.renderProcess === "main-thread") {
			this[_Render].setSize(width, height);
		}

		return this;
	}

	use(
		name: string,
		plugin: TClass<Plugin>,
		options: Record<string, TAnything> = {},
	) {
		this._plugins.set(name, new plugin(this, name));

		let instance = this._plugins.get(name);

		if (!instance) throw new Error("");

		instance.install(options);

		let functions = Object.entries(instance.inject());
		let operations = instance.operations();

		if (operations.after.length > 0) {
			for (const operation of operations.after) {
				this[_Worker].render.addAfterOperation(operation);
			}
		}

		if (operations.before.length > 0) {
			for (const operation of operations.before) {
				this[_Worker].render.addBeforeOperation(operation);
			}
		}

		if (functions.length > 0) {
			const functionsInject: Record<string, TFunction> = {};

			for (const [name, method] of functions) {
				functionsInject[name] = method.bind(this);
			}

			this[instance.name] = functionsInject;
		}

		instance = undefined;
		functions = [];
		operations = {
			after: [],
			before: [],
		};

		return this;
	}

	emit(name: TEventApp, callback: TFunction) {
		this._events.addEventListener(name, callback);

		return this;
	}

	plugin(name: string) {
		return this._plugins.get(name);
	}

	global(name: string) {
		return this._global.get(name);
	}

	helpers() {
		return {
			Root: this[_ROOT_],
			Scenes: this[$Scenes],
			Canvas: this[$Canvas],
			Animation: this[$Animation],
		};
	}

	export(mode: "editor" | "game" = "editor", format: "JSON" | "YAML" = "JSON") {
		return this[_Distribution].export(mode, format);
	}

	import(data: string, format: "JSON" | "YAML" = "JSON") {
		this[_Distribution].import(data, format);

		return this;
	}

	[GetOptions]() {
		return this._options;
	}

	[SetGlobal](name: string, value: TAnything) {
		this._global.set(name, value);
	}

	[SetOptions](options?: Partial<IOptionsEngineCore>) {
		this._options = { ...DEFAULT_CONFIG_ATOMIC_ENGINE, ...options };
	}

	[DispatchEvent](event: TEventApp, ...args: TAnything[]): void {
		this._events.emitEvent(event, ...args);
	}
}
