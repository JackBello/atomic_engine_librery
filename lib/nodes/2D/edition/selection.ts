import * as YAML from "yaml"
import JSON5 from "json5"
import { TCanvasType } from "../../../canvas/canvas.types"
import {
  IBorder2D,
  ICoords2D,
  INode2D,
  IRectangle2D,
  ISelection2D,
  ISize2D
} from "../../nodes-2d.types"
import {
  IControlEdition,
  IControlEditor,
  TExportNode,
  TOptionalNodes,
  TTypeNode
} from "../../nodes.types"
import { PropAttributes, PropFunctions, PropMetaKeys } from "../../symbols"
import { Node2D } from "../node"
import { makerNodes2D } from "../../maker-2d"
import { DEFAULT_CONFIG_SELECTION_2D } from "../../../configs/nodes/2D/edition/selection"
import { MethodExport } from "../../../symbols"
import { executeOnlyOne } from "../../../utils/functions"
import { omitKeys } from "@/utils/json"

export class Selection2D
  extends Node2D
  implements ISelection2D, IRectangle2D, IBorder2D
{
  protected _initial: IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D &
    ISelection2D &
    IRectangle2D &
    IBorder2D

  protected _selectedNodes: Set<Node2D> = new Set()

  readonly type: TTypeNode = "Selection2D"

  endX: number
  endY: number
  startX: number
  startY: number
  shape: "rectangle" | "circle" | "triangle" | "polygon"
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
        ISelection2D &
        IRectangle2D &
        IBorder2D
    >
  ) {
    super({ ...DEFAULT_CONFIG_SELECTION_2D, ...options })

    this._initial = { ...DEFAULT_CONFIG_SELECTION_2D, ...options }

    this.endX = this._initial.endX
    this.endY = this._initial.endY
    this.startX = this._initial.startX
    this.startY = this._initial.startY
    this.shape = this._initial.shape
    this.background = this._initial.background
    this.radius = this._initial.radius
    this.border = this._initial.border
    this.borderColor = this._initial.borderColor
    this.borderWidth = this._initial.borderWidth
  }

  protected validationPositionNode(node: Node2D) {
    const zoomScale = this.getApp().$global.ZOOM.scale
    const panX = this.getApp().$global.PAN.translateX
    const panY = this.getApp().$global.PAN.translateY

    const nodeX = (node.x - (node.width * node.scaleX) / 2 - panX) / zoomScale
    const nodeY = (node.y - (node.height * node.scaleY) / 2 - panY) / zoomScale

    const rotatedNodeX =
      nodeX * Math.cos((-node.rotation * Math.PI) / 180) -
      nodeY * Math.sin((-node.rotation * Math.PI) / 180)
    const rotatedNodeY =
      nodeX * Math.sin((-node.rotation * Math.PI) / 180) +
      nodeY * Math.cos((-node.rotation * Math.PI) / 180)

    const startX = Math.min(this.startX, this.endX) / zoomScale - panX
    const endX = Math.max(this.startX, this.endX) / zoomScale - panX
    const startY = Math.min(this.startY, this.endY) / zoomScale - panY
    const endY = Math.max(this.startY, this.endY) / zoomScale - panY

    const nodeWidth = (node.width * node.scaleX) / zoomScale
    const nodeHeight = (node.height * node.scaleY) / zoomScale

    return (
      rotatedNodeX >= startX - nodeWidth &&
      rotatedNodeX <= endX &&
      rotatedNodeY >= startY - nodeHeight &&
      rotatedNodeY <= endY
    )
  }

  select(nodes: Node2D[]) {
    for (let childNode of nodes) {
      if (this.validationPositionNode(childNode))
        this._selectedNodes.add(childNode)
      else this._selectedNodes.delete(childNode)
    }
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

    this.getApp().execute("draw:2D/selection", {
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
      ISelection2D &
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
              ISelection2D &
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
    ISelection2D &
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
        "_selectedNodes",
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
      ISelection2D &
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
      ISelection2D &
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
        ISelection2D &
        IRectangle2D &
        IBorder2D
    > = format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    return makerNodes2D([structure])[0] as Selection2D
  }

  [MethodExport](
    childNode: boolean = true
  ): TExportNode<
    IControlEditor &
      IControlEdition &
      ICoords2D &
      ISize2D &
      INode2D &
      ISelection2D &
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
