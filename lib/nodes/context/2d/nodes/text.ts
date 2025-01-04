import type { TCanvasNodeOptions } from "@/nodes/types";

export const text_2D = (
	context: CanvasRenderingContext2D,
	options: TCanvasNodeOptions["2D/text"],
) => {
	if (options.alpha <= 0) return

	context.save()
	context.beginPath();

	context.fillStyle = options.fill;

	context.font = `${options.fontStyle} ${options.fontVariant} ${options.fontWeight} ${options.fontSize} ${options.fontFamily}`

	context.textAlign = options.textAlign;
	context.textBaseline = options.textBaseline;
	context.direction = options.textDirection;
	context.fontStretch = options.fontStretch as CanvasFontStretch

	if (options.stroke) {
		context.strokeStyle = options.stroke;
		context.lineWidth = options.lineWidth;
		context.strokeText(options.text, 0, 0);
	}

	context.fillText(options.text, 0, 0);

	context.closePath();
	context.restore()
};
