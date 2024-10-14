import type { GameCore } from "../game";
import type { EngineCore } from "../engine";
import type { TInput } from "./event";

import { HandleEventInput } from "./symbols";

export default class InputController {
	private $app: EngineCore | GameCore;

	private _mouse = {
		left: 0,
		right: 0,
		wheel: 0,
		move: 0,
		coords: {
			x: 0,
			y: 0,
		},
	};

	private _touch = {};

	private _keyboard: Record<string, number> = {
		cancel: 0,
		backspace: 0,
		tab: 0,
		clear: 0,
		enter: 0,
		shiftRight: 0,
		shiftLeft: 0,
		controlRight: 0,
		controlLeft: 0,
		altRight: 0,
		altLeft: 0,
		pause: 0,
		capsLock: 0,
		escape: 0,
		space: 0,
		arrowLeft: 0,
		arrowRight: 0,
		arrowUp: 0,
		arrowDown: 0,
		keyQ: 0,
		keyW: 0,
		keyE: 0,
		keyR: 0,
		keyT: 0,
		keyY: 0,
		keyU: 0,
		keyI: 0,
		keyO: 0,
		keyP: 0,
		keyA: 0,
		keyS: 0,
		keyD: 0,
		keyF: 0,
		keyG: 0,
		keyH: 0,
		keyJ: 0,
		keyK: 0,
		keyL: 0,
		keyÑ: 0,
		keyZ: 0,
		keyX: 0,
		keyC: 0,
		keyV: 0,
		keyB: 0,
		keyN: 0,
		keyM: 0
	};

	private _joystick = {};

	private _actions = new Map<string, {
		name: string
		input: string | string[],
		press: number
	}>();

	constructor(app: EngineCore | GameCore) {
		this.$app = app;
	}

	[HandleEventInput](
		event: MouseEvent | WheelEvent | TouchEvent | KeyboardEvent,
	) {
		if (event instanceof MouseEvent) this.handleMouse(event);

		if (event instanceof WheelEvent) {
		}

		if (event instanceof TouchEvent) {
		}

		if (event instanceof KeyboardEvent) this.handleKeyboard(event);

		for (const action of this._actions.values()) {
			this.handleActions(action, event);
		}
	}

	protected parseCodeKeyboard(code: string) {
		return code.charAt(0).toLowerCase() + code.slice(1);
	}

	protected handleMouse(event: MouseEvent) {
		this._mouse.coords = {
			x: event.clientX,
			y: event.clientY,
		};

		if (event.type === "mousedown") {
			this._mouse.left = Number(event.button === 0);
			this._mouse.wheel = Number(event.button === 1);
			this._mouse.right = Number(event.button === 2);
		}

		if (event.type === "mouseup" && event.button === 0) this._mouse.left = 0;

		if (event.type === "mouseup" && event.button === 1) this._mouse.wheel = 0;

		if (event.type === "mouseup" && event.button === 2) this._mouse.right = 0;

		this._mouse.move = Number(event.type === "mousemove");
	}

	protected handleKeyboard(event: KeyboardEvent) {
		const key = this.parseCodeKeyboard(event.code);

		if (event.type === "keydown") this._keyboard[key] = 1;

		if (event.type === "keyup") this._keyboard[key] = 0;
	}

	protected handleActions(action: {
		name: string
		input: string | string[],
		press: number
	}, event: MouseEvent | WheelEvent | TouchEvent | KeyboardEvent) {
		let actionValid = this._actions.get(action.name);

		if (!actionValid) return

		if (event instanceof KeyboardEvent) {
			const validation = Number(action.input.includes(this.parseCodeKeyboard(event.code)))

			if (validation && event.type === "keydown") action.press = 1

			if (validation && event.type === "keyup") action.press = 0
			
			this._actions.set(action.name, actionValid);
		}
	}

	defineAction(name: string, input: TInput | TInput[]) {
		this._actions.set(name, {
			name,
			input,
			press: 0
		})
	}

	isActionPressed(name: string) {
		const action = this._actions.get(name);

		if (!action) return false

		return action.press !== 0
	}

	hasKeyPressed(key: string) {
		return this._keyboard[key] !== 0;
	}

	hasMousePressed(button: "left" | "wheel" | "right") {
		if (button === "left") return this._mouse.left !== 0;
		if (button === "right") return this._mouse.right !== 0;
		return this._mouse.wheel !== 0;
	}

	isMouseMove() {
		return this._mouse.move !== 0;
	}
}
