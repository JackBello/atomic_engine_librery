import type { EngineCore } from "../engine";
import type { GameCore } from "../game";

import { $Canvas, _Input, DispatchEvent, SetGlobal } from "@/app/symbols";
import { AccessorJoyPads, HandleEventInput } from "./symbols";

export default class EventController {
	private $app: EngineCore | GameCore;

	constructor(app: EngineCore | GameCore) {
		this.$app = app;

		this.init();
	}

	protected touchstart = (event: TouchEvent) => {
		const target = (event.target as HTMLElement).dataset.typeCanvas;

		if (!target) return;

		event.preventDefault();

		if (
			this.$app.global("mode") === "preview" ||
			this.$app.global("mode") === "game"
		) {
			this.$app[SetGlobal]("dispatch-event", true);

			this.$app[_Input][HandleEventInput](event);
		}

		this.$app[DispatchEvent]("app/touch:start", event, this.$app);
	};

	protected touchmove = (event: TouchEvent) => {
		if (
			this.$app.global("mode") === "preview" ||
			this.$app.global("mode") === "game"
		) {
			this.$app[SetGlobal]("dispatch-event", true);

			this.$app[_Input][HandleEventInput](event);
		}

		this.$app[DispatchEvent]("app/touch:move", event, this.$app);
	};

	protected touchend = (event: TouchEvent) => {
		const target = (event.target as HTMLElement).dataset.typeCanvas;

		if (!target) return;

		event.preventDefault();

		if (
			this.$app.global("mode") === "preview" ||
			this.$app.global("mode") === "game"
		) {
			this.$app[SetGlobal]("dispatch-event", true);

			this.$app[_Input][HandleEventInput](event);
		}

		this.$app[DispatchEvent]("app/touch:end", event, this.$app);
	};

	protected mousedown = (event: MouseEvent) => {
		const target = (event.target as HTMLElement).dataset.typeCanvas;

		if (!target) return;

		event.preventDefault();

		if (
			this.$app.global("mode") === "preview" ||
			this.$app.global("mode") === "game"
		) {
			this.$app[SetGlobal]("dispatch-event", true);

			this.$app[_Input][HandleEventInput](event);
		}

		this.$app[DispatchEvent]("app/mouse:down", event, this.$app);
	};

	protected mouseup = (event: MouseEvent) => {
		const target = (event.target as HTMLElement).dataset.typeCanvas;

		if (!target) return;

		event.preventDefault();

		if (
			this.$app.global("mode") === "preview" ||
			this.$app.global("mode") === "game"
		) {
			this.$app[SetGlobal]("dispatch-event", true);

			this.$app[_Input][HandleEventInput](event);
		}

		this.$app[DispatchEvent]("app/mouse:up", event, this.$app);
	};

	protected mousemove = (event: MouseEvent) => {
		if (
			this.$app.global("mode") === "preview" ||
			this.$app.global("mode") === "game"
		) {
			this.$app[SetGlobal]("dispatch-event", true);

			this.$app[_Input][HandleEventInput](event);
		}

		this.$app[DispatchEvent]("app/mouse:move", event, this.$app);
	};

	protected mouseenter = (event: MouseEvent) => {
		this.$app[DispatchEvent]("app/mouse:enter", event, this.$app);
	};

	protected mouseleave = (event: MouseEvent) => {
		this.$app[DispatchEvent]("app/mouse:leave", event, this.$app);
	};

	protected wheel = (event: WheelEvent) => {
		if (
			this.$app.global("mode") === "preview" ||
			this.$app.global("mode") === "game"
		) {
			this.$app[SetGlobal]("dispatch-event", true);

			this.$app[_Input][HandleEventInput](event);
		}

		this.$app[DispatchEvent]("app/mouse:wheel", event, this.$app);
	};

	protected keydown = (event: KeyboardEvent) => {
		if (this.$app.mode === "game") {
			event.preventDefault();
		}

		if (event.key === "F11") {
			event.preventDefault();
		}

		if (
			this.$app.global("mode") === "preview" ||
			this.$app.global("mode") === "game"
		) {
			this.$app[SetGlobal]("dispatch-event", true);

			this.$app[_Input][HandleEventInput](event);
		}

		this.$app[DispatchEvent]("app/key:down", event, this.$app);
	};

	protected keyup = (event: KeyboardEvent) => {
		if (this.$app.mode === "game") event.preventDefault();

		if (
			this.$app.global("mode") === "preview" ||
			this.$app.global("mode") === "game"
		) {
			this.$app[SetGlobal]("dispatch-event", true);

			this.$app[_Input][HandleEventInput](event);
		}

		this.$app[DispatchEvent]("app/key:up", event, this.$app);
	};

	protected keypress = (event: KeyboardEvent) => {
		if (this.$app.mode === "game") event.preventDefault();

		this.$app[DispatchEvent]("app/key:press", event, this.$app);
	};

	protected gamepad = (event: GamepadEvent) => {
		const { gamepad, type } = event;

		if (
			!this.$app[_Input][AccessorJoyPads].isConnected(gamepad.index) &&
			type === "gamepadconnected"
		) {
			this.$app[_Input][AccessorJoyPads].connect(gamepad.index);
			this.$app[DispatchEvent]("app/joyPad:connected", event, this.$app);
		}

		if (
			this.$app[_Input][AccessorJoyPads].isConnected(gamepad.index) &&
			type === "gamepaddisconnected"
		) {
			this.$app[_Input][AccessorJoyPads].disconnected(gamepad.index);
			this.$app[DispatchEvent](
				"app/joyPad:disconnected",
				event,
				this.$app,
			);
		}
	};

	protected resize = () => {
		this.$app.resize();
	};

	protected init() {
		if (this.$app[$Canvas] && this.$app[$Canvas].event !== undefined) {
			window.addEventListener("touchstart", this.touchstart);

			window.addEventListener("touchmove", this.touchmove);

			window.addEventListener("touchend", this.touchend);

			window.addEventListener(
				"mousedown",
				this.mousedown,
			);

			window.addEventListener("mouseup", this.mouseup);

			window.addEventListener(
				"mousemove",
				this.mousemove,
			);

			this.$app[$Canvas].event.addEventListener(
				"mouseenter",
				this.mouseenter,
			);

			this.$app[$Canvas].event.addEventListener(
				"mouseleave",
				this.mouseleave,
			);

			this.$app[$Canvas].event.addEventListener("wheel", this.wheel, {
				passive: true,
			});

			window.addEventListener("keydown", this.keydown);

			window.addEventListener("keyup", this.keyup);

			window.addEventListener("keypress", this.keypress);

			window.addEventListener("gamepadconnected", this.gamepad);

			window.addEventListener("gamepaddisconnected", this.gamepad);

			if (this.$app.mode === "game") {
				window.addEventListener("resize", this.resize);
			}
		}
	}
}
