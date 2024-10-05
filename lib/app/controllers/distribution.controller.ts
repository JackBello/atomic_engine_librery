import * as YAML from "yaml";
import JSON5 from "json5";

import type { EngineCore } from "../engine";
import type { IOptionsGameCore } from "@/types";

import { $Scenes, ExportData, GetOptions, SetOptions } from "@/symbols";

import { Scene } from "@/nodes";

export default class DistributionController {
	private $app: EngineCore;

	constructor(app: EngineCore) {
		this.$app = app;
	}

	import(data: string, format: "JSON" | "YAML" = "JSON") {
		const structure = format === "JSON" ? JSON5.parse(data) : YAML.parse(data);

		this.$app[SetOptions](structure.options);

		const scenes: Scene[] = [];

		for (const scene of structure.scenes) {
			scenes.push(Scene.make(scene));
		}

		this.$app[$Scenes].add(...scenes);
	}

	export(
		mode: "editor" | "game",
		format: "JSON" | "YAML" = this.$app.options.export.format,
	) {
		return format === "YAML"
			? YAML.stringify(this[ExportData](mode))
			: JSON5.stringify(this[ExportData](mode));
	}

	[ExportData](mode: "editor" | "game") {
		const scenes = this.$app[$Scenes][ExportData]();
		const options = structuredClone(this.$app[GetOptions]());

		if (mode === "game")
			return {
				options: {
					background: options.game.background,
					context: options.context,
					dimension: options.dimension,
					fps: {
						delay: options.fps.delay,
						velocity: options.fps.velocity,
					},
					selector: options.selector,
					viewport: {
						height: options.game.viewport.height,
						width: options.game.viewport.width,
					},
					x: options.game.x,
					y: options.game.y,
					center: options.game.center,
					full_screen: options.game.full_screen,
					full_size: options.game.full_size,
					icon: options.game.icon,
					resizable: options.game.resizable,
					title: options.game.title,
					scene: options.game.scene,
				} as IOptionsGameCore,
				scenes,
				version: this.$app.VERSION,
			};

		return {
			options,
			scenes,
			version: this.$app.VERSION,
		};
	}
}
