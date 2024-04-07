import { IOptionsNode2D, TOptionsBasic } from "../../basic/nodes/types"
export { draw_rectangle_context_webgl2 } from "./rectangle"

export const loadShader = (
  context: WebGL2RenderingContext,
  type: number,
  source: string
) => {
  const shader = context.createShader(type) as WebGLShader

  context.shaderSource(shader, source)
  context.compileShader(shader)

  if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
    console.error(
      "An error occurred compiling the shaders: " +
        context.getShaderInfoLog(shader)
    )

    context.deleteShader(shader)

    return null
  }

  return shader
}

export const transformColor = (color: number, index: number) => {
  if (index === 3) return color
  return color / 255
}

export const transformRGB = (color: string): number[] => {
  if (color.match(/rgba([0-9]+, [0-9]+, [0-9], [0-9])/g)) {
    return color
      .replace("rgb", "")
      .slice(1, -1)
      .split(",")
      .map((value) => Number(value.trim()))
  }

  return color
    .replace("rgb", "")
    .slice(1, -1)
    .split(",")
    .map((value) => Number(value.trim()))
}

export const formatterColor = (color: string) => {
  let rgb: number[] = []

  if (color.includes("hsl")) {
    rgb = [1, 1, 1, 1]
  }
  if (color.includes("rgb")) {
    rgb = transformRGB(color)
  }

  if (rgb.length === 3) rgb.push(1)

  return rgb.map(transformColor)
}

export const serializeOptions = (
  context: WebGL2RenderingContext,
  options: IOptionsNode2D & TOptionsBasic
) => {
  const canvasWidth = context.canvas.width
  const canvasHeight = context.canvas.height

  const background = formatterColor(options.background)
  const x = (options.x / canvasWidth) * 2 - 1
  const y = 1 - (options.y / canvasHeight) * 2
  const width = options.width / canvasWidth
  const height = options.width / canvasHeight

  return {
    width,
    height,
    x,
    y,
    background
  }
}
