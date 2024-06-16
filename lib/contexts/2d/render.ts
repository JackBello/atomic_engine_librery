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

    if (this.mode === "editor" && this.node)
      this.executeDrawEditor(this.node, undefined)
    if (this.mode === "game" && this.node)
      this.executeDrawGame(this.node, undefined)

    if (this.mode === "editor" && this.afterDraw.length > 0)
      for (const draw of this.afterDraw) {
        handleContext2D(draw.__type__, draw.options, this.context)
      }
  }

  protected executeDrawEditor(
    node: INodeWorker,
    parent: INodeWorker | undefined
  ) {
    if (
      node &&
      node.__type__ === "primitive:2D/scene" &&
      node.nodes.length > 0
    ) {
      for (const child of node.nodes) {
        this.executeDrawEditor(child, undefined)
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

      const coordsParent = parent
        ? {
            x: parent.options?.x,
            y: parent.options?.y,
            scaleX: parent.options?.scaleX,
            scaleY: parent.options?.scaleY
          }
        : {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1
          }

      if (
        nodeIsInEditor(
          {
            x: node.options.x + coordsParent.x,
            y: node.options.y + coordsParent.y,
            width: node.options.width,
            height: node.options.height,
            scaleX: node.options.scaleX * coordsParent.scaleX,
            scaleY: node.options.scaleY * coordsParent.scaleY
          },
          {
            height: this.editorSize.height,
            width: this.editorSize.width
          },
          pan,
          zoom
        )
      ) {
        this.context.save()

        this.context.translate(
          node.options.calculate.translate.x,
          node.options.calculate.translate.y
        )

        this.context.scale(
          node.options.calculate.scale.x,
          node.options.calculate.scale.y
        )

        if (node.options.calculate.rotation !== 0)
          this.context.rotate(node.options.calculate.rotation)

        handleContext2D(node.__type__ as any, node.options, this.context)

        if (node.nodes.length > 0) {
          for (const child of node.nodes) {
            this.executeDrawEditor(child, node)
          }
        }

        this.context.restore()
      }
    }
  }

  protected executeDrawGame(
    node: INodeWorker,
    parent: INodeWorker | undefined
  ) {
    if (node && node.__type__ === "primitive:2D/scene") {
      for (const child of node.nodes) {
        this.executeDrawGame(child, undefined)
      }
    }

    if (
      node &&
      node.options &&
      node.options.visible &&
      node.__type__.startsWith("draw:2D")
    ) {
      const coordsParent = parent
        ? {
            x: parent.options?.x,
            y: parent.options?.y
          }
        : {
            x: 0,
            y: 0
          }

      if (
        nodeIsInViewport(
          {
            x: node.options.x + coordsParent.x,
            y: node.options.y + coordsParent.y,
            width: node.options.width,
            height: node.options.height
          },
          {
            x: 0,
            y: 0,
            height: this.gameSize.height,
            width: this.gameSize.width
          }
        )
      ) {
        this.context.save()

        this.context.translate(
          node.options.calculate.translate.x,
          node.options.calculate.translate.y
        )

        this.context.scale(
          node.options.calculate.scale.x,
          node.options.calculate.scale.y
        )

        if (node.options.calculate.rotation !== 0)
          this.context.rotate(node.options.calculate.rotation)

        handleContext2D(node.__type__ as any, node.options, this.context)

        if (node.nodes.length > 0) {
          for (const child of node.nodes) {
            this.executeDrawGame(child, node)
          }
        }

        this.context.restore()
      }
    }
  }
}
