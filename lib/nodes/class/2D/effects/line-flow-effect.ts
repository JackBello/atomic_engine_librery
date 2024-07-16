import * as YAML from "yaml"
import JSON5 from "json5"
import { PropType } from "../../../symbols"
import { Node2D } from "../node"
import { constructorNode } from "../../../global/constructor-node"
import { DEFAULT_CONFIG_LINE_FLOW_EFFECT_2D } from "../../../../configs/nodes/2D/effects/line-flow-effect"
import {
  MethodExport,
  MethodExportWorker,
  MethodGetApp
} from "../../../../symbols"
import { omitKeys } from "@/app/utils/json"
import { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types"
import {
  INodeWorker,
  TExportNode,
  TTypeNodes
} from "@/nodes/global/node.types"

export class LineFlowEffect2D extends Node2D {
  [PropType]: TCanvasNodes = "2D/line-flow-effect"

  protected _options: TCanvasNodeOptions["2D/line-flow-effect"]
  protected _initial: TCanvasNodeOptions["2D/line-flow-effect"]

  readonly NODE_NAME: TTypeNodes = "LineFlowEffect2D"

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

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        cellSize: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set lineWidth(value: number) {
    this._options.lineWidth = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        lineWidth: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set spacing(value: number) {
    this._options.spacing = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        spacing: value
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

  set radius(value: number) {
    this._options.radius = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        radius: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  constructor(
    slug: string,
    options?: Partial<TCanvasNodeOptions["2D/line-flow-effect"]>
  ) {
    super(slug, { ...DEFAULT_CONFIG_LINE_FLOW_EFFECT_2D, ...options })

    this._initial = { ...DEFAULT_CONFIG_LINE_FLOW_EFFECT_2D, ...options }
    this._options = { ...this._initial }
  }

  clone(): LineFlowEffect2D {
    return constructorNode(this[MethodExport](true))
  }

  reset(property?: keyof TCanvasNodeOptions["2D/line-flow-effect"]): void {
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

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  toObject(): TCanvasNodeOptions["2D/line-flow-effect"] {
    return this._options
  }

  set(
    property: keyof TCanvasNodeOptions["2D/line-flow-effect"],
    value: any
  ): void
  set(properties: Partial<TCanvasNodeOptions["2D/line-flow-effect"]>): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[
        property as keyof TCanvasNodeOptions["2D/line-flow-effect"]
      ] = value as never

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
        this._options[key as keyof TCanvasNodeOptions["2D/line-flow-effect"]] =
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

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  static import(
    data: string,
    format: "JSON" | "YAML" = "JSON"
  ): LineFlowEffect2D {
    const structure: TExportNode<TCanvasNodeOptions["2D/line-flow-effect"]> =
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
  ): TExportNode<TCanvasNodeOptions["2D/line-flow-effect"]> {
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
