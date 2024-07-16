import { TMode } from "@/types"
import { INodeWorker } from "../global/node.types"
import { ISize2D } from "../class/nodes-2D.types"

export abstract class AbstractRender {
  protected abstract node: INodeWorker
  protected abstract mode: TMode
  protected abstract afterDraw: any[]
  protected abstract beforeDraw: any[]
  protected abstract scaleViewport: number
  protected abstract gameSize: ISize2D
  protected abstract editorSize: ISize2D

  abstract configs: Record<string, any>
  abstract context: any

  abstract setScaleViewport(scale: number): void

  abstract setGameSize(size: ISize2D): void

  abstract setEditorSize(size: ISize2D): void

  abstract setAfterDraw(draw: any): void

  abstract setBeforeDraw(draw: any): void

  abstract loadNode(node: INodeWorker): void

  abstract clear(): void

  abstract draw(): void

  protected abstract executeDrawEditor(
    node: INodeWorker,
    parentTransform: {
      x: number
      y: number
      scaleX: number
      scaleY: number
      rotation: number
    }
  ): void

  protected abstract executeDrawGame(
    node: INodeWorker,
    parentTransform: {
      x: number
      y: number
      scaleX: number
      scaleY: number
      rotation: number
    }
  ): void
}
