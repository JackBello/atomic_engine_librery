import type {
	AllTypesSimple,
	IOptionsAtomicEngine,
	TAnything,
	TFunction,
	TMode,
} from "./types";
import type { TPlugin, TPluginReturn } from "./plugins/types";
import type { TEventCanvas } from "./event.type";

import {
	$Canvas,
	HiddenPlugin,
	DispatchEvent,
	SetOptions,
	SetApp,
	$Scenes,
	$Animation,
	_Drawer,
	_Events,
	_Window,
	_Script,
	_Collision,
	_Distribution,
	_ROOT_,
	SetGlobal,
	GetOptions,
} from "./symbols";
import { AddNodesToConstructorNode } from "./nodes/symbols";

import EventObserver from "./app/utils/observer";

import AnimationService from "./app/services/animation.service";
import CanvasService from "./app/services/canvas.service";
import ScenesService from "./app/services/scenes.service";

import DistributionController from "./app/controllers/distribution.controller";
import CollisionController from "./app/controllers/collision.controller";
import EventController from "./app/controllers/event.controller";
import WindowController from "./app/controllers/window.controller";
import ScriptController from "./app/controllers/script.controller";
import DrawerController from "./app/controllers/drawer.controller";

import ConstructorNodes from "./nodes/global/constructors/constructor-nodes";

import AbstractNode from "./nodes/abstract/node.abstract";
import RootNode from "./nodes/global/root-node";

import {
	GlobalNode,
	Collision2D,
	CollisionShape2D,
	ControlEdition2D,
	LineFlowEffect2D,
	Node2D,
	Rectangle2D,
	Scene,
	Selection2D,
	Text2D,
} from "@/nodes";

import { DEFAULT_CONFIG_ATOMIC_ENGINE } from "./configs/engine/editor";

export class AtomicEngine {
	[key: string]: TAnything;

	readonly VERSION = "1.0.0";

	protected _options: IOptionsAtomicEngine;
	protected _plugins: Map<string, Omit<TPluginReturn, "inject">> = new Map();
	protected _providers: Map<string, AllTypesSimple> = new Map();
	protected _configs: Map<string, AllTypesSimple> = new Map();
	protected _nodes: Map<string, AllTypesSimple> = new Map();
	protected _global: Map<string, AllTypesSimple> = new Map();
	protected _events: EventObserver = new EventObserver();

	readonly mode: TMode = "editor";

	[_ROOT_]!: RootNode;

	[$Animation]!: AnimationService;
	[$Canvas]!: CanvasService;
	[$Scenes]!: ScenesService;

	[_Drawer]!: DrawerController;
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
					if (this.global("mode") === "preview")
						this._global.set("mode", "edition");
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

	get size() {
		return {
			width: this.options.width,
			height: this.options.height,
		};
	}

	constructor(options?: Partial<IOptionsAtomicEngine>) {
		this._options = { ...DEFAULT_CONFIG_ATOMIC_ENGINE, ...options };

		this.init();
	}

	protected init() {
		this._global.set("mode", "edition"); // "edition" = 0 | "game" = 1 | "preview" = 2
		this._global.set("status", null); //  null | "play" | "pause" | "game-over" | "stop" | "start" | "intro" | "cinematic"
		this._global.set("fps", null);
		this._global.set("re-draw", true);
		this._global.set("scale-viewport", 1);
		this._global.set("reset", true);

		AbstractNode[SetApp](this);
		ConstructorNodes[AddNodesToConstructorNode]({
			GlobalNode,
			Collision2D,
			CollisionShape2D,
			ControlEdition2D,
			LineFlowEffect2D,
			Node2D,
			Rectangle2D,
			Scene,
			Selection2D,
			Text2D,
		});

		this[_ROOT_] = new RootNode();

		this[$Animation] = new AnimationService(this);
		this[$Canvas] = new CanvasService(this);
		this[$Scenes] = new ScenesService(this);

		this[_Drawer] = new DrawerController(this);
		this[_Events] = new EventController(this);
		this[_Window] = new WindowController(this);
		this[_Script] = new ScriptController(this);
		this[_Collision] = new CollisionController(this);
		this[_Distribution] = new DistributionController(this);

		this.setSize(this._options.width, this._options.height);

		this[$Animation].play();
	}

	setSize(width: number, height: number) {
		this._options.width = width;
		this._options.height = height;

		this[$Canvas].setSize(width, height);

		this[_Drawer].render.setSize(width, height);
		this[_Drawer].render.setSizeEditor(width, height);

		return this;
	}

	setImport() {
		return this;
	}

	use(plugin: TPlugin, options?: object) {
		const install = plugin.install(this, options);

		this._plugins.set(plugin.name, {
			nodes: install.nodes,
			config: install.config,
			process: install.process,
			[HiddenPlugin]: install[HiddenPlugin],
		});

		if (install.functions) {
			const processPlugin: Record<string, AllTypesSimple> = {};

			for (const [name, method] of Object.entries(install.functions)) {
				processPlugin[name] = method.bind(this);
			}

			this[plugin.name] = processPlugin;
		}

		return this;
	}

	emit(name: TEventCanvas, callback: TFunction) {
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

	[SetGlobal](name: string, value: AllTypesSimple) {
		this._global.set(name, value);
	}

	[SetOptions](options?: Partial<IOptionsAtomicEngine>) {
		this._options = { ...DEFAULT_CONFIG_ATOMIC_ENGINE, ...options };
	}

	[DispatchEvent](event: TEventCanvas, ...args: AllTypesSimple[]): void {
		this._events.emitEvent(event, ...args);
	}
}
