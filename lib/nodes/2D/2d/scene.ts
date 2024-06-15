import * as YAML from "yaml"
import JSON5 from "json5"
import { makerNodes2D } from "../../maker-2d"
import { PrimitiveNode } from "../../@global/primitive-node"
import { INodeWorker, TExportNode, TTypeNode } from "../../nodes.types"
import {
  PropType,
  PropAttributes,
  PropFunctions,
  PropMetaKeys
} from "../../symbols"
import { MethodExport, MethodExportWorker } from "../../../symbols"
import { TAllDrawsContext, TTypeNodeOptions } from "@/workers/types"
import { omitKeys } from "@/utils/json"

export class Scene2D extends PrimitiveNode {
  [PropType]: TAllDrawsContext = "primitive:2D/scene"

  readonly NODE_NAME: TTypeNode = "Scene2D"

  constructor(options?: Partial<TTypeNodeOptions["primitive:2D/scene"]>) {
    super(options)
  }

  reset(property?: keyof TTypeNodeOptions["primitive:2D/scene"]): void {
    if (property) {
      this._options[property] = this._initial[property]
      if (!this._omit.includes(property))
        this.getApp().drawer.updateNode(this.deep, "property", "deep", {
          property,
          value: this._initial[property]
        })
    } else {
      this._options = { ...this._initial }
      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: omitKeys(this._initial, this._omit)
      })
    }

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  toObject(): TTypeNodeOptions["primitive:2D/scene"] {
    return this._options
  }

  set(property: keyof TTypeNodeOptions["primitive:2D/scene"], value: any): void
  set(properties: Partial<TTypeNodeOptions["primitive:2D/scene"]>): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[property as keyof TTypeNodeOptions["primitive:2D/scene"]] =
        value as any
      if (!this._omit.includes(property))
        this.getApp().drawer.updateNode(this.deep, "property", "deep", {
          property,
          value
        })
    } else if (typeof properties !== "string") {
      for (const [key, value] of Object.entries(this.properties)) {
        this._options[key as keyof TTypeNodeOptions["primitive:2D/scene"]] =
          value as any
      }
      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: omitKeys(properties, this._omit)
      })
    }

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  static import(data: string, format: "JSON" | "YAML" = "JSON") {
    const structure: TExportNode<TTypeNodeOptions["primitive:2D/scene"]> =
      format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    return makerNodes2D([structure])[0] as Scene2D
  }

  [MethodExportWorker](childNode: boolean = true): INodeWorker {
    const nodes: INodeWorker[] = []

    if (childNode && this.nodes.length)
      for (const node of this.nodes) {
        nodes.push(node[MethodExportWorker](true))
      }

    return {
      __type__: this[PropType],
      deep: this.deep,
      index: this.index,
      nodes: nodes,
      uuid: this.uuid
    }
  }

  [MethodExport](
    childNode: boolean = true
  ): TExportNode<TTypeNodeOptions["primitive:2D/scene"]> {
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
