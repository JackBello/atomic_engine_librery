import {
  IOptionsNodeControlEdition,
  IOptionsNodeRectangle,
  IOptionsNodeText,
  TOptionsBasic
} from "./basic/nodes/types"

export type ValueOf<T> = T[keyof T]

export type TFunction = (...args: any[]) => void | Promise<void>

export type TDimension = "2D" | "3D"

export type TContextObject = {
  "2d": CanvasRenderingContext2D
  "web-gl": WebGLRenderingContext
  "web-gl2": WebGL2RenderingContext
}

export type TEventCanvas =
  | "canvas/selection:start"
  | "canvas/selection:end"
  | "canvas/selection:moving"
  | "canvas/mouse:down"
  | "canvas/mouse:up"
  | "canvas/mouse:move"
  | "canvas/mouse:leave"
  | "canvas/mouse:out"
  | "canvas/mouse:enter"
  | "canvas/mouse:over"
  | "canvas/key:down"
  | "canvas/key:up"
  | "canvas/key:press"
  | "canvas/wheel"
  | "canvas/drag"
  | "canvas/drag:start"
  | "canvas/drag:end"
  | "canvas/drag:leave"
  | "canvas/drag:enter"
  | "canvas/drag:over"
  | "canvas/drop"
  | "canvas/node:modified"
  | "canvas/node:moving"
  | "canvas/node:scaling"
  | "canvas/node:select"
  | "canvas/node:unselect"
  | "canvas/node:hover"
  | "canvas/node:destroy"

export type TEventScene =
  | "scene/render"
  | "scene/change"
  | "scene/reset"
  | "scene/update"

export type TEventAnimation =
  | "animation/play"
  | "animation/pause"
  | "animation/stop"

export type TEventNode =
  | "node:modified"
  | "node:moving"
  | "node:scaling"
  | "node:select"
  | "node:unselect"
  | "node:hover"
  | "node:destroy"
  | "canvas:draw"
  | "canvas:update"
  | "canvas:hidden"

export type TContextCanvasName = "2d" | "web-gl" | "web-gl2"

export type TContextCanvas = ValueOf<TContextObject>

export type TCanvasType =
  | "scene"
  | "editor"
  | "grid"
  | "ui"
  | "game"
  | "background"

export type TCanvasTypeEdition =
  | "scene"
  | "editor"
  | "grid"
  | "ui"
  | "background"

export interface IOptionsCanvas {
  width: number
  height: number
}

export type TTypeEditor = "editor:selection"
export type TTypeGrid = "grid:make"
export type TTypeCanvasActions =
  | "canvas:save"
  | "canvas:restore"
  | "canvas:clear"
  | "canvas:translate"
  | "canvas:scale"
export type TTypeDraws =
  | "draw:rectangle"
  | "draw:circle"
  | "draw:selection"
  | "draw:text"
  | "draw:control-edition"

export type TOptionsType = {
  [key: string]: any
  "draw:rectangle": IOptionsNodeRectangle & TOptionsBasic
  "draw:circle": TOptionsBasic & {
    radius: number
    background: string
  }
  "draw:text": IOptionsNodeText & TOptionsBasic
  "draw:control-edition": IOptionsNodeControlEdition & TOptionsBasic
  "canvas:translate": {
    x: number
    y: number
  }
  "canvas:scale": {
    scale: number
  }
}

export interface IOptionsCanvasController extends IOptionsCanvas {
  background: string
  context: TContextCanvasName
}

export interface IOptionsGame extends IOptionsCanvasController {
  full_size: boolean
  full_screen: boolean
  position_x: number
  position_y: number
  dimension: TDimension
}

export interface IOptionsAtomCoreGame extends IOptionsCanvasController {
  selector: string
  dimension: TDimension
}

export type TOptionsCanvasWorker = {
  canvas: TCanvasType
  action: TTypeDraws | TTypeCanvasActions | TTypeGrid | TTypeEditor
  options?: Partial<TOptionsType[TOptionsCanvasWorker["action"]]>
}
