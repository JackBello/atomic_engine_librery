import { HiddenPlugin } from "@/symbols";
import type { EngineCore } from "../..";
import type { TPlugin } from "../types";

export default {
	name: "pan-and-zoom",
	install() {
		return {
			[HiddenPlugin]: {
				isPanning: false,
				startCoords: {
					x: 0,
					y: 0,
				},
				pan: {
					x: 0,
					y: 0,
				},
				zoom: {
					scale: 1.0,
					speed: 0.01,
					min: 0.009,
					max: 15.0,
					scaleFactor: 1.1,
				},
			},
			config: {
				mode: "node", // node | pan-and-zoom
				pan: {
					x: 0,
					y: 0,
				},
				zoom: 1,
			},
			functions: {
				zoom(app: EngineCore, scale: number) {
					const config = app.plugin("pan-and-zoom")?.config;
					const _ = app.plugin("pan-and-zoom")?.[HiddenPlugin];

					if (!config) return;

					if (!_) return;

					config.zoom = scale;

					_.zoom.scale = scale;
				},
				pan(app: EngineCore, x: number, y: number) {
					const config = app.plugin("pan-and-zoom")?.config;
					const _ = app.plugin("pan-and-zoom")?.[HiddenPlugin];

					if (!config) return;

					if (!_) return;

					config.pan = {
						x,
						y,
					};

					_.pan = {
						x,
						y,
					};
				},
				toggleMode(app: EngineCore) {
					const config = app.plugin("pan-and-zoom")?.config;

					if (!config) return;

					if (config.mode === "node") {
						config.mode = "pan-and-zoom";

						app.canvas.event.style.cursor = "grab";
					} else if (config.mode === "pan-and-zoom") {
						config.mode = "node";

						app.canvas.event.style.cursor = "default";
					}
				},
			},
			process: {
				after: (app) => {
					const config = app.plugin("pan-and-zoom")?.config;

					if (!config) return;

					return [
						{
							__type__: "canvas:translate",
							options: {
								x: config.pan.x,
								y: config.pan.y,
							},
						},
						{
							__type__: "canvas:scale",
							options: {
								scaleX: config.zoom,
								scaleY: config.zoom,
							},
						},
					];
				},
			},
		};
	},
} as TPlugin;
