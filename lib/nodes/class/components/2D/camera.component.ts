import { _Camera } from "@/app/symbols";
import type { TAnything } from "@/app/types";
import { Node2D } from "@/nodes/class/2D/node";
import { ComponentNode } from "@/nodes/global/class/component-node";
import { NodeDestroy } from "@/nodes/symbols";
import { Vector2 } from "@/nodes/vectors/vector-2";

export class CameraComponent extends ComponentNode {
    protected _name = "camera";
    protected _description = "control with camera view";

    get scale(): Vector2 {
        return this._options.scale
    }

    get position(): Vector2 {
        return this._options.position
    }

    init(): void {
        this._options = {
            scale: Vector2.one(),
            position: Vector2.zero(),
            offset: Vector2.zero(),
            rotation: 0,
        }

        this.$node.camera = {
            move(x: number, y: number) {
                this._options.position.x += x;
                this._options.position.y += y;
            },
            zoom: (scale: number) => {
                this._options.scale.scale(scale)
            }
        }

        this.$app[_Camera].addCamera(this)
    }

    reset(): void {
        this._options = {
            scale: Vector2.one(),
            position: Vector2.zero(),
            offset: Vector2.zero(),
            rotation: 0,
        }
    }

    process(): void {
        if (this.$node instanceof Node2D) {
            const halfWidth = this.$app.canvas.size.width / 2;
            const halfHeight = this.$app.canvas.size.height / 2;

            const renderX = this.$node.position.x;
            const renderY = this.$node.position.y;

            if (renderX < halfWidth) {
                this._options.offset.x = 0;
            } else {
                this._options.offset.x = this.$node.position.x - halfWidth;
            }

            if (renderY < halfHeight) {
                this._options.offset.y = 0;
            } else {
                this._options.offset.y = this.$node.position.y - halfHeight;
            }

            this._options.position = this._options.offset;
        }
    }

    [NodeDestroy]() {
        this.$app[_Camera].removeCamera(this)
        this.$app = null as TAnything
        this.$node = null as TAnything
    }
}