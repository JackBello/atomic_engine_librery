import type { TJoyPadActions } from "../input.controller";
import { GetIdJoyPad, UpdateJoyPad } from "../symbols";

export class JoyPad {
    protected _id: number;
    protected _ref!: Gamepad;

    protected _sticks = {
        "left": [0, 1],
        "right": [2, 3],
    };

    protected _buttons: Record<TJoyPadActions, number> = {
        // power
        "power": 16,

        // control
        "select": 8,
        "start": 9,

        // main
        "buttonA": 0,
        "buttonX": 2,
        "buttonB": 1,
        "buttonY": 3,

        // cross
        "crossUp": 12,
        "crossDown": 13,
        "crossLeft": 14,
        "crossRight": 15,

        // left buttons shoulder
        "L1": 4,
        "L2": 6,
        "L3": 10,

        // right buttons shoulder
        "R1": 5,
        "R2": 7,
        "R3": 11,
    };

    get [GetIdJoyPad]() {
        return this._id;
    }

    constructor(id: number) {
        this._id = id;
    }

    async startVibration(
        effect: GamepadHapticEffectType,
        params?: GamepadEffectParameters,
    ) {
        await this._ref.vibrationActuator.playEffect(effect, params);
    }

    async stopVibration() {
        await this._ref.vibrationActuator.reset();
    }

    pressed(name: TJoyPadActions) {
        const index = this._buttons[name];

        return this._ref.buttons[index].value;
    }

    watch() {
        let buttonPressed = undefined;

        for (const [button, index] of Object.entries(this._buttons)) {
            if (this._ref.buttons[index].pressed) {
                buttonPressed = button;
            }
        }

        return buttonPressed;
    }

    axis(name: "left" | "right") {
        const select = this._sticks[name];

        return {
            x: this._ref.axes[select[0]],
            y: this._ref.axes[select[1]],
        };
    }

    [UpdateJoyPad]() {
        let gamepadRef = navigator.getGamepads()[this._id];

        if (gamepadRef) this._ref = gamepadRef;

        gamepadRef = null;
    }
}
