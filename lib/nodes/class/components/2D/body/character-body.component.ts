import { Vector2 } from "@/nodes/vectors/vector-2";
import { ComponentNode } from "@/nodes/global/class/component-node";
import type { TCharacterBodyComponent } from "../../types";
import type { TVec2 } from "@/nodes/global/types";

export class CharacterBody2DComponent extends ComponentNode<TCharacterBodyComponent> {
    readonly NAME_CLASS = "CharacterBody2DComponent";

    protected _name = "character-body";
    protected _description = "movement node and apply gravity";

    protected parseOptions(options: TCharacterBodyComponent): TCharacterBodyComponent {
        const parse = { ...options }

        if (typeof parse.velocity === "string") {
            parse.velocity = Vector2.import(parse.velocity as TVec2)
        }

        return parse
    }

    getOptions(): TCharacterBodyComponent {
        const options = { ...this._options }

        if (options.velocity instanceof Vector2) {
            options.velocity = options.velocity.export() as TVec2
        }

        return options
    }

    startOptions(): void {
        this._options = {
            isFloor: false,
            velocity: Vector2.zero()
        }
    }

    init(): void {
        if ("collision" in this.$node) {
            this.$node.collision.isOnFloor = () => {
                return this._options.isFloor
            }

            this.$node.velocity = this._options.velocity
        }

    }

    set floor(value: boolean) {
        this._options.isFloor = value
    }

    moveAndSlide(vector?: Vector2) {
        vector
    }

    moveAndCollide(vector?: Vector2) {
        vector
    }
}