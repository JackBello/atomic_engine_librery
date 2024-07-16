import * as YAML from "yaml"
import JSON5 from "json5"
import { PropType } from "../../../symbols"
import { Node2D } from "../node"
import { constructorNode } from "../../../global/constructor-node"
import { DEFAULT_CONFIG_SELECTION_2D } from "../../../../configs/nodes/2D/edition/selection"
import {
  MethodDispatchEvent,
  MethodExport,
  MethodExportWorker,
  MethodGetApp
} from "../../../../symbols"
import { TFunction } from "@/types"
import {
  TEventGlobalNode,
  TEventNode2D,
  TEventSelection2D
} from "@/nodes/event.type"
import {
  INodeWorker,
  TExportNode,
  TTypeNodes
} from "@/nodes/global/node.types"
import { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types"
import { omitKeys } from "@/app/utils/json"

export class Selection2D extends Node2D {
  [PropType]: TCanvasNodes = "2D/selection"

  protected _options: TCanvasNodeOptions["2D/selection"]
  protected _initial: TCanvasNodeOptions["2D/selection"]

  protected _selectedNodes: Set<Node2D> = new Set()

  protected _intersectionNode: (node: Node2D) => boolean = () => false

  readonly NODE_NAME: TTypeNodes = "Selection2D"

  get endX() {
    return this._options.endX
  }

  get endY() {
    return this._options.endY
  }

  get startX() {
    return this._options.startX
  }

  get startY() {
    return this._options.startY
  }

  get shape() {
    return this._options.shape
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

  set endX(value: number) {
    this._options.endX = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        endX: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set endY(value: number) {
    this._options.endY = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        endY: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set startX(value: number) {
    this._options.startX = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        startX: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set startY(value: number) {
    this._options.startY = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        startY: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set shape(value: "rectangle" | "circle" | "triangle" | "polygon") {
    this._options.shape = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        shape: value
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
    options?: Partial<TCanvasNodeOptions["2D/selection"]>
  ) {
    super(slug, { ...DEFAULT_CONFIG_SELECTION_2D, ...options })

    this._initial = { ...DEFAULT_CONFIG_SELECTION_2D, ...options }
    this._options = this._initial
  }

  setIntersectionNode(func: (node: Node2D) => boolean) {
    this._intersectionNode = func
  }

  select(nodes: Node2D[]) {
    for (let childNode of nodes) {
      if (this._intersectionNode(childNode)) this._selectedNodes.add(childNode)
      else this._selectedNodes.delete(childNode)
    }
    this[MethodDispatchEvent]("selection2D:nodes", [...this._selectedNodes])
  }

  clone(): Selection2D {
    return constructorNode(this[MethodExport](true))
  }

  emit(
    event: TEventGlobalNode | TEventNode2D | TEventSelection2D,
    callback: TFunction
  ): void {
    return this._events.addEventListener(event, callback)
  }

  reset(property?: keyof TCanvasNodeOptions["2D/selection"]): void {
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

  toObject(): TCanvasNodeOptions["2D/selection"] {
    return this._options
  }

  set(property: keyof TCanvasNodeOptions["2D/selection"], value: any): void
  set(properties: Partial<TCanvasNodeOptions["2D/selection"]>): void
  set(properties?: unknown, value?: unknown, property?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[property as keyof TCanvasNodeOptions["2D/selection"]] =
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
        this._options[key as keyof TCanvasNodeOptions["2D/selection"]] =
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

  static import(data: string, format: "JSON" | "YAML" = "JSON"): Selection2D {
    const structure: TExportNode<TCanvasNodeOptions["2D/selection"]> =
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
  ): TExportNode<TCanvasNodeOptions["2D/selection"]> {
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
