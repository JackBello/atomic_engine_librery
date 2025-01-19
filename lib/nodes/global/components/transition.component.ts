import { _Camera } from "@/app/symbols";
import type { TAnything } from "@/app/types";
import { ComponentNode } from "@/nodes/global/class/component-node";
import { NodeDestroy } from "@/nodes/symbols";
import type { TTransitionComponent } from "@/nodes/class/components/types";

export class TransitionComponent extends ComponentNode<TTransitionComponent> {
    readonly NAME_CLASS = "TransitionComponent";

    protected _name = "transition";
    protected _description = "control with camera view";

    protected _timingFunctions: Record<string, (t: number) => number> = {
        "linear": (t: number) => t,
        "ease": (t: number) => t < 0.5
            ? 2 * t * t
            : 1 - (-2 * t + 2) ** 2 / 2,
        "ease-in": (t: number) => t * t,
        "ease-out": (t: number) => 1 - (1 - t) ** 2,
        "ease-in-out": (t: number) => t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2,
    }
    protected _elapsed = 0;
    protected _status = {
        completed: false
    }
    protected _state = {
        play: false,
        pause: true
    }
    protected _timing = (t: number) => t

    get timingFunction() {
        return this._options.timingFunction
    }

    get target() {
        return this._options.target
    }

    get duration() {
        return this._options.duration
    }

    get to() {
        return this._options.to
    }

    get from() {
        return this._options.from
    }

    set timingFunction(value: string | ((t: number) => number)) {
        if (typeof value === "string" && this._timingFunctions[value]) {
            this._options.timingFunction = value

            this._timing = this._timingFunctions[value];
        } else if (typeof value === "string" && value.startsWith("cubic-bezier")) {
            this._options.timingFunction = value

            const matches = value.match(/cubic-bezier\(([^)]+)\)/);

            if (!matches) throw new Error("Invalid cubic-bezier format");

            const [x1, y1, x2, y2] = matches[1]
                .split(",")
                .map(Number);
            this._timing = this.generateCubicBezierFunction(x1, y1, x2, y2);
        } else if (typeof value !== "string") {
            this._options.timingFunction = value.toString()

            this._timing = value
        } else {
            throw new Error(`Unknown timing function: ${value}`);
        }
    }

    set target(value: string) {
        this._options.target = value

        this._options.from = this.$node[value]
    }

    set duration(value: number) {
        this._options.duration = value
    }

    set to(value: TAnything) {
        this._options.to = value
    }

    set from(value: TAnything) {
        this._options.from = value
    }

    private generateCubicBezierFunction(x1: number, y1: number, x2: number, y2: number): (t: number) => number {
        const cubicBezier = (t: number, p0: number, p1: number, p2: number, p3: number): number => {
            const u = 1 - t;
            return u ** 3 * p0 +
                3 * u ** 2 * t * p1 +
                3 * u * t ** 2 * p2 +
                t ** 3 * p3;
        };

        const solveForX = (t: number, epsilon = 1e-5): number => {
            let x = t;

            for (let i = 0; i < 10; i++) {
                const dx = cubicBezier(x, 0, x1, x2, 1) - t;

                if (Math.abs(dx) < epsilon) return x;

                const derivative = 3 * (1 - 2 * x + x * x) * (x2 - x1) + 3 * (x1 - 0);

                if (Math.abs(derivative) < epsilon) break;

                x -= dx / derivative;
            }
            return x;
        };



        return (t: number) => {
            const solvedX = solveForX(t);

            return cubicBezier(solvedX, 0, y1, y2, 1);
        };
    }

    play() {
        if (this._status.completed) return

        this._state.play = true
        this._state.pause = false
    }

    pause() {
        if (this._status.completed) return

        this._state.play = true
        this._state.pause = false
    }

    reset() {
        if (!this._status.completed) return

        this.$node[this.target] = this.from
        this._elapsed = 0
        this._status.completed = false
    }

    startOptions(): void {
        this._options = {
            target: "",
            duration: 0,
            from: 0,
            to: 0,
            timingFunction: "linear"
        }
    }

    init(): void {
        this.$node.transition = {
            play: this.play.bind(this),
            pause: this.pause.bind(this),
            reset: this.reset.bind(this)
        }
    }

    process(delta: number): void {
        if (this.duration === 0) return
        if (this.target === "") return
        if (this._status.completed) return
        if (this._state.play === false && this._state.pause) return

        this._elapsed += delta;

        const progress = Math.min(this._elapsed / this.duration, 1);
        const timingProgress = this._timing(progress);

        this.$node[this.target] = this.from + (this.to - this.from) * timingProgress

        if (progress >= 1) {
            this._status.completed = true
            this._state.pause = true
            this._state.play = false
        }
    }

    [NodeDestroy]() {
        this.$app = null as TAnything
        this.$node = null as TAnything
    }
}