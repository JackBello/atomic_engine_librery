import * as YAML from "yaml"
import JSON5 from "json5"
import { DEFAULT_CONFIG_NODE_2D } from "../../../configs/nodes/2D/node"
import { constructorNode } from "../../global/constructor-node"
import { GlobalNode } from "../../global/global-node"
import { ICalculate, IControlNode2D, IHandleCoords2D } from "../nodes-2D.types"
import { PropType } from "../../symbols"
import { TEventGlobalNode, TEventNode2D } from "../../event.type"
import { TFunction } from "../../../types"
import {
  MethodExport,
  MethodExportWorker,
  MethodGetApp
} from "../../../symbols"
import { omitKeys } from "@/app/utils/json"
import {
  INodeWorker,
  TCursorOptions,
  TExportNode,
  TTypeNodes,
  TTypeOrigin,
  TTypeOriginX,
  TTypeOriginY
} from "@/nodes/global/node.types"
import { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types"

export class Node2D
  extends GlobalNode
  implements IControlNode2D, IHandleCoords2D
{
  [PropType]: TCanvasNodes = "2D/node"

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
  protected _options: TCanvasNodeOptions["2D/node"]
  protected _initial: TCanvasNodeOptions["2D/node"]

  readonly NODE_NAME: TTypeNodes = "Node2D"

  get visible() {
    return this._options.visible
  }

  get selectable() {
    return this._options.selectable
  }

  get lock() {
    return this._options.lock
  }

  get cursor() {
    return this._options.cursor
  }

  get opacity() {
    return this._options.opacity
  }

  get x() {
    return this._options.x
  }

  get y() {
    return this._options.y
  }

  get width() {
    return this._options.width
  }

  get height() {
    return this._options.height
  }

  get rotationType() {
    return this._options.rotationType
  }

  get centerScale() {
    return this._options.centerScale
  }

  get centerRotation() {
    return this._options.centerRotation
  }

  get flipX() {
    return this._options.flipX
  }

  get flipY() {
    return this._options.flipY
  }

  get originX() {
    return this._options.originX
  }

  get originY() {
    return this._options.originY
  }

  get scaleX() {
    return this._options.scaleX
  }

  get scaleY() {
    return this._options.scaleY
  }

  get skewX() {
    return this._options.skewX
  }

  get skewY() {
    return this._options.skewY
  }

  get rotation() {
    return this._options.rotation
  }

  set visible(value: boolean) {
    this._options.visible = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        visible: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set selectable(value: boolean) {
    this._options.selectable = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        selectable: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set lock(value: boolean) {
    this._options.lock = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        lock: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set cursor(value: TCursorOptions) {
    this._options.cursor = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        cursor: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set opacity(value: number) {
    this._options.opacity = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        opacity: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set x(value: number) {
    this._options.x = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        x: value,
        calculate: this.processCalculate()
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set y(value: number) {
    this._options.y = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        y: value,
        calculate: this.processCalculate()
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set width(value: number) {
    this._options.width = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        width: value,
        calculate: this.processCalculate()
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set height(value: number) {
    this._options.height = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        height: value,
        calculate: this.processCalculate()
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set rotationType(value: "radians" | "degrees") {
    this._options.rotationType = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        calculate: this.processCalculate()
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set centerScale(value: boolean) {
    this._options.centerScale = value

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set centerRotation(value: boolean) {
    this._options.centerRotation = value

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set flipX(value: boolean) {
    this._options.flipX = value

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set flipY(value: boolean) {
    this._options.flipY = value

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set originX(value: TTypeOriginX) {
    this._options.originX = value

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set originY(value: TTypeOriginY) {
    this._options.originY = value

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set scaleX(value: number) {
    this._options.scaleX = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        scaleX: value,
        calculate: this.processCalculate()
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set scaleY(value: number) {
    this._options.scaleY = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        scaleY: value,
        calculate: this.processCalculate()
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set skewX(value: number) {
    this._options.skewX = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        skewX: value,
        calculate: this.processCalculate()
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set skewY(value: number) {
    this._options.skewY = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        skewY: value,
        calculate: this.processCalculate()
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  set rotation(value: number) {
    this._options.rotation = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        rotation: value,
        calculate: this.processCalculate()
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  constructor(slug: string, options?: Partial<TCanvasNodeOptions["2D/node"]>) {
    super(slug, { ...DEFAULT_CONFIG_NODE_2D, ...options })

    this._initial = { ...DEFAULT_CONFIG_NODE_2D, ...options }
    this._options = { ...this._initial }
  }

  setOrigin(origin: TTypeOrigin): void {
    if (origin === "center") {
      this.originX = origin
      this.originY = origin
    } else {
      const [originY, originX] = origin.split("-") as [
        TTypeOriginY,
        TTypeOriginX
      ]
      this.originX = originX
      this.originY = originY
    }
  }

  setScale(scale: number): void {
    this.scaleX = scale
    this.scaleY = scale
  }

  scaleToWidth(width: number): void {
    this.scaleX = width / this.width
  }

  scaleToHeight(height: number): void {
    this.scaleY = height / this.height
  }

  setSkew(skew: number): void {
    this.skewX = skew
    this.skewY = skew
  }

  center(): void {
    if (this._parent && this._parent instanceof Node2D) {
      this.x =
        ((this._parent.width * this._parent.scaleX) / 2 -
          (this.width * this.scaleX) / 2) /
        2
      this.y =
        ((this._parent.height * this._parent.scaleY) / 2 -
          (this.height * this.scaleY) / 2) /
        2
    } else {
      this.x = this[MethodGetApp]().width / 2
      this.y = this[MethodGetApp]().height / 2
    }
  }

  centerX() {
    if (this._parent && this._parent instanceof Node2D) {
      this.x =
        ((this._parent.width * this._parent.scaleX) / 2 -
          (this.width * this.scaleX) / 2) /
        2
    } else {
      this.x =
        (this[MethodGetApp]().width / 2 - (this.width * this.scaleX) / 2) / 2
    }
  }

  centerY() {
    if (this._parent && this._parent instanceof Node2D) {
      this.y =
        ((this._parent.height * this._parent.scaleY) / 2 -
          (this.height * this.scaleY) / 2) /
        2
    } else {
      this.y =
        (this[MethodGetApp]().height / 2 - (this.height * this.scaleY) / 2) / 2
    }
  }

  processCalculate() {
    const calculate: ICalculate["calculate"] = {
      middleScaleFactor: {
        height: 0,
        width: 0
      },
      rotation: 0,
      scaleFactor: {
        height: 0,
        width: 0
      },
      translate: {
        x: 0,
        y: 0
      },
      scale: {
        x: 0,
        y: 0
      }
    }

    calculate.scale = {
      x: this.scaleX,
      y: this.scaleY
    }

    calculate.translate = {
      x: this.x,
      y: this.y
    }

    calculate.rotation =
      this.rotationType === "degrees"
        ? (this.rotation * Math.PI) / 180
        : this.rotation

    calculate.scaleFactor = {
      width: this.width,
      height: this.height
    }

    calculate.middleScaleFactor = {
      width: calculate.scaleFactor.width / 2,
      height: calculate.scaleFactor.height / 2
    }

    return calculate
  }

  clone(): Node2D {
    return constructorNode(this[MethodExport](true))
  }

  emit(event: TEventGlobalNode | TEventNode2D, callback: TFunction): void {
    return this._events.addEventListener(event, callback)
  }

  reset(property?: keyof TCanvasNodeOptions["2D/node"]): void {
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

  toObject(): TCanvasNodeOptions["2D/node"] {
    return this._options
  }

  set(property: keyof TCanvasNodeOptions["2D/node"], value: any): void
  set(properties: Partial<TCanvasNodeOptions["2D/node"]>): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[property as keyof TCanvasNodeOptions["2D/node"]] =
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
        this._options[key as keyof TCanvasNodeOptions["2D/node"]] =
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

  static import(data: string, format: "JSON" | "YAML" = "JSON"): Node2D {
    const structure: TExportNode<TCanvasNodeOptions["2D/node"]> =
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
  ): TExportNode<TCanvasNodeOptions["2D/node"]> {
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
