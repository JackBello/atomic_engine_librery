import { IControlEdition, IControlEditor } from "./global/node.types"
import {
  IBorder2D,
  ICollisionShape2D,
  IControlEdition2D,
  ICoords2D,
  ILineFlowEffect2D,
  INode2D,
  IOpacity,
  IRectangle2D,
  ISelection2D,
  ISize2D,
  IText2D
} from "./class/nodes-2D.types"

export type TCanvasActions =
  | "canvas:clear"
  | "canvas:translate"
  | "canvas:scale"
  | "canvas:rotation"

export type TCanvasActionsContext2D = "canvas:save" | "canvas:restore"

export type TCanvasNodePrimitive = "global/node" | "global/scene"

export type TCanvasNode2D =
  | "2D/node"
  | "2D/handler/collision"
  | "2D/handler/collision-shape"
  | "2D/rectangle"
  | "2D/text"
  | "2D/selection"
  | "2D/line-flow-effect"
  | "2D/control-edition"

export type TCanvasNode3D = "3D/cube"

export type TCanvasNodes = TCanvasNodePrimitive | TCanvasNode3D | TCanvasNode2D

export type TCanvasNodeOptions = {
  "canvas:save": undefined
  "canvas:restore": undefined

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
  "canvas:rotation": number

  "global/node": IControlEditor

  "global/scene": IControlEditor

  "2D/node": IControlEditor &
    IControlEdition &
    IOpacity &
    ICoords2D &
    ISize2D &
    INode2D

  "2D/handler/collision": IControlEditor &
    IControlEdition &
    IOpacity &
    ICoords2D &
    ISize2D &
    INode2D

  "2D/handler/collision-shape": IControlEditor &
    IControlEdition &
    IOpacity &
    ICoords2D &
    ISize2D &
    INode2D &
    ICollisionShape2D

  "2D/rectangle": IControlEditor &
    IControlEdition &
    IOpacity &
    ICoords2D &
    ISize2D &
    INode2D &
    IRectangle2D &
    IBorder2D

  "2D/text": IControlEditor &
    IControlEdition &
    IOpacity &
    ICoords2D &
    ISize2D &
    INode2D &
    IBorder2D &
    IText2D

  "2D/line-flow-effect": IControlEditor &
    IControlEdition &
    IOpacity &
    ICoords2D &
    ISize2D &
    INode2D &
    ILineFlowEffect2D

  "2D/selection": IControlEditor &
    IControlEdition &
    IOpacity &
    ICoords2D &
    ISize2D &
    INode2D &
    ISelection2D &
    IRectangle2D &
    IBorder2D

  "2D/control-edition": IControlEditor &
    IControlEdition &
    IOpacity &
    ICoords2D &
    ISize2D &
    INode2D &
    IControlEdition2D &
    IRectangle2D &
    IBorder2D
}
