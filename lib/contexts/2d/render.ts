import { TMode } from "@/types"
import { handleContext2D } from "./handle"
import { ISize2D } from "@/nodes/nodes-2d.types"
import { nodeIsInEditor, nodeIsInViewport } from "@/utils/nodes"
import { INodeWorker } from "@/nodes/nodes.types"
import { AbstractRender } from "../render.abstract"

export class Render2D extends AbstractRender {
  protected node: INodeWorker = {} as any
  protected mode: TMode
  protected afterDraw: any[] = []
  protected beforeDraw: any[] = []
  protected scaleViewport: number = 1
  protected gameSize: ISize2D = {
    height: 0,
    width: 0
  }
  protected editorSize: ISize2D = {
    height: 0,
    width: 0
  }

  configs: Record<string, any>
  context: CanvasRenderingContext2D

  constructor(
    context: CanvasRenderingContext2D,
    configs: Record<string, any>,
    mode: TMode
  ) {
    super()

    this.context = context
    this.configs = configs
    this.mode = mode
  }

  setScaleViewport(scale: number) {
    this.scaleViewport = scale
  }

  setGameSize(size: ISize2D) {
    this.gameSize = size
  }

  setEditorSize(size: ISize2D) {
    this.editorSize = size
  }

  setAfterDraw(draw: any[]) {
    this.afterDraw = draw
  }

  setBeforeDraw(draw: any[]) {
    this.beforeDraw = draw
  }

  loadNode(node: INodeWorker) {
    this.node = node
  }

  clear() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    )
  }

  draw() {
    if (this.mode === "editor" && this.beforeDraw.length)
      for (const draw of this.beforeDraw) {
        handleContext2D(draw.__type__, draw.options, this.context)
      }

    if (this.mode === "editor" && this.node) this.executeDrawEditor(this.node)
    if (this.mode === "game" && this.node) this.executeDrawGame(this.node)

    if (this.mode === "editor" && this.afterDraw.length > 0)
      for (const draw of this.afterDraw) {
        handleContext2D(draw.__type__, draw.options, this.context)
      }
  }

  protected executeDrawEditor(node: INodeWorker) {
    if (
      node &&
      node.__type__ === "primitive:2D/scene" &&
      node.nodes.length > 0
    ) {
      for (const child of node.nodes) {
        this.executeDrawEditor(child)
      }
    }

    if (
      node &&
      node.options &&
      node.options.visible &&
      node.__type__.startsWith("draw:2D")
    ) {
      const pan = this.configs.pan ?? { x: 0, y: 0 }
      const zoom = this.configs.zoom ?? 1

      if (
        nodeIsInEditor(
          node.options,
          {
            height: this.editorSize.height,
            width: this.editorSize.width
          },
          pan,
          zoom
        )
      ) {
        handleContext2D(node.__type__ as any, node.options, this.context)

        if (node.nodes.length > 0) {
          this.context.save()
          this.context.translate(node.options.x, node.options.y)
          this.context.scale(node.options.scaleX, node.options.scaleY)
          this.context.rotate(node.options.calculate.rotation)

          for (const child of node.nodes) {
            this.executeDrawEditor(child)
          }

          this.context.restore()
        }
      }
    }
  }

  protected executeDrawGame(node: INodeWorker) {
    if (node && node.__type__ === "primitive:2D/scene") {
      for (const child of node.nodes) {
        this.executeDrawGame(child)
      }
    }

    if (
      node &&
      node.options &&
      node.options.visible &&
      node.__type__.startsWith("draw:2D")
    ) {
      if (
        nodeIsInViewport(node.options, {
          x: 0,
          y: 0,
          height: this.gameSize.height,
          width: this.gameSize.width
        })
      ) {
        handleContext2D(node.__type__ as any, node.options, this.context)

        if (node.nodes.length > 0) {
          this.context.save()
          this.context.translate(
            node.options.x * this.scaleViewport,
            node.options.y * this.scaleViewport
          )
          this.context.scale(
            node.options.scaleX * this.scaleViewport,
            node.options.scaleY * this.scaleViewport
          )
          this.context.rotate(node.options.calculate.rotation)

          for (const child of node.nodes) {
            this.executeDrawGame(child)
          }

          this.context.restore()
        }
      }
    }
  }
}
