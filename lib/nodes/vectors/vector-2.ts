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

	get normalized(): Vector2 {
		const [x, y] = this._array;

		const mag = this.magnitude;

		if (mag === 0) {
			return new Vector2(0, 0);
		}

		return new Vector2(x / mag, y / mag);
	}

	get sqrMagnitude(): number {
		const [x, y] = this._array;

		return x ** 2 + y ** 2;
	}

	get magnitude(): number {
		const [x, y] = this._array;

		return Math.sqrt(x ** 2 + y ** 2);
	}

	get length(): number {
		return this.magnitude;
	}

	get isZero(): boolean {
		return this.magnitude === 0;
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
		if (vector.x === 0 || vector.y === 0)
			throw new Error('Dividing by zero is not allowed');

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
		if (this._array[0] === 0 || this._array[1] === 0)
			throw new Error('Dividing by zero is not allowed');

		this._array[0] = 1.0 / this._array[0];
		this._array[1] = 1.0 / this._array[1];

		this[GetApp][_Render].draw = true

		return this;
	}

	normal(clockwise = false): Vector2 {
		const x = this._array[0];
		const y = this._array[1];

		if (clockwise) {
			this._array[0] = y
			this._array[1] = -x
		} else {
			this._array[0] = -y
			this._array[1] = x
		}

		return this
	}

	abs(): Vector2 {
		this._array[0] = Math.abs(this._array[0]);
		this._array[1] = Math.abs(this._array[1]);

		this[GetApp][_Render].draw = true

		return this;
	}

	ceil(): Vector2 {
		this._array[0] = Math.ceil(this._array[0]);
		this._array[1] = Math.ceil(this._array[1]);

		this[GetApp][_Render].draw = true

		return this;
	}

	floor(): Vector2 {
		this._array[0] = Math.floor(this._array[0]);
		this._array[1] = Math.floor(this._array[1]);

		this[GetApp][_Render].draw = true

		return this;
	}

	round(): Vector2 {
		this._array[0] = Math.round(this._array[0]);
		this._array[1] = Math.round(this._array[1]);

		this[GetApp][_Render].draw = true

		return this;
	}

	min(vector: Readonly<Vector2>) {
		this._array[0] = Math.min(this._array[0], vector.x);
		this._array[1] = Math.min(this._array[1], vector.y);

		this[GetApp][_Render].draw = true

		return this;
	}

	max(vector: Readonly<Vector2>) {
		this._array[0] = Math.max(this._array[0], vector.x);
		this._array[1] = Math.max(this._array[1], vector.y);

		this[GetApp][_Render].draw = true

		return this;
	}

	lerp(vector: Readonly<Vector2>, t: number): Vector2 {
		this._array[0] += (vector.x - this._array[0]) * t;
		this._array[1] += (vector.y - this._array[1]) * t;

		this[GetApp][_Render].draw = true;
		return this;
	}

	lerpUnclamped(vector: Readonly<Vector2>, t: number): Vector2 {
		this._array[0] = this._array[0] + (vector.x - this._array[0]) * t;
		this._array[1] = this._array[1] + (vector.y - this._array[1]) * t;

		this[GetApp][_Render].draw = true;

		return this;
	}

	clampMagnitude(maxLength: number): Vector2 {
		const magnitude = this.magnitude;

		if (magnitude > maxLength) {
			const scale = maxLength / magnitude;
			this._array[0] *= scale;
			this._array[1] *= scale;
		}

		return this;
	}

	rotate(angle: number): Vector2 {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		const x = this._array[0] * cos - this._array[1] * sin;
		const y = this._array[0] * sin + this._array[1] * cos;

		this._array[0] = x;
		this._array[1] = y;

		this[GetApp][_Render].draw = true;
		return this;
	}

	rotate90(): Vector2 {
		const x = -this._array[1];
		const y = this._array[0];

		this._array[0] = x;
		this._array[1] = y;

		this[GetApp][_Render].draw = true;
		return this;
	}

	rotate180(): Vector2 {
		return this.negate();
	}

	rotate270(): Vector2 {
		const x = this._array[1];
		const y = -this._array[0];

		this._array[0] = x;
		this._array[1] = y;

		this[GetApp][_Render].draw = true;
		return this;
	}

	rotateDeg(angle: number): Vector2 {
		return this.rotate(angle * Math.PI / 180);
	}

	angleTo(vector: Readonly<Vector2>): number {
		return Math.atan2(vector.y - this.y, vector.x - this.x);
	}

	reflect(normal: Readonly<Vector2>): Vector2 {
		const dotProduct = this.dot(normal) * 2;
		this._array[0] -= dotProduct * normal.x;
		this._array[1] -= dotProduct * normal.y;

		this[GetApp][_Render].draw = true;
		return this;
	}

	limit(max: number): Vector2 {
		if (this.magnitude > max) {
			this.normalize().scale(max);
		}

		this[GetApp][_Render].draw = true;
		return this;
	}

	cross(vector: Readonly<Vector2>): number {
		return this.x * vector.y - this.y * vector.x;
	}

	equals(vector: Readonly<Vector2>) {
		return vector.x === this._array[0] && vector.y === this._array[1]
	}

	dot(vector: Readonly<Vector2>) {
		return this._array[0] * vector.x + this._array[1] * vector.y;
	}

	distance(vector: Readonly<Vector2>) {
		return Math.hypot(this._array[0] - vector.x, this._array[1] - vector.y);
	}

	normalize() {
		const magnitude = this.magnitude;

		if (magnitude === 0) {
			this.x = 0;
			this.y = 0;
		} else {
			this.x /= magnitude;
			this.y /= magnitude;
		}

		this[GetApp][_Render].draw = true

		return this;
	}

	moveTowards(vector: Vector2, maxDistanceDelta: number): Vector2 {
		const direction = Vector2.subtract(vector, this)
		const distance = direction.magnitude;

		if (distance <= maxDistanceDelta || distance === 0)
			return vector;

		const moveAmount = Vector2.normalize(direction).scale(maxDistanceDelta);

		return this.add(moveAmount);
	}

	signedAngle(vector: Vector2): number {
		const dot = this.x * vector.x + this.y * vector.y;
		const cross = this.x * vector.y - this.y * vector.x;

		const angle = Math.atan2(cross, dot);
		return angle * (180 / Math.PI);
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

	static projectOnto(v1: Readonly<Vector2>, v2: Readonly<Vector2>) {
		const lengthSquared = v2.sqrMagnitude;

		if (lengthSquared === 0)
			return new Vector2(0, 0);

		const dotProduct = v1.dot(v2);

		const scale = dotProduct / lengthSquared;

		return new Vector2(v2.x * scale, v2.y * scale)
	}

	static project(v1: Readonly<Vector2>, v2: Readonly<Vector2>) {
		const dotProduct = Vector2.dot(v1, v2)

		return Vector2.scale(v2, dotProduct)
	}

	static slide(v1: Readonly<Vector2>, v2: Readonly<Vector2>) {
		const projection = Vector2.project(v1, v2)

		return Vector2.subtract(v1, projection)
	}

	static perpendicular(v: Readonly<Vector2>) {
		return new Vector2(-v.y, v.x);
	}

	static fromAngle(angle: number, length = 1): Vector2 {
		return new Vector2(Math.cos(angle) * length, Math.sin(angle) * length);
	}

	static moveTowards(v1: Vector2, v2: Vector2, maxDistanceDelta: number): Vector2 {
		const direction = Vector2.subtract(v2, v1)
		const distance = direction.magnitude;

		if (distance <= maxDistanceDelta || distance === 0)
			return v2;

		const moveAmount = Vector2.normalize(direction).scale(maxDistanceDelta);

		return Vector2.add(v1, moveAmount)
	}

	static signedAngle(v1: Vector2, v2: Vector2): number {
		const dot = v1.x * v2.x + v1.y * v2.y;
		const cross = v1.x * v2.y - v1.y * v2.x;

		const angle = Math.atan2(cross, dot);

		return angle * (180 / Math.PI);
	}

	static smoothDamp(
		current: Vector2,
		target: Vector2,
		currentVelocity: Vector2,
		smoothTime: number,
		maxSpeed: number = Number.POSITIVE_INFINITY,
		deltaTime: number = 1 / 60
	): Vector2 {
		const twoOverSmoothTime = 2.0 / smoothTime;

		const diff = new Vector2(target.x - current.x, target.y - current.y);

		const length = diff.magnitude;

		if (length < 0.0001) {
			return current;
		}

		const smoothing = smoothTime * Math.min(length / deltaTime, maxSpeed);

		const velocity = new Vector2(
			currentVelocity.x + diff.x * twoOverSmoothTime,
			currentVelocity.y + diff.y * twoOverSmoothTime
		);

		if (length > smoothing) {
			const adjusted = new Vector2(
				current.x + (velocity.x - currentVelocity.x) * deltaTime,
				current.y + (velocity.y - currentVelocity.y) * deltaTime
			);
			currentVelocity.x = adjusted.x;
			currentVelocity.y = adjusted.y;
			return adjusted;
		}

		const adjusted = new Vector2(target.x, target.y);

		currentVelocity.x = 0;
		currentVelocity.y = 0;

		return adjusted;
	}

	static subtract(v1: Readonly<Vector2>, v2: Readonly<Vector2>) {
		return new Vector2(v1.x - v2.x, v1.y - v2.y);
	}

	static add(v1: Readonly<Vector2>, v2: Readonly<Vector2>) {
		return new Vector2(v1.x + v2.x, v1.y + v2.y);
	}

	static multiply(v1: Readonly<Vector2>, v2: Readonly<Vector2>) {
		return new Vector2(v1.x * v2.x, v1.y * v2.y);
	}

	static divide(v1: Readonly<Vector2>, v2: Readonly<Vector2>) {
		return new Vector2(v1.x / v2.x, v1.y / v2.y);
	}

	static scale(v: Readonly<Vector2>, scala: number) {
		return new Vector2(v.x * scala, v.y * scala);
	}

	static invert(v: Readonly<Vector2>) {
		return v.clone().invert();
	}

	static negate(v: Readonly<Vector2>) {
		return v.clone().negate();
	}

	static normalize(v: Readonly<Vector2>) {
		const length = v.length;

		if (length === 0)
			return new Vector2(0, 0);

		return new Vector2(v.x / length, v.y / length);
	}

	static ceil(v: Readonly<Vector2>) {
		return v.clone().ceil();
	}

	static floor(v: Readonly<Vector2>) {
		return v.clone().floor();
	}

	static round(v: Readonly<Vector2>) {
		return v.clone().round();
	}

	static abs(v: Readonly<Vector2>) {
		return v.clone().abs();
	}

	static min(v1: Readonly<Vector2>, v2: Readonly<Vector2>) {
		return new Vector2(Math.min(v1.x, v2.x), Math.min(v1.y, v2.y));
	}

	static max(v1: Readonly<Vector2>, v2: Readonly<Vector2>) {
		return new Vector2(Math.max(v1.x, v2.x), Math.max(v1.y, v2.y));
	}

	static distance(v1: Readonly<Vector2>, v2: Readonly<Vector2>) {
		return Math.hypot(v1.x - v2.x, v1.y - v2.y);
	}

	static squaredDistance(v1: Readonly<Vector2>, v2: Readonly<Vector2>) {
		return (v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y);
	}

	static magnitude(v: Readonly<Vector2>): number {
		return Math.sqrt(v.x ** 2 + v.y ** 2);
	}

	static sqrMagnitude(v: Readonly<Vector2>): number {
		return v.x ** 2 + v.y ** 2;
	}

	static dot(v1: Readonly<Vector2>, v2: Readonly<Vector2>) {
		return v1.x * v2.x + v1.y * v2.y;
	}

	static normalFromPoints(v1: Readonly<Vector2>, v2: Readonly<Vector2>) {
		const direction = Vector2.subtract(v2, v1)

		return direction.normal()
	}

	static angleBetween(v1: Vector2, v2: Vector2) {
		const dotProduct = v1.dot(v2);
		const lengths = v1.length * v2.length;
		if (lengths === 0) return 0;

		const cosTheta = Math.min(1, Math.max(-1, dotProduct / lengths));

		return Math.acos(cosTheta);
	}

	static lerp(v1: Readonly<Vector2>, v2: Readonly<Vector2>, t: number): Vector2 {
		return new Vector2(
			v1.x + (v2.x - v1.x) * t,
			v1.y + (v2.y - v1.y) * t
		);
	}

	static lerpUnclamped(v1: Vector2, v2: Vector2, t: number): Vector2 {
		const x = v1.x + (v2.x - v1.x) * t;
		const y = v1.y + (v2.y - v1.y) * t;

		return new Vector2(x, y);
	}

	static midpoint(v1: Readonly<Vector2>, v2: Readonly<Vector2>): Vector2 {
		return new Vector2(
			(v1.x + v2.x) / 2,
			(v1.y + v2.y) / 2
		);
	}

	static zero() {
		return new Vector2(0, 0)
	}

	static one() {
		return new Vector2(1, 1)
	}

	static up() {
		return new Vector2(0, -1)
	}

	static down() {
		return new Vector2(0, 1)
	}

	static right() {
		return new Vector2(1, 0)
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
