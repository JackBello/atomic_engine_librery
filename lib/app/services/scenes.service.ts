import type { EngineCore } from "../engine";
import type { GameCore } from "../game";
import type { TAnything, TFunction, TSerialize } from "@/app/types";
import type { IControlEditor, TExportNode } from "@/nodes/global/types";
import type { TEventScenes } from "./events";

import {
	_Render,
	_Script,
	_Worker,
	DispatchEvent,
	DispatchScript,
	ExportData,
	ReloadApp,
	SetGlobal,
} from "../symbols";

import { type GlobalNode, Scene } from "@/nodes";

import EventObserver from "../utils/observer";
import { serializers } from "../utils/serialize";
import { PreloadResourcesFromScene } from "@/nodes/symbols";

export default class ScenesService {
	private $app: EngineCore | GameCore;

	protected _scenes = new Map<string, Scene>();
	protected _scene?: Scene;
	protected _events: EventObserver = new EventObserver();

	constructor(app: EngineCore | GameCore) {
		this.$app = app;
	}

	get currentScene() {
		return this._scene;
	}

	get scenes() {
		return [...this._scenes.values()];
	}

	get(slug: string) {
		if (!this._scenes.has(slug)) {
			throw new Error(`not found scene "${slug}"`);
		}

		return this._scenes.get(slug);
	}

	add(...scenes: Scene[]) {
		for (const scene of scenes) {
			if (scene instanceof Scene) this._scenes.set(scene.slug, scene);
			else throw new Error("this instance is not a scene");
		}

		this[DispatchEvent]("scenes:add", ...scenes);
	}

	delete(slug: string) {
		this._scenes.delete(slug);

		if (slug === this.currentScene?.slug) this._scene = undefined;

		this.$app[_Render].draw = true

		this[DispatchEvent]("scenes:delete", slug);
	}

	change(slug: string) {
		if (this._scene) this._scene[DispatchEvent]("scene:finish");

		const preScene = this.get(slug);

		if (!preScene) {
			throw new Error(`the scene to load does not exist ${slug}`);
		}

		this._scene = preScene;

		this[DispatchEvent]("scenes:change", slug);
	}

	async load() {
		if (!this._scene) {
			throw new Error("No scene selected to be loaded");
		}

		await this._scene[PreloadResourcesFromScene]()

		this[DispatchEvent]("scenes:load", this._scene);

		this._scene[DispatchEvent]("scene:preload");

		this.$app[_Render].draw = true

		await this.$app[_Script][DispatchScript]();

		this._scene[DispatchEvent]("scene:ready");

	}

	async refresh() {
		this.$app[SetGlobal]("refresh-script", true)
		await this.$app[_Script][DispatchScript]();
		this.$app[SetGlobal]("refresh-script", false)
	}

	reset(node?: Scene | GlobalNode) {
		if (!node) return

		node.reset();

		if (node.$nodes.size > 0)
			for (const child of node.$nodes.all) {
				this.reset(child);
			}
	}

	export(format: TSerialize = "JSON") {
		this[DispatchEvent]("scenes:export");

		return serializers[format].stringify(this[ExportData]());
	}

	async import(data: string, format: TSerialize = "JSON") {
		this[DispatchEvent]("scenes:import");

		const scenes: [string, Scene][] = [];

		const structures: TExportNode<IControlEditor>[] = serializers[format]
			.parse(data);

		for (const structure of structures) {
			scenes.push([structure.slug, await Scene.make(structure)]);
		}

		this._scenes = new Map(scenes);
	}

	emit(name: TEventScenes, callback: TFunction) {
		this._events.addEventListener(name, callback);
	}

	[DispatchEvent](name: TEventScenes, ...args: TAnything[]) {
		this._events.emitEvent(name, ...args);
	}

	[ExportData]() {
		const scenes = [];

		for (const scene of this.scenes) {
			scenes.push(scene[ExportData]());
		}

		return scenes;
	}

	[ReloadApp]() { }
}
