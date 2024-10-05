import type { EngineCore } from "../engine";
import type { GameCore } from "../game";

import { $Canvas, DispatchEvent } from "@/symbols";

export default class EventController {
	private $app: EngineCore | GameCore;

	constructor(app: EngineCore | GameCore) {
		this.$app = app;

		this.init();
	}

	protected mousedown = (event: MouseEvent) => {
		const target = (event.target as HTMLElement).dataset.typeCanvas;

		if (target) {
			event.preventDefault();

			this.$app[DispatchEvent]("canvas/mouse:down", event, this.$app);
		}
	};

	protected mouseup = (event: MouseEvent) => {
		const target = (event.target as HTMLElement).dataset.typeCanvas;

		if (target) {
			event.preventDefault();

			this.$app[DispatchEvent]("canvas/mouse:up", event, this.$app);
		}
	};

	protected mousemove = (event: MouseEvent) => {
		this.$app[DispatchEvent]("canvas/mouse:move", event, this.$app);
	};

	protected wheel = (event: WheelEvent) => {
		event.preventDefault();

		this.$app[DispatchEvent]("canvas/mouse:wheel", event, this.$app);

		if (this.$app[$Canvas] && this.$app[$Canvas].event !== undefined)
			this.$app[$Canvas].event.removeEventListener("wheel", this.wheel);
	};

	protected keydown = (event: KeyboardEvent) => {
		if (this.$app.mode === "game") {
			event.preventDefault();

			if (event.key === "F11") {
				this.$app[$Canvas].main.requestFullscreen();

				this.$app.resize();
			}
		}

		this.$app[DispatchEvent]("canvas/key:down", event, this.$app);
	};

	protected keyup = (event: KeyboardEvent) => {
		if (this.$app.mode === "game") event.preventDefault();

		this.$app[DispatchEvent]("canvas/key:up", event, this.$app);
	};

	protected keypress = (event: KeyboardEvent) => {
		if (this.$app.mode === "game") event.preventDefault();

		this.$app[DispatchEvent]("canvas/key:press", event, this.$app);
	};

	protected resize = () => {
		this.$app.resize();
	};

	protected init() {
		if (this.$app[$Canvas] && this.$app[$Canvas].event !== undefined) {
			window.addEventListener("mousedown", this.mousedown);

			window.addEventListener("mouseup", this.mouseup);

			window.addEventListener("mousemove", this.mousemove);

			this.$app[$Canvas].event.addEventListener("wheel", this.wheel);

			window.addEventListener("keydown", this.keydown);

			window.addEventListener("keyup", this.keyup);

			window.addEventListener("keypress", this.keypress);

			if (this.$app.mode === "game")
				window.addEventListener("resize", this.resize);
		}
	}
}
