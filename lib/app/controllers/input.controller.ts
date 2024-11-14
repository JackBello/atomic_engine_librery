import type { GameCore } from "../game";
import type { EngineCore } from "../engine";
import type { TInput, TJoyPadActions } from "./events";

import {
	AccessorJoyPads,
	ExecuteProcess,
	GetIdJoyPad,
	HandleEventInput,
	UpdateJoyPad,
} from "./symbols";
import { JoyPad } from "./input/joy-pad";
import type { TAnything } from "../types";

export default class InputController {
	private $app: EngineCore | GameCore;

	private _joyPads: Map<string, JoyPad> = new Map();

	private _mouse: Record<string, number> = {
		left: 0,
		right: 0,
		wheel: 0,
		move: 0,
	};

	private _mouseCoords = {
		x: 0,
		y: 0,
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
		keyM: 0,
	};

	private _actions = new Map<string, {
		name: string;
		input: TInput | TInput[];
		press: number;
	}>();

	constructor(app: EngineCore | GameCore) {
		this.$app = app;

		this.$app;
		this._touch;
	}

	get [AccessorJoyPads]() {
		return {
			isConnected: (id: number) => {
				const joyPad = [...this._joyPads.values()].find((joyPad) =>
					joyPad[GetIdJoyPad] === id
				);

				return !joyPad;
			},
			connect: (id: number) => {
				this._joyPads.set(
					`joyPad-${this._joyPads.size}`,
					new JoyPad(id),
				);
			},
			disconnected: (id: number) => {
				const joyPad = [...this._joyPads.entries()].find((object) =>
					object[1][GetIdJoyPad] === id
				);

				if (!joyPad) return false;

				this._joyPads.delete(joyPad[0]);

				return true;
			},
		};
	}

	[ExecuteProcess]() {
		this.handleJoyPads();

		for (const action of this._actions.values()) {
			this.handleActions(action);
		}
	}

	[HandleEventInput](
		event: MouseEvent | WheelEvent | TouchEvent | KeyboardEvent,
	) {
		if (event instanceof MouseEvent) {
			this.handleMouse(event);
		}

		if (event instanceof WheelEvent) {
		}

		if (event instanceof TouchEvent) {
		}

		if (event instanceof KeyboardEvent) {
			this.handleKeyboard(event);
		}
	}

	protected parseCodeKeyboard(code: string) {
		return code.charAt(0).toLowerCase() + code.slice(1);
	}

	protected handleJoyPads() {
		if (this._joyPads.size === 0) {
			this._joyPads = new Map(
				[...new Set(navigator.getGamepads()).values()]
					.filter((value) => value !== null)
					.map(
						(gamepad, index) => ([
							`joyPad-${index + 1}`,
							new JoyPad(gamepad.index),
						] as [string, JoyPad]),
					),
			);
		}

		if (this._joyPads.size !== 0) {
			for (const gamepad of this._joyPads.values()) {
				gamepad[UpdateJoyPad]();
			}
		}
	}

	protected handleMouse(event: MouseEvent) {
		this._mouseCoords = {
			x: event.clientX,
			y: event.clientY,
		};

		if (event.type === "mousedown") {
			this._mouse.left = Number(event.button === 0);
			this._mouse.wheel = Number(event.button === 1);
			this._mouse.right = Number(event.button === 2);
		}

		if (event.type === "mouseup" && event.button === 0) {
			this._mouse.left = 0;
		}

		if (event.type === "mouseup" && event.button === 1) {
			this._mouse.wheel = 0;
		}

		if (event.type === "mouseup" && event.button === 2) {
			this._mouse.right = 0;
		}

		this._mouse.move = Number(event.type === "mousemove");
	}

	protected handleKeyboard(event: KeyboardEvent) {
		const key = this.parseCodeKeyboard(event.code);

		if (event.type === "keydown") this._keyboard[key] = 1;

		if (event.type === "keyup") this._keyboard[key] = 0;
	}

	protected handleActions(
		action: {
			name: string;
			input: TInput | TInput[];
			press: number;
		},
	) {
		if (!Array.isArray(action.input)) {
			this.validateAction(action.name, action.input);

			return;
		}

		for (const input of action.input) {
			if (this.validateAction(action.name, input)) break;
		}
	}

	protected validateAction(name: string, input: TInput) {
		const action = this._actions.get(name);
		const joyPad = this.mainJoyPad();

		let isPress = 0;

		if (!action) return false;

		if (input.startsWith("keyboard")) {
			isPress = this._keyboard[input.slice(9)];
		}

		if (input.startsWith("mouse")) {
			isPress = this._mouse[input.slice(6)];
		}

		if (input.startsWith("joyPad") && joyPad) {
			isPress = joyPad.pressed(input.slice(7) as TAnything);
		}

		action.press = isPress;
		this._actions.set(name, action);

		return isPress !== 0;
	}

	mainJoyPad() {
		return this._joyPads.get("joyPad-1");
	}

	defineAction(name: string, input: TInput | TInput[]) {
		this._actions.set(name, {
			name,
			input,
			press: 0,
		});
	}

	isActionPressed(name: string) {
		const action = this._actions.get(name);

		if (!action) return false;

		return action.press !== 0;
	}

	hasKeyPressed(key: string) {
		return this._keyboard[key] !== 0;
	}

	hasMousePressed(button: "left" | "wheel" | "right") {
		if (button === "left") return this._mouse.left !== 0;
		if (button === "right") return this._mouse.right !== 0;
		return this._mouse.wheel !== 0;
	}

	hasJoyPadButtonPressed(joyPad: `joyPad-${number}`, name: TJoyPadActions) {
		const joyPadSelect = this._joyPads.get(joyPad);

		if (!joyPadSelect) return false;

		return joyPadSelect.pressed(name) !== 0;
	}

	getJoyPadAxis(joyPad: `joyPad-${number}`, name: "left" | "right") {
		const joyPadSelect = this._joyPads.get(joyPad);

		if (!joyPadSelect) return undefined;

		return joyPadSelect.axis(name);
	}

	getJoyPad(joyPad: `joyPad-${number}`) {
		return this._joyPads.get(joyPad);
	}

	getMouseCoord() {
		return this._mouseCoords;
	}

	isMouseMove() {
		return this._mouse.move !== 0;
	}
}
