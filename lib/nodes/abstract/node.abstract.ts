import { TFunction } from "../../types"
import {
  IHandleAttributes,
  IHandleFunctions,
  IHandleMetaKey,
  TAttribute,
  TAttributeTuple,
  TFunctionTuple,
  TMetaKey,
  TMetaKeyTuple
} from "../nodes.types"
import {
  MethodSetAttributes,
  MethodSetFunctions,
  MethodSetIndex,
  MethodSetMetaKeys,
  MethodSetParent,
  MethodSetUUID,
  PropAttributes,
  PropFunctions,
  PropMetaKeys
} from "../symbols"
import EventObserver from "../../utils/observer"
import {
  MethodDispatchEvent,
  MethodDispatchScript,
  MethodExport,
  MethodStaticSetApp
} from "../../symbols"
import { AtomicEngine } from "../../atomic-engine"
import { AtomicGame } from "@/atomic-game"

export abstract class AbstractNode
  implements IHandleFunctions, IHandleAttributes, IHandleMetaKey
{
  [key: string]: any

  protected static $app: AtomicEngine | AtomicGame

  protected abstract _initial: any
  protected abstract _events: EventObserver
  protected abstract _parent: any
  protected abstract _uuid: string
  protected abstract _index: number

  abstract readonly hierarchy: "children" | "not-children"
  abstract readonly type: string

  abstract script: string | URL | null;

  abstract [PropFunctions]: Map<string, TFunction>;
  abstract [PropAttributes]: Map<string, TAttribute>;
  abstract [PropMetaKeys]: Map<string, TMetaKey>

  abstract get parent(): any
  abstract get uuid(): string
  abstract get index(): number
  abstract get deep(): string

  abstract getFunctions(): TFunction[]

  abstract getFunction(name: string): TFunction | undefined

  abstract addFunction(name: string, func: TFunction): void

  abstract hasFunction(name: string): boolean

  abstract deleteFunction(name: string): boolean

  abstract executeFunction(name: string, ...args: any[]): void

  abstract clearFunctions(): void

  abstract getAttributes(): TAttribute[]

  abstract getAttribute(name: string): TAttribute | undefined

  abstract addAttribute(name: string, options: TAttribute): void

  abstract hasAttribute(name: string): boolean

  abstract deleteAttribute(name: string): boolean

  abstract clearAttributes(): void

  abstract getMetaKeys(): TMetaKey[]

  abstract getMetaKey(name: string): TMetaKey | undefined

  abstract addMetaKey(name: string, options: TMetaKey): void

  abstract hasMetaKey(name: string): boolean

  abstract deleteMetaKey(name: string): boolean

  abstract clearMetaKeys(): void

  abstract emit(event: any, callback: TFunction): void

  abstract reset(): void

  abstract toObject(): any

  abstract set(properties: any): void
  abstract set(property: any, value: any): void

  abstract export(format: "JSON" | "YAML"): string

  static import(data: string, format: "JSON" | "YAML" = "JSON"): any {
    data
    format
    throw new Error("Method not implemented! Use derived class")
  }

  protected getApp() {
    return AbstractNode.$app
  }

  abstract [MethodSetParent](node: any): void

  abstract [MethodSetUUID](uuid: string): void

  abstract [MethodSetIndex](index: number): void

  abstract [MethodSetFunctions](functions: TFunctionTuple[]): void

  abstract [MethodSetAttributes](attributes: TAttributeTuple[]): void

  abstract [MethodSetMetaKeys](metaKeys: TMetaKeyTuple[]): void

  abstract [MethodDispatchEvent](event: any, ...args: any[]): void

  abstract [MethodDispatchScript](): void

  abstract [MethodExport](): any
  abstract [MethodExport](children: boolean): any

  static [MethodStaticSetApp](app: AtomicEngine | AtomicGame): void {
    AbstractNode.$app = app
  }
}
