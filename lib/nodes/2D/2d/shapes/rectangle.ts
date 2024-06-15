import * as YAML from "yaml"
import JSON5 from "json5"
import { DEFAULT_CONFIG_RECTANGLE_2D } from "../../../../configs/nodes/2D/shapes/rectangle"
import { Node2D } from "../node"
import { makerNodes2D } from "../../../maker-2d"
import { INodeWorker, TExportNode, TTypeNode } from "../../../nodes.types"
import {
  PropType,
  PropAttributes,
  PropFunctions,
  PropMetaKeys
} from "../../../symbols"
import { MethodExport, MethodExportWorker } from "../../../../symbols"
import { TAllDrawsContext, TTypeNodeOptions } from "@/workers/types"
import { omitKeys } from "@/utils/json"

export class Rectangle2D extends Node2D {
  [PropType]: TAllDrawsContext = "draw:2D/rectangle"

  protected _options: TTypeNodeOptions["draw:2D/rectangle"]
  protected _initial: TTypeNodeOptions["draw:2D/rectangle"]

  readonly NODE_NAME: TTypeNode = "Rectangle2D"

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

  set background(value: string) {
    this._options.background = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "background",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
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

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "radius",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set border(value: boolean) {
    this._options.border = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "border",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set borderColor(value: string) {
    this._options.borderColor = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "borderColor",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set borderWidth(value: number) {
    this._options.borderWidth = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "borderWidth",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  constructor(options?: Partial<TTypeNodeOptions["draw:2D/rectangle"]>) {
    super({ ...DEFAULT_CONFIG_RECTANGLE_2D, ...options })

    this._initial = { ...DEFAULT_CONFIG_RECTANGLE_2D, ...options }
    this._options = { ...this._initial }
  }

  reset(property?: keyof TTypeNodeOptions["draw:2D/rectangle"]): void {
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

  toObject(): TTypeNodeOptions["draw:2D/rectangle"] {
    return this._options
  }

  set(property: keyof TTypeNodeOptions["draw:2D/rectangle"], value: any): void
  set(properties: Partial<TTypeNodeOptions["draw:2D/rectangle"]>): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[property as keyof TTypeNodeOptions["draw:2D/rectangle"]] =
        value as never
      if (!this._omit.includes(property))
        this.getApp().drawer.updateNode(this.deep, "property", "deep", {
          property,
          value
        })
    } else if (typeof properties !== "string") {
      for (const [key, value] of Object.entries(this._initial)) {
        this._options[key as keyof TTypeNodeOptions["draw:2D/rectangle"]] =
          value as never
      }
      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: omitKeys(properties, this._omit)
      })
    }

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  static import(data: string, format: "JSON" | "YAML" = "JSON") {
    const structure: TExportNode<TTypeNodeOptions["draw:2D/rectangle"]> =
      format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    return makerNodes2D([structure])[0] as Rectangle2D
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
  ): TExportNode<TTypeNodeOptions["draw:2D/rectangle"]> {
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
      options: this.toObject()
    }
  }
}
