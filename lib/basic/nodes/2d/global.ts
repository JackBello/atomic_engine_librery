import * as YAML from "yaml"
import { v4 } from "@lukeed/uuid"
import { TCanvasType, TEventNode, TFunction, TNode } from "../../../types"
import EventObserver from "../../../utils/observer"
import { IOptionsGlobalNode, TAttributes, TCursorOptions } from "../types"
import { executeScript } from "../../../utils/scripts"
import {
  DispatchEventObserver,
  PrepareExport,
  SetAttributesNode,
  SetCanvas,
  SetDeep,
  SetIndex,
  SetParentNode,
  SetUUIDNode
} from "../../../const"

export class GlobalNode {
  protected _deep: string
  protected _index: number
  protected _parent: TNode | null
  protected _nodes: TNode[]
  protected _canvas: TCanvasType
  protected _uuid: string
  protected _type: string
  protected _script: string | URL | null
  protected _functions: Map<string, TFunction>
  protected _attributes: Map<string, TAttributes>
  protected _events: EventObserver
  protected _options: IOptionsGlobalNode

  constructor(options: Partial<IOptionsGlobalNode> = {}) {
    this._options = {
      ...{
        cursor: "default",
        name: "GlobalNode"
      },
      ...options
    }
    this._canvas = "scene"
    this._uuid = v4()
    this._type = GlobalNode.name
    this._functions = new Map()
    this._attributes = new Map()
    this._script = null
    this._parent = null
    this._events = new EventObserver()
    this._nodes = []
    this._index = 0
    this._deep = "0"
  }

  get children() {
    return this._nodes
  }

  get index() {
    return this._index
  }

  get deep() {
    return this._deep
  }

  get type() {
    return this._type
  }

  get uuid() {
    return this._uuid
  }

  get script() {
    return this._script ?? ""
  }

  set script(source: string | URL | null) {
    this._script = source
  }

  get cursor() {
    return this._options.cursor
  }

  set cursor(value: TCursorOptions) {
    this._options.cursor = value
  }

  get name() {
    return this._options.name
  }

  set name(value: string) {
    this._options.name = value
  }

  public on(event: TEventNode, callback: TFunction) {
    return this._events.addEventListener(event, callback)
  }

  public render() {}

  public update(object: {
    timestamp: number
    deltaTime: number
    frame: number
  }) {
    object
  }

  public destroy() {}

  public clear() {}

  public hasNode(uuid: string): boolean {
    return this._nodes.findIndex((node) => node.uuid === uuid) !== -1
  }

  public deleteNode(uuid: string) {
    let node = this.getNode(uuid)

    if (node) this._nodes.splice(node.index, 1)

    node = undefined
  }

  public getNode(uuid: string): TNode | undefined {
    return this._nodes.find((node) => node.uuid == uuid)
  }

  public clearNodes() {
    this._nodes = []
  }

  public searchNode(uuid: string): TNode | undefined {
    const nodes: TNode[] = [this]

    while (nodes.length > 0) {
      let node = nodes.shift()

      if (node?.uuid === uuid) {
        return node
      }

      nodes.push(...Array.from(node?.children ?? []))
    }

    return undefined
  }

  public addNode(...nodes: TNode[]) {
    for (const node of nodes) {
      node[SetDeep](this._deep + "_" + this._nodes.length)
      node[SetIndex](this._nodes.length)
      node[SetParentNode](this)
      this._nodes.push(node)
    }
  }

  public getNodes() {
    return [...this._nodes.values()]
  }

  public async runScript() {
    if (!this._script) return

    const response = await executeScript(this._script as string, this)

    const $functions: [string, TFunction][] = Object.entries(
      response.$functions
    )

    this._functions = new Map($functions)
  }

  public addAttribute(name: string, options: TAttributes) {
    this._attributes.set(name, options)
  }

  public removeAttribute(name: string) {
    this._attributes.delete(name)
  }

  public hasAttribute(name: string) {
    return this._attributes.has(name)
  }

  public clearAttributes() {
    this._attributes.clear()
  }

  public getAttributes() {
    return [...this._attributes.values()]
  }

  public addFunction(name: string, func: TFunction) {
    this._functions.set(name, func)
  }

  public removeFunction(name: string) {
    this._functions.delete(name)
  }

  public hasFunction(name: string) {
    return this._functions.has(name)
  }

  public clearFunctions() {
    this._functions.clear()
  }

  public getFunction(name: string) {
    return this._functions.get(name)
  }

  public getFunctions() {
    return [...this._functions.values()]
  }

  public setOptions(options: any) {
    this._options = { ...this._options, ...options }
  }

  public toObject() {
    return {
      ...this._options
    }
  }

  public export(format: "JSON" | "YAML" = "JSON") {
    if (format === "YAML") return YAML.stringify(this[PrepareExport]())
    return JSON.stringify(this[PrepareExport]())
  }

  public static import(data: any) {
    const node = new GlobalNode(data)

    return node
  }

  [SetParentNode](node: TNode) {
    this._parent = node
  }

  [SetCanvas](canvas: TCanvasType) {
    this._canvas = canvas
  }

  [DispatchEventObserver](event: TEventNode, ...args: any[]) {
    return this._events.emitEvent(event, ...args)
  }

  [SetUUIDNode](uuid: string) {
    this._uuid = uuid
  }

  [SetDeep](deep: string) {
    this._deep = deep
  }

  [SetIndex](index: number) {
    this._index = index
  }

  [SetAttributesNode](attributes: [[string, TAttributes]]) {
    this._attributes = new Map(attributes)
  }

  [PrepareExport](childNode: boolean = true): any {
    const nodes = []

    if (childNode)
      for (const node of this.getNodes()) {
        nodes.push(node[PrepareExport]())
      }

    return {
      uuid: this._uuid,
      attributes: this._attributes,
      type: this._type,
      script: this._script,
      nodes,
      options: {
        ...this._options
      }
    }
  }
}
