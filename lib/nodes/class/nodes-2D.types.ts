import {
  TSize,
  TTypeGlobalFont,
  TTypeOrigin,
  TTypeOriginX,
  TTypeOriginY
} from "../global/node.types"

export interface IOpacity {
  opacity: number
}

export interface IHandleCoords2D {
  center(): void
  centerX(): void
  centerY(): void
}

export interface IControlNode2D {
  setOrigin(origin: TTypeOrigin): void
  setScale(scale: number): void
  scaleToWidth(width: number): void
  scaleToHeight(height: number): void
  setSkew(skew: number): void
}

export interface ISize2D {
  width: number
  height: number
}

export interface ICoords2D {
  x: number
  y: number
}

export interface INode2D {
  rotationType: "radians" | "degrees"
  centerScale: boolean
  centerRotation: boolean
  flipX: boolean
  flipY: boolean
  originX: TTypeOriginX
  originY: TTypeOriginY
  scaleX: number
  scaleY: number
  skewX: number
  skewY: number
  rotation: number
}

export interface IBorder2D {
  border: boolean
  borderColor: string
  borderWidth: number
}

export interface IRectangle2D {
  background: string
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

export interface ISelection2D {
  endX: number
  endY: number
  startX: number
  startY: number
  shape: "rectangle" | "circle" | "triangle" | "polygon"
}

export interface ICollisionShape2D {
  shape: "rectangle" | "circle" | "triangle" | "polygon"
  color: string
}

export interface IControlEdition2D {
  padding: number | [number, number] | [number, number, number, number]
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

export interface ILineFlowEffect2D {
  cellSize: number
  lineWidth: number
  spacing: number
  color: string
  radius: number
}

export interface IText2D {
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
  color: string
}

export interface ICalculate {
  calculate: {
    translate: {
      x: number
      y: number
    }
    scaleFactor: {
      width: number
      height: number
    }
    middleScaleFactor: {
      width: number
      height: number
    }
    rotation: number
    scale: {
      x: number
      y: number
    }
  }
}
