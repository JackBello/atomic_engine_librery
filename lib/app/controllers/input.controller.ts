import type { GameCore } from "../game";
import type { EngineCore } from "../engine";

type TInputMouse =
	| "mouse/left:press"
	| "mouse/left:down"
	| "mouse/left:up"
	| "mouse/right:press"
	| "mouse/right:down"
	| "mouse/right:up";

type TInputKeyboard = "";

type TInput = TInputKeyboard & TInputMouse;

export class InputController {
	private $app: EngineCore | GameCore;

	private _mouse = {
		left: {
			down: false,
			up: false,
			press: false,
		},
		right: {
			down: false,
			up: false,
			press: false,
		},
		move: false,
		wheel: false,
	};
	private _touch = {};
	private _keyboard = {};
	private _joystick = {};

	private _actions = new Map();

	constructor(app: EngineCore | GameCore) {
		this.$app = app;
	}

	defineAction(name: string, input: TInput | TInput[]) {}

	isActionPressed() {}

	hasKeyPressed() {}
}
