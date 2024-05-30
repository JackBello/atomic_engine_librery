import * as YAML from "yaml"
import { AbstractNode } from "../abstract/node.abstract"
import {
  TOptionalNodes,
  TAttribute,
  TAttributeTuple,
  TExportNode,
  TFunctionTuple,
  TMetaKey,
  TMetaKeyTuple,
  IControlEditor,
  TTypeNode
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
import { makerNodes2D } from "../maker-2d"
import { TFunction } from "../../types"
import EventObserver from "../../utils/observer"
import { v4 } from "@lukeed/uuid"
import { handleScript } from "../../utils/script"
import { DEFAULT_CONFIG_GLOBAL_NODE } from "../../configs/nodes/@global/node"
import { TEventGlobalNode } from "../event.type"
import { MethodDispatchEvent, MethodExport } from "../../symbols"

export class GlobalNodeNC extends AbstractNode implements IControlEditor {
  protected _initial: IControlEditor
  protected _events: EventObserver
  protected _parent: GlobalNodeNC | null
  protected _uuid: string
  protected _index: number

  readonly hierarchy: "children" | "not-children" = "not-children"
  readonly type: TTypeNode = "GlobalNode"

  script: string | URL | null
  name: string
  title: string
  description: string;

  [PropFunctions]: Map<string, TFunction>;
  [PropAttributes]: Map<string, TAttribute>;
  [PropMetaKeys]: Map<string, TMetaKey>

  get parent(): GlobalNodeNC | null {
    return this._parent
  }

  get uuid(): string {
    return this._uuid
  }

  get index(): number {
    return this._index
  }

  get deep(): string {
    if (this.parent) return this.parent.index + "_" + this.index
    else return this.index.toString()
  }

  constructor(options?: Partial<IControlEditor>) {
    super()

    this._initial = { ...DEFAULT_CONFIG_GLOBAL_NODE, ...options }
    this._events = new EventObserver()
    this._parent = null
    this._uuid = v4()
    this._index = 0

    this.script = null
    this.name = this._initial.name
    this.title = this._initial.title
    this.description = this._initial.description

    this[PropFunctions] = new Map()
    this[PropAttributes] = new Map()
    this[PropMetaKeys] = new Map()
  }

  getFunctions(): TFunction[] {
    return [...this[PropFunctions].values()]
  }

  getFunction(name: string): TFunction | undefined {
    return this[PropFunctions].get(name)
  }

  addFunction(name: string, func: TFunction): void {
    this[PropFunctions].set(name, func)
  }

  hasFunction(name: string): boolean {
    return this[PropFunctions].has(name)
  }

  deleteFunction(name: string): boolean {
    return this[PropFunctions].delete(name)
  }

  executeFunction(name: string, ...args: any[]): void {
    const func = this.getFunction(name)

    if (!func) throw new Error("function not found")

    func(args)
  }

  clearFunctions(): void {
    this[PropFunctions].clear()
  }

  getAttributes(): TAttribute[] {
    return [...this[PropAttributes].values()]
  }

  getAttribute(name: string): TAttribute | undefined {
    return this[PropAttributes].get(name)
  }

  addAttribute(name: string, options: TAttribute): void {
    this[PropAttributes].set(name, options)
  }

  hasAttribute(name: string): boolean {
    return this[PropAttributes].has(name)
  }

  deleteAttribute(name: string): boolean {
    return this[PropAttributes].delete(name)
  }

  clearAttributes(): void {
    this[PropAttributes].clear()
  }

  getMetaKeys(): TMetaKey[] {
    return [...this[PropMetaKeys].values()]
  }

  getMetaKey(name: string): TMetaKey | undefined {
    return this[PropMetaKeys].get(name)
  }

  addMetaKey(name: string, options: TMetaKey): void {
    this[PropMetaKeys].set(name, options)
  }

  hasMetaKey(name: string): boolean {
    return this[PropMetaKeys].has(name)
  }

  deleteMetaKey(name: string): boolean {
    return this[PropMetaKeys].delete(name)
  }

  clearMetaKeys(): void {
    this[PropMetaKeys].clear()
  }

  async runScript(): Promise<void> {
    if (!this.$_script) return

    const response = await handleScript(this.$_script as string, this)

    const functions: [string, TFunction][] = Object.entries(response.$functions)

    this.$_functions = new Map(functions)
  }

  emit(event: TEventGlobalNode, callback: TFunction): void {
    return this._events.addEventListener(event, callback)
  }

  reset(property?: keyof IControlEditor): void {
    if (property) {
      this[property as string] = this._initial[property]
    } else {
      for (const key of Object.keys(this._initial)) {
        this[key] = this._initial[key as keyof IControlEditor]
      }
    }
  }

  toObject(): IControlEditor {
    return {
      ...this
    }
  }

  set(property: keyof IControlEditor, value: any): void
  set(properties: IControlEditor): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this[property] = value
    } else if (typeof properties !== "string") {
      for (const [key, value] of Object.entries(this._initial)) {
        this[key] = value
      }
    }
  }

  export(format: "JSON" | "YAML" = "JSON"): string {
    return format === "YAML"
      ? YAML.stringify(this[MethodExport]())
      : JSON.stringify(this[MethodExport]())
  }

  static import(data: string, format: "JSON" | "YAML" = "JSON") {
    const structure: TExportNode<IControlEditor> =
      format === "YAML" ? YAML.parse(data) : JSON.parse(data)

    return makerNodes2D([structure])[0] as GlobalNodeNC
  }

  [MethodSetParent](node: GlobalNodeNC | null): void {
    this._parent = node
  }

  [MethodSetUUID](uuid: string): void {
    this._uuid = uuid
  }

  [MethodSetIndex](index: number): void {
    this._index = index
  }

  [MethodSetFunctions](functions: TFunctionTuple[]): void {
    this[PropFunctions] = new Map(functions)
  }

  [MethodSetAttributes](attributes: TAttributeTuple[]): void {
    this[PropAttributes] = new Map(attributes)
  }

  [MethodSetMetaKeys](metaKeys: TMetaKeyTuple[]): void {
    this[PropMetaKeys] = new Map(metaKeys)
  }

  [MethodDispatchEvent](event: any, ...args: any[]): void {
    return this._events.emitEvent(event, ...args)
  }

  [MethodExport](): TExportNode<IControlEditor> &
    TOptionalNodes<"not-children"> {
    return {
      uuid: this.uuid,
      functions: [...this[PropFunctions].entries()],
      attributes: [...this[PropAttributes].entries()],
      metaKeys: [...this[PropMetaKeys].entries()],
      type: this.type,
      hierarchy: this.hierarchy,
      script: this.script,
      parent: this.parent,
      deep: this.deep,
      index: this.index,
      options: {
        ...this.toObject()
      }
    }
  }
}
