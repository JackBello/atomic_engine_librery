import * as YAML from "yaml"
import JSON5 from "json5"
import { TExportNode, TTypeNode } from "../../../nodes.types"
import { PropType, PropAttributes, PropMetaKeys } from "../../../symbols"
import { Node2D } from "../node"
import { makerNodes2D } from "../../../maker-2d"
import { MethodExport } from "../../../../symbols"
import { DEFAULT_CONFIG_CONTROL_EDITION_2D } from "../../../../configs/nodes/2D/edition/control-edition"
import { TAllDrawsContext, TTypeNodeOptionsContext2D } from "@/workers/types"

export class ControlEdition2D extends Node2D {
  [PropType]: TAllDrawsContext = "draw:2D/control-edition"

  protected _options: TTypeNodeOptionsContext2D["draw:2D/control-edition"]
  protected _initial: TTypeNodeOptionsContext2D["draw:2D/control-edition"]

  readonly NODE_NAME: TTypeNode = "ControlEdition2D"

  get padding() {
    return this._options.padding
  }

  get cornerSize() {
    return this._options.cornerSize
  }

  get cornerColor() {
    return this._options.cornerColor
  }

  get cornerBorder() {
    return this._options.cornerBorder
  }

  get cornerColorBorder() {
    return this._options.cornerColorBorder
  }

  get showCorner() {
    return this._options.showCorner
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

  set padding(
    value: number | [number, number] | [number, number, number, number]
  ) {
    this._options.padding = value
  }

  set cornerSize(value: number) {
    this._options.cornerSize = value
  }

  set cornerColor(value: string) {
    this._options.cornerColor = value
  }

  set cornerBorder(value: boolean) {
    this._options.cornerBorder = value
  }

  set cornerColorBorder(value: string) {
    this._options.cornerColorBorder = value
  }

  set showCorner(
    value:
      | boolean
      | {
          "top-left": boolean
          "top-center": boolean
          "top-right": boolean
          "middle-left": boolean
          "middle-center": boolean
          "middle-right": boolean
          "bottom-left": boolean
          "bottom-center": boolean
          "bottom-right": boolean
        }
  ) {
    this._options.showCorner = value
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

  constructor(
    options?: Partial<TTypeNodeOptionsContext2D["draw:2D/control-edition"]>
  ) {
    super({ ...DEFAULT_CONFIG_CONTROL_EDITION_2D, ...options })

    this._initial = { ...DEFAULT_CONFIG_CONTROL_EDITION_2D, ...options }
    this._options = this._initial
  }

  reset(
    property?: keyof TTypeNodeOptionsContext2D["draw:2D/control-edition"]
  ): void {
    if (property) {
      this._options[property] = this._initial[property] as never
    } else {
      this._options = this._initial
    }
  }

  toObject(): TTypeNodeOptionsContext2D["draw:2D/control-edition"] {
    return this._options
  }

  set(
    property: keyof TTypeNodeOptionsContext2D["draw:2D/control-edition"],
    value: any
  ): void
  set(
    properties: Partial<TTypeNodeOptionsContext2D["draw:2D/control-edition"]>
  ): void
  set(properties?: unknown, value?: unknown, property?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[
        property as keyof TTypeNodeOptionsContext2D["draw:2D/control-edition"]
      ] = value as never
    } else if (typeof properties !== "string") {
      for (const [key, value] of Object.entries(this._initial)) {
        this._options[
          key as keyof TTypeNodeOptionsContext2D["draw:2D/control-edition"]
        ] = value as never
      }
    }
  }

  static import(data: string, format: "JSON" | "YAML" = "JSON") {
    const structure: TExportNode<
      TTypeNodeOptionsContext2D["draw:2D/control-edition"]
    > = format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    return makerNodes2D([structure])[0] as ControlEdition2D
  }

  [MethodExport](
    childNode: boolean = true
  ): TExportNode<TTypeNodeOptionsContext2D["draw:2D/control-edition"]> {
    const nodes: TExportNode<any>[] = []

    if (childNode && this.nodes.length)
      for (const node of this.nodes) {
        nodes.push(node[MethodExport](childNode))
      }

    return {
      uuid: this._uuid,
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
