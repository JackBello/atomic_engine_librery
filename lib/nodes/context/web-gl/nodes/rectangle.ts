import { TCanvasNodeOptions } from "@/nodes/types"
import { loadShader } from "../functions/load-shader"
import { serializeOptions } from "../functions/utils"
import { ICalculate } from "@/nodes/class/nodes-2D.types"

const shader_rectangle_webgl = (
  context: WebGL2RenderingContext,
  options: TCanvasNodeOptions["2D/rectangle"] & ICalculate
) => {
  const { width, height, x, y, background } = serializeOptions(context, options)

  const vertices = new Float32Array([
    x,
    y,
    x,
    y - height,
    x + width,
    y - height,
    x + width,
    y
  ])
  const indices = new Uint16Array([0, 1, 2, 0, 2, 3])

  const vertexBuffer = context.createBuffer()
  context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer)
  context.bufferData(context.ARRAY_BUFFER, vertices, context.STATIC_DRAW)

  const indexBuffer = context.createBuffer()
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBuffer)
  context.bufferData(context.ELEMENT_ARRAY_BUFFER, indices, context.STATIC_DRAW)

  const vertexShaderSource = /* glsl */ `
      attribute vec2 position;
      void main() {
          gl_Position = vec4(position, 0.0, 1.0);
      }
  `

  const fragmentShaderSource = /* glsl */ `
      precision mediump float;
      uniform vec4 u_color;
      void main() {
          gl_FragColor = u_color;
      }
  `

  const vertexShader = loadShader(
    context,
    context.VERTEX_SHADER,
    vertexShaderSource
  )
  const fragmentShader = loadShader(
    context,
    context.FRAGMENT_SHADER,
    fragmentShaderSource
  )

  if (!vertexShader) return
  if (!fragmentShader) return

  const program = context.createProgram() as WebGLProgram
  context.attachShader(program, vertexShader)
  context.attachShader(program, fragmentShader)
  context.linkProgram(program)
  context.useProgram(program)

  const positionAttributeLocation = context.getAttribLocation(
    program,
    "position"
  )
  context.enableVertexAttribArray(positionAttributeLocation)
  context.vertexAttribPointer(
    positionAttributeLocation,
    2,
    context.FLOAT,
    false,
    0,
    0
  )

  const colorUniformLocation = context.getUniformLocation(program, "u_color")
  context.uniform4fv(colorUniformLocation, background)

  return {
    program,
    vertexBuffer,
    indexBuffer,
    indices
  }
}

export const rectangle_webgl = (
  context: WebGL2RenderingContext,
  options: TCanvasNodeOptions["2D/rectangle"] & ICalculate
) => {
  const rectangle = shader_rectangle_webgl(context, options)

  if (rectangle) {
    context.useProgram(rectangle.program)
    context.bindBuffer(context.ARRAY_BUFFER, rectangle.vertexBuffer)
    context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, rectangle.indexBuffer)
    context.drawElements(
      context.TRIANGLES,
      rectangle.indices.length,
      context.UNSIGNED_SHORT,
      0
    )
  }
}
