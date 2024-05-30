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
