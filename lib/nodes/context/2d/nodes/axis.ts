import type { TAnything } from "@/app/types";

export const _makeAxisCoords2D = (
	context: CanvasRenderingContext2D,
	options: TAnything,
) => {
	context.beginPath();
	context.lineWidth = 2;
	context.strokeStyle = options.axis.colorY;
	context.moveTo(options.translateX, 0);
	context.lineTo(options.translateX, context.canvas.height);
	context.stroke();
	context.closePath();

	context.beginPath();
	context.lineWidth = 2;
	context.strokeStyle = options.axis.colorX;
	context.moveTo(0, options.translateY);
	context.lineTo(context.canvas.width, options.translateY);
	context.stroke();
	context.closePath();
};
