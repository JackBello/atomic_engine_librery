import { ComponentNode } from "@/nodes/global/class/component-node";

export class RigidBodyComponent extends ComponentNode {
    protected _name: string = "rigid-body";
    protected _description: string = "add physics to object node";

    applyForce(force: [number, number]) {
        // F = m * a => a = F / m
        this._options.acceleration[0] += force[0] / this._options.mass;
        this._options.acceleration[1] += force[1] / this._options.mass;
        
    }

    applyGravity() {
        this.applyForce([0, this._options.mass * this._options.gravity]);
    }

    applyMovement() {
        this._options.velocity[0] += this._options.acceleration[0];
        this._options.velocity[1] += this._options.acceleration[1];

        this._options.acceleration[0] = 0;
        this._options.acceleration[1] = 0;
    }

    init(): void {
        this._options = {
            velocity: [0,0],
            acceleration: [0,0],
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