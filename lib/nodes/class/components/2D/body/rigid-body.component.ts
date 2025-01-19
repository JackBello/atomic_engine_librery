import { ComponentNode } from "@/nodes/global/class/component-node";
import { Vector2 } from "@/nodes/vectors/vector-2";
import type { TRigidBodyComponent } from "../../types";
import type { TVec2 } from "@/nodes/global/types";

export class RigidBody2DComponent extends ComponentNode<TRigidBodyComponent> {
    readonly NAME_CLASS = "RigidBody2DComponent";

    protected _name = "rigid-body";
    protected _description = "add physics to object node";

    get velocity(): Vector2 {
        return this._options.velocity as Vector2
    }

    get acceleration(): Vector2 {
        return this._options.acceleration as Vector2
    }

    applyForce(force: Vector2) {
        // F = m * a => a = F / m
        force.divide(new Vector2(this._options.mass, this._options.mass))

        this.acceleration.add(force)

    }

    applyGravity() {
        this.applyForce(new Vector2(0, this._options.mass * this._options.gravity));
    }

    applyMovement() {
        this.velocity.add(this.acceleration)

        this.acceleration.set(0, 0)
    }

    protected parseOptions(options: TRigidBodyComponent): TRigidBodyComponent {
        const parse = { ...options }

        if (typeof parse.velocity === "string") {
            parse.velocity = Vector2.import(parse.velocity as TVec2)
        }

        if (typeof parse.acceleration === "string") {
            parse.acceleration = Vector2.import(parse.acceleration as TVec2)
        }

        return parse
    }

    getOptions(): TRigidBodyComponent {
        const options = { ...this._options }

        if (options.velocity instanceof Vector2) {
            options.velocity = options.velocity.export() as TVec2
        }

        if (options.acceleration instanceof Vector2) {
            options.acceleration = options.acceleration.export() as TVec2
        }

        return options
    }

    startOptions(): void {
        this._options = {
            velocity: new Vector2(0, 0),
            acceleration: new Vector2(0, 0),
            mass: 10,
            gravity: 5,
            friction: 1,
            angle: 1
        }
    }

    init(): void {
        this.$node.rigidBody = {
            applyForce: this.applyForce.bind(this),
            applyGravity: this.applyGravity.bind(this),
            applyMovement: this.applyMovement.bind(this),
        }

        this.$node.velocity = this._options.velocity
    }
}