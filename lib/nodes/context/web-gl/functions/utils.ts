import type { TAnything } from "@/types";
import { formatterColor } from "./colors";

export const serializeOptions = (
	context: WebGL2RenderingContext,
	options: TAnything,
) => {
	const canvasWidth = context.canvas.width;
	const canvasHeight = context.canvas.height;

	const background = formatterColor(options.background);
	const x = (options.x / canvasWidth) * 2 - 1;
	const y = 1 - (options.y / canvasHeight) * 2;
	const width = options.width / canvasWidth;
	const height = options.width / canvasHeight;

	return {
		width,
		height,
		x,
		y,
		background,
	};
};
