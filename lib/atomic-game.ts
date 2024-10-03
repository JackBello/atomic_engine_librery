import * as YAML from "yaml";
import JSON5 from "json5";

import type {
	AllTypesSimple,
	IOptionsAtomicGame,
	TAnything,
	TFunction,
	TMode,
} from "./types";
import type { TEventCanvas } from "./event.type";

import {
	DispatchEvent,
	SetApp,
	$Scenes,
	_ROOT_,
	$Animation,
	$Canvas,
	_Drawer,
	_Events,
	_Script,
	_Collision,
	SetGlobal,
	GetOptions,
	SetOptions,
} from "./symbols";
import { AddNodesToConstructorNode } from "./nodes/symbols";

import EventObserver from "./app/utils/observer";

import AnimationService from "./app/services/animation.service";
import CanvasService from "./app/services/canvas.service";
import ScenesService from "./app/services/scenes.service";

import CollisionController from "./app/controllers/collision.controller";
import ScriptController from "./app/controllers/script.controller";
import EventController from "./app/controllers/event.controller";
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

import { DEFAULT_CONFIG_ATOMIC_GAME } from "./configs/engine/game";

export class AtomicGame {
	[key: string]: TAnything;

	readonly VERSION = "1.0.0";

	protected _options!: IOptionsAtomicGame;
	protected _global: Map<string, AllTypesSimple> = new Map();
	protected _events: EventObserver = new EventObserver();

	readonly mode: TMode = "game";

	[_ROOT_]!: RootNode;

	[$Animation]!: AnimationService;
	[$Canvas]!: CanvasService;
	[$Scenes]!: ScenesService;

	[_Drawer]!: DrawerController;
	[_Events]!: EventController;
	[_Script]!: ScriptController;
	[_Collision]!: CollisionController;

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

	resize() {
		const windowAspect = window.innerWidth / window.innerHeight;
		const gameAspect =
			this._options.viewport.width / this._options.viewport.height;

		if (windowAspect > gameAspect) {
			this[$Canvas].instance.height = window.innerHeight;
			this[$Canvas].instance.width =
				this._options.viewport.width *
				(this[$Canvas].instance.height / this._options.viewport.height);

			this.setSize(this[$Canvas].instance.width, this[$Canvas].instance.height);
		} else {
			this[$Canvas].instance.width = window.innerWidth;
			this[$Canvas].instance.height =
				this._options.viewport.height *
				(this[$Canvas].instance.width / this._options.viewport.width);

			this.setSize(this[$Canvas].instance.width, this[$Canvas].instance.height);
		}

		this[SetGlobal](
			"scale-viewport",
			this[$Canvas].instance.width / this._options.viewport.width,
		);

		this.drawer.render.setScaleViewport(
			this.global("scale-viewport") as number,
		);

		return this;
	}

	setSize(width: number, height: number) {
		this.canvas.setSize(width, height, true);

		this[_Drawer].render.setSize(width, height);

		return this;
	}

	global(name: string) {
		return this._global.get(name);
	}

	emit(name: TEventCanvas, callback: TFunction) {
		this._events.addEventListener(name, callback);

		return this;
	}

	async load(text: string, format: "JSON" | "YAML" = "JSON") {
		const structure = format === "JSON" ? JSON5.parse(text) : YAML.parse(text);

		this._options = structure.options;

		this._global.set("mode", "game"); // "edition" = 0 | "game" = 1 | "preview" = 2
		this._global.set("status", "play"); //  null | "play" | "pause" | "game-over" | "stop" | "start" | "intro" | "cinematic"
		this._global.set("re-draw", true);
		this._global.set("scale-viewport", 1);

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
		this[_Script] = new ScriptController(this);
		this[_Collision] = new CollisionController(this);

		this[_Drawer].render.setViewportGame(
			this.options.viewport.width,
			this.options.viewport.height,
		);

		this[$Scenes].add(Scene.make(structure.scenes[0]));

		await this[$Scenes].change(this._options.scene ?? "");

		this.resize();

		this[$Animation].play();

		await this[_Script].ready();
	}

	[GetOptions]() {
		return this._options;
	}

	[SetGlobal](name: string, value: AllTypesSimple) {
		this._global.set(name, value);
	}

	[SetOptions](options?: Partial<IOptionsAtomicGame>) {
		this._options = { ...DEFAULT_CONFIG_ATOMIC_GAME, ...options };

		this.init();
	}

	[DispatchEvent](event: TEventCanvas, ...args: AllTypesSimple[]): void {
		this._events.emitEvent(event, ...args);
	}
}
