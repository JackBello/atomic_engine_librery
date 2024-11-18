import { CollisionComponent } from "./collision.component";
import { _Collision } from "@/app/symbols";

export class CollisionShapeComponent extends CollisionComponent {
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

	get position() {
		return this._options.transform.position;
	}

	get scale() {
		return this._options.transform.scale;
	}

	get rotation() {
		return this._options.transform.rotation;
	}

	set width(value: number) {
		this._options.width = value;
	}

	set height(value: number) {
		this._options.height = value;
	}

	set shape(value: string) {
		this._options.shape = value;
	}

	set position(value: [number, number]) {
		this._options.transform.position = value;
	}

	set scale(value: [number, number]) {
		this._options.transform.scale = value;
	}

	set rotation(value: number) {
		this._options.transform.rotation = value;
	}

	init(): void {
		this._options = {
			debug: true,
			fill: "rgb(255 0 0 / 20%)",
			disabled: false,
			width: this.$node.width,
			height: this.$node.height,
			transform: {
				position: [0, 0],
				scale: [1, 1],
				rotation: 0,
			},
			shape: "rectangle",
		};

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
		this.$app[_Collision].addCollision(this);
	}
}
