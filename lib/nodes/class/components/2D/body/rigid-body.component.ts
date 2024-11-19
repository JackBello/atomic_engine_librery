import { ComponentNode } from "@/nodes/global/class/component-node";
import { Vector2 } from "@/nodes/vectors/vector-2";

export class RigidBodyComponent extends ComponentNode {
    protected _name = "rigid-body";
    protected _description = "add physics to object node";

    applyForce(force: Vector2) {
        // F = m * a => a = F / m
        force.divide(new Vector2(this._options.mass, this._options.mass))

        this._options.acceleration.add(force)

    }

    applyGravity() {
        this.applyForce(new Vector2(0, this._options.mass * this._options.gravity));
    }

    applyMovement() {
        this._options.velocity.add(this._options.acceleration)

        this._options.acceleration.set(0, 0)
    }

    init(): void {
        this._options = {
            velocity: new Vector2(0, 0),
            acceleration: new Vector2(0, 0),
            mass: 10,
            gravity: 5,
            friction: 1,
            angle: 1
        }

        this.$node.rigidBody = {
            applyForce: this.applyForce.bind(this),
            applyGravity: this.applyGravity.bind(this),
            applyMovement: this.applyMovement.bind(this),
            velocity: () => {
                return this._options.velocity
            }
        }
    }
}