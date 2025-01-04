import { _Render, GetApp } from "@/symbols";
import { BaseAppAbstract } from "../abstract/base.abstract";
import type { TVec2 } from "../global/types";
export class Vector2 extends BaseAppAbstract {
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

		this[GetApp][_Render].draw = true
	}

	set y(value: number) {
		this._array[1] = value;

		this[GetApp][_Render].draw = true
	}

	set r(value: number) {
		this._array[0] = value;

		this[GetApp][_Render].draw = true
	}

	set g(value: number) {
		this._array[1] = value;

		this[GetApp][_Render].draw = true
	}

	get magnitude() {
		return 1
	}

	get normalized() {
		return 1
	}

	get sqrMagnitude() {
		return 1
	}

	constructor(x: number, y: number) {
		super()

		this._array = new Float32Array(2);

		this._array[0] = x;
		this._array[1] = y;
	}

	set(x: number, y: number) {
		this._array[0] = x;
		this._array[1] = y;

		this[GetApp][_Render].draw = true
	}

	add(vector: Readonly<Vector2>) {
		this._array[0] += vector.x;
		this._array[1] += vector.y;

		this[GetApp][_Render].draw = true

		return this;
	}

	subtract(vector: Readonly<Vector2>) {
		this._array[0] -= vector.x;
		this._array[1] -= vector.y;

		this[GetApp][_Render].draw = true

		return this;
	}

	multiply(vector: Readonly<Vector2>) {
		this._array[0] *= vector.x;
		this._array[1] *= vector.y;

		this[GetApp][_Render].draw = true

		return this;
	}

	divide(vector: Readonly<Vector2>) {
		this._array[0] /= vector.x;
		this._array[1] /= vector.y;

		this[GetApp][_Render].draw = true

		return this;
	}

	scale(scala: number) {
		this._array[0] *= scala;
		this._array[1] *= scala;

		this[GetApp][_Render].draw = true

		return this;
	}

	negate() {
		this._array[0] *= -1;
		this._array[1] *= -1;

		this[GetApp][_Render].draw = true

		return this;
	}

	invert() {
		this._array[0] = 1.0 / this._array[0];
		this._array[1] = 1.0 / this._array[1];

		this[GetApp][_Render].draw = true

		return this;
	}

	abs(): Vector2 {
		this._array[0] = Math.abs(this._array[0]);
		this._array[1] = Math.abs(this._array[1]);

		this[GetApp][_Render].draw = true

		return this;
	}

	equals(vector: Readonly<Vector2>) {
		return vector.x === this._array[0] && vector.y === this._array[1]
	}

	dot(vector: Readonly<Vector2>) {
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

	toString() {
		return `(${this._array.join(", ")})`
	}

	export() {
		return `Vec2${this.toString()}`
	}

	clone() {
		return new Vector2(this._array[0], this._array[1])
	}

	static subtract(a: Readonly<Vector2>, b: Readonly<Vector2>) {
		const out = Vector2.zero()

		out.x = a.x - b.x;
		out.y = a.y - b.y;

		return out
	}

	static add(a: Readonly<Vector2>, b: Readonly<Vector2>) {
		const out = Vector2.zero()

		out.x = a.x + b.x;
		out.y = a.y + b.y;

		return out
	}

	static multiply(a: Readonly<Vector2>, b: Readonly<Vector2>) {
		const out = Vector2.zero()

		out.x = a.x * b.x;
		out.y = a.y * b.y;

		return out
	}

	static divide(a: Readonly<Vector2>, b: Readonly<Vector2>) {
		const out = Vector2.zero()

		out.x = a.x / b.x;
		out.y = a.y / b.y;

		return out
	}

	static zero() {
		return new Vector2(0, 0)
	}

	static one() {
		return new Vector2(1, 1)
	}

	static up() {
		return new Vector2(0, 1)
	}

	static down() {
		return new Vector2(0, -1)
	}

	static right() {
		return new Vector2(0, 1)
	}

	static left() {
		return new Vector2(-1, 0)
	}

	static positiveInfinity() {
		return new Vector2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)
	}

	static negativeInfinity() {
		return new Vector2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY)
	}

	static import(vector: TVec2) {
		const formatted = vector.replace("Vec2", "").slice(1, -1).split(",").map((value: string) => Number(value.trim()))

		return new Vector2(formatted[0], formatted[1])
	}
}
