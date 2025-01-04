import type { TCanvasNodeOptions } from "@/nodes/types";

export const image_2d = (
    context: CanvasRenderingContext2D,
    options: TCanvasNodeOptions["2D/image"],
) => {
    if (!options.loaded) return

    if (options.alpha <= 0) return

    context.beginPath();

    context.imageSmoothingEnabled = options.smoothing

    context.imageSmoothingQuality = options.smoothingQuality

    context.drawImage(options.element, 0, 0, options.width, options.height)

    context.closePath();
}