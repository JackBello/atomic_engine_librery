import type { ICalculate } from "../../../class/nodes-2D.types";
import type { TCanvasNodeOptions } from "@/nodes/types";

export const text_2D = (
	context: CanvasRenderingContext2D,
	options: TCanvasNodeOptions["2D/text"] & ICalculate,
) => {
	const { calculate } = options;

	context.fillStyle = options.color;

	context.font = `${options.fontStretch ? `${options.fontStretch} ` : ""}${
		options.fontVariant ? `${options.fontVariant} ` : ""
	}${options.fontStyle ? `${options.fontStyle} ` : ""}${
		options.fontWeight ? `${options.fontWeight} ` : ""
	}${options.fontSize ? `${options.fontSize} ` : ""}${
		options.lineHeight ? `${options.lineHeight} ` : ""
	}${options.fontFamily ? options.fontFamily : ""}`;
	
	context.textAlign = options.textAlign;
	context.textBaseline = options.textBaseline;
	context.direction = options.textDirection;
	context.wordSpacing = options.wordSpacing;
	context.letterSpacing = options.letterSpacing;

	if (options.border) {
		context.strokeStyle = options.borderColor;
		context.lineWidth = options.borderWidth;
	}

	if (options.border) {
		context.strokeText(options.text, -calculate.middleScaleFactor.width, calculate.middleScaleFactor.height);
	} else {
		context.fillText(options.text, -calculate.middleScaleFactor.width, calculate.middleScaleFactor.height);
	}
};
