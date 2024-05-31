import {
  IBorder2D,
  ICalculate,
  IControlEdition2D,
  ICoords2D,
  ILineFlowEffect2D,
  INode2D,
  IRectangle2D,
  ISelection2D,
  ISize2D,
  IText2D
} from "../nodes/nodes-2d.types"
import { IControlEdition, IControlEditor } from "../nodes/nodes.types"
import { TContextName, TDimension } from "../types"

export type TCanvasActions =
  | "canvas:clear"
  | "canvas:translate"
  | "canvas:scale"
  | "canvas:rotation"

export type TCanvasActionsContext2D = "canvas:save" | "canvas:restore"

export type TOptionalCanvasActionsContext2D<T> = T extends "2d"
  ? TCanvasActionsContext2D
  : "canvas:any"

export type TDrawsContext2D =
  | "draw:2D/rectangle"
  | "draw:2D/text"
  | "draw:2D/selection"
  | "draw:2D/line-flow-effect"
  | "draw:2D/control-edition"

export type TDrawsContext3D = "draw:3D/cube"

export type TOptionalDrawsContext<D> = D extends "2D"
  ? TDrawsContext2D
  : TDrawsContext3D

export type TOptionsDraw = {
  "canvas:any": boolean

  "canvas:save": boolean
  "canvas:restore": boolean

  "canvas:clear": {
    width?: number
    height?: number
  }

  "canvas:translate": {
    x: number
    y: number
  }
  "canvas:scale": {
    x: number
    y: number
  }
  "canvas:rotation": {
    value: number
  }

  "draw:2D/rectangle": IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    IRectangle2D &
    IBorder2D &
    ICalculate

  "draw:2D/text": IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    IBorder2D &
    IText2D &
    ICalculate

  "draw:2D/selection": IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    ISelection2D &
    IRectangle2D &
    IBorder2D &
    ICalculate

  "draw:2D/line-flow-effect": IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    ILineFlowEffect2D &
    ICalculate

  "draw:2D/control-edition": IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    IRectangle2D &
    IBorder2D &
    IControlEdition2D &
    ICalculate

  "draw:3D/cube": {
    x: number
    y: number
    z: number
  }
}

export type TOptionsRenderCanvasWorker = {
  dimension: TDimension
  context: TContextName
  action:
    | TOptionalDrawsContext<TOptionsRenderCanvasWorker["dimension"]>
    | TOptionalCanvasActionsContext2D<TOptionsRenderCanvasWorker["context"]>
    | TCanvasActions
  options?: TOptionsDraw[TOptionsRenderCanvasWorker["action"]]
}
