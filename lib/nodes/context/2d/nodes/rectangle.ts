import type { ICalculate } from "../../../class/nodes-2D.types";
import type { TCanvasNodeOptions } from "@/nodes/types";

export const rectangle_2D = (
	context: CanvasRenderingContext2D,
	options: TCanvasNodeOptions["2D/rectangle"] & ICalculate,
) => {
	const { calculate } = options;

	context.fillStyle = options.background;

	if (options.border) {
		context.strokeStyle = options.borderColor;
		context.lineWidth = options.borderWidth;
	}

	context.beginPath();

	if (options.radius) {
		if (typeof options.radius === "number")
			context.roundRect(
				-calculate.middleScaleFactor.width,
				-calculate.middleScaleFactor.height,
				calculate.scaleFactor.width,
				calculate.scaleFactor.height,
				options.radius,
			);
		else if (Array.isArray(options.radius))
			context.roundRect(
				-calculate.middleScaleFactor.width,
				-calculate.middleScaleFactor.height,
				calculate.scaleFactor.width,
				calculate.scaleFactor.height,
				options.radius,
			);
		else
			context.roundRect(
				-calculate.middleScaleFactor.width,
				-calculate.middleScaleFactor.height,
				calculate.scaleFactor.width,
				calculate.scaleFactor.height,
				[
					options.radius.topLeft,
					options.radius.topRight,
					options.radius.bottomLeft,
					options.radius.topRight,
				],
			);
	} else {
		context.rect(
			-calculate.middleScaleFactor.width,
			-calculate.middleScaleFactor.height,
			calculate.scaleFactor.width,
			calculate.scaleFactor.height,
		);
	}

	context.fill();
	options.border ? context.stroke() : 0;

	context.closePath();
};
