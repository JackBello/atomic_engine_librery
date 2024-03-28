export type TCursorOptions = "default" | "pointer" | "not-allow" | "move"

export type TTypeOrigin = "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-center" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right"
export type TTypeOriginX = "center" | "left" | "right"
export type TTypeOriginY = "center" | "top" | "bottom"

export type TOptionsBasic = {
  [key: string]: any
  translateX: number
  translateY: number
}

export interface IOptionsNode {
  width: number
  height: number
  x: number
  y: number
  cursor: TCursorOptions
  deep: string
  visible: boolean
  name: string
}

export interface IOptionsNode2D extends IOptionsNode {
  origin: TTypeOrigin
  originX: TTypeOriginX
  originY: TTypeOriginY
  translateOrigin: TTypeOrigin
  translateOriginX: TTypeOriginX
  translateOriginY: TTypeOriginY
  scaleOrigin: TTypeOrigin
  scaleOriginX: TTypeOriginX
  scaleOriginY: TTypeOriginY
  angleOrigin: TTypeOrigin
  angleOriginX: TTypeOriginX
  angleOriginY: TTypeOriginY
  scale: number
  scaleX: number
  scaleY: number
  skew: number
  skewX: number
  skewY: number
  rotation: number
}

export interface IOptionsEmptyNode extends IOptionsNode {

}

export interface IOptionsNodeRectangle extends IOptionsNode2D {
  background: string
  border: boolean
  borderColor: string
  borderWidth: number
  radius: number | [number, number] | {
    topLeft: number
    topRight: number
    bottomLeft: number
    bottomRight: number
  }
}

export interface IOptionsNodeSelection extends IOptionsNodeRectangle {
  endX: number
  endY: number
  startX: number
  startY: number,
  type: "rectangle" | "circle" | "triangle" | "polygon"
}

export interface IOptionsScene2D extends IOptionsNode2D {

}