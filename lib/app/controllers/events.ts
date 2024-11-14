export type TMouseActions =
	| "left"
	| "right";

export type TKeyboardActions =
	| "cancel"
	| "backspace"
	| "tab"
	| "clear"
	| "enter"
	| "shiftRight"
	| "shiftLeft"
	| "controlRight"
	| "controlLeft"
	| "altRight"
	| "altLeft"
	| "pause"
	| "capsLock"
	| "escape"
	| "space"
	| "arrowLeft"
	| "arrowRight"
	| "arrowUp"
	| "arrowDown"
	| "keyQ"
	| "keyW"
	| "keyE"
	| "keyR"
	| "keyT"
	| "keyY"
	| "keyU"
	| "keyI"
	| "keyO"
	| "keyP"
	| "keyA"
	| "keyS"
	| "keyD"
	| "keyF"
	| "keyG"
	| "keyH"
	| "keyJ"
	| "keyK"
	| "keyL"
	| "keyÑ"
	| "keyZ"
	| "keyX"
	| "keyC"
	| "keyV"
	| "keyB"
	| "keyN"
	| "keyM";

export type TJoyPadActions =
	| "power"
	| "select"
	| "start"
	| "buttonA"
	| "buttonX"
	| "buttonB"
	| "buttonY"
	| "crossUp"
	| "crossDown"
	| "crossLeft"
	| "crossRight"
	| "L1"
	| "L2"
	| "L3"
	| "R1"
	| "R2"
	| "R3";

export type TInputMouse = `mouse/${TMouseActions}`;

export type TInputKeyboard = `keyboard/${TKeyboardActions}`;

export type TInputJoyPad = `joyPad/${TJoyPadActions}`;

export type TInput = TInputKeyboard | TInputMouse | TInputJoyPad;
