import { IOptionsNodeRectangle, TOptionsBasic } from "../../basic/nodes/types"
import { loadShader, serializeOptions } from "./functions"

const makeRect = (context: WebGL2RenderingContext, options: any) => {
  const { width, height, x, y, background } = serializeOptions(context, options)

  const vertices = [x, y, x, y - height, x + width, y - height, x + width, y]
  const indices = [0, 1, 2, 0, 2, 3]

  const vertexBuffer = context.createBuffer()
  context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer)
  context.bufferData(
    context.ARRAY_BUFFER,
    new Float32Array(vertices),
    context.STATIC_DRAW
  )

  const indexBuffer = context.createBuffer()
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBuffer)
  context.bufferData(
    context.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    context.STATIC_DRAW
  )

  const vertexShaderSource = `
      attribute vec2 position;
      void main() {
          gl_Position = vec4(position, 0.0, 1.0);
      }
  `

  const fragmentShaderSource = `
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

export const draw_rectangle_context_webgl2 = (
  context: WebGL2RenderingContext,
  options: IOptionsNodeRectangle & TOptionsBasic
) => {
  const rectProgram = makeRect(context, options)

  if (rectProgram) {
    context.useProgram(rectProgram.program)
    context.bindBuffer(context.ARRAY_BUFFER, rectProgram.vertexBuffer)
    context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, rectProgram.indexBuffer)
    context.drawElements(
      context.TRIANGLES,
      rectProgram.indices.length,
      context.UNSIGNED_SHORT,
      0
    )
  }
}
