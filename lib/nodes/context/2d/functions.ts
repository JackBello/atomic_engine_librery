import type { ICoords2D, ISize2D } from "../../class/nodes-2D.types";

export const validColor = (
	color: string,
	context: CanvasRenderingContext2D,
	options: ISize2D,
) => {
	if (color.indexOf("linear-gradient") !== -1) {
		const convertColor = color
			.replace("linear-gradient(", "")
			.slice(0, -1)
			.split(",");

		const linearGradient = context.createLinearGradient(
			0,
			0,
			options.width,
			options.height,
		);

		for (const colors of convertColor) {
			const value = colors.trim().split(" ");
			linearGradient.addColorStop(Number(value[0]), value[1]);
		}

		return linearGradient;
	}

	return color;
};

export const applyBackground = (background: string | CanvasGradient) =>
	background;

export const clear_canvas_2D = (context: CanvasRenderingContext2D) =>
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);

export const save_canvas_2D = (context: CanvasRenderingContext2D) =>
	context.save();

export const restore_canvas_2D = (context: CanvasRenderingContext2D) =>
	context.restore();

export const translate_canvas_2D = (
	context: CanvasRenderingContext2D,
	options: ICoords2D,
) => context.translate(options.x, options.y);

export const scale_canvas_2D = (
	context: CanvasRenderingContext2D,
	scale: number,
) => context.scale(scale, scale);
