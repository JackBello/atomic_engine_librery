import type { TPlugin } from "../types";
import {
	handleKeyDown,
	handleMouseDown,
	handleMouseMove,
	handleMouseUp,
} from "./events";
import { HiddenPlugin } from "@/symbols";

export default {
	name: "selection",
	install(app) {
		app.emit("canvas/mouse:down", handleMouseDown);

		app.emit("canvas/mouse:up", handleMouseUp);

		app.emit("canvas/mouse:move", handleMouseMove);

		app.emit("canvas/key:down", handleKeyDown);

		return {
			[HiddenPlugin]: {
				node: undefined,
				transform: undefined,
				position: undefined,
				parentPosition: undefined,
				startCoords: {
					x: 0,
					y: 0,
				},
				isDragging: false,
			},
		};
	},
} as TPlugin;
