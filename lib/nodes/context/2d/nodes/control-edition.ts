import type { TCanvasNodeOptions } from "@/nodes/types";

export const control_edition_2D = (
	context: CanvasRenderingContext2D,
	options: TCanvasNodeOptions["2D/control-edition"],
) => {
	if (options.alpha <= 0) return

	context.globalCompositeOperation = "destination-over";

	context.strokeStyle = options.borderColor;
	context.lineWidth = options.borderWidth;

	const widthWithPadding =
		options.width + (options.padding as number) * 2;
	const heightWithPadding =
		options.height + (options.padding as number) * 2;

	context.beginPath();

	context.strokeRect(
		-widthWithPadding / 2,
		-heightWithPadding / 2,
		widthWithPadding,
		heightWithPadding,
	);

	if (options.showCorner) {
		context.fillStyle = options.cornerColor;

		// top-left
		context.beginPath();
		context.arc(
			-widthWithPadding / 2,
			-heightWithPadding / 2,
			options.cornerSize,
			0,
			2 * Math.PI,
		);
		context.fill();

		// top-center
		context.beginPath();
		context.arc(0, -heightWithPadding / 2, options.cornerSize, 0, 2 * Math.PI);
		context.fill();

		// top-right
		context.beginPath();
		context.arc(
			widthWithPadding / 2,
			-heightWithPadding / 2,
			options.cornerSize,
			0,
			2 * Math.PI,
		);
		context.fill();

		// middle-left
		context.beginPath();
		context.arc(-widthWithPadding / 2, 0, options.cornerSize, 0, 2 * Math.PI);
		context.fill();

		// middle-center
		context.beginPath();
		context.arc(widthWithPadding / 2, 0, options.cornerSize, 0, 2 * Math.PI);
		context.fill();

		// bottom-left
		context.beginPath();
		context.arc(
			-widthWithPadding / 2,
			heightWithPadding / 2,
			options.cornerSize,
			0,
			2 * Math.PI,
		);
		context.fill();

		// bottom-center
		context.beginPath();
		context.arc(0, heightWithPadding / 2, options.cornerSize, 0, 2 * Math.PI);
		context.fill();

		// bottom-right
		context.beginPath();
		context.arc(
			widthWithPadding / 2,
			heightWithPadding / 2,
			options.cornerSize,
			0,
			2 * Math.PI,
		);
		context.fill();
	}

	context.closePath();
};
