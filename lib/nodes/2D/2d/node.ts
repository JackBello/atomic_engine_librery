import * as YAML from "yaml"
import JSON5 from "json5"
import { DEFAULT_CONFIG_NODE_2D } from "../../../configs/nodes/2D/node"
import { makerNodes2D } from "../../maker-2d"
import { PrimitiveNode } from "../../@global/primitive-node"
import {
  ICalculate,
  IControlNode2D,
  IHandleCoords2D
} from "../../nodes-2d.types"
import {
  INodeWorker,
  TCursorOptions,
  TExportNode,
  TTypeNode,
  TTypeOrigin,
  TTypeOriginX,
  TTypeOriginY
} from "../../nodes.types"
import { PropType, PropAttributes, PropMetaKeys } from "../../symbols"
import { TEventGlobalNode, TEventNode2D } from "../../event.type"
import { TFunction } from "../../../types"
import { MethodExport, MethodExportWorker } from "../../../symbols"
import { TAllDrawsContext, TTypeNodeOptionsContext2D } from "@/workers/types"
import { omitKeys } from "@/utils/json"

export class Node2D
  extends PrimitiveNode
  implements IControlNode2D, IHandleCoords2D
{
  [PropType]: TAllDrawsContext = "primitive:2D/node"

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
  protected _options: TTypeNodeOptionsContext2D["primitive:2D/node"]
  protected _initial: TTypeNodeOptionsContext2D["primitive:2D/node"]

  readonly NODE_NAME: TTypeNode = "Node2D"

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

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "visible",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set selectable(value: boolean) {
    this._options.selectable = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "selectable",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set lock(value: boolean) {
    this._options.lock = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "lock",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set cursor(value: TCursorOptions) {
    this._options.cursor = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "cursor",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set opacity(value: number) {
    this._options.opacity = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "opacity",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set x(value: number) {
    this._options.x = value

    this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        x: value,
        calculate: this.processCalculate()
      }
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set y(value: number) {
    this._options.y = value

    this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        y: value,
        calculate: this.processCalculate()
      }
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set width(value: number) {
    this._options.width = value

    this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        width: value,
        calculate: this.processCalculate()
      }
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set height(value: number) {
    this._options.height = value

    this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        height: value,
        calculate: this.processCalculate()
      }
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set rotationType(value: "radians" | "degrees") {
    this._options.rotationType = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "calculate",
      value: this.processCalculate()
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set centerScale(value: boolean) {
    this._options.centerScale = value

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set centerRotation(value: boolean) {
    this._options.centerRotation = value

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set flipX(value: boolean) {
    this._options.flipX = value

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set flipY(value: boolean) {
    this._options.flipY = value

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set originX(value: TTypeOriginX) {
    this._options.originX = value

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set originY(value: TTypeOriginY) {
    this._options.originY = value

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set scaleX(value: number) {
    this._options.scaleX = value

    this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        scaleX: value,
        calculate: this.processCalculate()
      }
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set scaleY(value: number) {
    this._options.scaleY = value

    this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        scaleY: value,
        calculate: this.processCalculate()
      }
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set skewX(value: number) {
    this._options.skewX = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "skewX",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set skewY(value: number) {
    this._options.skewY = value

    this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "skewY",
      value
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  set rotation(value: number) {
    this._options.rotation = value

    this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        rotation: value,
        calculate: this.processCalculate()
      }
    })

    this.getApp().drawer.reDraw()

    this.getApp().changeGlobal("re-draw", true)
  }

  constructor(
    options?: Partial<TTypeNodeOptionsContext2D["primitive:2D/node"]>
  ) {
    super({ ...DEFAULT_CONFIG_NODE_2D, ...options })

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
      this.x = this.getApp().width / 2
      this.y = this.getApp().height / 2
    }
  }

  centerX() {
    if (this._parent && this._parent instanceof Node2D) {
      this.x =
        ((this._parent.width * this._parent.scaleX) / 2 -
          (this.width * this.scaleX) / 2) /
        2
    } else {
      this.x = (this.getApp().width / 2 - (this.width * this.scaleX) / 2) / 2
    }
  }

  centerY() {
    if (this._parent && this._parent instanceof Node2D) {
      this.y =
        ((this._parent.height * this._parent.scaleY) / 2 -
          (this.height * this.scaleY) / 2) /
        2
    } else {
      this.y = (this.getApp().height / 2 - (this.height * this.scaleY) / 2) / 2
    }
  }

  processCalculate() {
    const scaleViewport = this.getApp().useGlobal("scale-viewport")

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
      x: this.scaleX * scaleViewport,
      y: this.scaleY * scaleViewport
    }

    calculate.translate = {
      x: this.x * scaleViewport,
      y: this.y * scaleViewport
    }

    calculate.rotation =
      this.rotationType === "degrees"
        ? (this.rotation * Math.PI) / 180
        : this.rotation

    calculate.scaleFactor = {
      width: this.width * scaleViewport,
      height: this.height * scaleViewport
    }

    calculate.middleScaleFactor = {
      width: calculate.scaleFactor.width / 2,
      height: calculate.scaleFactor.height / 2
    }

    return calculate
  }

  emit(event: TEventGlobalNode | TEventNode2D, callback: TFunction): void {
    return this._events.addEventListener(event, callback)
  }

  reset(property?: keyof TTypeNodeOptionsContext2D["primitive:2D/node"]): void {
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

  toObject(): TTypeNodeOptionsContext2D["primitive:2D/node"] {
    return this._options
  }

  set(
    property: keyof TTypeNodeOptionsContext2D["primitive:2D/node"],
    value: any
  ): void
  set(properties: Partial<TTypeNodeOptionsContext2D["primitive:2D/node"]>): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[
        property as keyof TTypeNodeOptionsContext2D["primitive:2D/node"]
      ] = value as never
      if (!this._omit.includes(property))
        this.getApp().drawer.updateNode(this.deep, "property", "deep", {
          property,
          value
        })
    } else if (typeof properties !== "string") {
      for (const [key, value] of Object.entries(this._initial)) {
        this._options[
          key as keyof TTypeNodeOptionsContext2D["primitive:2D/node"]
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
      TTypeNodeOptionsContext2D["primitive:2D/node"]
    > = format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    return makerNodes2D([structure])[0] as Node2D
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
  ): TExportNode<TTypeNodeOptionsContext2D["primitive:2D/node"]> {
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
