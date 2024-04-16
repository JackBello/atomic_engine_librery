export { draw_rectangle_context_2D } from "./rectangle"
export { draw_selection_context_2D } from "./selection"
export { draw_text_context_2D } from "./text"
export { draw_control_edition_context_2D } from "./control-edition"
export { draw_effect_context_2D } from "./effect"

export const validColor = (
  color: string,
  context: CanvasRenderingContext2D,
  options: any
) => {
  if (color.indexOf("linear-gradient") !== -1) {
    const convertColor = color
      .replace("linear-gradient(", "")
      .slice(0, -1)
      .split(",")

    const linearGradient = context.createLinearGradient(
      0,
      0,
      options.width,
      options.height
    )

    convertColor.forEach((colors) => {
      const value = colors.trim().split(" ")
      linearGradient.addColorStop(Number(value[0]), value[1])
    })

    return linearGradient
  } else {
    return color
  }
}

export const applyBackground = (background: string | CanvasGradient) => {
  background
}

export const clear_window_context_2D = (context: CanvasRenderingContext2D) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

export const save_window_context_2D = (context: CanvasRenderingContext2D) => {
  context.save()
}

export const restore_window_context_2D = (
  context: CanvasRenderingContext2D
) => {
  context.restore()
}

export const translate_window_context_2D = (
  context: CanvasRenderingContext2D,
  options: any
) => {
  context.translate(options.x, options.y)
}

export const scale_window_context_2D = (
  context: CanvasRenderingContext2D,
  options: any
) => {
  context.scale(options.scale, options.scale)
}

const _makeGrid = (context: CanvasRenderingContext2D, options: any) => {
  const screenWidth = context.canvas.width
  const screenHeight = context.canvas.height

  const startX = Math.floor(-options.translateX / options.grid.cell)
  const endX = startX + Math.ceil(screenWidth / options.grid.cell)
  const startY = Math.floor(-options.translateY / options.grid.cell)
  const endY = startY + Math.ceil(screenHeight / options.grid.cell)

  for (let y = startY; y < endY; y++) {
    context.beginPath()
    context.lineWidth = 1
    context.strokeStyle = options.grid.color
    context.moveTo(
      -1000 * (options.grid.cell * options.scale),
      y * (options.grid.cell * options.scale) + options.translateY
    )
    context.lineTo(
      1000 * (options.grid.cell * options.scale),
      y * (options.grid.cell * options.scale) + options.translateY
    )
    context.stroke()
    context.closePath()
  }

  for (let x = startX; x <= endX; x++) {
    context.beginPath()
    context.lineWidth = 1
    context.strokeStyle = options.grid.color
    context.moveTo(
      x * (options.grid.cell * options.scale) + options.translateX,
      -200 * (options.grid.cell * options.scale)
    )
    context.lineTo(
      x * (options.grid.cell * options.scale) + options.translateX,
      200 * (options.grid.cell * options.scale)
    )
    context.stroke()
    context.closePath()
  }
}

export const _makeAxisCoords2D = (
  context: CanvasRenderingContext2D,
  options: any
) => {
  context.beginPath()
  context.lineWidth = 2
  context.strokeStyle = options.axis.colorY
  context.moveTo(options.translateX, 0)
  context.lineTo(options.translateX, context.canvas.height)
  context.stroke()
  context.closePath()

  context.beginPath()
  context.lineWidth = 2
  context.strokeStyle = options.axis.colorX
  context.moveTo(0, options.translateY)
  context.lineTo(context.canvas.width, options.translateY)
  context.stroke()
  context.closePath()
}

export const grid_make_context_2D = (
  context: CanvasRenderingContext2D,
  options: any
) => {
  if (options.grid.show) _makeGrid(context, options)
  if (options.axis.show) _makeAxisCoords2D(context, options)
}
