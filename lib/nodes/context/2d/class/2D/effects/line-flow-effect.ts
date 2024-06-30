import * as YAML from "yaml"
import JSON5 from "json5"
import { INodeWorker, TExportNode, TTypeNode } from "../../../../../nodes.types"
import { PropType, PropAttributes, PropMetaKeys } from "../../../../../symbols"
import { Node2D } from "../node"
import { makerNodes2D } from "../../../../../maker-2d"
import { DEFAULT_CONFIG_LINE_FLOW_EFFECT_2D } from "../../../../../../configs/nodes/2D/effects/line-flow-effect"
import { MethodExport, MethodExportWorker } from "../../../../../../symbols"
import { TAllDrawsContext, TTypeNodeOptionsContext2D } from "@/workers/types"
import { omitKeys } from "@/app/utils/json"

export class LineFlowEffect2D extends Node2D {
  [PropType]: TAllDrawsContext = "draw:2D/line-flow-effect"

  protected _options: TTypeNodeOptionsContext2D["draw:2D/line-flow-effect"]
  protected _initial: TTypeNodeOptionsContext2D["draw:2D/line-flow-effect"]

  readonly NODE_NAME: TTypeNode = "LineFlowEffect2D"

  get cellSize() {
    return this._options.cellSize
  }

  get lineWidth() {
    return this._options.lineWidth
  }

  get spacing() {
    return this._options.spacing
  }

  get color() {
    return this._options.color
  }

  get radius() {
    return this._options.radius
  }

  set cellSize(value: number) {
    this._options.cellSize = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "cellSize",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set lineWidth(value: number) {
    this._options.lineWidth = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "lineWidth",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set spacing(value: number) {
    this._options.spacing = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "spacing",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set color(value: string) {
    this._options.color = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "color",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set radius(value: number) {
    this._options.radius = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "radius",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  constructor(
    options?: Partial<TTypeNodeOptionsContext2D["draw:2D/line-flow-effect"]>
  ) {
    super({ ...DEFAULT_CONFIG_LINE_FLOW_EFFECT_2D, ...options })

    this._initial = { ...DEFAULT_CONFIG_LINE_FLOW_EFFECT_2D, ...options }
    this._options = { ...this._initial }
  }

  reset(
    property?: keyof TTypeNodeOptionsContext2D["draw:2D/line-flow-effect"]
  ): void {
    if (property) {
      this._options[property] = this._initial[property] as never
      if (!this._omit.includes(property))
        this.getApp().drawer.updateNode(this.deep, "property", "deep", {
          property,
          value: this._initial[property]
        })
    } else {
      this._options = { ...this._initial }

      const options = omitKeys(this._initial, this._omit, ["calculate"])

      options.calculate = this.processCalculate()

      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: options
      })
    }

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  toObject(): TTypeNodeOptionsContext2D["draw:2D/line-flow-effect"] {
    return this._options
  }

  set(
    property: keyof TTypeNodeOptionsContext2D["draw:2D/line-flow-effect"],
    value: any
  ): void
  set(
    properties: Partial<TTypeNodeOptionsContext2D["draw:2D/line-flow-effect"]>
  ): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[
        property as keyof TTypeNodeOptionsContext2D["draw:2D/line-flow-effect"]
      ] = value as never
      if (!this._omit.includes(property))
        this.getApp().drawer.updateNode(this.deep, "property", "deep", {
          property,
          value
        })
    } else if (typeof properties !== "string") {
      for (const [key, value] of Object.entries(this._initial)) {
        this._options[
          key as keyof TTypeNodeOptionsContext2D["draw:2D/line-flow-effect"]
        ] = value as never
      }
      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: omitKeys(properties, this._omit)
      })
    }

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  static import(data: string, format: "JSON" | "YAML" = "JSON") {
    const structure: TExportNode<
      TTypeNodeOptionsContext2D["draw:2D/line-flow-effect"]
    > = format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    return makerNodes2D([structure])[0] as LineFlowEffect2D
  }

  [MethodExportWorker](childNode: boolean = true): INodeWorker {
    const nodes: INodeWorker[] = []

    if (childNode && this.nodes.length)
      for (const node of this.nodes) {
        nodes.push(node[MethodExportWorker](true))
      }

    const node = {
      __type__: this[PropType],
      deep: this.deep,
      index: this.index,
      nodes: nodes,
      uuid: this.uuid,
      options: omitKeys(this.toObject(), this._omit, ["calculate"])
    }

    node.options.calculate = this.processCalculate()

    return node
  }

  [MethodExport](
    childNode: boolean = true
  ): TExportNode<TTypeNodeOptionsContext2D["draw:2D/line-flow-effect"]> {
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
      options: this.toObject()
    }
  }
}
