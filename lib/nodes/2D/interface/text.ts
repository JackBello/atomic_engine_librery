import * as YAML from "yaml"
import { TCanvasType } from "../../../canvas/canvas.types"
import {
  ICoords2D,
  INode2D,
  IBorder2D,
  IText2D,
  ISize2D
} from "../../nodes-2d.types"
import {
  IControlEdition,
  IControlEditor,
  TExportNode,
  TOptionalNodes,
  TTypeGlobalFont,
  TTypeNode
} from "../../nodes.types"
import { PropAttributes, PropFunctions, PropMetaKeys } from "../../symbols"
import { Node2D } from "../node"
import { makerNodes2D } from "../../maker-2d"
import { DEFAULT_CONFIG_TEXT_2D } from "../../../configs/nodes/2D/interface/text"
import { MethodExport } from "../../../symbols"

export class Text2D extends Node2D implements IText2D {
  protected _initial: IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    IBorder2D &
    IText2D

  readonly type: TTypeNode = "Text2D"

  border: boolean
  borderColor: string
  borderWidth: number
  text: string
  fontSize:
    | `${string}px`
    | `${string}em`
    | `${string}pc`
    | `${string}cm`
    | `${string}rem`
    | `${string}pt`
    | `${string}inch`
    | `${string}%`
  fontFamily: string
  fontStretch:
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
  fontStyle:
    | "normal"
    | TTypeGlobalFont
    | "italic"
    | "oblique"
    | `oblique ${string}deg`
  fontWeight:
    | number
    | "normal"
    | TTypeGlobalFont
    | "bold"
    | "lighter"
    | "bolder"
  fontVariant: string
  lineHeight:
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
  textAlign: "center" | "left" | "right" | "start" | "end"
  textBaseline:
    | "top"
    | "bottom"
    | "hanging"
    | "middle"
    | "alphabetic"
    | "ideographic"
  textDirection: "inherit" | "ltr" | "rtl"
  wordSpacing:
    | `${string}px`
    | `${string}em`
    | `${string}pc`
    | `${string}cm`
    | `${string}rem`
    | `${string}pt`
    | `${string}inch`
    | `${string}%`
  letterSpacing:
    | `${string}px`
    | `${string}em`
    | `${string}pc`
    | `${string}cm`
    | `${string}rem`
    | `${string}pt`
    | `${string}inch`
    | `${string}%`
  color: string

  constructor(
    options?: Partial<
      IControlEditor &
        IControlEdition &
        ICoords2D &
        ISize2D &
        INode2D &
        IBorder2D &
        IText2D
    >
  ) {
    super({ ...DEFAULT_CONFIG_TEXT_2D, ...options })

    this._initial = { ...DEFAULT_CONFIG_TEXT_2D, ...options }

    this.border = this._initial.border
    this.borderColor = this._initial.borderColor
    this.borderWidth = this._initial.borderWidth
    this.text = this._initial.text
    this.fontSize = this._initial.fontSize
    this.fontFamily = this._initial.fontFamily
    this.fontStretch = this._initial.fontStretch
    this.fontStyle = this._initial.fontStyle
    this.fontWeight = this._initial.fontWeight
    this.fontVariant = this._initial.fontVariant
    this.lineHeight = this._initial.lineHeight
    this.textAlign = this._initial.textAlign
    this.textBaseline = this._initial.textBaseline
    this.textDirection = this._initial.textDirection
    this.wordSpacing = this._initial.wordSpacing
    this.letterSpacing = this._initial.letterSpacing
    this.color = this._initial.color
  }

  render(canvas: TCanvasType): void {
    this.getApp().execute("canvas:save", canvas)

    this.getApp().execute("draw:text", canvas, {
      ...this.toObject()
    })

    const _draw = this.getFunction("_draw")
    const _ready = this.getFunction("_ready")

    const mode =
      this.getApp().$global.MODE === "preview" ||
      this.getApp().$global.MODE === "game"

    if (_ready && mode) _ready()
    if (_draw && mode) _draw()

    this.getApp().execute("canvas:restore", canvas)
  }

  update(
    canvas: TCanvasType,
    animation: {
      timestamp: number
      deltaTime: number
      frame: number
    }
  ): void {
    this.getApp().execute("canvas:save", canvas)

    this.getApp().execute("draw:text", canvas, {
      ...this.toObject()
    })

    const _draw = this.getFunction("_draw")
    const _process = this.getFunction("_process")

    const mode =
      this.getApp().$global.MODE === "preview" ||
      this.getApp().$global.MODE === "game"

    if (_draw && mode) _draw()
    if (_process && mode) _process(animation)

    this.getApp().execute("canvas:restore", canvas)
  }

  destroy(canvas: TCanvasType): void {
    this.getApp().execute("canvas:save", canvas)

    const _destroyed = this.getFunction("_destroyed")

    const mode =
      this.getApp().$global.MODE === "preview" ||
      this.getApp().$global.MODE === "game"

    if (_destroyed && mode) _destroyed()

    this.getApp().execute("canvas:restore", canvas)
  }

  reset(
    property?: keyof (IControlEditor &
      IControlEdition &
      ICoords2D &
      ISize2D &
      INode2D &
      IBorder2D &
      IText2D)
  ): void {
    if (property) {
      this[property as string] = this._initial[property]
    } else {
      for (const key of Object.keys(this._initial)) {
        this[key] =
          this._initial[
            key as keyof (IControlEditor &
              IControlEdition &
              ICoords2D &
              ISize2D &
              INode2D &
              IBorder2D &
              IText2D)
          ]
      }
    }
  }

  toObject(): IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    IBorder2D &
    IText2D {
    return {
      ...this
    }
  }

  set(
    property: keyof (IControlEditor &
      IControlEdition &
      ICoords2D &
      ISize2D &
      INode2D &
      IBorder2D &
      IText2D),
    value: any
  ): void
  set(
    properties: IControlEditor &
      IControlEdition &
      ICoords2D &
      ISize2D &
      INode2D &
      IBorder2D &
      IText2D
  ): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this[property] = value
    } else if (typeof properties !== "string") {
      for (const [key, value] of Object.entries(this._initial)) {
        this[key] = value
      }
    }
  }

  static import(data: string, format: "JSON" | "YAML" = "JSON") {
    const structure: TExportNode<
      IControlEditor &
        IControlEdition &
        ICoords2D &
        ISize2D &
        INode2D &
        IBorder2D &
        IText2D
    > = format === "YAML" ? YAML.parse(data) : JSON.parse(data)

    return makerNodes2D([structure])[0] as Text2D
  }

  [MethodExport](
    childNode: boolean = true
  ): TExportNode<
    IControlEditor &
      IControlEdition &
      ICoords2D &
      ISize2D &
      INode2D &
      IBorder2D &
      IText2D
  > &
    TOptionalNodes<"children"> {
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
      script: this.script,
      parent: this.parent,
      deep: this.deep,
      index: this.index,
      nodes,
      options: {
        ...this.toObject()
      }
    }
  }
}
