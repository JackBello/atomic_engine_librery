import { Vector3 } from "../vectors/vector-3";

export class Transform3D {
	public position: Vector3;
	public rotation: Vector3;
	public scale: Vector3;

	constructor(
		position = new Vector3(),
		rotation = new Vector3(),
		scale = new Vector3(1, 1, 1),
	) {
		this.position = position;
		this.rotation = rotation;
		this.scale = scale;
	}

	translate(vector: Vector3) {
		this.position = this.position.add(vector);
	}

	rotate(vector: Vector3) {
		this.rotation = this.rotation.add(vector);
	}

	resize(scalar: number) {
		this.scale = this.scale.multiply(scalar);
	}

	applyTransform(vector: Vector3) {
		let transformed = new Vector3(
			vector.x * this.scale.x,
			vector.y * this.scale.y,
			vector.z * this.scale.z,
		);

		transformed = transformed.add(this.position);

		return transformed;
	}
}
