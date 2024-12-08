import type { EngineCore } from "../engine";
import type { IOptionsGameCore, TSerialize } from "@/app/types";

import { $Scenes, ExportData, GetOptions, SetOptions } from "@/app/symbols";

import { Scene } from "@/nodes";
import { serializers } from "../utils/serialize";

export default class DistributionController {
	private $app: EngineCore;

	constructor(app: EngineCore) {
		this.$app = app;
	}

	import(data: string, format: TSerialize = "JSON") {
		const structure = serializers[format].parse(data);

		this.$app[SetOptions](structure.options);

		const scenes: Scene[] = [];

		for (const scene of structure.scenes) {
			scenes.push(Scene.make(scene));
		}

		this.$app[$Scenes].add(...scenes);
	}

	export(
		mode: "editor" | "game",
		format: TSerialize = this.$app.options.export.format,
	) {
		return serializers[format].stringify(this[ExportData](mode));
	}

	[ExportData](mode: "editor" | "game") {
		const scenes = this.$app[$Scenes][ExportData]();
		const options = structuredClone(this.$app[GetOptions]());

		if (mode === "game") {
			return {
				options: {
					background: options.game.background,
					context: options.context,
					dimension: options.dimension,
					physics_frame: options.physics_frame,
					render_frame: options.render_frame,
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
		}

		return {
			options,
			scenes,
			version: this.$app.VERSION,
		};
	}
}
