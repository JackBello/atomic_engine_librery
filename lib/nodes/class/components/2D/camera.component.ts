import { _Camera } from "@/app/symbols";
import type { TAnything } from "@/app/types";
import { Node2D } from "@/nodes/class/2D/node";
import { ComponentNode } from "@/nodes/global/class/component-node";
import { NodeDestroy } from "@/nodes/symbols";
import { Vector2 } from "@/nodes/vectors/vector-2";
import type { TCameraComponent } from "../types";
import type { TVec2 } from "@/nodes/global/types";

export class Camera2DComponent extends ComponentNode<TCameraComponent> {
    protected _name = "camera";
    protected _description = "control with camera view";

    get scale(): Vector2 {
        return this._options.scale as Vector2
    }

    get position(): Vector2 {
        return this._options.position as Vector2
    }

    get offset(): Vector2 {
        return this._options.offset as Vector2
    }

    set scale(value: Vector2 | TVec2) {
        if (typeof value === "string") {
            this._options.scale = Vector2.import(value)
        } else {
            this._options.scale = value
        }
    }

    set position(value: Vector2 | TVec2) {
        if (typeof value === "string") {
            this._options.position = Vector2.import(value)
        } else {
            this._options.position = value
        }
    }

    set offset(value: Vector2 | TVec2) {
        if (typeof value === "string") {
            this._options.offset = Vector2.import(value)
        } else {
            this._options.offset = value
        }
    }

    protected parseOptions(options: TCameraComponent): TCameraComponent {
        const parse = { ...options }

        if (typeof parse.scale === "string") {
            parse.scale = Vector2.import(parse.scale)
        }

        if (typeof parse.position === "string") {
            parse.position = Vector2.import(parse.position)
        }

        if (typeof parse.offset === "string") {
            parse.offset = Vector2.import(parse.offset)
        }

        return parse;
    }

    getOptions(): TCameraComponent {
        const options = { ...this._options }

        if (options.scale instanceof Vector2) {
            options.scale = options.scale.export() as TVec2
        }

        if (options.position instanceof Vector2) {
            options.position = options.position.export() as TVec2
        }

        if (options.offset instanceof Vector2) {
            options.offset = options.offset.export() as TVec2
        }

        return options
    }

    startOptions(): void {
        this._options = {
            scale: Vector2.one(),
            position: Vector2.zero(),
            offset: Vector2.zero(),
            rotation: 0,
        }
    }

    init(): void {
        this.$node.camera = {
            move: (x: number, y: number) => {
                this.position.x += x;
                this.position.y += y;
            },
            zoom: (scale: number) => {
                this.scale.scale(scale)
            }
        }

        this.$app[_Camera].addCamera(this)
    }

    process(): void {
        if (this.$node instanceof Node2D) {
            const halfWidth = this.$app.canvas.size.width / 2;
            const halfHeight = this.$app.canvas.size.height / 2;

            const renderX = this.$node.position.x;
            const renderY = this.$node.position.y;

            if (renderX < halfWidth) {
                this.offset.x = 0;
            } else {
                this.offset.x = this.$node.position.x - halfWidth;
            }

            if (renderY < halfHeight) {
                this.offset.y = 0;
            } else {
                this.offset.y = this.$node.position.y - halfHeight;
            }

            this.position = this.offset;
        }
    }

    [NodeDestroy]() {
        this.$app[_Camera].removeCamera(this)
        this.$app = null as TAnything
        this.$node = null as TAnything
    }
}