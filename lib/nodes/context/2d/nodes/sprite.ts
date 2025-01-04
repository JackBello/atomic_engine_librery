import { Vector2 } from "@/nodes";
import type { TVec2 } from "@/nodes/global/types";
import type { TCanvasNodeOptions } from "@/nodes/types";

function getSpritePosition(row: number, col: number, settings: TCanvasNodeOptions["2D/sprite"]['settings']) {
    let borderWidth = 0;
    let borderHeight = 0

    let spacingWidth = 0
    let spacingHeight = 0

    if (typeof settings.border === "number") {
        borderHeight = settings.border
        borderWidth = settings.border
    } else {
        borderHeight = settings.border[0]
        borderWidth = settings.border[1]
    }

    if (typeof settings.spacing === "number") {
        spacingHeight = settings.spacing
        spacingWidth = settings.spacing
    } else {
        spacingHeight = settings.spacing[0]
        spacingWidth = settings.spacing[1]
    }

    if (col === 0) {
        spacingWidth = 0
    }

    if (row === 0) {
        spacingHeight = 0
    }

    return {
        x: (
            borderWidth +
            col * (spacingWidth + settings.width)
        ),
        y: (
            borderHeight +
            row * (spacingHeight + settings.height)
        )
    }
}

export const sprite_2d = (
    context: CanvasRenderingContext2D,
    options: TCanvasNodeOptions["2D/sprite"],
) => {
    if (!options.loaded) return

    if (options.alpha <= 0) return

    context.beginPath();

    context.imageSmoothingEnabled = options.smoothing

    context.imageSmoothingQuality = options.smoothingQuality

    const spriteCoords = Vector2.import(options.frameCoords as TVec2)

    const sprite = getSpritePosition(spriteCoords.y, spriteCoords.x + options.frame, options.settings)

    context.drawImage(options.element,
        sprite.x,
        sprite.y,
        options.settings.width,
        options.settings.height,
        0,
        0,
        options.width,
        options.height
    )

    context.closePath();
}