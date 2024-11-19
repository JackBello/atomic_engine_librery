import type {
	IOptionsGameCore,
	TAnything,
	TEventApp,
	TFunction,
	TMode,
	TSerialize,
} from "./types";

import {
	$Animation,
	$Canvas,
	$Scenes,
	_Collision,
	_Events,
	_Frame,
	_Input,
	_Render,
	_ROOT_,
	_Script,
	_Worker,
	DispatchEvent,
	GetOptions,
	SetApp,
	SetGlobal,
	SetOptions,
} from "./symbols";

import EventObserver from "./utils/observer";

import AnimationService from "./services/animation.service";
import CanvasService from "./services/canvas.service";
import ScenesService from "./services/scenes.service";

import FrameController from "./controllers/frame.controller";
import CollisionController from "./controllers/collision.controller";
import ScriptController from "./controllers/script.controller";
import InputController from "./controllers/input.controller";
import EventController from "./controllers/event.controller";
import RenderController from "./controllers/render.controller";

import ConstructorNodes from "../nodes/global/constructors/constructor-nodes";

import AbstractNode from "../nodes/abstract/node.abstract";
import RootNodeMainProcess from "../nodes/global/root/root-node.main";

import {
	ControlEdition2D,
	GlobalNode,
	LineFlowEffect2D,
	Node2D,
	Rectangle2D,
	Scene,
	Selection2D,
	Text2D,
} from "@/nodes";

import { DEFAULT_CONFIG_ATOMIC_GAME } from "../configs/engine/game";

import { serializers } from "./utils/serialize";
import { Vector2 } from "@/nodes/vectors/vector-2";
import { CallbackUpdateVector } from "@/nodes/symbols";

export class GameCore {
	[key: string]: TAnything;

	readonly VERSION = "1.0.0";

	protected _options!: IOptionsGameCore;
	protected _global: Map<string, TAnything> = new Map();
	protected _events: EventObserver = new EventObserver();

	readonly mode: TMode = "game";

	[_ROOT_]!: RootNodeMainProcess;

	[$Animation]!: AnimationService;
	[$Canvas]!: CanvasService;
	[$Scenes]!: ScenesService;

	[_Frame]!: FrameController;
	[_Render]!: RenderController;
	[_Input]!: InputController;
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
			width: this._options.viewport.width,
			height: this._options.viewport.height,
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
		this[$Canvas].setSize(width, height, true);

		this[_Render].setSize(width, height);

		return this;
	}

	global(name: string) {
		return this._global.get(name);
	}

	emit(name: TEventApp, callback: TFunction) {
		this._events.addEventListener(name, callback);

		return this;
	}

	async load(text: string, format: TSerialize = "JSON") {
		const structure = serializers[format].parse(text);

		this._options = structure.options;

		this._global.set("mode", "game"); // "edition" = 0 | "game" = 1 | "preview" = 2
		this._global.set("status", "play"); //  null | "play" | "pause" | "game-over" | "stop" | "start" | "intro" | "cinematic"
		this._global.set("scale-viewport", 1);
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
		});

		this[$Animation] = new AnimationService(this);
		this[$Canvas] = new CanvasService(this);
		this[$Scenes] = new ScenesService(this);

		this[_Frame] = new FrameController(this);
		this[_Render] = new RenderController(this);
		this[_Input] = new InputController(this);
		this[_Events] = new EventController(this);
		this[_Script] = new ScriptController(this);
		this[_Collision] = new CollisionController(this);

		this[_ROOT_] = new RootNodeMainProcess(this);

		Vector2[CallbackUpdateVector](() => {
			this[_Render].draw = true
		})

		this[_Script].initHelpersScript();

		this[_Render].load({
			context: this._options.context,
			dimension: this._options.dimension,
			mode: this.mode,
		});
		this[_Render].init(
			this.options.viewport.width,
			this.options.viewport.height,
		);


		this[$Scenes].add(Scene.make(structure.scenes[0]));

		this[$Scenes].change(this._options.scene ?? "");

		this.resize();

		this[$Animation].play();

		this[_Script].ready();
	}

	[GetOptions]() {
		return this._options;
	}

	[SetGlobal](name: string, value: TAnything) {
		this._global.set(name, value);
	}

	[SetOptions](options?: Partial<IOptionsGameCore>) {
		this._options = { ...DEFAULT_CONFIG_ATOMIC_GAME, ...options };

		this.init();
	}

	[DispatchEvent](event: TEventApp, ...args: TAnything[]): void {
		this._events.emitEvent(event, ...args);
	}
}
