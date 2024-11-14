export class Vector2 {
	protected _array: Float32Array;

	get x() {
		return this._array[0];
	}

	get y() {
		return this._array[1];
	}

	get r() {
		return this._array[0];
	}

	get g() {
		return this._array[1];
	}

	set x(value: number) {
		this._array[0] = value;
	}

	set y(value: number) {
		this._array[1] = value;
	}

	set r(value: number) {
		this._array[0] = value;
	}

	set g(value: number) {
		this._array[1] = value;
	}

	constructor(x = 0, y = 0) {
		this._array = new Float32Array(2);

		this._array[0] = x;
		this._array[1] = y;
	}

	add(vector: Vector2) {
		this._array[0] += vector.x;
		this._array[1] += vector.y;

		return this;
	}

	subtract(vector: Vector2) {
		this._array[0] -= vector.x;
		this._array[1] -= vector.y;

		return this;
	}

	multiply(vector: Vector2) {
		this._array[0] *= vector.x;
		this._array[1] *= vector.y;

		return this;
	}

	divide(vector: Vector2) {
		this._array[0] /= vector.x;
		this._array[1] /= vector.y;

		return this;
	}

	scale(scala: number) {
		this._array[0] *= scala;
		this._array[1] *= scala;

		return this;
	}

	negate() {
		this._array[0] *= -1;
		this._array[1] *= -1;

		return this;
	}

	invert() {
		this._array[0] = 1.0 / this._array[0];
		this._array[1] = 1.0 / this._array[1];

		return this;
	}

	dot(vector: Vector2) {
		return this._array[0] * vector.x + this._array[1] * vector.y;
	}

	length() {
		const x = this._array[0];
		const y = this._array[1];

		let length = x * x + y * y;

		if (length > 0) length = 1 / Math.sqrt(length);

		return length;
	}

	normalize() {
		const length = this.length();

		return new Vector2(this._array[0] * length, this._array[1] / length);
	}
}
