import * as YAML from "yaml"
import JSON5 from "json5"
import { TExportNode, TTypeNode } from "../../../nodes.types"
import {
  PropType,
  PropAttributes,
  PropFunctions,
  PropMetaKeys
} from "../../../symbols"
import { Node2D } from "../node"
import { makerNodes2D } from "../../../maker-2d"
import { DEFAULT_CONFIG_SELECTION_2D } from "../../../../configs/nodes/2D/edition/selection"
import { MethodDispatchEvent, MethodExport } from "../../../../symbols"
import { TAllDrawsContext, TTypeNodeOptions } from "@/workers/types"
import { TFunction } from "@/types"
import {
  TEventGlobalNode,
  TEventNode2D,
  TEventSelection2D
} from "@/nodes/event.type"

export class Selection2D extends Node2D {
  [PropType]: TAllDrawsContext = "draw:2D/selection"

  protected _options: TTypeNodeOptions["draw:2D/selection"]
  protected _initial: TTypeNodeOptions["draw:2D/selection"]

  protected _selectedNodes: Set<Node2D> = new Set()

  protected _intersectionNode: (node: Node2D) => boolean = () => false

  readonly NODE_NAME: TTypeNode = "Selection2D"

  get endX() {
    return this._options.endX
  }

  get endY() {
    return this._options.endY
  }

  get startX() {
    return this._options.startX
  }

  get startY() {
    return this._options.startY
  }

  get shape() {
    return this._options.shape
  }

  get background() {
    return this._options.background
  }

  get radius() {
    return this._options.radius
  }

  get border() {
    return this._options.border
  }

  get borderColor() {
    return this._options.borderColor
  }

  get borderWidth() {
    return this._options.borderWidth
  }

  set endX(value: number) {
    this._options.endX = value
  }

  set endY(value: number) {
    this._options.endY = value
  }

  set startX(value: number) {
    this._options.startX = value
  }

  set startY(value: number) {
    this._options.startY = value
  }

  set shape(value: "rectangle" | "circle" | "triangle" | "polygon") {
    this._options.shape = value
  }

  set background(value: string) {
    this._options.background = value
  }

  set radius(
    value:
      | number
      | [number, number]
      | {
          topLeft: number
          topRight: number
          bottomLeft: number
          bottomRight: number
        }
  ) {
    this._options.radius = value
  }

  set border(value: boolean) {
    this._options.border = value
  }

  set borderColor(value: string) {
    this._options.borderColor = value
  }

  set borderWidth(value: number) {
    this._options.borderWidth = value
  }

  constructor(options?: Partial<TTypeNodeOptions["draw:2D/selection"]>) {
    super({ ...DEFAULT_CONFIG_SELECTION_2D, ...options })

    this._initial = { ...DEFAULT_CONFIG_SELECTION_2D, ...options }
    this._options = this._initial
  }

  setIntersectionNode(func: (node: Node2D) => boolean) {
    this._intersectionNode = func
  }

  select(nodes: Node2D[]) {
    for (let childNode of nodes) {
      if (this._intersectionNode(childNode)) this._selectedNodes.add(childNode)
      else this._selectedNodes.delete(childNode)
    }
    this[MethodDispatchEvent]("selection2D:nodes", [...this._selectedNodes])
  }

  emit(
    event: TEventGlobalNode | TEventNode2D | TEventSelection2D,
    callback: TFunction
  ): void {
    return this._events.addEventListener(event, callback)
  }

  reset(property?: keyof TTypeNodeOptions["draw:2D/selection"]): void {
    if (property) {
      this._options[property] = this._initial[property] as never
    } else {
      this._options = this._initial
    }
  }

  toObject(): TTypeNodeOptions["draw:2D/selection"] {
    return this._options
  }

  set(property: keyof TTypeNodeOptions["draw:2D/selection"], value: any): void
  set(properties: Partial<TTypeNodeOptions["draw:2D/selection"]>): void
  set(properties?: unknown, value?: unknown, property?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[property as keyof TTypeNodeOptions["draw:2D/selection"]] =
        value as never
    } else if (typeof properties !== "string") {
      for (const [key, value] of Object.entries(this._initial)) {
        this._options[key as keyof TTypeNodeOptions["draw:2D/selection"]] =
          value as never
      }
    }
  }

  static import(data: string, format: "JSON" | "YAML" = "JSON") {
    const structure: TExportNode<TTypeNodeOptions["draw:2D/selection"]> =
      format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    return makerNodes2D([structure])[0] as Selection2D
  }

  [MethodExport](
    childNode: boolean = true
  ): TExportNode<TTypeNodeOptions["draw:2D/selection"]> {
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
      options: {
        ...this.toObject()
      }
    }
  }
}
