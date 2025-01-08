import { Vector2 } from "@/nodes/vectors/vector-2";
import { CollisionComponent } from "./collision.component";
import { _Collision } from "@/app/symbols";
import type { TCollisionComponent, TCollisionShapeComponent } from "../../types";
import type { TVec2 } from "@/nodes/global/types";

export class CollisionShapeComponent extends CollisionComponent<TCollisionComponent & TCollisionShapeComponent> {
	protected _name = "collision-shape";
	protected _description = "detect collision between nodes with shape";

	get width() {
		return this._options.width;
	}

	get height() {
		return this._options.height;
	}

	get shape() {
		return this._options.shape;
	}

	get scale(): Vector2 {
		return this._options.scale as Vector2;
	}

	get position(): Vector2 {
		return this._options.position as Vector2;
	}

	get rotation() {
		return this._options.rotation;
	}

	set width(value: number) {
		this._options.width = value;
	}

	set height(value: number) {
		this._options.height = value;
	}

	set shape(value: TCollisionShapeComponent['shape']) {
		this._options.shape = value;
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

	set rotation(value: number) {
		this._options.rotation = value;
	}

	protected parseOptions(options: TCollisionComponent & TCollisionShapeComponent): TCollisionComponent & TCollisionShapeComponent {
		const parse = { ...options }

		if (typeof parse.scale === "string") {
			parse.scale = Vector2.import(parse.scale as TVec2)
		}

		if (typeof parse.position === "string") {
			parse.position = Vector2.import(parse.position as TVec2)
		}

		return parse
	}

	getOptions(): TCollisionComponent & TCollisionShapeComponent {
		const options = { ...this._options }

		if (options.scale instanceof Vector2) {
			options.scale = options.scale.export() as TVec2
		}

		if (options.position instanceof Vector2) {
			options.position = options.position.export() as TVec2
		}

		return options
	}

	startOptions(): void {
		this._options = {
			debug: true,
			fill: "rgb(255 0 0 / 20%)",
			disabled: false,
			width: this.$node.width,
			height: this.$node.height,
			position: Vector2.zero(),
			scale: Vector2.one(),
			rotation: 0,
			shape: "rectangle",
		};
	}

	init(): void {
		this.$node.collision = {
			getCollider: () => {
				const collision = this.$node.$components.get("collision-shape");

				if (!collision) return null;

				if (!(collision instanceof CollisionShapeComponent)) return null;

				return this._collider;
			},
			getColliders: () => {
				return [];
			},
			getTouch: () => {
				const collision = this.$node.$components.get("collision-shape");

				if (!collision) return null;

				if (!(collision instanceof CollisionShapeComponent)) return null;

				return this._touch;
			},
			disabled: () => {
				this._options.disabled = true;
			}
		};

		this.$app[_Collision].addCollision(this.$node);
	}
}
