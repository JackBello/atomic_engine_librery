import { Vector2 } from "@/nodes/vectors/vector-2";
import type { TAnything } from "@/app/types";
import { NodeDestroy } from "@/symbols";
import { ComponentNode } from "@/nodes";

export class CharacterBody2DComponent extends ComponentNode {
    readonly NAME_CLASS = "CharacterBody2DComponent";

    protected _name = "character-body";
    protected _description = "Manages character physics and reacts to collisions";

    private _acceleration: Vector2 = Vector2.zero();
    private _isOnGround = false;

    get acceleration(): Vector2 {
        return this._acceleration;
    }

    set acceleration(value: Vector2) {
        this._acceleration = value;
    }

    get isOnGround(): boolean {
        return this._isOnGround;
    }

    startOptions(): void {
        this._acceleration = new Vector2(0, 500);
        this._isOnGround = false;
    }

    applyForce(force: Vector2): void {
        this._acceleration = this._acceleration.add(force);
    }

    process(deltaTime: number): void {
        if (!('collision' in this.$node)) return;

        this.$node.velocity = Vector2.add(this.$node.velocity, this._acceleration)

        // console.log(this.$node.velocity.y);

        const deltaPosition = this.$node.velocity.scale(deltaTime);
        const newPosition = Vector2.add(this.$node.position, deltaPosition)

        const colliders = this.$node.collision.getColliders();

        let isOnGroundTemp = false;

        for (const { shape, touch, collider } of colliders) {
            if (shape === "rectangle") {

                if (touch.bottom) {
                    isOnGroundTemp = true;
                    console.log(collider.position.y - this.$node.height);

                    this.$node.velocity.y = 0;
                    newPosition.y = collider.position.y - this.$node.height;
                } else if (touch.top) {
                    this.$node.velocity.y = 0;
                    newPosition.y = collider.position.y + collider.height;
                } else if (touch.left) {
                    this.$node.velocity.x = 0;
                    newPosition.x = collider.position.x - this.$node.width;
                } else if (touch.right) {
                    this.$node.velocity.x = 0;
                    newPosition.x = collider.position.x + collider.width;
                }
            }
        }

        // console.log(this.$node.velocity.y);

        this._isOnGround = isOnGroundTemp;

        this.$node.position = newPosition;
        this.$node.velocity = Vector2.zero()
    }

    init(): void {
        this.$node.characterBody = {
            applyForce: (force: Vector2) => this.applyForce.bind(this)(force),
            isOnGround: () => this._isOnGround,
        };
        this.$node.velocity = Vector2.zero()
    }

    [NodeDestroy]() {
        super[NodeDestroy]();
        this._acceleration = null as TAnything;
    }
}