export class Vector2 {
	public x: number;
	public y: number;

	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	add(vector: Vector2) {
		return new Vector2(this.x + vector.x, this.y + vector.y);
	}

	subtract(vector: Vector2) {
		return new Vector2(this.x - vector.x, this.y - vector.y);
	}

	multiply(scalar: number) {
		return new Vector2(this.x * scalar, this.y * scalar);
	}

	dot(vector: Vector2) {
		return this.x * vector.x + this.y * vector.y;
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	normalize() {
		const len = this.length();
		return new Vector2(this.x / len, this.y / len);
	}
}
