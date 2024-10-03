import type { IOptionsAtomicGame } from "../../types";

export const DEFAULT_CONFIG_ATOMIC_GAME: IOptionsAtomicGame = {
	context: "2d",
	dimension: "2D",
	fps: {
		delay: 1000,
		velocity: 60,
	},
	selector: "[data-canvas]",
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
	scene: undefined,
};
