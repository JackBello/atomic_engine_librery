import * as YAML from "yaml"
import JSON5 from "json5"
import { Collision2D } from "./collision"
import { PropType } from "@/nodes/symbols"
import { DEFAULT_CONFIG_COLLISION_SHAPE_2D } from "@/configs/nodes/2D/collision-shape"
import { TEventGlobalNode } from "@/nodes/event.type"
import { TFunction } from "@/types"
import { omitKeys } from "@/app/utils/json"
import { MethodExport, MethodExportWorker, MethodGetApp } from "@/symbols"
import { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types"
import {
  INodeWorker,
  TExportNode,
  TTypeNodes
} from "@/nodes/@global/node.types"
import { constructorNode } from "@/nodes/@global/constructor-node"

export class CollisionShape2D extends Collision2D {
  [PropType]: TCanvasNodes = "2D/handler/collision-shape"

  protected _options: TCanvasNodeOptions["2D/handler/collision-shape"]
  protected _initial: TCanvasNodeOptions["2D/handler/collision-shape"]

  protected _omit: string[] = [
    "centerRotation",
    "centerScale",
    "flipX",
    "flipY",
    "originX",
    "originY",
    "rotationType",
    "title",
    "name"
  ]

  readonly NODE_NAME: TTypeNodes = "CollisionShape2D"

  get shape() {
    return this._options.shape
  }

  get color() {
    return this._options.color
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

  constructor(
    slug: string,
    options?: Partial<TCanvasNodeOptions["2D/handler/collision-shape"]>
  ) {
    super(slug, { ...DEFAULT_CONFIG_COLLISION_SHAPE_2D, ...options })

    this._initial = { ...DEFAULT_CONFIG_COLLISION_SHAPE_2D, ...options }
    this._options = { ...this._initial }
  }

  clone(): CollisionShape2D {
    return constructorNode(this[MethodExport](true))
  }

  emit(event: TEventGlobalNode, callback: TFunction): void {
    return this._events.addEventListener(event, callback)
  }

  reset(
    property?: keyof TCanvasNodeOptions["2D/handler/collision-shape"]
  ): void {
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

  toObject(): TCanvasNodeOptions["2D/handler/collision-shape"] {
    return this._options
  }

  set(
    property: keyof TCanvasNodeOptions["2D/handler/collision-shape"],
    value: any
  ): void
  set(
    properties: Partial<TCanvasNodeOptions["2D/handler/collision-shape"]>
  ): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[
        property as keyof TCanvasNodeOptions["2D/handler/collision-shape"]
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
        this._options[
          key as keyof TCanvasNodeOptions["2D/handler/collision-shape"]
        ] = value as never
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
  ): CollisionShape2D {
    const structure: TExportNode<
      TCanvasNodeOptions["2D/handler/collision-shape"]
    > = format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

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
  ): TExportNode<TCanvasNodeOptions["2D/handler/collision-shape"]> {
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
