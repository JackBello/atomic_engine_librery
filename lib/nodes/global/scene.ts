import * as YAML from "yaml"
import JSON5 from "json5"
import { GlobalNode } from "./global-node"
import { TCanvasNodes, TCanvasNodeOptions } from "../types"
import { PropType } from "../symbols"
import {
  INodeRootWorker,
  INodeWorker,
  TExportNode,
  TTypeNodes
} from "./node.types"
import { omitKeys } from "@/app/utils/json"
import { constructorNode } from "./constructor-node"
import { MethodExport, MethodExportWorker, MethodGetApp } from "@/symbols"
import { TEventNode, TEventScene } from "../event.type"
import { TFunction } from "@/types"

export class Scene extends GlobalNode {
  [PropType]: TCanvasNodes = "global/scene"

  readonly NODE_NAME: TTypeNodes = "Scene"

  constructor(
    slug: string,
    options?: Partial<TCanvasNodeOptions["global/scene"]>
  ) {
    super(slug, options)
  }

  clone(): Scene {
    return constructorNode(this[MethodExport](true))
  }

  emit(event: TEventNode | TEventScene, callback: TFunction): void {
    return this._events.addEventListener(event, callback)
  }

  reset(property?: keyof TCanvasNodeOptions["global/scene"]): void {
    if (property) {
      this._options[property] = this._initial[property]

      if (!this._omit.includes(property)) {
        const relative: any = {}

        relative[property] = this._initial[property]

        this[MethodGetApp]().drawer.nodes.updateNode(
          relative,
          this.path,
          "path",
          "index"
        )
      }
    } else {
      this._options = { ...this._initial }

      this[MethodGetApp]().drawer.nodes.updateNode(
        omitKeys(this._initial, this._omit),
        this.path,
        "path",
        "index"
      )
    }

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  toObject(): TCanvasNodeOptions["global/scene"] {
    return this._options
  }

  set(property: keyof TCanvasNodeOptions["global/scene"], value: any): void
  set(properties: Partial<TCanvasNodeOptions["global/scene"]>): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[property as keyof TCanvasNodeOptions["global/scene"]] =
        value as any

      if (!this._omit.includes(property)) {
        const relative: any = {}

        relative[property] = value

        this[MethodGetApp]().drawer.nodes.updateNode(
          relative,
          this.path,
          "path",
          "index"
        )
      }
    } else if (typeof properties !== "string") {
      for (const [key, value] of Object.entries(this.properties)) {
        this._options[key as keyof TCanvasNodeOptions["global/scene"]] =
          value as any
      }

      this[MethodGetApp]().drawer.nodes.updateNode(
        omitKeys(properties, this._omit),
        this.path,
        "path",
        "index"
      )
    }

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  static import(data: string, format: "JSON" | "YAML" = "JSON") {
    const structure: TExportNode<TCanvasNodeOptions["global/scene"]> =
      format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    return constructorNode(structure) as Scene
  }

  [MethodExportWorker](childNode: boolean = true): INodeRootWorker {
    const nodes: INodeWorker[] = []

    if (childNode && this.$nodes.size)
      for (const node of this.$nodes.all) {
        nodes.push(node[MethodExportWorker](true) as INodeWorker)
      }

    return {
      __type__: this[PropType],
      __path__: this.path,
      location: {
        id: this.id,
        index: this.index,
        slug: this.slug
      },
      nodes: nodes
    }
  }

  [MethodExport](
    childNode: boolean = true
  ): TExportNode<TCanvasNodeOptions["global/scene"]> {
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
