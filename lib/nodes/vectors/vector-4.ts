import { BaseAppAbstract } from "../abstract/base.abstract";

export class Vector4 extends BaseAppAbstract {
	public x: number;
	public y: number;
	public z: number;
	public w: number;

	constructor(x = 0, y = 0, z = 0, w = 1) {
		super()

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	add(vector: Vector4) {
		return new Vector4(
			this.x + vector.x,
			this.y + vector.y,
			this.z + vector.z,
			this.w + vector.w,
		);
	}

	subtract(vector: Vector4) {
		return new Vector4(
			this.x - vector.x,
			this.y - vector.y,
			this.z - vector.z,
			this.w - vector.w,
		);
	}

	multiply(scalar: number) {
		return new Vector4(
			this.x * scalar,
			this.y * scalar,
			this.z * scalar,
			this.w * scalar,
		);
	}

	dot(vector: Vector4) {
		return (
			this.x * vector.x +
			this.y * vector.y +
			this.z * vector.z +
			this.w * vector.w
		);
	}

	length() {
		return Math.sqrt(
			this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w,
		);
	}

	normalize() {
		const len = this.length();
		return new Vector4(this.x / len, this.y / len, this.z / len, this.w / len);
	}
}
