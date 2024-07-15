import * as YAML from "yaml"
import JSON5 from "json5"
import { PropType } from "../../../symbols"
import { Node2D } from "../node"
import { constructorNode } from "../../../@global/constructor-node"
import { DEFAULT_CONFIG_TEXT_2D } from "../../../../configs/nodes/2D/interface/text"
import {
  MethodExport,
  MethodExportWorker,
  MethodGetApp
} from "../../../../symbols"
import { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types"
import {
  INodeWorker,
  TExportNode,
  TTypeGlobalFont,
  TTypeNodes
} from "@/nodes/@global/node.types"
import { omitKeys } from "@/app/utils/json"

export class Text2D extends Node2D {
  [PropType]: TCanvasNodes = "2D/text"

  protected _options: TCanvasNodeOptions["2D/text"]
  protected _initial: TCanvasNodeOptions["2D/text"]

  readonly NODE_NAME: TTypeNodes = "Text2D"

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

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        border: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set borderColor(value: string) {
    this._options.borderColor = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        borderColor: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set borderWidth(value: number) {
    this._options.borderWidth = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        borderWidth: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set text(value: string) {
    this._options.text = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        text: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
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

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        fontSize: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set fontFamily(value: string) {
    this._options.fontFamily = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        fontFamily: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
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

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        fontStretch: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
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

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        fontStyle: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set fontWeight(
    value: number | "normal" | TTypeGlobalFont | "bold" | "lighter" | "bolder"
  ) {
    this._options.fontWeight = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        fontWeight: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set fontVariant(value: string) {
    this._options.fontVariant = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        fontVariant: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
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

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        lineHeight: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set textAlign(value: "center" | "left" | "right" | "start" | "end") {
    this._options.textAlign = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        textAlign: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
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

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        textBaseline: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set textDirection(value: "inherit" | "ltr" | "rtl") {
    this._options.textDirection = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        textDirection: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
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

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        wordSpacing: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
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

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        letterSpacing: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set color(value: string) {
    this._options.color = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        color: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  constructor(slug: string, options?: Partial<TCanvasNodeOptions["2D/text"]>) {
    super(slug, { ...DEFAULT_CONFIG_TEXT_2D, ...options })

    this._initial = { ...DEFAULT_CONFIG_TEXT_2D, ...options }
    this._options = this._initial
  }

  clone(): Text2D {
    return constructorNode(this[MethodExport](true))
  }

  reset(property?: keyof TCanvasNodeOptions["2D/text"]): void {
    if (property) {
      this._options[property] = this._initial[property] as never

      if (!this._omit.includes(property)) {
        const relative: any = {}

        relative[property] = this._initial[property]
        relative.calculate = this.processCalculate()

        this[MethodGetApp]().drawer.nodes.updateNode(
          relative,
          this.path,
          "path",
          "index"
        )
      }
    } else {
      this._options = { ...this._initial }

      const options = omitKeys(this._initial, this._omit, ["calculate"])
      options.calculate = this.processCalculate()

      this[MethodGetApp]().drawer.nodes.updateNode(
        options,
        this.path,
        "path",
        "index"
      )
    }
  }

  toObject(): TCanvasNodeOptions["2D/text"] {
    return this._options
  }

  set(property: keyof TCanvasNodeOptions["2D/text"], value: any): void
  set(properties: Partial<TCanvasNodeOptions["2D/text"]>): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[property as keyof TCanvasNodeOptions["2D/text"]] =
        value as never

      if (!this._omit.includes(property)) {
        const relative: any = {}

        relative[property] = value
        relative.calculate = this.processCalculate()

        this[MethodGetApp]().drawer.nodes.updateNode(
          relative,
          this.path,
          "path",
          "index"
        )
      }
    } else if (typeof properties !== "string") {
      for (const [key, value] of Object.entries(this._initial)) {
        this._options[key as keyof TCanvasNodeOptions["2D/text"]] =
          value as never
      }

      const options = omitKeys(this._initial, this._omit, ["calculate"])
      options.calculate = this.processCalculate()

      this[MethodGetApp]().drawer.nodes.updateNode(
        options,
        this.path,
        "path",
        "index"
      )
    }
  }

  static import(data: string, format: "JSON" | "YAML" = "JSON"): Text2D {
    const structure: TExportNode<TCanvasNodeOptions["2D/text"]> =
      format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    return constructorNode(structure)
  }

  [MethodExportWorker](childNode: boolean = true): INodeWorker {
    const nodes: INodeWorker[] = []

    if (childNode && this.$nodes.size)
      for (const node of this.$nodes.all) {
        nodes.push(node[MethodExportWorker](true) as INodeWorker)
      }

    const node = {
      __type__: this[PropType],
      __path__: this.path,
      __root__: {} as any,
      parent: this.parent ? this.parent[MethodExportWorker](false) : undefined,
      location: {
        id: this.id,
        index: this.index,
        slug: this.slug
      },
      nodes: nodes,
      options: omitKeys(this.toObject(), this._omit, ["calculate"])
    }

    node.options.calculate = this.processCalculate()

    return node
  }

  [MethodExport](
    childNode: boolean = true
  ): TExportNode<TCanvasNodeOptions["2D/text"]> {
    const nodes: TExportNode<any>[] = []

    if (childNode && this.$nodes.size)
      for (const node of this.$nodes.all) {
        nodes.push(node[MethodExport](childNode))
      }

    return {
      id: this.id,
      slug: this.slug,
      attributes: this.$attributes.toEntries(),
      metaKeys: this.$metaKeys.toEntries(),
      type: this.NODE_NAME,
      script: this.script,
      path: this.path,
      index: this.index,
      nodes,
      options: this.toObject()
    }
  }
}
