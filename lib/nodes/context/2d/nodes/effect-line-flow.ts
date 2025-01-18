import { validColor } from "../functions";
import type { TCanvasNodeOptions } from "@/nodes/types";

export const effect_line_flow_2D = (
	context: CanvasRenderingContext2D,
	options: TCanvasNodeOptions["2D/line-flow-effect"],
) => {
	if (options.alpha <= 0) return

	if (!options.stroke) return

	context.lineWidth = options.lineWidth;
	context.strokeStyle = validColor(options.stroke, context, {
		width: options.width,
		height: options.height,
	});

	for (
		let row = 0;
		row < options.height;
		row += options.cellSize
	) {
		for (
			let column = 0;
			column < options.width;
			column += options.cellSize
		) {
			context.beginPath();
			const angle =
				(Math.cos(column * 0.01) + Math.sin(row * 0.01)) * options.radius;
			context.moveTo(column, row);
			context.lineTo(
				column + Math.cos(angle) * options.spacing,
				row + Math.sin(angle) * options.spacing,
			);
			context.stroke();
		}
	}
};
