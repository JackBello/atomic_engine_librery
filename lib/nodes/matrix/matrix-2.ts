import { Transform2D } from "../transforms/transform-2D";

export class Matrix2D {
    protected _array: Float32Array;

    constructor(a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) {
        this._array = new Float32Array(6);

        this._array[0] = a;
        this._array[1] = b;
        this._array[2] = c;
        this._array[3] = d;
        this._array[4] = e;
        this._array[5] = f;
    }

    translate(x: number, y: number) {
        this._array[4] += this._array[0] * x + this._array[2] * y;
        this._array[5] += this._array[1] * x + this._array[3] * y;

        return this;
    }

    rotate(angle: number) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const m0 = this._array[0];
        const m1 = this._array[1];
        const m2 = this._array[2];
        const m3 = this._array[3];

        this._array[0] = m0 * cos + m2 * sin;
        this._array[1] = m1 * cos + m3 * sin;
        this._array[2] = m0 * -sin + m2 * cos;
        this._array[3] = m1 * -sin + m3 * cos;

        return this;
    }

    scale(x: number, y: number) {
        this._array[0] *= x;
        this._array[1] *= x;
        this._array[2] *= y;
        this._array[3] *= y;
        return this;
    }

    multiply(matrix: Matrix2D) {
        const a = this._array;
        const b = matrix._array;

        const m0 = a[0] * b[0] + a[2] * b[1];
        const m1 = a[1] * b[0] + a[3] * b[1];
        const m2 = a[0] * b[2] + a[2] * b[3];
        const m3 = a[1] * b[2] + a[3] * b[3];
        const m4 = a[0] * b[4] + a[2] * b[5] + a[4];
        const m5 = a[1] * b[4] + a[3] * b[5] + a[5];

        this._array[0] = m0;
        this._array[1] = m1;
        this._array[2] = m2;
        this._array[3] = m3;
        this._array[4] = m4;
        this._array[5] = m5;

        return this;
    }

    getTransform() {
        return this._array;
    }

    setTransform(
        a: number,
        b: number,
        c: number,
        d: number,
        e: number,
        f: number,
    ) {
        this._array[0] = a;
        this._array[1] = b;
        this._array[2] = c;
        this._array[3] = d;
        this._array[4] = e;
        this._array[5] = f;
    }

    static fromTransform2D(transform: Transform2D) {
        const matrix = new Matrix2D();

        matrix.translate(transform.position.x, transform.position.y);
        matrix.rotate(transform.rotation);
        matrix.scale(transform.scale.x, transform.scale.y);

        return matrix;
    }
}
