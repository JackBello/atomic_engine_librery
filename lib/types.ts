import { ISize2D } from "./nodes/class/nodes-2D.types"

export type TClass<C> = new (...args: any[]) => C

export type ValueOf<T> = T[keyof T]

export type KeyOf<T> = keyof Partial<T>

export type TFunction = (...args: any[]) => void | Promise<void>

export type TDimension = "2D" | "3D"

export type TContextObject = {
  "2d": CanvasRenderingContext2D
  "web-gl": WebGLRenderingContext
  "web-gl2": WebGL2RenderingContext
  "web-gpu": GPUCanvasContext
}

export type TContextName = "2d" | "web-gl" | "web-gl2" | "web-gpu"

export type TContext = ValueOf<TContextObject>

export interface IOptionsFramePerSecond {
  delay: number
  velocity: number
}

export type TPropsAtomic =
  | "scenes"
  | "$plugins"
  | "$configs"
  | "$providers"
  | "$controls"
  | "$nodes"
  | "$global"

export type TMode = "game" | "editor"

export interface IOptionsExport {
  format: "JSON" | "YAML"
  include?: TPropsAtomic[]
  exclude?: TPropsAtomic[]
}

export interface IOptionsGame {
  background: string
  full_size?: boolean
  full_screen?: boolean
  x: number
  y: number
  center?: boolean
  title?: string
  icon?: string | URL | null
  resizable?: boolean
  viewport: ISize2D
}
export interface IOptionsAtomicEngine extends ISize2D {
  background: string
  context: TContextName
  selector: string
  dimension: TDimension
  game: IOptionsGame
  fps: IOptionsFramePerSecond
  export: IOptionsExport
  nodes: {
    typeID: "uuid" | "uid"
  }
}

export interface IOptionsAtomicGame extends IOptionsGame {
  context: TContextName
  selector: string
  fps: IOptionsFramePerSecond
  dimension: TDimension
  nodes: {
    typeID: "uuid" | "uid"
  }
}
