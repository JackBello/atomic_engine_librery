import type { TCanvasNodeOptions } from "@/nodes/types";

export const rectangle_2D = (
	context: CanvasRenderingContext2D,
	options: TCanvasNodeOptions["2D/rectangle"],
) => {
	if (options.alpha <= 0) return

	context.fillStyle = options.fill;

	if (options.stroke) {
		context.strokeStyle = options.stroke;
		context.lineWidth = options.lineWidth;
	}

	context.beginPath();

	if (options.rounded) {
		if (typeof options.rounded === "number")
			context.roundRect(
				0, 0,
				options.width,
				options.height,
				options.rounded,
			);
		else if (Array.isArray(options.rounded))
			context.roundRect(
				0, 0,
				options.width,
				options.height,
				options.rounded,
			);
		else
			context.roundRect(
				0, 0,
				options.width,
				options.height,
				[
					options.rounded.topLeft,
					options.rounded.topRight,
					options.rounded.bottomLeft,
					options.rounded.topRight,
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
	options.stroke ? context.stroke() : 0;

	context.closePath();
};
