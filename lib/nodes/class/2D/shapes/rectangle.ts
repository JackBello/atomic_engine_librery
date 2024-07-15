import * as YAML from "yaml"
import JSON5 from "json5"
import { DEFAULT_CONFIG_RECTANGLE_2D } from "../../../../configs/nodes/2D/shapes/rectangle"
import { Node2D } from "../node"
import { constructorNode } from "../../../@global/constructor-node"
import { PropType } from "../../../symbols"
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
} from "@/nodes/@global/node.types"

export class Rectangle2D extends Node2D {
  [PropType]: TCanvasNodes = "2D/rectangle"

  protected _options: TCanvasNodeOptions["2D/rectangle"]
  protected _initial: TCanvasNodeOptions["2D/rectangle"]

  readonly NODE_NAME: TTypeNodes = "Rectangle2D"

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

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        background: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
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

  constructor(
    slug: string,
    options?: Partial<TCanvasNodeOptions["2D/rectangle"]>
  ) {
    super(slug, { ...DEFAULT_CONFIG_RECTANGLE_2D, ...options })

    this._initial = { ...DEFAULT_CONFIG_RECTANGLE_2D, ...options }
    this._options = { ...this._initial }
  }

  clone(): Rectangle2D {
    return constructorNode(this[MethodExport](true))
  }

  reset(property?: keyof TCanvasNodeOptions["2D/rectangle"]): void {
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

  toObject(): TCanvasNodeOptions["2D/rectangle"] {
    return this._options
  }

  set(property: keyof TCanvasNodeOptions["2D/rectangle"], value: any): void
  set(properties: Partial<TCanvasNodeOptions["2D/rectangle"]>): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[property as keyof TCanvasNodeOptions["2D/rectangle"]] =
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
        this._options[key as keyof TCanvasNodeOptions["2D/rectangle"]] =
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

  static import(data: string, format: "JSON" | "YAML" = "JSON"): Rectangle2D {
    const structure: TExportNode<TCanvasNodeOptions["2D/rectangle"]> =
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
  ): TExportNode<TCanvasNodeOptions["2D/rectangle"]> {
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
