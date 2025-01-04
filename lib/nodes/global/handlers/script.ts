import type { EngineCore } from "@/app/engine";
import type { GameCore } from "@/app/game";
import type { GlobalNode } from "../global-node";
import {
	$ConstructorScript,
	NodeDestroy,
	NodeSetScript,
	ScriptsNodeFromScene,
} from "@/nodes/symbols";
import { _Script, DispatchScript, GetApp } from "@/app/symbols";
import type { TAnything } from "@/app/types";

export class HandlerScript {
	private $node: GlobalNode;
	private $app: EngineCore | GameCore;

	protected _script: string | URL | null = null;

	get source() {
		return this._script
	}

	modeExecute: "auto" | "none" = "auto";

	constructor($node: GlobalNode) {
		this.$node = $node;
		this.$app = this.$node[GetApp];
	}

	protected deleteScriptFromQueue() {
		if (!this.$app.ROOT.TOP) return;

		if (!this.$app.ROOT.TOP[ScriptsNodeFromScene].has(this.$node)) return;

		this.$app.ROOT.TOP[ScriptsNodeFromScene].delete(this.$node);
	}

	protected deleteScriptFromController() {
		if (!this.$app.scenes.currentScene) return;

		if (!this.$app[_Script].existScript(this.$node)) return;

		this.$app[_Script].removeScript(this.$node);
	}

	protected addScriptToQueue() {
		if (!this.$node.TOP) {
			throw new Error(
				"You cannot define an auto script without having added the node to a scene",
			);
		}

		if (this.$node.TOP[ScriptsNodeFromScene].has(this.$node)) return;

		this.$node.TOP[ScriptsNodeFromScene].add(this.$node);
	}

	removeScript() {
		this._script = null;

		if (this.modeExecute === "auto") {
			this.deleteScriptFromQueue();
		}

		if (this.modeExecute === "none") {
			this.deleteScriptFromController();
		}
	}

	defineScript(script: string | URL): void {
		let abstract: URL | string;

		if (URL.canParse(script)) {
			abstract = new URL(script);
		} else if (script instanceof URL) {
			abstract = script;
		} else {
			abstract = script;
		}

		this._script = abstract;

		if (this.modeExecute === "auto") {
			this.addScriptToQueue();
		}
	}

	async executeScript() {
		if (this.modeExecute === "auto") {
			throw new Error(
				"You cannot run a script if the execution mode is set to auto",
			);
		}

		if (!this.$app.scenes.currentScene) {
			throw new Error(
				"You cannot run node script without having a scene loaded",
			);
		}

		if (!this._script) {
			console.warn("There is no script to run, so there will be no effect");
		}

		await this[DispatchScript](this._script);
	}

	async [DispatchScript](script: string | URL | null) {
		if (script === null) return;

		this.$app[_Script].addScript(this.$node);

		if (this.$app[_Script].existScript(this.$node) && this.$app.global("refresh-script") === true) return

		const { __FUNC__, __VARS__ } = await this.$node[
			$ConstructorScript
		].executeScript(this.$node, this.$app, script);

		for (const name of Object.keys(__VARS__)) {
			this.$node[name] = __VARS__[name];
		}

		for (const name of Object.keys(__FUNC__)) {
			if (!name.startsWith("_")) this.$node[name] = __FUNC__[name];
			this.$node.$functions.add(name, __FUNC__[name]);
		}
	}

	[NodeSetScript](script: string | URL | null) {
		this._script = script;
	}

	[NodeDestroy]() {
		this.$node = null as TAnything;
		this.$app = null as TAnything;
	}
}
