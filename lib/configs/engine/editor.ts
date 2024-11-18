import type { IOptionsEngineCore } from "../../app/types";

export const DEFAULT_CONFIG_ATOMIC_ENGINE: IOptionsEngineCore = {
	background: "#eeeeee",
	context: "2d",
	dimension: "2D",
	fps: {
		delay: 1000,
		velocity: 60,
	},
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
	height: 500,
	width: 500,
	selector: undefined,
};
