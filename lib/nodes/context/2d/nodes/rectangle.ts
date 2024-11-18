import type { TCanvasNodeOptions } from "@/nodes/types";

export const rectangle_2D = (
	context: CanvasRenderingContext2D,
	options: TCanvasNodeOptions["2D/rectangle"],
) => {
	if (options.alpha <= 0) return

	context.fillStyle = options.background;

	if (options.border) {
		context.strokeStyle = options.borderColor;
		context.lineWidth = options.borderWidth;
	}

	context.beginPath();

	if (options.radius) {
		if (typeof options.radius === "number")
			context.roundRect(
				0, 0,
				options.width,
				options.height,
				options.radius,
			);
		else if (Array.isArray(options.radius))
			context.roundRect(
				0, 0,
				options.width,
				options.height,
				options.radius,
			);
		else
			context.roundRect(
				0, 0,
				options.width,
				options.height,
				[
					options.radius.topLeft,
					options.radius.topRight,
					options.radius.bottomLeft,
					options.radius.topRight,
				],
			);
	} else {
		context.rect(
			0, 0,
			options.width,
			options.height,
		);
	}

	context.fill();
	options.border ? context.stroke() : 0;

	context.closePath();
};
