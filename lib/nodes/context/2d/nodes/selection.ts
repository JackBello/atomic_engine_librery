import type { TCanvasNodeOptions } from "@/nodes/types";
import type { ICalculate } from "../../../class/nodes-2D.types";

export const selection_2D = (
	context: CanvasRenderingContext2D,
	options: TCanvasNodeOptions["2D/selection"] & ICalculate,
) => {
	context.fillStyle = options.background;

	if (options.border) {
		context.strokeStyle = options.borderColor;
		context.lineWidth = options.borderWidth;
	}

	context.beginPath();

	if (options.radius) {
		if (typeof options.radius === "number")
			context.roundRect(
				options.x,
				options.y,
				options.width,
				options.height,
				options.radius,
			);
		else if (Array.isArray(options.radius))
			context.roundRect(
				options.x,
				options.y,
				options.width,
				options.height,
				options.radius,
			);
		else
			context.roundRect(options.x, options.y, options.width, options.height, [
				options.radius.topLeft,
				options.radius.topRight,
				options.radius.bottomLeft,
				options.radius.topRight,
			]);
	} else {
		context.rect(options.x, options.y, options.width, options.height);
	}
	context.fill();

	options.border ? context.stroke() : 0;

	context.closePath();
};
