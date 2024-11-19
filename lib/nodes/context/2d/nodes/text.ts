import type { TCanvasNodeOptions } from "@/nodes/types";
import { flipX_2D, flipY_2D } from "../functions";

export const text_2D = (
	context: CanvasRenderingContext2D,
	options: TCanvasNodeOptions["2D/text"],
) => {
	if (options.alpha <= 0) return

	context.save()
	context.beginPath();

	if (options.flipX)
		flipX_2D(context, options.width)
	if (options.flipY)
		flipY_2D(context, options.width)

	context.fillStyle = options.fill;

	context.font = `${options.fontStretch ? `${options.fontStretch} ` : ""}${options.fontVariant ? `${options.fontVariant} ` : ""
		}${options.fontStyle ? `${options.fontStyle} ` : ""}${options.fontWeight ? `${options.fontWeight} ` : ""
		}${options.fontSize ? `${options.fontSize} ` : ""}${options.lineHeight ? `${options.lineHeight} ` : ""
		}${options.fontFamily ? options.fontFamily : ""}`;

	context.textAlign = options.textAlign;
	context.textBaseline = options.textBaseline;
	context.direction = options.textDirection;
	context.wordSpacing = options.wordSpacing;
	context.letterSpacing = options.letterSpacing;

	if (options.stroke) {
		context.strokeStyle = options.stroke;
		context.lineWidth = options.lineWidth;
		context.strokeText(options.text, 0, 0);
	}

	context.fillText(options.text, 0, 0);

	context.closePath();
	context.restore()
};
