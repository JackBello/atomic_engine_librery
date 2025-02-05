import { BaseAppAbstract } from "../abstract/base.abstract";
import { Vector2 } from "../vectors/vector-2";

export class Transform2D extends BaseAppAbstract {
	public position: Vector2;
	public rotation: number;
	public scale: Vector2;
	public skew: Vector2;

	constructor(
		position = Vector2.zero(),
		rotation = 0,
		scale = Vector2.one(),
		skew = Vector2.one(),
	) {
		super()
		this.position = position;
		this.rotation = rotation;
		this.scale = scale;
		this.skew = skew;
	}

	applyTranslate(vector: Vector2) {
		this.position.add(vector);

		return this
	}

	applyRotate(angle: number) {
		this.rotation += angle;

		return this
	}

	applyScale(vector: Vector2) {
		this.scale.multiply(vector);

		return this
	}

	applySkew(vector: Vector2) {
		this.skew.add(vector)

		return this
	}
}
