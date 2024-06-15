import {
  IBorder2D,
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

export type TCanvasActions =
  | "canvas:clear"
  | "canvas:translate"
  | "canvas:scale"
  | "canvas:rotation"

export type TCanvasActionsContext2D = "canvas:save" | "canvas:restore"

export type TPrimitiveContext =
  | "primitive:node"
  | "primitive:2D/scene"
  | "primitive:2D/node"

export type TDrawsContext2D =
  | "draw:2D/rectangle"
  | "draw:2D/text"
  | "draw:2D/selection"
  | "draw:2D/line-flow-effect"
  | "draw:2D/control-edition"

export type TDrawsContext3D = "draw:3D/cube"

export type TAllDrawsContext =
  | TPrimitiveContext
  | TDrawsContext3D
  | TDrawsContext2D

export type TTypeNodeOptions = {
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

  "primitive:node": IControlEditor

  "primitive:2D/scene": IControlEditor

  "primitive:2D/node": IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D

  "draw:2D/rectangle": IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    IRectangle2D &
    IBorder2D

  "draw:2D/text": IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    IBorder2D &
    IText2D

  "draw:2D/line-flow-effect": IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    ILineFlowEffect2D

  "draw:2D/selection": IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    ISelection2D &
    IRectangle2D &
    IBorder2D

  "draw:2D/control-edition": IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    IControlEdition2D &
    IRectangle2D &
    IBorder2D

  "draw:3D/cube": {
    x: number
    y: number
    z: number
  }
}
