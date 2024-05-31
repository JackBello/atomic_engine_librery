import * as YAML from "yaml"
import JSON5 from "json5"
import { DEFAULT_CONFIG_RECTANGLE_2D } from "../../../configs/nodes/2D/shapes/rectangle"
import {
  IRectangle2D,
  IBorder2D,
  ICoords2D,
  INode2D,
  ISize2D
} from "../../nodes-2d.types"
import { Node2D } from "../node"
import { makerNodes2D } from "../../maker-2d"
import {
  IControlEdition,
  IControlEditor,
  TExportNode,
  TOptionalNodes,
  TTypeNode
} from "../../nodes.types"
import { PropAttributes, PropFunctions, PropMetaKeys } from "../../symbols"
import { TCanvasType } from "../../../canvas/canvas.types"
import { MethodExport } from "../../../symbols"
import { executeOnlyOne } from "../../../utils/functions"
import { omitKeys } from "@/utils/json"

export class Rectangle2D extends Node2D implements IRectangle2D, IBorder2D {
  protected _initial: IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    IRectangle2D &
    IBorder2D

  readonly type: TTypeNode = "Rectangle2D"

  background: string
  radius:
    | number
    | [number, number]
    | {
        topLeft: number
        topRight: number
        bottomLeft: number
        bottomRight: number
      }
  border: boolean
  borderColor: string
  borderWidth: number

  constructor(
    options?: Partial<
      IControlEditor &
        IControlEdition &
        ICoords2D &
        ISize2D &
        INode2D &
        IRectangle2D &
        IBorder2D
    >
  ) {
    super({ ...DEFAULT_CONFIG_RECTANGLE_2D, ...options })

    this._initial = { ...DEFAULT_CONFIG_RECTANGLE_2D, ...options }

    this.background = this._initial.background
    this.radius = this._initial.radius
    this.border = this._initial.border
    this.borderColor = this._initial.borderColor
    this.borderWidth = this._initial.borderWidth
  }

  async process(): Promise<void>
  async process(
    canvas?: TCanvasType,
    animation?: {
      timestamp: number
      deltaTime: number
      frame: number
    }
  ): Promise<void> {
    if (canvas === undefined && animation !== undefined) return

    this.getApp().execute("canvas:save", true)

    this.processCalculate()

    this.getApp().execute("draw:2D/rectangle", {
      ...this.toObject(),
      calculate: this._calculate
    })

    if (this.script) {
      const _draw = this.getFunction("_draw")
      const _ready = this.getFunction("_ready")
      const _process = this.getFunction("_process")

      const mode =
        this.getApp().useGlobal("mode") === "preview" ||
        this.getApp().useGlobal("mode") === "game"

      if (_draw && mode) _draw()
      if (_ready && mode) executeOnlyOne(_ready).call(null)
      if (_process && mode) _process(animation)
    }

    this.getApp().execute("canvas:restore", true)
  }

  reset(
    property?: keyof (IControlEditor &
      IControlEdition &
      ICoords2D &
      ISize2D &
      INode2D &
      IRectangle2D &
      IBorder2D)
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
              IRectangle2D &
              IBorder2D)
          ]
      }
    }
  }

  toObject(): IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    IRectangle2D &
    IBorder2D {
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
        "_calculate",
        "hierarchy",
        "type",
        "script"
      ]
    )
  }

  set(
    property: keyof (IControlEditor &
      IControlEdition &
      ICoords2D &
      ISize2D &
      INode2D &
      IRectangle2D &
      IBorder2D),
    value: any
  ): void
  set(
    properties: IControlEditor &
      IControlEdition &
      ICoords2D &
      ISize2D &
      INode2D &
      IRectangle2D &
      IBorder2D
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
        IRectangle2D &
        IBorder2D
    > = format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    return makerNodes2D([structure])[0] as Rectangle2D
  }

  [MethodExport](
    childNode: boolean = true
  ): TExportNode<
    IControlEditor &
      IControlEdition &
      ICoords2D &
      ISize2D &
      INode2D &
      IRectangle2D &
      IBorder2D
  > &
    TOptionalNodes<"children"> {
    const nodes = []

    if (childNode)
      for (const node of this.nodes) {
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
      deep: this.deep,
      index: this.index,
      nodes,
      options: {
        ...this.toObject()
      }
    }
  }
}
