export type TAttributes = {
  value: any
  type: "string" | "int" | "float" | "boolean"
  input: "text" | "number" | "slider" | "checkbox" | "radio" | "file" | "color"
  options: {}
}

export type TCursorOptions =
  | "default"
  | "pointer"
  | "not-allow"
  | "move"
  | "grabbing"
  | "grab"

export type TTypeOrigin =
  | "center"
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center-center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
export type TTypeOriginX = "center" | "left" | "right"
export type TTypeOriginY = "center" | "top" | "bottom"
export type TTypeGlobalFont =
  | "inherit"
  | "initial"
  | "revert"
  | "revert-layer"
  | "unset"

export type TOptionsBasic = {
  [key: string]: any
  translateX: number
  translateY: number
}

export interface IOptionsGlobalNode {
  cursor: TCursorOptions
  name: string
}

export interface IOptionsBasicNode extends IOptionsGlobalNode {
  x: number
  y: number
  visible: boolean
  selectable: boolean
  lock: boolean
}

export interface IOptionsNode2D extends IOptionsBasicNode {
  width: number
  height: number
  centerScale: boolean
  centerRotation: boolean
  flipX: boolean
  flipY: boolean
  origin: TTypeOrigin
  originX: TTypeOriginX
  originY: TTypeOriginY
  scale: number
  scaleX: number
  scaleY: number
  skew: number
  skewX: number
  skewY: number
  rotation: number
}

export interface IOptionsEmptyNode extends IOptionsBasicNode {}

export interface IOptionsNodeRectangle extends IOptionsNode2D {
  background: string
  border: boolean
  borderColor: string
  borderWidth: number
  radius:
    | number
    | [number, number]
    | {
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
  startY: number
  type: "rectangle" | "circle" | "triangle" | "polygon"
}

export interface IOptionsNodeControlEdition extends IOptionsNode2D {
  padding: number
  // | [number, number] | [number, number, number, number]
  border: boolean
  borderWidth: number
  borderColor: string
  cornerSize: number
  cornerColor: string
  cornerBorder: boolean
  cornerColorBorder: string
  showCorner:
    | {
        "top-left": boolean
        "top-center": boolean
        "top-right": boolean
        "middle-left": boolean
        "middle-center": boolean
        "middle-right": boolean
        "bottom-left": boolean
        "bottom-center": boolean
        "bottom-right": boolean
      }
    | boolean
}

export type TSize = "px" | "em" | "pc" | "cm" | "rem" | "%"

export interface IOptionsNodeLineFlowEffect extends IOptionsEmptyNode {
  cellSize: number
  lineWidth: number
  spacing: number
  color: string
  radius: number
}

export interface IOptionsNodeText extends IOptionsNode2D {
  text: string
  fontSize: `${string}${TSize}`
  fontFamily: string
  fontStretch:
    | "normal"
    | "ultra-condensed"
    | "extra-condensed"
    | "condensed"
    | "semi-condensed"
    | "semi-expanded"
    | "expanded"
    | "extra-expanded"
    | "ultra-expanded"
    | TTypeGlobalFont
    | `${string}%`
  fontStyle:
    | "normal"
    | "italic"
    | "oblique"
    | `oblique ${string}deg`
    | TTypeGlobalFont
  fontWeight:
    | "normal"
    | "bold"
    | "lighter"
    | "bolder"
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | 1000
    | number
    | TTypeGlobalFont
  fontVariant: string
  lineHeight: `${string}${TSize}` | "normal" | TTypeGlobalFont
  textAlign: "start" | "end" | "left" | "right" | "center"
  textBaseline:
    | "top"
    | "hanging"
    | "middle"
    | "alphabetic"
    | "ideographic"
    | "bottom"
  textDirection: "ltr" | "rtl" | "inherit"
  wordSpacing: `${string}${TSize}`
  letterSpacing: `${string}${TSize}`
  border: boolean
  borderColor: string
  borderWidth: number
  color: string
}

export interface IOptionsScene2D extends IOptionsGlobalNode {}
