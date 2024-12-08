import type { IOptionsGameCore } from "../../app/types";

export const DEFAULT_CONFIG_ATOMIC_GAME: IOptionsGameCore = {
	context: "2d",
	dimension: "2D",
	physics_frame: 120,
	render_frame: 60,
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
