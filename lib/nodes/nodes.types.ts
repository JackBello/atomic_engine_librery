import { TFunction } from "../types"
import {
  MethodSetAttributes,
  MethodSetFunctions,
  MethodSetMetaKeys,
  MethodSetNodes,
  PropAttributes,
  PropFunctions,
  PropMetaKeys,
  PropNodes
} from "./symbols"

export type TTypeNode2D =
  | "Node2D"
  | "Scene2D"
  | "Rectangle2D"
  | "Text2D"
  | "LineFlowEffect2D"
  | "Selection2D"
  | "ControlEdition2D"

export type TTypeNode3D = "Cube3D" | "Sphere3D"

export type TTypeNode = "GlobalNode" | TTypeNode2D | TTypeNode3D

export type TSize = "px" | "em" | "pc" | "cm" | "rem" | "pt" | "inch" | "%"

export type TCursorOptions =
  | "default"
  | "pointer"
  | "not-allow"
  | "move"
  | "grabbing"
  | "grab"

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

export type TOptionalNodes<T> = T extends "children" ? { nodes: any[] } : {}

export type TExportNode<O> = {
  uuid: string
  functions: TFunctionTuple[]
  attributes: TAttributeTuple[]
  metaKeys: TMetaKeyTuple[]
  type: TTypeNode | TTypeNode2D | TTypeNode3D
  hierarchy: "children" | "not-children"
  script: string | URL | null
  deep: string
  index: number
  options: O
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

export interface IControlEditor {
  name: string
  title: string
  description: string
}

export interface IControlEdition {
  visible: boolean
  selectable: boolean
  lock: boolean
  cursor: TCursorOptions
}

export interface IHandleDraw {
  process(): void
  process(animation?: {
    timestamp: number
    deltaTime: number
    frame: number
  }): void
}

export interface IHandleFunctions {
  [PropFunctions]: Map<string, TFunction>

  getFunctions(): TFunction[]
  getFunction(name: string): TFunction | undefined
  addFunction(name: string, func: TFunction): void
  hasFunction(name: string): boolean
  deleteFunction(name: string): boolean
  executeFunction(name: string, ...args: any[]): void
  clearFunctions(): void

  [MethodSetFunctions](functions: TFunctionTuple[]): void
}

export interface IHandleAttributes {
  [PropAttributes]: Map<string, TAttribute>

  getAttributes(): TAttribute[]
  getAttribute(name: string): TAttribute | undefined
  addAttribute(name: string, options: TAttribute): void
  hasAttribute(name: string): boolean
  deleteAttribute(name: string): boolean
  clearAttributes(): void

  [MethodSetAttributes](attributes: TAttributeTuple[]): void
}

export interface IHandleMetaKey {
  [PropMetaKeys]: Map<string, TMetaKey>

  getMetaKeys(): TMetaKey[]
  getMetaKey(name: string): TMetaKey | undefined
  addMetaKey(name: string, options: TMetaKey): void
  hasMetaKey(name: string): boolean
  deleteMetaKey(name: string): boolean
  clearMetaKeys(): void

  [MethodSetMetaKeys](metaKeys: TMetaKeyTuple[]): void
}

export interface IHandleNodes {
  [PropNodes]: any[]

  get nodes(): any[]
  get firstNode(): any | undefined
  get lastNode(): any | undefined
  get nextSiblingNode(): any | undefined
  get previousSiblingNode(): any | undefined

  cloneNode(): any
  getNode(uuid: string): any | undefined
  addNode(...nodes: any[]): void
  hasNode(uuid: string): boolean
  deleteNode(uuid: string): boolean
  clearNodes(): void
  replaceNode(uuid: string, node: any): void
  replaceNodeByIndex(index: number, node: any): void
  searchNode(uuid: string): any | undefined
  searchNodeByIndex(index: number): any | undefined
  moveNode(uuid: string, index: number): void
  moveNodeByIndex(from: number, to: number): void

  [MethodSetNodes](nodes: any[]): void
}
