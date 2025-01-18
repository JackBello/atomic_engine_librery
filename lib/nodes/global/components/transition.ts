import { _Camera } from "@/app/symbols";
import type { TAnything } from "@/app/types";
import { ComponentNode } from "@/nodes/global/class/component-node";
import { NodeDestroy } from "@/nodes/symbols";
import type { TTransitionComponent } from "@/nodes/class/components/types";

export class TransitionComponent extends ComponentNode<TTransitionComponent> {
    protected _name = "transition";
    protected _description = "control with camera view";

    protected _status = {
        completed: false
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

    get start() {
        return this._options.start
    }

    set target(value: string) {
        this._options.target = value

        this._options.start = this.$node[value]
    }

    set duration(value: number) {
        this._options.duration = value
    }

    set to(value: TAnything) {
        this._options.to = value
    }

    set start(value: TAnything) {
        this._options.start = value
    }

    startOptions(): void {
        this._options = {
            target: "",
            duration: 0,
            elapsed: 0,
            start: 0,
            to: 0
        }
    }

    process(delta: number): void {
        if (this._status.completed) return

        this._options.elapsed += delta;

        const progress = Math.min(this._options.elapsed / this.duration, 1);

        this.$node[this.target] = this.start + (this.to - this.start) * progress

        if (progress >= 1) this._status.completed = true
    }

    [NodeDestroy]() {
        this.$app = null as TAnything
        this.$node = null as TAnything
    }
}