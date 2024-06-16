import * as YAML from "yaml"
import JSON5 from "json5"
import { TExportNode, TTypeGlobalFont, TTypeNode } from "../../../nodes.types"
import {
  PropType,
  PropAttributes,
  PropFunctions,
  PropMetaKeys
} from "../../../symbols"
import { Node2D } from "../node"
import { makerNodes2D } from "../../../maker-2d"
import { DEFAULT_CONFIG_TEXT_2D } from "../../../../configs/nodes/2D/interface/text"
import { MethodExport } from "../../../../symbols"
import { TAllDrawsContext, TTypeNodeOptionsContext2D } from "@/workers/types"

export class Text2D extends Node2D {
  [PropType]: TAllDrawsContext = "draw:2D/text"

  protected _options: TTypeNodeOptionsContext2D["draw:2D/text"]
  protected _initial: TTypeNodeOptionsContext2D["draw:2D/text"]

  readonly NODE_NAME: TTypeNode = "Text2D"

  get border() {
    return this._options.border
  }

  get borderColor() {
    return this._options.borderColor
  }

  get borderWidth() {
    return this._options.borderWidth
  }

  get text() {
    return this._options.text
  }

  get fontSize() {
    return this._options.fontSize
  }

  get fontFamily() {
    return this._options.fontFamily
  }

  get fontStretch() {
    return this._options.fontStretch
  }

  get fontStyle() {
    return this._options.fontStyle
  }

  get fontWeight() {
    return this._options.fontWeight
  }

  get fontVariant() {
    return this._options.fontVariant
  }

  get lineHeight() {
    return this._options.lineHeight
  }

  get textAlign() {
    return this._options.textAlign
  }

  get textBaseline() {
    return this._options.textBaseline
  }

  get textDirection() {
    return this._options.textDirection
  }

  get wordSpacing() {
    return this._options.wordSpacing
  }

  get letterSpacing() {
    return this._options.letterSpacing
  }

  get color() {
    return this._options.color
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

  set text(value: string) {
    this._options.text = value
  }

  set fontSize(
    value:
      | `${string}px`
      | `${string}em`
      | `${string}pc`
      | `${string}cm`
      | `${string}rem`
      | `${string}pt`
      | `${string}inch`
      | `${string}%`
  ) {
    this._options.fontSize = value
  }

  set fontFamily(value: string) {
    this._options.fontFamily = value
  }

  set fontStretch(
    value:
      | `${string}%`
      | "normal"
      | "ultra-condensed"
      | "extra-condensed"
      | "condensed"
      | "semi-condensed"
      | "semi-expanded"
      | "expanded"
      | "extra-expanded"
      | "ultra-expanded"
      | TTypeGlobalFont
  ) {
    this._options.fontStretch = value
  }

  set fontStyle(
    value:
      | "normal"
      | TTypeGlobalFont
      | "italic"
      | "oblique"
      | `oblique ${string}deg`
  ) {
    this._options.fontStyle = value
  }

  set fontWeight(
    value: number | "normal" | TTypeGlobalFont | "bold" | "lighter" | "bolder"
  ) {
    this._options.fontWeight = value
  }

  set fontVariant(value: string) {
    this._options.fontVariant = value
  }

  set lineHeight(
    value:
      | `${string}px`
      | `${string}em`
      | `${string}pc`
      | `${string}cm`
      | `${string}rem`
      | `${string}pt`
      | `${string}inch`
      | `${string}%`
      | "normal"
      | TTypeGlobalFont
  ) {
    this._options.lineHeight = value
  }

  set textAlign(value: "center" | "left" | "right" | "start" | "end") {
    this._options.textAlign = value
  }

  set textBaseline(
    value:
      | "top"
      | "bottom"
      | "hanging"
      | "middle"
      | "alphabetic"
      | "ideographic"
  ) {
    this._options.textBaseline = value
  }

  set textDirection(value: "inherit" | "ltr" | "rtl") {
    this._options.textDirection = value
  }

  set wordSpacing(
    value:
      | `${string}px`
      | `${string}em`
      | `${string}pc`
      | `${string}cm`
      | `${string}rem`
      | `${string}pt`
      | `${string}inch`
      | `${string}%`
  ) {
    this._options.wordSpacing = value
  }

  set letterSpacing(
    value:
      | `${string}px`
      | `${string}em`
      | `${string}pc`
      | `${string}cm`
      | `${string}rem`
      | `${string}pt`
      | `${string}inch`
      | `${string}%`
  ) {
    this._options.letterSpacing = value
  }

  set color(value: string) {
    this._options.color = value
  }

  constructor(options?: Partial<TTypeNodeOptionsContext2D["draw:2D/text"]>) {
    super({ ...DEFAULT_CONFIG_TEXT_2D, ...options })

    this._initial = { ...DEFAULT_CONFIG_TEXT_2D, ...options }
    this._options = this._initial
  }

  reset(property?: keyof TTypeNodeOptionsContext2D["draw:2D/text"]): void {
    if (property) {
      this._options[property] = this._initial[property] as never
    } else {
      this._options = this._initial
    }
  }

  toObject(): TTypeNodeOptionsContext2D["draw:2D/text"] {
    return this._options
  }

  set(
    property: keyof TTypeNodeOptionsContext2D["draw:2D/text"],
    value: any
  ): void
  set(properties: Partial<TTypeNodeOptionsContext2D["draw:2D/text"]>): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[
        property as keyof TTypeNodeOptionsContext2D["draw:2D/text"]
      ] = value as never
    } else if (typeof properties !== "string") {
      for (const [key, value] of Object.entries(this._initial)) {
        this._options[key as keyof TTypeNodeOptionsContext2D["draw:2D/text"]] =
          value as never
      }
    }
  }

  static import(data: string, format: "JSON" | "YAML" = "JSON") {
    const structure: TExportNode<TTypeNodeOptionsContext2D["draw:2D/text"]> =
      format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    return makerNodes2D([structure])[0] as Text2D
  }

  [MethodExport](
    childNode: boolean = true
  ): TExportNode<TTypeNodeOptionsContext2D["draw:2D/text"]> {
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
