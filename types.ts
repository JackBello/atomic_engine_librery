import { IOptionsNodeRectangle, TOptionsBasic } from "./basic/nodes/types";

type ValueOf<T> = T[keyof T];

export type TDimension = "2D" | "3D"

export type TContextObject = {
  "2d": CanvasRenderingContext2D
  "web-gl": WebGLRenderingContext
  "web-gl2": WebGL2RenderingContext
}

export type TEventCanvas = "canvas/selection:start" | "canvas/selection:end" | "canvas/selection:moving" | "canvas/node:modified" | "canvas/node:moving" | "canvas/node:scaling" | "canvas/node:select" | "canvas/node:unselect"

export type TEventNode = "node:moving" | "node:modified" | "node:select" | "node:unselect" | "node:destroy" | "canvas:draw" | "canvas:update" | "canvas:hidden"

export type TContextCanvasName = "2d" | "web-gl" | "web-gl2"

export type TContextCanvas = ValueOf<TContextObject>

export type TCanvasType = "scene" | "editor" | "grid" | "ui" | "game" | "background"

export type TCanvasTypeEdition = "scene" | "editor" | "grid" | "ui" | "background"

export interface IOptionsCanvas {
  width: number,
  height: number,
  background: string,
}

export type TTypeEditor = "editor:selection"
export type TTypeGrid = "grid:make"
export type TTypeCanvasActions = "canvas:save" | "canvas:restore" | "canvas:clear" | "canvas:translate"
export type TTypeDraws = "draw:rectangle" | "draw:circle" | "draw:selection"

export type TOptionsType = {
  [key: string]: any
  "draw:rectangle": IOptionsNodeRectangle & TOptionsBasic,
  "draw:circle": TOptionsBasic & {
    radius: number
    background: string
  }
  "canvas:translate": {
    x: number
    y: number
  }
}

export interface IOptionsCanvasController extends IOptionsCanvas {
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
  action: TTypeDraws | TTypeCanvasActions | TTypeGrid | TTypeEditor,
  options?: Partial<TOptionsType[TOptionsCanvasWorker['action']]>
}
