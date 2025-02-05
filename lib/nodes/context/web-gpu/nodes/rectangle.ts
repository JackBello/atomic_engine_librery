import { hexToNormalizedRGBA } from "@/app/utils/colors";
import { Vector2 } from "@/nodes/vectors/vector-2";
import { Matrix3 } from "@/nodes/matrix/matrix-3";
import type { TCanvasNodeOptions } from "@/nodes/types";

export const rectangle_WEB_GPU = (
    options: TCanvasNodeOptions["2D/rectangle"],
    context: GPUCanvasContext
) => {
    const scaleX = (options.width / context.canvas.width) * 2;
    const scaleY = (options.height / context.canvas.height) * 2;

    const vertices = new Float32Array([
        -scaleX / 2, -scaleY / 2, // Vértice inferior izquierdo
        scaleX / 2, -scaleY / 2,  // Vértice inferior derecho
        -scaleX / 2, scaleY / 2,  // Vértice superior izquierdo
        scaleX / 2, scaleY / 2,   // Vértice superior derecho
    ]);

    const translateX = (1000 / context.canvas.width) * 2; // Escalar a [-1, 1]
    const translateY = (10 / context.canvas.height) * 2; // Escalar a [-1, 1]

    const matrix3 = new Matrix3()

    matrix3.scale(new Vector2(0.5, 0.5))
    // matrix3.rotate(Math.PI / 1)
    // matrix3.skew(new Vector2(2, 2))
    matrix3.translate(new Vector2(translateX, translateY))

    console.log(matrix3.toString());

    const color = hexToNormalizedRGBA(options.fill);
    const colors = new Float32Array(color);

    return { vertices, colors, matrix: matrix3.elements };
};
