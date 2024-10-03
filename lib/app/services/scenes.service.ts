import * as YAML from "yaml";
import JSON5 from "json5";

import type { AtomicGame } from "@/atomic-game";
import type { AtomicEngine } from "@/atomic-engine";
import type { TAnything, TFunction } from "@/types";
import type { IControlEditor, TExportNode } from "@/nodes/global/node.types";
import type { TEventScenes } from "./event.type";

import {
	_Drawer,
	_Script,
	DispatchEvent,
	DispatchScript,
	ExportData,
	ExportWorker,
	ReloadApp,
} from "../../symbols";

import { Scene } from "@/nodes";

import EventObserver from "../utils/observer";

export default class ScenesService {
	private $app: AtomicEngine | AtomicGame;

	protected _scenes = new Map<string, Scene>();
	protected _scene?: Scene;
	protected _events: EventObserver = new EventObserver();

	constructor(app: AtomicEngine | AtomicGame) {
		this.$app = app;
	}

	get currentScene() {
		return this._scene;
	}

	get scenes() {
		return [...this._scenes.values()];
	}

	get(slug: string) {
		if (!this._scenes.has(slug)) throw new Error(`not found scene "${slug}"`);

		return this._scenes.get(slug);
	}

	add(...scenes: Scene[]) {
		for (const scene of scenes) {
			if (scene instanceof Scene) this._scenes.set(scene.slug, scene);
			else throw new Error("this instance is not a scene");
		}

		this[DispatchEvent]("scenes:add", scenes);
	}

	delete(slug: string) {
		this._scenes.delete(slug);

		if (slug === this.currentScene?.slug) this._scene = undefined;

		this[DispatchEvent]("scenes:delete", slug);
	}

	async change(slug: string) {
		if (this._scene) this._scene[DispatchEvent]("scene:finish");

		const preScene = this.get(slug);

		if (!preScene) throw new Error(`the scene to load does not exist ${slug}`);

		this._scene = preScene;

		preScene[DispatchEvent]("scene:preload");

		await this.$app[_Script][DispatchScript]();

		this.$app[_Drawer].nodes.setRoot(preScene[ExportWorker]());

		this[DispatchEvent]("scenes:change", slug);

		preScene[DispatchEvent]("scene:ready");
	}

	reset(node: Scene) {
		if (node) {
			node.reset();

			if (node.$nodes.size > 0)
				for (const child of node.$nodes.all) {
					this.reset(child);
				}
		}
	}

	export(format: "JSON" | "YAML" = "JSON") {
		this[DispatchEvent]("scenes:export");

		return format === "YAML"
			? YAML.stringify(this[ExportData]())
			: JSON5.stringify(this[ExportData]());
	}

	import(data: string, format: "JSON" | "YAML" = "JSON") {
		this[DispatchEvent]("scenes:import");

		const scenes: [string, Scene][] = [];

		const structures: TExportNode<IControlEditor>[] =
			format === "YAML" ? YAML.parse(data) : JSON5.parse(data);

		for (const structure of structures) {
			scenes.push([structure.slug, Scene.make(structure)]);
		}

		this._scenes = new Map(scenes);
	}

	emit(name: TEventScenes, callback: TFunction) {
		this._events.addEventListener(name, callback);
	}

	[DispatchEvent](name: TEventScenes, ...args: TAnything[]) {
		this._events.emitEvent(name, args);
	}

	[ExportData]() {
		const scenes = [];

		for (const scene of this.scenes) {
			scenes.push(scene[ExportData]());
		}

		return scenes;
	}

	[ReloadApp]() {}
}
