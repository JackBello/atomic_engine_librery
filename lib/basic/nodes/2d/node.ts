import { v4 } from "@lukeed/uuid"
import * as YAML from "yaml"
import {
  DEFAULT_CONFIG_BASIC_NODE,
  DEFAULT_CONFIG_EMPTY_NODE,
  DEFAULT_CONFIG_NODE_2D
} from "../../../configs/nodes/2D/node"
import { AtomicCore } from "../../atomic-core"
import {
  IOptionsEmptyNode,
  IOptionsNode,
  IOptionsNode2D,
  TCursorOptions,
  TTypeOrigin,
  TTypeOriginX,
  TTypeOriginY
} from "../types"
import { TEventNode } from "../../../types"
import { executeScript } from "../../../utils/scripts"
import { AtomicGame } from "../../atomic-game"
import { AtomicGlobal } from "../../atomic-global"
import {
  PrepareExport,
  SetAttributesNode,
  SetParentNode,
  SetUUIDNode
} from "../../../const"

export class BasicNode {
  [key: string]: any

  public static $game: AtomicGame
  public static $core: AtomicCore

  protected _uuid: string
  protected _nodes: Map<string, BasicNode | Node2D | EmptyNode>
  protected _options: IOptionsNode
  protected _initial: IOptionsNode
  protected _type: string
  protected _script: string | URL | undefined
  protected _attributes: Record<string, any>
  protected _functions: Record<string, any>
  protected _redraw: boolean = true
  protected _parent: BasicNode | Node2D | EmptyNode | undefined

  constructor(options: Partial<IOptionsNode>) {
    this._uuid = v4()
    this._options = { ...DEFAULT_CONFIG_BASIC_NODE, ...options }
    this._initial = { ...this._options }
    this._nodes = new Map()
    this._type = BasicNode.name
    this._attributes = {}
    this._functions = {}
    this._script = undefined
  }

  protected getCurrentScene() {
    return BasicNode.$core.$scenesGame.currentScene
  }

  protected getCore() {
    if (AtomicGlobal.MODE === "edition" || AtomicGlobal.MODE === "preview")
      return BasicNode.$core
    else return BasicNode.$game
  }

  protected getCanvas() {
    return BasicNode.$core.$canvasEditor
  }

  public on<T extends TEventNode>(
    event: T,
    callback: (...args: any[]) => void
  ) {
    return this.getCanvas().eventObserver.addEventListener(event, callback)
  }

  public dispatchEvent<T extends TEventNode>(event: T, ...args: any[]) {
    return this.getCanvas().eventObserver.emitEvent(event, ...args)
  }

  get attributes() {
    return this._attributes
  }

  get type() {
    return this._type
  }

  get uuid() {
    return this._uuid
  }

  get name() {
    return this._options.name
  }

  get visible() {
    return this._options.visible
  }

  get selectable() {
    return this._options.selectable
  }

  get lock() {
    return this._options.lock
  }

  get cursor() {
    return this._options.cursor
  }

  get deep() {
    return this._options.deep
  }

  get x() {
    return this._options.x
  }

  get y() {
    return this._options.y
  }

  set name(value: string) {
    this._options.name = value
  }

  set visible(value: boolean) {
    this._options.visible = value
  }

  set selectable(value: boolean) {
    this._options.selectable = value
  }

  set lock(value: boolean) {
    this._options.lock = value
  }

  set cursor(value: TCursorOptions) {
    this._options.cursor = value
  }

  set deep(value: string) {
    this._redraw = true
    this._options.deep = value
  }

  set x(value: number) {
    this._redraw = true
    this._options.x = value
  }

  set y(value: number) {
    this._redraw = true
    this._options.y = value
  }

  public move(x: number, y: number) {
    this._redraw = true
    this._options.x = x
    this._options.y = y
  }

  public reset() {
    this._options = { ...this._initial }
  }

  public render() {}

  public update(frame: number, time: number) {}

  public destroy() {}

  public clear() {}

  public addAttribute(name: string, value: any) {
    this._attributes[name] = value
  }

  public removeAttribute(name: string) {
    this._attributes[name] = undefined
  }

  public clearAttributes() {
    this._attributes = {}
  }

  public addFunction(name: string, value: any) {
    this._functions[name] = value
  }

  public removeFunction(name: string) {
    this._functions[name] = undefined
  }

  public clearFunctions() {
    this._functions = {}
  }

  public async script() {
    if (!this._script) return

    const response = await executeScript(
      this._script as string,
      this.getCore(),
      this
    )

    this._functions = response.$functions
  }

  public setScript(script: URL | string) {
    this._script = script
  }

  public clearScript() {
    this._script = undefined
  }

  public setOptions(options: Partial<IOptionsNode>) {
    this._redraw = true
    this._options = { ...this._options, ...options }
  }

  public toObject() {
    return {
      ...this._options
    }
  }

  public getNodes() {
    return [...this._nodes.values()]
  }

  public addNode(
    node: BasicNode | BasicNode[] | Node2D | Node2D[] | EmptyNode | EmptyNode[]
  ) {
    if (Array.isArray(node)) {
      for (const nodeToInsert of node) {
        nodeToInsert.deep = this.deep + "_" + this._nodes.size
        nodeToInsert[SetParentNode](this)
        this._nodes.set(nodeToInsert.uuid, nodeToInsert)
      }
    } else {
      node.deep = this.deep + "_" + this._nodes.size
      node[SetParentNode](this)
      this._nodes.set(node.uuid, node)
    }
  }

  public existNode(uuid: string) {
    return this._nodes.has(uuid)
  }

  public deleteNode(uuid: string) {
    return this._nodes.delete(uuid)
  }

  public getNode(uuid: string) {
    return this._nodes.get(uuid)
  }

  public clearNodes() {
    this._nodes.clear()
  }

  public searchNode(uuid: string): BasicNode | Node2D | EmptyNode | undefined {
    const nodes = [this as any]

    while (nodes.length > 0) {
      let node = nodes.shift()

      if (node.uuid === uuid) {
        return node
      }

      nodes.push(...Array.from(node._nodes.values() || []))
    }

    return undefined
  }

  [SetParentNode](node: BasicNode | Node2D | EmptyNode) {
    this._parent = node
  }

  [SetUUIDNode](uuid: string) {
    this._uuid = uuid
  }

  [SetAttributesNode](attributes: Record<string, any>) {
    this._attributes = attributes
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

  public export(format: "JSON" | "YAML" = "JSON") {
    if (format === "YAML") return YAML.stringify(this[PrepareExport]())
    return JSON.stringify(this[PrepareExport]())
  }
}

export class Node2D extends BasicNode {
  protected _options: IOptionsNode2D

  constructor(options: Partial<IOptionsNode2D>) {
    super({ ...DEFAULT_CONFIG_NODE_2D, ...options })
    this._options = { ...DEFAULT_CONFIG_NODE_2D, ...options }
    this._type = Node2D.name
  }

  get width() {
    return this._options.width
  }

  get height() {
    return this._options.height
  }

  get centerScale() {
    return this._options.centerScale
  }

  get centerRotation() {
    return this._options.centerRotation
  }

  get flipX() {
    return this._options.flipX
  }

  get flipY() {
    return this._options.flipY
  }

  get origin() {
    return this._options.origin
  }

  get originX() {
    return this._options.originX
  }

  get originY() {
    return this._options.originY
  }

  get scale() {
    return this._options.scale
  }

  get scaleX() {
    return this._options.scaleX
  }

  get scaleY() {
    return this._options.scaleY
  }

  get skew() {
    return this._options.skew
  }

  get skewX() {
    return this._options.skewX
  }

  get skewY() {
    return this._options.skewY
  }

  get rotation() {
    return this._options.rotation
  }

  set width(value: number) {
    this._redraw = true
    this._options.width = value
  }

  set height(value: number) {
    this._redraw = true
    this._options.height = value
  }

  set centerScale(value: boolean) {
    this._redraw = true
    this._options.centerScale = value
  }

  set centerRotation(value: boolean) {
    this._redraw = true
    this._options.centerRotation = value
  }

  set flipX(value: boolean) {
    this._options.flipX = value
  }

  set flipY(value: boolean) {
    this._options.flipY = value
  }

  set origin(value: TTypeOrigin) {
    this._redraw = true
    this._options.origin = value
    this._options.originX = value as TTypeOriginX
    this._options.originY = value as TTypeOriginY
  }

  set originX(value: TTypeOriginX) {
    this._redraw = true
    this._options.originX = value
  }

  set originY(value: TTypeOriginY) {
    this._redraw = true
    this._options.originY = value
  }

  set scale(value) {
    this._redraw = true
    this._options.scale = value
    this._options.scaleX = value
    this._options.scaleY = value
  }

  set scaleX(value) {
    this._redraw = true
    this._options.scaleX = value
  }

  set scaleY(value) {
    this._redraw = true
    this._options.scaleY = value
  }

  set skew(value: number) {
    this._redraw = true
    this._options.skew = value
    this._options.skewX = value
    this._options.skewY = value
  }

  set skewX(value: number) {
    this._redraw = true
    this._options.skewX = value
  }

  set skewY(value: number) {
    this._redraw = true
    this._options.skewY = value
  }

  set rotation(value) {
    this._redraw = true
    this._options.rotation = value
  }

  public center() {
    this._redraw = true
    if (this._parent) {
      this.x =
        ((this._parent.width * this._parent.scaleX) / 2 -
          (this.width * this.scaleX) / 2) /
        2
      this.y =
        ((this._parent.height * this._parent.scaleY) / 2 -
          (this.height * this.scaleY) / 2) /
        2
    } else {
      this.x = (this.getCore().width / 2 - (this.width * this.scaleX) / 2) / 2
      this.y = (this.getCore().height / 2 - (this.height * this.scaleY) / 2) / 2
    }
  }

  public centerX() {
    this._redraw = true
    if (this._parent) {
      this.x =
        ((this._parent.width * this._parent.scaleX) / 2 -
          (this.width * this.scaleX) / 2) /
        2
    } else {
      this.x = (this.getCore().width / 2 - (this.width * this.scaleX) / 2) / 2
    }
  }

  public centerY() {
    this._redraw = true
    if (this._parent) {
      this.y =
        ((this._parent.height * this._parent.scaleY) / 2 -
          (this.height * this.scaleY) / 2) /
        2
    } else {
      this.y = (this.getCore().height / 2 - (this.height * this.scaleY) / 2) / 2
    }
  }

  protected processNode() {
    let translateX = this.x
    let translateY = this.y

    if (this._parent) {
      translateX = this._parent.x + this.x
      translateY = this._parent.y + this.y
    }

    return {
      translateX,
      translateY
    }
  }

  public setOptions(options: Partial<IOptionsNode2D>) {
    this._redraw = true
    this._options = { ...this._options, ...options }
  }

  public toObject() {
    return {
      ...this._options
    }
  }
}

export class EmptyNode extends BasicNode {
  constructor(options: Partial<IOptionsEmptyNode>) {
    super({ ...DEFAULT_CONFIG_EMPTY_NODE, ...options })
    this._type = EmptyNode.name
  }

  public setOptions(options: Partial<IOptionsEmptyNode>) {
    this._redraw = true
    this._options = { ...this._options, ...options }
  }

  public toObject() {
    return {
      ...this._options
    }
  }
}
