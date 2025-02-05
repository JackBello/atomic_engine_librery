import type { Vector2 } from "@/nodes";
import { BaseAppAbstract } from "../abstract/base.abstract";
import type { Transform2D } from "../transforms/transform-2D";

export class Matrix3 extends BaseAppAbstract {
    protected _array: Float32Array;

    get elements() {
        return this._array
    }

    get a() {
        return this._array[0]
    }

    get b() {
        return this._array[1]
    }

    get c() {
        return this._array[2]
    }

    get d() {
        return this._array[3]
    }

    get e() {
        return this._array[4]
    }

    get f() {
        return this._array[5]
    }

    get g() {
        return this._array[6]
    }

    get h() {
        return this._array[7]
    }

    get i() {
        return this._array[8]
    }

    set a(value: number) {
        this._array[0] = value
    }

    set b(value: number) {
        this._array[1] = value
    }

    set c(value: number) {
        this._array[2] = value
    }

    set d(value: number) {
        this._array[3] = value
    }

    set e(value: number) {
        this._array[4] = value
    }

    set f(value: number) {
        this._array[5] = value
    }

    set g(value: number) {
        this._array[6] = value
    }

    set h(value: number) {
        this._array[7] = value
    }

    set i(value: number) {
        this._array[8] = value
    }

    constructor(
        a = 1, b = 0, c = 0,
        d = 0, e = 1, f = 0,
        g = 0, h = 0, i = 1
    ) {
        super()

        this._array = new Float32Array(9);

        this._array[0] = a;
        this._array[1] = b;
        this._array[2] = c;
        this._array[3] = d;
        this._array[4] = e;
        this._array[5] = f;
        this._array[6] = g;
        this._array[7] = h;
        this._array[8] = i;
    }

    translate(vector: Vector2) {
        const a00 = this._array[0];
        const a01 = this._array[1];
        const a02 = this._array[2];
        const a10 = this._array[3];
        const a11 = this._array[4];
        const a12 = this._array[5];
        const a20 = this._array[6];
        const a21 = this._array[7];
        const a22 = this._array[8];

        const x = vector.x;
        const y = vector.y;

        this._array[0] = a00;
        this._array[1] = a01;
        this._array[2] = a02;

        this._array[3] = a10;
        this._array[4] = a11;
        this._array[5] = a12;

        this._array[6] = x * a00 + y * a10 + a20;
        this._array[7] = x * a01 + y * a11 + a21;
        this._array[8] = x * a02 + y * a12 + a22;

        return this;
    }

    scale(vector: Vector2) {
        const x = vector.x;
        const y = vector.y;

        this._array[0] = x * this._array[0];
        this._array[1] = x * this._array[1];
        this._array[2] = x * this._array[2];

        this._array[3] = y * this._array[3];
        this._array[4] = y * this._array[4];
        this._array[5] = y * this._array[5];

        this._array[6] = this._array[6];
        this._array[7] = this._array[7];
        this._array[8] = this._array[8];

        return this;
    }

    rotate(angle: number): Matrix3 {
        const a00 = this._array[0];
        const a01 = this._array[1];
        const a02 = this._array[2];
        const a10 = this._array[3];
        const a11 = this._array[4];
        const a12 = this._array[5];
        const a20 = this._array[6];
        const a21 = this._array[7];
        const a22 = this._array[8];

        const s = Math.sin(angle);
        const c = Math.cos(angle);

        this._array[0] = c * a00 + s * a10;
        this._array[1] = c * a01 + s * a11;
        this._array[2] = c * a02 + s * a12;

        this._array[3] = c * a10 - s * a00;
        this._array[4] = c * a11 - s * a01;
        this._array[5] = c * a12 - s * a02;

        this._array[6] = a20;
        this._array[7] = a21;
        this._array[8] = a22;

        return this;
    }

    skew(vector: Vector2) {
        const skewMatrix = new Matrix3(
            1, vector.x, 0,
            vector.y, 1, 0,
            0, 0, 1
        );

        return this.multiply(skewMatrix);
    }

    multiply(matrix: Matrix3) {
        const matrixA = this.elements;
        const matrixB = matrix.elements;

        this._array[0] = matrixA[0] * matrixB[0] + matrixA[1] * matrixB[3] + matrixA[2] * matrixB[6]; // a
        this._array[1] = matrixA[0] * matrixB[1] + matrixA[1] * matrixB[4] + matrixA[2] * matrixB[7]; // b
        this._array[2] = matrixA[0] * matrixB[2] + matrixA[1] * matrixB[5] + matrixA[2] * matrixB[8]; // c
        this._array[3] = matrixA[3] * matrixB[0] + matrixA[4] * matrixB[3] + matrixA[5] * matrixB[6]; // d
        this._array[4] = matrixA[3] * matrixB[1] + matrixA[4] * matrixB[4] + matrixA[5] * matrixB[7]; // e
        this._array[5] = matrixA[3] * matrixB[2] + matrixA[4] * matrixB[5] + matrixA[5] * matrixB[8]; // f
        this._array[6] = matrixA[6] * matrixB[0] + matrixA[7] * matrixB[3] + matrixA[8] * matrixB[6]; // g
        this._array[7] = matrixA[6] * matrixB[1] + matrixA[7] * matrixB[4] + matrixA[8] * matrixB[7]; // h
        this._array[8] = matrixA[6] * matrixB[2] + matrixA[7] * matrixB[5] + matrixA[8] * matrixB[8]; // i

        return this;
    }

    set(
        a: number, b: number, c: number,
        d: number, e: number, f: number,
        g = 0, h = 0, i = 1
    ) {
        this._array[0] = a;
        this._array[1] = b;
        this._array[2] = c;
        this._array[3] = d;
        this._array[4] = e;
        this._array[5] = f;
        this._array[6] = g;
        this._array[7] = h;
        this._array[8] = i;
    }

    toString() {
        return `[${this._array.join(", ")}]`
    }

    export() {
        return `Mat3${this.toString()}`
    }

    clone() {
        return new Matrix3(
            this._array[0], this._array[1], this._array[2],
            this._array[3], this._array[4], this._array[5],
            this._array[6], this._array[7], this._array[8]
        )
    }

    static multiply(m1: Matrix3, m2: Matrix3) {
        const matrixA = m1.elements;
        const matrixB = m2.elements;

        const result = new Matrix3(
            matrixA[0] * matrixB[0] + matrixA[1] * matrixB[3] + matrixA[2] * matrixB[6], // a
            matrixA[0] * matrixB[1] + matrixA[1] * matrixB[4] + matrixA[2] * matrixB[7], // b
            matrixA[0] * matrixB[2] + matrixA[1] * matrixB[5] + matrixA[2] * matrixB[8], // c
            matrixA[3] * matrixB[0] + matrixA[4] * matrixB[3] + matrixA[5] * matrixB[6], // d
            matrixA[3] * matrixB[1] + matrixA[4] * matrixB[4] + matrixA[5] * matrixB[7], // e
            matrixA[3] * matrixB[2] + matrixA[4] * matrixB[5] + matrixA[5] * matrixB[8], // f
            matrixA[6] * matrixB[0] + matrixA[7] * matrixB[3] + matrixA[8] * matrixB[6], // g
            matrixA[6] * matrixB[1] + matrixA[7] * matrixB[4] + matrixA[8] * matrixB[7], // h
            matrixA[6] * matrixB[2] + matrixA[7] * matrixB[5] + matrixA[8] * matrixB[8]  // i
        );

        return result;
    }

    static translate(matrix: Matrix3, vector: Vector2) {
        const translationMatrix = new Matrix3(
            1, 0, vector.x,
            0, 1, vector.y,
            0, 0, 1
        );

        return Matrix3.multiply(matrix, translationMatrix)
    }

    static scale(matrix: Matrix3, vector: Vector2) {
        const scaleMatrix = new Matrix3(
            vector.x, 0, 0,
            0, vector.y, 0,
            0, 0, 1
        );

        return Matrix3.multiply(matrix, scaleMatrix)
    }

    static rotation(matrix: Matrix3, angle: number) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const rotationMatrix = new Matrix3(
            cos, -sin, 0,
            sin, cos, 0,
            0, 0, 1
        );

        return Matrix3.multiply(matrix, rotationMatrix)
    }

    static skew(matrix: Matrix3, vector: Vector2) {
        const skewMatrix = new Matrix3(
            1, vector.x, 0,
            vector.y, 1, 0,
            0, 0, 1
        );

        return Matrix3.multiply(matrix, skewMatrix)
    }

    static fromTransform2D(transform: Transform2D) {
        const matrix = new Matrix3();

        matrix.translate(transform.position);
        matrix.rotate(transform.rotation);
        matrix.scale(transform.scale);

        return matrix;
    }
}
