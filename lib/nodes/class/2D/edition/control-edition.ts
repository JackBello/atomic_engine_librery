import * as YAML from "yaml"
import JSON5 from "json5"
import { PropType } from "../../../symbols"
import { Node2D } from "../node"
import { constructorNode } from "../../../global/constructor-node"
import {
  MethodExport,
  MethodExportWorker,
  MethodGetApp
} from "../../../../symbols"
import { DEFAULT_CONFIG_CONTROL_EDITION_2D } from "../../../../configs/nodes/2D/edition/control-edition"
import {
  INodeWorker,
  TExportNode,
  TTypeNodes
} from "@/nodes/global/node.types"
import { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types"
import { omitKeys } from "@/app/utils/json"

export class ControlEdition2D extends Node2D {
  [PropType]: TCanvasNodes = "2D/control-edition"

  protected _options: TCanvasNodeOptions["2D/control-edition"]
  protected _initial: TCanvasNodeOptions["2D/control-edition"]

  readonly NODE_NAME: TTypeNodes = "ControlEdition2D"

  get padding() {
    return this._options.padding
  }

  get cornerSize() {
    return this._options.cornerSize
  }

  get cornerColor() {
    return this._options.cornerColor
  }

  get cornerBorder() {
    return this._options.cornerBorder
  }

  get cornerColorBorder() {
    return this._options.cornerColorBorder
  }

  get showCorner() {
    return this._options.showCorner
  }

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

  set padding(
    value: number | [number, number] | [number, number, number, number]
  ) {
    this._options.padding = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        padding: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set cornerSize(value: number) {
    this._options.cornerSize = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        cornerSize: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set cornerColor(value: string) {
    this._options.cornerColor = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        cornerColor: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set cornerBorder(value: boolean) {
    this._options.cornerBorder = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        cornerBorder: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set cornerColorBorder(value: string) {
    this._options.cornerColorBorder = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        cornerColorBorder: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set showCorner(
    value:
      | boolean
      | {
          "top-left": boolean
          "top-center": boolean
          "top-right": boolean
          "middle-left": boolean
          "middle-center": boolean
          "middle-right": boolean
          "bottom-left": boolean
          "bottom-center": boolean
          "bottom-right": boolean
        }
  ) {
    this._options.showCorner = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        showCorner: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
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
    options?: Partial<TCanvasNodeOptions["2D/control-edition"]>
  ) {
    super(slug, { ...DEFAULT_CONFIG_CONTROL_EDITION_2D, ...options })

    this._initial = { ...DEFAULT_CONFIG_CONTROL_EDITION_2D, ...options }
    this._options = this._initial
  }

  clone(): ControlEdition2D {
    return constructorNode(this[MethodExport](true))
  }

  reset(property?: keyof TCanvasNodeOptions["2D/control-edition"]): void {
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

  toObject(): TCanvasNodeOptions["2D/control-edition"] {
    return this._options
  }

  set(
    property: keyof TCanvasNodeOptions["2D/control-edition"],
    value: any
  ): void
  set(properties: Partial<TCanvasNodeOptions["2D/control-edition"]>): void
  set(properties?: unknown, value?: unknown, property?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[
        property as keyof TCanvasNodeOptions["2D/control-edition"]
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
        this._options[key as keyof TCanvasNodeOptions["2D/control-edition"]] =
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
  ): ControlEdition2D {
    const structure: TExportNode<TCanvasNodeOptions["2D/control-edition"]> =
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
  ): TExportNode<TCanvasNodeOptions["2D/control-edition"]> {
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
