import { BaseAppAbstract } from "../abstract/base.abstract";

export class Vector3 extends BaseAppAbstract {
	public x: number;
	public y: number;
	public z: number;

	constructor(x = 0, y = 0, z = 0) {
		super()

		this.x = x;
		this.y = y;
		this.z = z;
	}

	add(vector: Vector3) {
		return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
	}

	subtract(vector: Vector3) {
		return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
	}

	multiply(scalar: number) {
		return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
	}

	dot(vector: Vector3) {
		return this.x * vector.x + this.y * vector.y + this.z * vector.z;
	}

	cross(vector: Vector3) {
		return new Vector3(
			this.y * vector.z - this.z * vector.y,
			this.z * vector.x - this.x * vector.z,
			this.x * vector.y - this.y * vector.x,
		);
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}

	normalize() {
		const len = this.length();
		return new Vector3(this.x / len, this.y / len, this.z / len);
	}
}
