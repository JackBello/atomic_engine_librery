import * as YAML from "yaml"
import JSON5 from "json5"
import { AbstractNode } from "../abstract/node.abstract"
import {
  IHandleNodes,
  INodeWorker,
  TAttribute,
  TAttributeTuple,
  TExportNode,
  TFunctionTuple,
  TMetaKey,
  TMetaKeyTuple,
  TTypeNode
} from "../nodes.types"
import {
  MethodSetAttributes,
  MethodSetFunctions,
  MethodSetIndex,
  MethodSetMetaKeys,
  MethodSetNodes,
  MethodSetParent,
  MethodSetUUID,
  PropType,
  PropAttributes,
  PropFunctions,
  PropMetaKeys,
  PropNodes
} from "../symbols"
import { makerNodes2D } from "../maker-2d"
import { TFunction } from "../../types"
import EventObserver from "../../utils/observer"
import { v4 } from "@lukeed/uuid"
import { handleScript } from "../../utils/script"
import { DEFAULT_CONFIG_PRIMITIVE_NODE } from "../../configs/nodes/@global/node"
import { TEventGlobalNode } from "../event.type"
import {
  MethodDispatchEvent,
  MethodDispatchScript,
  MethodExport,
  MethodExportWorker
} from "../../symbols"
import { TAllDrawsContext, TTypeNodeOptions } from "@/workers/types"
import { AtomicEngine } from "@/atomic-engine"
import { AtomicGame } from "@/atomic-game"
import { omitKeys } from "@/utils/json"

export class PrimitiveNode extends AbstractNode implements IHandleNodes {
  protected _omit: string[] = ["name", "description"]
  protected _options: TTypeNodeOptions["primitive:node"]
  protected _initial: TTypeNodeOptions["primitive:node"]
  protected _events: EventObserver
  protected _parent: PrimitiveNode | null
  protected _uuid: string
  protected _index: number;

  [PropType]: TAllDrawsContext = "primitive:node"

  readonly NODE_NAME: TTypeNode = "PrimitiveNode"

  script: string | URL | null;

  [PropNodes]: PrimitiveNode[];
  [PropFunctions]: Map<string, TFunction>;
  [PropAttributes]: Map<string, TAttribute>;
  [PropMetaKeys]: Map<string, TMetaKey>

  get nodes(): PrimitiveNode[] {
    return this[PropNodes]
  }

  get firstNode(): PrimitiveNode | undefined {
    if (this._parent) return this._parent.nodes[0]
    else return undefined
  }

  get lastNode(): PrimitiveNode | undefined {
    if (this._parent) return this._parent.nodes[this._parent.nodes.length - 1]
    else return undefined
  }

  get nextSiblingNode(): PrimitiveNode | undefined {
    if (this._parent) return this._parent.nodes[this.index + 1]
    else return undefined
  }

  get previousSiblingNode(): PrimitiveNode | undefined {
    if (this._parent) return this._parent.nodes[this.index - 1]
    else return undefined
  }

  get parent(): PrimitiveNode | null {
    return this._parent
  }

  get uuid(): string {
    return this._uuid
  }

  get index(): number {
    return this._index
  }

  get deep(): string {
    if (this.parent) return this.parent.deep + "_" + this.index
    else return this.index.toString()
  }

  get name() {
    return this._options.name
  }

  get title() {
    return this._options.title
  }

  get description() {
    return this._options.description
  }

  set name(value: string) {
    this._options.name = value
  }

  set title(value: string) {
    this._options.title = value
  }

  set description(value: string) {
    this._options.description = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "description",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  constructor(options?: Partial<TTypeNodeOptions["primitive:node"]>) {
    super()

    this._initial = {
      ...DEFAULT_CONFIG_PRIMITIVE_NODE,
      ...options
    }
    this._options = { ...this._initial }

    this._events = new EventObserver()
    this._parent = null
    this._uuid = v4()
    this._index = 0

    this.script = null

    this[PropNodes] = []
    this[PropFunctions] = new Map()
    this[PropAttributes] = new Map()
    this[PropMetaKeys] = new Map()
  }

  cloneNode(): PrimitiveNode {
    return makerNodes2D([this[MethodExport](true)])[0] as PrimitiveNode
  }

  getNode(uuid: string): PrimitiveNode | undefined {
    return this[PropNodes].find((node) => node.uuid == uuid)
  }

  addNode(...nodes: PrimitiveNode[]): void {
    for (const node of nodes) {
      node[MethodSetIndex](this[PropNodes].length)
      node[MethodSetParent](this as any)
      this[PropNodes].push(node)

      this.getApp().drawer.addNode(
        node[MethodExportWorker](),
        this.deep,
        "deep"
      )
    }

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  hasNode(uuid: string): boolean {
    return this[PropNodes].findIndex((node) => node.uuid === uuid) !== -1
  }

  deleteNode(uuid: string): boolean {
    let node = this.getNode(uuid)

    if (node) {
      this[PropNodes].splice(node.index, 1)

      this.getApp().drawer.reDraw()

      this.getApp().changeGlobal("re-draw", true)

      node = undefined

      return true
    }

    return false
  }

  clearNodes(): void {
    this[PropNodes] = []

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  replaceNode(uuid: string, node: PrimitiveNode): void {
    const search = this.getNode(uuid)

    if (!search) throw new Error("node not found")

    node[MethodSetIndex](search.index)

    this[PropNodes][search.index] = node

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  replaceNodeByIndex(index: number, node: PrimitiveNode): void {
    if (index < 0 || index >= this[PropNodes].length)
      throw new Error("Indexes out ranges")

    const search = this[PropNodes][index]

    if (!search) throw new Error("node not found")

    node[MethodSetIndex](index)

    this[PropNodes][index] = node

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  searchNode(uuid: string): PrimitiveNode | undefined {
    const nodes: PrimitiveNode[] = [this as any]

    while (nodes.length > 0) {
      let node = nodes.shift()

      if (node?.uuid === uuid) {
        return node
      }

      nodes.push(...Array.from(node?.nodes ?? []))
    }

    return undefined
  }

  searchNodeByIndex(index: number): PrimitiveNode | undefined {
    if (index < 0 || index >= this[PropNodes].length)
      throw new Error("Indexes out ranges")

    const nodes: PrimitiveNode[] = [this as any]

    while (nodes.length > 0) {
      let node = nodes.shift()

      if (node?.index === index) {
        return node
      }

      nodes.push(...Array.from(node?.nodes ?? []))
    }

    return undefined
  }

  moveNode(uuid: string, to: number): void {
    const node = this.getNode(uuid)

    if (!node) throw new Error("node not found")

    if (to < 0 || to >= this[PropNodes].length)
      throw new Error("Indexes out ranges")

    const nodes = this[PropNodes].slice()

    const [nodeMove] = nodes.splice(node.index, 1)

    nodes.splice(to, 0, nodeMove)

    for (let index = 0; index < nodes.length; index++) {
      nodes[index][MethodSetIndex](index)
    }

    this[PropNodes] = nodes

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  moveNodeByIndex(from: number, to: number): void {
    if (
      from < 0 ||
      from >= this[PropNodes].length ||
      to < 0 ||
      to >= this[PropNodes].length
    )
      throw new Error("Indexes out ranges")

    const nodes = this[PropNodes].slice()

    const [nodeMove] = nodes.splice(from, 1)

    nodes.splice(to, 0, nodeMove)

    for (let index = 0; index < nodes.length; index++) {
      nodes[index][MethodSetIndex](index)
    }

    this[PropNodes] = nodes

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  getFunctions(): TFunction[] {
    return [...this[PropFunctions].values()]
  }

  getFunction(name: string): TFunction | undefined {
    return this[PropFunctions].get(name)
  }

  addFunction(name: string, func: TFunction): void {
    this[PropFunctions].set(name, func)

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  hasFunction(name: string): boolean {
    return this[PropFunctions].has(name)
  }

  deleteFunction(name: string): boolean {
    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)

    return this[PropFunctions].delete(name)
  }

  executeFunction(name: string, ...args: any[]): void {
    const func = this.getFunction(name)

    if (!func) throw new Error("function not found")

    func(args)

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  clearFunctions(): void {
    this[PropFunctions].clear()

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  getAttributes(): TAttribute[] {
    return [...this[PropAttributes].values()]
  }

  getAttribute(name: string): TAttribute | undefined {
    return this[PropAttributes].get(name)
  }

  addAttribute(name: string, options: TAttribute): void {
    this[PropAttributes].set(name, options)

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  hasAttribute(name: string): boolean {
    return this[PropAttributes].has(name)
  }

  deleteAttribute(name: string): boolean {
    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)

    return this[PropAttributes].delete(name)
  }

  clearAttributes(): void {
    this[PropAttributes].clear()

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  getMetaKeys(): TMetaKey[] {
    return [...this[PropMetaKeys].values()]
  }

  getMetaKey(name: string): TMetaKey | undefined {
    return this[PropMetaKeys].get(name)
  }

  addMetaKey(name: string, options: TMetaKey): void {
    this[PropMetaKeys].set(name, options)

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  hasMetaKey(name: string): boolean {
    return this[PropMetaKeys].has(name)
  }

  deleteMetaKey(name: string): boolean {
    this.getApp().changeGlobal("re-draw", true)

    this.getApp().drawer.reDraw()

    return this[PropMetaKeys].delete(name)
  }

  clearMetaKeys(): void {
    this[PropMetaKeys].clear()

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  emit(event: TEventGlobalNode, callback: TFunction): void {
    return this._events.addEventListener(event, callback)
  }

  reset(property?: keyof TTypeNodeOptions["primitive:node"]): void {
    if (property) {
      this._options[property] = this._initial[property]
      if (!this._omit.includes(property))
        this.getApp().drawer.updateNode(this.deep, "property", "deep", {
          property,
          value: this._initial[property]
        })
    } else {
      this._options = { ...this._initial }
      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: omitKeys(this._initial, this._omit)
      })
    }

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  toObject(): TTypeNodeOptions["primitive:node"] {
    return this._options
  }

  set(property: keyof TTypeNodeOptions["primitive:node"], value: any): void
  set(properties: Partial<TTypeNodeOptions["primitive:node"]>): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[property as keyof TTypeNodeOptions["primitive:node"]] =
        value as any

      if (!this._omit.includes(property))
        this.getApp().drawer.updateNode(this.deep, "property", "deep", {
          property,
          value
        })
    } else if (typeof properties !== "string") {
      for (const [key, value] of Object.entries(this.properties)) {
        this._options[key as keyof TTypeNodeOptions["primitive:node"]] =
          value as any
      }
      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: omitKeys(properties, this._omit)
      })
    }

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  export(format: "JSON" | "YAML" = "JSON"): string {
    return format === "YAML"
      ? YAML.stringify(this[MethodExport]())
      : JSON5.stringify(this[MethodExport]())
  }

  static import(data: string, format: "JSON" | "YAML" = "JSON") {
    const structure: TExportNode<TTypeNodeOptions["primitive:node"]> =
      format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    return makerNodes2D([structure])[0] as PrimitiveNode
  }

  [MethodSetParent](node: PrimitiveNode | null): void {
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

  [MethodSetNodes](nodes: PrimitiveNode[]): void {
    this[PropNodes] = nodes
  }

  [MethodDispatchEvent](event: any, ...args: any[]): void {
    return this._events.emitEvent(event, ...args)
  }

  async [MethodDispatchScript]() {
    if (this.script === null) return

    let viewport = {
      width: 0,
      height: 0
    }

    const app = this.getApp()

    if (app instanceof AtomicEngine) {
      viewport = app.options.game.viewport
    } else if (app instanceof AtomicGame) {
      viewport = app.options.viewport
    }

    const response = await handleScript(this.script as string, this, viewport)

    const functions: [string, TFunction][] = Object.entries(response.$functions)

    this[PropFunctions] = new Map(functions)
  }

  [MethodExportWorker](childNode: boolean = true): INodeWorker {
    const nodes: INodeWorker[] = []

    if (childNode && this.nodes.length)
      for (const node of this.nodes) {
        nodes.push(node[MethodExportWorker](true))
      }

    return {
      __type__: this[PropType],
      deep: this.deep,
      index: this.index,
      nodes: nodes,
      uuid: this.uuid,
      options: omitKeys(this.toObject(), this._omit)
    }
  }

  [MethodExport](
    childNode: boolean = true
  ): TExportNode<TTypeNodeOptions["primitive:node"]> {
    const nodes: TExportNode<any>[] = []

    if (childNode && this.nodes.length)
      for (const node of this.nodes) {
        nodes.push(node[MethodExport](childNode))
      }

    return {
      uuid: this._uuid,
      functions: [...this[PropFunctions].entries()],
      attributes: [...this[PropAttributes].entries()],
      metaKeys: [...this[PropMetaKeys].entries()],
      type: this.NODE_NAME,
      script: this.script,
      deep: this.deep,
      index: this.index,
      nodes,
      options: this.toObject()
    }
  }
}
