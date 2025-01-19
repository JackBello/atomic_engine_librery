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
	_Camera,
	_Collision,
	_Events,
	_Frame,
	_Input,
	_Render,
	_ROOT_,
	_Script,
	_Worker,
	ClearData,
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
import CameraController from "./controllers/camera.controller";

import { ConstructorClasses } from "../nodes/constructor-classes";

import { BaseAppAbstract } from "@/nodes/abstract/base.abstract";
import { RootNode } from "../nodes/global/root/root-node";

import {
	Circle2D,
	ComponentNode,
	ControlEdition2D,
	GlobalNode,
	Image2D,
	LineFlowEffect2D,
	Matrix2D,
	Node2D,
	Rectangle2D,
	Scene,
	Selection2D,
	Sprite2D,
	Text2D,
	Transform2D,
	Transform3D,
	Vector2,
	Vector3,
	Vector4,
} from "@/nodes";

import { Camera2DComponent, CharacterBody2DComponent, Collision2DComponent, CollisionShape2DComponent, RigidBody2DComponent, StaticBody2DComponent, TransitionComponent } from "@/components";

import { Resource } from "./services/resources/resource";
import { ResourceImage } from "./services/resources/image.resource";
import { ResourceSpriteSheet } from "./services/resources/sprite-sheet.resource";

import { DEFAULT_CONFIG_ATOMIC_GAME } from "../configs/engine/game";

import { serializers } from "./utils/serialize";

export class GameCore {
	[key: string]: TAnything;

	readonly VERSION = "1.0.0";

	protected _options!: IOptionsGameCore;
	protected _global: Map<string, TAnything> = new Map();
	protected _events: EventObserver = new EventObserver();
	protected _resolvers: {
		script: (url: string | URL) => Promise<string>;
		worker: TFunction;
		resources: TFunction;
	} = {
			script: async (url: string | URL) => (await fetch(url)).text(),
			worker: () => { },
			resources: () => { },
		}

	readonly mode: TMode = "game";

	[_ROOT_]!: RootNode;

	[$Animation]!: AnimationService;
	[$Canvas]!: CanvasService;
	[$Scenes]!: ScenesService;

	[_Frame]!: FrameController;
	[_Render]!: RenderController;
	[_Input]!: InputController;
	[_Events]!: EventController;
	[_Script]!: ScriptController;
	[_Camera]!: CameraController;
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

	get viewport() {
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

		this[_Render].draw = true

		return this;
	}

	global(name: string) {
		return this._global.get(name);
	}

	resolver(name: "script" | "worker" | "resources", callback: TAnything) {
		this._resolvers[name] = callback;
	}

	getResolver(name: "script" | "worker" | "resources") {
		return this._resolvers[name];
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
		this._global.set("refresh-script", false);
		this._global.set("base-url", `${location.href}src/`)

		BaseAppAbstract[SetApp](this);

		ConstructorClasses[ClearData]()

		ConstructorClasses.multiple("resources", {
			Resource,
			ResourceImage,
			ResourceSpriteSheet
		})

		ConstructorClasses.multiple("math", {
			Vector2,
			Vector3,
			Vector4,
			Matrix2D,
			Transform2D,
			Transform3D
		})

		ConstructorClasses.multiple("nodes", {
			GlobalNode,
			ControlEdition2D,
			LineFlowEffect2D,
			Node2D,
			Image2D,
			Rectangle2D,
			Scene,
			Selection2D,
			Text2D,
			Circle2D,
			Sprite2D
		});

		ConstructorClasses.multiple("components", {
			ComponentNode,
			Collision2DComponent,
			CollisionShape2DComponent,
			StaticBody2DComponent,
			RigidBody2DComponent,
			CharacterBody2DComponent,
			Camera2DComponent,
			TransitionComponent
		})

		this[$Animation] = new AnimationService(this);
		this[$Canvas] = new CanvasService(this);
		this[$Scenes] = new ScenesService(this);

		this[_Frame] = new FrameController(this);
		this[_Render] = new RenderController(this);
		this[_Input] = new InputController(this);
		this[_Events] = new EventController(this);
		this[_Script] = new ScriptController(this);
		this[_Camera] = new CameraController(this);
		this[_Collision] = new CollisionController(this);

		this[_ROOT_] = new RootNode(this);

		this[_Script].initHelpers();

		this[_Render].load({
			context: this._options.context,
			dimension: this._options.dimension,
			mode: this.mode,
		});
		this[_Render].init(
			this.options.viewport.width,
			this.options.viewport.height,
		);


		this[$Scenes].add(await Scene.make(structure.scenes[0]));

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
