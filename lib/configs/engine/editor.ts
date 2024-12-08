import type { IOptionsEngineCore } from "../../app/types";

export const DEFAULT_CONFIG_ATOMIC_ENGINE: IOptionsEngineCore = {
	background: "#eeeeee",
	context: "2d",
	dimension: "2D",
	physics_frame: 120,
	render_frame: 60,
	game: {
		background: "#000000",
		full_screen: false,
		full_size: false,
		x: 0,
		y: 0,
		icon: null,
		center: true,
		title: undefined,
		resizable: false,
		viewport: {
			height: 600,
			width: 800,
		},
	},
	height: 300,
	width: 300,
	selector: undefined,
	analytics: false
};
