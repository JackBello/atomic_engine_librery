import * as YAML from "yaml"
import JSON5 from "json5"
import { AbstractNode } from "../abstract/node.abstract"
import {
  IControlEditor,
  IHandleNodes,
  TAttribute,
  TAttributeTuple,
  TExportNode,
  TFunctionTuple,
  TMetaKey,
  TMetaKeyTuple,
  TOptionalNodes,
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
import { DEFAULT_CONFIG_GLOBAL_NODE } from "../../configs/nodes/@global/node"
import { TEventGlobalNode } from "../event.type"
import {
  MethodDispatchEvent,
  MethodDispatchScript,
  MethodExport
} from "../../symbols"
import { omitKeys } from "@/utils/json"

export class GlobalNode
  extends AbstractNode
  implements IHandleNodes, IControlEditor
{
  protected _initial: IControlEditor
  protected _events: EventObserver
  protected _parent: GlobalNode | null
  protected _uuid: string
  protected _index: number

  readonly hierarchy: "children" | "not-children" = "children"
  readonly type: TTypeNode = "GlobalNode"

  script: string | URL | null
  name: string
  title: string
  description: string;

  [PropNodes]: GlobalNode[];
  [PropFunctions]: Map<string, TFunction>;
  [PropAttributes]: Map<string, TAttribute>;
  [PropMetaKeys]: Map<string, TMetaKey>

  get nodes(): GlobalNode[] {
    return this[PropNodes]
  }

  get firstNode(): GlobalNode | undefined {
    if (this._parent) return this._parent.nodes[0]
    else return undefined
  }

  get lastNode(): GlobalNode | undefined {
    if (this._parent) return this._parent.nodes[this._parent.nodes.length - 1]
    else return undefined
  }

  get nextSiblingNode(): GlobalNode | undefined {
    if (this._parent) return this._parent.nodes[this.index + 1]
    else return undefined
  }

  get previousSiblingNode(): GlobalNode | undefined {
    if (this._parent) return this._parent.nodes[this.index - 1]
    else return undefined
  }

  get parent(): GlobalNode | null {
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

    this._initial = {
      ...DEFAULT_CONFIG_GLOBAL_NODE,
      ...options
    } as IControlEditor
    this._events = new EventObserver()
    this._parent = null
    this._uuid = v4()
    this._index = 0

    this.script = null
    this.name = this._initial.name
    this.title = this._initial.title
    this.description = this._initial.description

    this[PropNodes] = []
    this[PropFunctions] = new Map()
    this[PropAttributes] = new Map()
    this[PropMetaKeys] = new Map()
  }

  cloneNode(): GlobalNode {
    return makerNodes2D([this[MethodExport](true)])[0] as GlobalNode
  }

  getNode(uuid: string): GlobalNode | undefined {
    return this[PropNodes].find((node) => node.uuid == uuid)
  }

  addNode(...nodes: GlobalNode[]): void {
    for (const node of nodes) {
      node[MethodSetIndex](this[PropNodes].length)
      node[MethodSetParent](this as any)
      this[PropNodes].push(node)
    }
  }

  hasNode(uuid: string): boolean {
    return this[PropNodes].findIndex((node) => node.uuid === uuid) !== -1
  }

  deleteNode(uuid: string): boolean {
    let node = this.getNode(uuid)

    if (node) {
      this[PropNodes].splice(node.index, 1)

      node = undefined

      return true
    }

    return false
  }

  clearNodes(): void {
    this[PropNodes] = []
  }

  replaceNode(uuid: string, node: GlobalNode): void {
    const search = this.getNode(uuid)

    if (!search) throw new Error("node not found")

    node[MethodSetIndex](search.index)

    this[PropNodes][search.index] = node
  }

  replaceNodeByIndex(index: number, node: GlobalNode): void {
    if (index < 0 || index >= this[PropNodes].length)
      throw new Error("Indexes out ranges")

    const search = this[PropNodes][index]

    if (!search) throw new Error("node not found")

    node[MethodSetIndex](index)

    this[PropNodes][index] = node
  }

  searchNode(uuid: string): GlobalNode | undefined {
    const nodes: GlobalNode[] = [this as any]

    while (nodes.length > 0) {
      let node = nodes.shift()

      if (node?.uuid === uuid) {
        return node
      }

      nodes.push(...Array.from(node?.nodes ?? []))
    }

    return undefined
  }

  searchNodeByIndex(index: number): GlobalNode | undefined {
    if (index < 0 || index >= this[PropNodes].length)
      throw new Error("Indexes out ranges")

    const nodes: GlobalNode[] = [this as any]

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
    return omitKeys(
      {
        ...this
      },
      [
        "_initial",
        "_events",
        "_parent",
        "_uuid",
        "_index",
        "hierarchy",
        "type",
        "script"
      ]
    )
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
      : JSON5.stringify(this[MethodExport]())
  }

  static import(data: string, format: "JSON" | "YAML" = "JSON") {
    const structure: TExportNode<IControlEditor> =
      format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    return makerNodes2D([structure])[0] as GlobalNode
  }

  [MethodSetParent](node: GlobalNode | null): void {
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

  [MethodSetNodes](nodes: GlobalNode[]): void {
    this[PropNodes] = nodes
  }

  [MethodDispatchEvent](event: any, ...args: any[]): void {
    return this._events.emitEvent(event, ...args)
  }

  async [MethodDispatchScript]() {
    if (this.script === null) return

    const response = await handleScript(this.script as string, this)

    const functions: [string, TFunction][] = Object.entries(response.$functions)

    this[PropFunctions] = new Map(functions)
  }

  [MethodExport](
    childNode: boolean = true
  ): TExportNode<IControlEditor> & TOptionalNodes<"children"> {
    const nodes = []

    if (childNode)
      for (const node of this.getNodes()) {
        nodes.push(node[MethodExport]())
      }

    return {
      uuid: this._uuid,
      functions: [...this[PropFunctions].entries()],
      attributes: [...this[PropAttributes].entries()],
      metaKeys: [...this[PropMetaKeys].entries()],
      type: this.type,
      hierarchy: this.hierarchy,
      script: this.script
        ? (this.script as string).replace(/(\r\n|\n|\r)/gm, "")
        : null,
      deep: this.deep,
      index: this.index,
      nodes,
      options: {
        ...this.toObject()
      }
    }
  }
}
