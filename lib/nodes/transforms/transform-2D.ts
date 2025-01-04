import { BaseAppAbstract } from "../abstract/base.abstract";
import { Vector2 } from "../vectors/vector-2";

export class Transform2D extends BaseAppAbstract {
	public position: Vector2;
	public rotation: number;
	public scale: Vector2;
	public skew: number;

	constructor(
		position = new Vector2(0, 0),
		rotation = 0,
		scale = new Vector2(1, 1),
		skew = 0,
	) {
		super()

		this.position = position;
		this.rotation = rotation;
		this.scale = scale;
		this.skew = skew;
	}

	applyTranslate(vector: Vector2) {
		this.position = this.position.add(vector);
	}

	applyRotate(angle: number) {
		this.rotation += angle;
	}

	applyScale(vector: Vector2) {
		this.scale = this.scale.multiply(vector);
	}

	applyTransform(vector: Vector2) {
		let transformed = new Vector2(
			vector.x * this.scale.x,
			vector.y * this.scale.y,
		);

		const cos = Math.cos(this.rotation);
		const sin = Math.sin(this.rotation);

		transformed = new Vector2(
			transformed.x * cos - transformed.y * sin,
			transformed.x * sin + transformed.y * cos,
		);

		transformed = transformed.add(this.position);

		return transformed;
	}
}
