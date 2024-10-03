import { Vector2 } from "../vectors/vector-2";

export class Transform2D {
	public position: Vector2;
	public rotation: number;
	public scale: Vector2;

	constructor(
		position = new Vector2(),
		rotation = 0,
		scale = new Vector2(1, 1),
	) {
		this.position = position;
		this.rotation = rotation;
		this.scale = scale;
	}

	translate(vector: Vector2) {
		this.position = this.position.add(vector);
	}

	rotate(angle: number) {
		this.rotation += angle;
	}

	resize(scalar: number) {
		this.scale = this.scale.multiply(scalar);
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
