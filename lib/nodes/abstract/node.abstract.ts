import { TFunction } from "../../types"
import {
  IHandleAttribute,
  IHandleComponent,
  IHandleFunction,
  IHandleMetaKey,
  IHandleNode,
  TAttribute,
  TAttributeTuple,
  TComponent,
  TComponentTuple,
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
  PropType,
  PropAttributes,
  PropFunctions,
  PropMetaKeys,
  PropNodes,
  MethodSetNodes,
  PropComponents,
  MethodSetComponents
} from "../symbols"
import EventObserver from "../../app/utils/observer"
import {
  MethodDispatchEvent,
  MethodDispatchScript,
  MethodExport,
  MethodExportWorker,
  MethodStaticSetApp
} from "../../symbols"
import { TAllDrawsContext } from "@/workers/types"
import { AtomicEngine } from "@/atomic-engine"
import { AtomicGame } from "@/atomic-game"

export abstract class AbstractNode
  implements
    IHandleNode,
    IHandleFunction,
    IHandleAttribute,
    IHandleMetaKey,
    IHandleComponent
{
  [key: string]: any

  protected static $app: AtomicEngine | AtomicGame

  protected abstract _omit: string[]
  protected abstract _options: any
  protected abstract _initial: any
  protected abstract _events: EventObserver
  protected abstract _parent: any
  protected abstract _uuid: string
  protected abstract _index: number;

  abstract [PropType]: TAllDrawsContext

  abstract readonly NODE_NAME: string

  abstract script: string | URL | null;

  abstract [PropNodes]: any[];
  abstract [PropFunctions]: Map<string, TFunction>;
  abstract [PropAttributes]: Map<string, TAttribute>;
  abstract [PropMetaKeys]: Map<string, TMetaKey>;
  abstract [PropComponents]: Map<string, TComponent>

  abstract get nodes(): any | null
  abstract get parentNode(): any | null
  abstract get firstNode(): any | null
  abstract get lastNode(): any | null
  abstract get nextSiblingNode(): any | null
  abstract get previousSiblingNode(): any | null
  abstract get nextSiblingsNode(): any[] | null
  abstract get previousSiblingsNode(): any[] | null

  abstract get uuid(): string
  abstract get index(): number
  abstract get deep(): string

  abstract cloneNode(): any

  abstract getNode(uuid: string): any | undefined

  abstract addNode(...nodes: any[]): void

  abstract hasNode(uuid: string): boolean

  abstract deleteNode(uuid: string): boolean

  abstract clearNodes(): void

  abstract replaceNode(uuid: string, node: any): void

  abstract searchNode(uuid: string): any | undefined

  abstract moveNode(uuid: string, to: number): void

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

  abstract getComponents(): TComponent[]

  abstract getComponent(name: string): TComponent | undefined

  abstract addComponent(name: string, component: TComponent): void

  abstract hasComponent(name: string): boolean

  abstract deleteComponent(name: string): boolean

  abstract clearComponents(): void

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

  abstract [MethodSetNodes](nodes: any[]): void

  abstract [MethodSetFunctions](functions: TFunctionTuple[]): void

  abstract [MethodSetAttributes](attributes: TAttributeTuple[]): void

  abstract [MethodSetMetaKeys](metaKeys: TMetaKeyTuple[]): void

  abstract [MethodSetComponents](components: TComponentTuple[]): void

  abstract [MethodDispatchEvent](event: any, ...args: any[]): void

  abstract [MethodDispatchScript](): void

  abstract [MethodExport](): any
  abstract [MethodExport](children: boolean): any

  abstract [MethodExportWorker](): any
  abstract [MethodExportWorker](childNode: boolean): any

  static [MethodStaticSetApp](app: AtomicEngine | AtomicGame): void {
    AbstractNode.$app = app
  }
}
