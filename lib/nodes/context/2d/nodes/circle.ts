import type { TCanvasNodeOptions } from "@/nodes/types";

export const circle_2D = (
    context: CanvasRenderingContext2D,
    options: TCanvasNodeOptions["2D/circle"],
) => {
    if (options.alpha <= 0) return

    context.fillStyle = options.background;

    if (options.border) {
        context.strokeStyle = options.borderColor;
        context.lineWidth = options.borderWidth;
    }

    context.beginPath();

    context.arc(
        0,
        0,
        options.radius,
        options.startAngle,
        options.endAngle,
        options.counterclockwise,
    );

    context.fill();
    options.border ? context.stroke() : 0;

    context.closePath();
};
