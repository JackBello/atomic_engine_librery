import { TFunction } from "../../types"
import {
  MethodSetAttributes,
  MethodSetComponents,
  MethodSetFunctions,
  MethodSetMetaKeys,
  MethodSetNodes,
  PropAttributes,
  PropComponents,
  PropFunctions,
  PropMetaKeys,
  PropNodes
} from "../symbols"
import { TCanvasNodes } from "../types"
import { GlobalNode } from "./global-node"
import { HandlerAttribute } from "./handlers/attributes"
import { HandlerComponent } from "./handlers/components"
import { HandlerFunction } from "./handlers/functions"
import { HandlerMetaKey } from "./handlers/meta-keys"
import { HandlerNode } from "./handlers/nodes"

export type TTypeNodeGlobal = "Scene" | "GlobalNode"

export type TTypeNode2D =
  | "Node2D"
  | "Rectangle2D"
  | "Text2D"
  | "LineFlowEffect2D"
  | "Selection2D"
  | "ControlEdition2D"
  | "Collision2D"
  | "CollisionShape2D"

export type TTypeNode3D = "Cube3D" | "Sphere3D"

export type TTypeNodes = TTypeNodeGlobal | TTypeNode2D | TTypeNode3D

export type TSize = "px" | "em" | "pc" | "cm" | "rem" | "pt" | "inch" | "%"

export type TCursorOptions =
  | "auto"
  | "default"
  | "pointer"
  | "grabbing"
  | "grab"
  | "progress"
  | "help"
  | "wait"
  | "cell"
  | "crosshair"
  | "text"
  | "vertical-text"
  | "alias"
  | "copy"
  | "move"
  | "no-drop"
  | "not-allowed"
  | "all-scroll"
  | "col-resize"
  | "e-resize"
  | "ew-resize"
  | "n-resize"
  | "ne-resize"
  | "nesw-resize"
  | "ns-resize"
  | "nw-resize"
  | "nwse-resize"
  | "row-resize"
  | "s-resize"
  | "se-resize"
  | "sw-resize"
  | "w-resize"
  | "none"

export type TTypeGlobalFont =
  | "inherit"
  | "initial"
  | "revert"
  | "revert-layer"
  | "unset"

export type TTypeOriginX = "center" | "left" | "right"
export type TTypeOriginY = "center" | "top" | "bottom"
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

export type TFunctionTuple = [string, TFunction]

export type TAttributeTuple = [string, TAttribute]

export type TMetaKeyTuple = [string, TMetaKey]

export type TComponentTuple = [string, TComponent]

export type TExportNode<O> = {
  id: string
  slug: string
  attributes: TAttributeTuple[]
  metaKeys: TMetaKeyTuple[]
  type: TTypeNodes | TTypeNode2D | TTypeNode3D
  script: string | URL | null
  nodes: TExportNode<any>[]
  path: string
  index: number
  options: O
}

export type TComponent = {
  name: string
  description: string
  script: string | URL | null
  options: Record<string, any>
}

export type TMetaKey = {
  value: any
  type: "string" | "int" | "float" | "boolean"
}

export type TAttribute = {
  value: any
  group: string
  type: "string" | "int" | "float" | "boolean"
  input: "text" | "number" | "slider" | "checkbox" | "radio" | "file" | "color"
  options: {}
}

export type TMode = "id" | "index" | "slug"

export interface INodeRootWorker {
  __type__: TCanvasNodes
  __path__: string
  location: {
    id: string
    index: number
    slug: string
  }
  options?: Record<string, any>
  nodes: INodeWorker[]
}

export interface INodeWorker extends INodeRootWorker {
  __root__: INodeRootWorker
  parent?: INodeWorker | INodeRootWorker
}

export interface IGlobalNode {
  get index(): number
  get path(): string
  get id(): string

  get slug(): string
  set slug(slug: string)
}

export interface IControlEditor {
  title: string
  description: string
}

export interface IControlEdition {
  visible: boolean
  selectable: boolean
  lock: boolean
  cursor: TCursorOptions
}

export interface IControlNode {
  readonly $attributes: HandlerAttribute
  readonly $components: HandlerComponent
  readonly $functions: HandlerFunction
  readonly $metaKeys: HandlerMetaKey
  readonly $nodes: HandlerNode
}

export interface IControlHierarchy {
  get parent(): GlobalNode | undefined
  get first(): GlobalNode | undefined
  get last(): GlobalNode | undefined
  get nextSibling(): GlobalNode | undefined
  get previousSibling(): GlobalNode | undefined
}

export interface IHandleNode {
  [PropNodes]: GlobalNode[]

  get all(): GlobalNode[]
  get size(): number

  get(index: number): GlobalNode | undefined
  add(...nodes: GlobalNode[]): void
  has(index: number): boolean
  delete(index: number): boolean
  clear(): boolean
  replace(index: number, node: GlobalNode): boolean
  search(slug: string): GlobalNode | undefined
  move(from: number, to: number): boolean
  traverse(callback: (node: GlobalNode) => void): void

  path(
    path: string,
    mode: TMode
  ): {
    get(index: number): GlobalNode | undefined
    add(...nodes: GlobalNode[]): void
    has(index: number): boolean
    delete(index: number): boolean
    clear(): boolean
    replace(index: number, node: GlobalNode): boolean
    search(slug: string): GlobalNode | undefined
    move(from: number, to: number): boolean
    traverse(callback: (node: GlobalNode) => void): void
  }

  [MethodSetNodes](nodes: GlobalNode[]): void
}

export interface IHandleFunction {
  [PropFunctions]: Map<string, TFunction>

  toEntries(): TFunctionTuple[]
  gelAll(): TFunction[]
  get(name: string): TFunction | undefined
  add(name: string, func: TFunction): void
  has(name: string): boolean
  delete(name: string): boolean
  execute(name: string, ...args: any[]): void
  clear(): void

  [MethodSetFunctions](functions: TFunctionTuple[]): void
}

export interface IHandleAttribute {
  [PropAttributes]: Map<string, TAttribute>

  toEntries(): TAttributeTuple[]
  getAll(): TAttribute[]
  get(name: string): TAttribute | undefined
  add(name: string, options: TAttribute): void
  has(name: string): boolean
  delete(name: string): boolean
  clear(): void

  [MethodSetAttributes](attributes: TAttributeTuple[]): void
}

export interface IHandleMetaKey {
  [PropMetaKeys]: Map<string, TMetaKey>

  toEntries(): TMetaKeyTuple[]
  getAll(): TMetaKey[]
  get(name: string): TMetaKey | undefined
  add(name: string, options: TMetaKey): void
  has(name: string): boolean
  delete(name: string): boolean
  clear(): void

  [MethodSetMetaKeys](metaKeys: TMetaKeyTuple[]): void
}

export interface IHandleComponent {
  [PropComponents]: Map<string, TComponent>

  toEntries(): TComponentTuple[]
  getAll(): TComponent[]
  get(name: string): TComponent | undefined
  add(name: string, component: TComponent): void
  has(name: string): boolean
  delete(name: string): boolean
  clear(): void

  [MethodSetComponents](attributes: TComponentTuple[]): void
}
