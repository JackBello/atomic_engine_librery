import { Plugin } from "@/app/plugin";
import type { INodeOperation } from "@/nodes/global/types";
import { GetHidden } from "@/app/symbols";
import type { TAnything, TFunction } from "@/app/types";
import {
	handleMouseDown,
	handleMouseMove,
	handleMouseUp,
	handleMouseWheel,
} from "./events";

export default class PanAndZoomPlugin extends Plugin {
	install(options: TAnything): void {
		this.$app.emit("app/mouse:down", handleMouseDown);

		this.$app.emit("app/mouse:up", handleMouseUp);

		this.$app.emit("app/mouse:move", handleMouseMove);

		this.$app.emit("app/mouse:wheel", handleMouseWheel);

		this.OPTIONS = options;

		this.HIDDEN = {
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
		};

		this.CONFIGS = {
			mode: "node", // node | pan-and-zoom
			pan: {
				x: 0,
				y: 0,
			},
			zoom: 1,
		};
	}

	inject(): Record<string, TFunction> {
		return {
			zoom: (scale: number) => {
				const config = this.$app.plugin("pan-and-zoom")?.configs;
				const _ = this.$app.plugin("pan-and-zoom")?.[GetHidden];

				if (!config) return;

				if (!_) return;

				config.zoom = scale;

				_.zoom.scale = scale;
			},
			pan: (x: number, y: number) => {
				const config = this.$app.plugin("pan-and-zoom")?.configs;
				const _ = this.$app.plugin("pan-and-zoom")?.[GetHidden];

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
			toggleMode: () => {
				const config = this.$app.plugin("pan-and-zoom")?.configs;

				if (!config) return;

				if (config.mode === "node") {
					config.mode = "pan-and-zoom";

					this.$app.canvas.event.style.cursor = "grab";
				} else if (config.mode === "pan-and-zoom") {
					config.mode = "node";

					this.$app.canvas.event.style.cursor = "default";
				}
			},
		};
	}

	operations(): { after: INodeOperation[]; before: INodeOperation[] } {
		return {
			after: [
				{
					__index__: 0,
					__name__: "restore",
					__type__: "canvas:restore",
				},
			],
			before: [
				{
					__index__: 0,
					__name__: "selection",
					__type__: "2D/selection",
				},
				{
					__index__: 1,
					__name__: "save",
					__type__: "canvas:save",
				},
				{
					__index__: 2,
					__name__: "translate",
					__type__: "canvas:translate",
					options: {
						x: 0,
						y: 0,
					},
				},
				{
					__index__: 3,
					__name__: "scale",
					__type__: "canvas:scale",
					options: {
						scale: 1,
					},
				},
			],
		};
	}
}
