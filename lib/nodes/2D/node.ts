import * as YAML from "yaml"
import { DEFAULT_CONFIG_NODE_2D } from "../../configs/nodes/2D/node"
import { makerNodes2D } from "../maker-2d"
import { GlobalNode } from "../@global/node"
import {
  ICalculate,
  IControlNode2D,
  ICoords2D,
  IHandleCoords2D,
  INode2D,
  ISize2D
} from "../nodes-2d.types"
import {
  IControlEdition,
  IControlEditor,
  IHandleDraw,
  TCursorOptions,
  TExportNode,
  TOptionalNodes,
  TTypeNode,
  TTypeOrigin,
  TTypeOriginX,
  TTypeOriginY
} from "../nodes.types"
import { PropAttributes, PropFunctions, PropMetaKeys } from "../symbols"
import { TEventGlobalNode, TEventNode2D } from "../event.type"
import { TFunction } from "../../types"
import { TCanvasType } from "../../canvas/canvas.types"
import { MethodExport } from "../../symbols"

export class Node2D
  extends GlobalNode
  implements
    IControlEdition,
    ICoords2D,
    ISize2D,
    INode2D,
    IControlNode2D,
    IHandleCoords2D,
    IHandleDraw
{
  protected _initial: IControlEditor &
    IControlEdition &
    ICoords2D &
    ISize2D &
    INode2D

  protected _calculate: ICalculate["calculate"] = {
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
    }
  }

  readonly type: TTypeNode = "Node2D"

  visible: boolean
  selectable: boolean
  lock: boolean
  cursor: TCursorOptions
  x: number
  y: number
  rotationType: "radians" | "degrees"
  centerScale: boolean
  centerRotation: boolean
  width: number
  height: number
  flipX: boolean
  flipY: boolean
  originX: TTypeOriginX
  originY: TTypeOriginY
  scaleX: number
  scaleY: number
  skewX: number
  skewY: number
  rotation: number

  constructor(
    options?: Partial<
      IControlEditor & IControlEdition & ICoords2D & ISize2D & INode2D
    >
  ) {
    super({ ...DEFAULT_CONFIG_NODE_2D, ...options })

    this._initial = { ...DEFAULT_CONFIG_NODE_2D, ...options }

    this.visible = this._initial.visible
    this.selectable = this._initial.selectable
    this.lock = this._initial.lock
    this.cursor = this._initial.cursor
    this.x = this._initial.x
    this.y = this._initial.y
    this.rotationType = this._initial.rotationType
    this.centerScale = this._initial.centerScale
    this.centerRotation = this._initial.centerRotation
    this.width = this._initial.width
    this.height = this._initial.height
    this.flipX = this._initial.flipX
    this.flipY = this._initial.flipY
    this.originX = this._initial.originX
    this.originY = this._initial.originY
    this.scaleX = this._initial.scaleX
    this.scaleY = this._initial.scaleY
    this.skewX = this._initial.skewX
    this.skewY = this._initial.skewY
    this.rotation = this._initial.rotation

    this.processCalculate()
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
      this.x = (this.getApp().width / 2 - (this.width * this.scaleX) / 2) / 2
      this.y = (this.getApp().height / 2 - (this.height * this.scaleY) / 2) / 2
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

  protected processCalculate() {
    if (this._parent && this._parent instanceof Node2D) {
      this._calculate.translate = {
        x: this._parent.x + this.x,
        y: this._parent.y + this.y
      }
    } else {
      this._calculate.translate = {
        x: this.x,
        y: this.y
      }
    }

    this._calculate.rotation =
      this.rotationType === "degrees"
        ? (this.rotation * Math.PI) / 180
        : this.rotation

    this._calculate.scaleFactor = {
      width: this.width * this.scaleX,
      height: this.height * this.scaleY
    }

    this._calculate.middleScaleFactor = {
      width: this._calculate.middleScaleFactor.width / 2,
      height: this._calculate.middleScaleFactor.height / 2
    }
  }

  render(canvas: TCanvasType): void {
    this.getApp().execute("canvas:save", canvas)

    const _draw = this.getFunction("_draw")
    const _ready = this.getFunction("_ready")

    const mode =
      this.getApp().$global.MODE === "preview" ||
      this.getApp().$global.MODE === "game"

    if (_ready && mode) _ready()
    if (_draw && mode) _draw()

    this.getApp().execute("canvas:restore", canvas)
  }

  update(
    canvas: TCanvasType,
    animation: {
      timestamp: number
      deltaTime: number
      frame: number
    }
  ): void {
    this.getApp().execute("canvas:save", canvas)

    const _draw = this.getFunction("_draw")
    const _process = this.getFunction("_process")

    const mode =
      this.getApp().$global.MODE === "preview" ||
      this.getApp().$global.MODE === "game"

    if (_draw && mode) _draw()
    if (_process && mode) _process(animation)

    this.getApp().execute("canvas:restore", canvas)
  }

  destroy(canvas: TCanvasType): void {
    this.getApp().execute("canvas:save", canvas)

    const _destroyed = this.getFunction("_destroyed")

    const mode =
      this.getApp().$global.MODE === "preview" ||
      this.getApp().$global.MODE === "game"

    if (_destroyed && mode) _destroyed()

    this.getApp().execute("canvas:restore", canvas)
  }

  emit(event: TEventGlobalNode & TEventNode2D, callback: TFunction): void {
    return this._events.addEventListener(event, callback)
  }

  reset(
    property?: keyof (IControlEditor &
      IControlEdition &
      ICoords2D &
      ISize2D &
      INode2D)
  ): void {
    if (property) {
      this[property as string] = this._initial[property]
    } else {
      for (const key of Object.keys(this._initial)) {
        this[key] =
          this._initial[
            key as keyof (IControlEditor &
              IControlEdition &
              ICoords2D &
              ISize2D &
              INode2D)
          ]
      }
    }
  }

  toObject(): IControlEditor & IControlEdition & ICoords2D & ISize2D & INode2D {
    return {
      ...this
    }
  }

  set(
    property: keyof (IControlEditor &
      IControlEdition &
      ICoords2D &
      ISize2D &
      INode2D),
    value: any
  ): void
  set(
    properties: IControlEditor & IControlEdition & ICoords2D & ISize2D & INode2D
  ): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this[property] = value
    } else if (typeof properties !== "string") {
      for (const [key, value] of Object.entries(this._initial)) {
        this[key] = value
      }
    }
  }

  static import(data: string, format: "JSON" | "YAML" = "JSON") {
    const structure: TExportNode<
      IControlEditor & IControlEdition & ICoords2D & ISize2D & INode2D
    > = format === "YAML" ? YAML.parse(data) : JSON.parse(data)

    return makerNodes2D([structure])[0] as Node2D
  }

  [MethodExport](
    childNode: boolean = true
  ): TExportNode<
    IControlEditor & IControlEdition & ICoords2D & ISize2D & INode2D
  > &
    TOptionalNodes<"children"> {
    const nodes = []

    if (childNode)
      for (const node of this.getNodes()) {
        nodes.push(node[MethodExport]())
      }

    return {
      uuid: this._uuid,
      functions: [...this[PropFunctions].entries()],
      attributes: [...this[PropAttributes].entries()],
      metaKeys: [...this[PropMetaKeys].entries()],
      type: this.type,
      hierarchy: this.hierarchy,
      script: this.script,
      parent: this.parent,
      deep: this.deep,
      index: this.index,
      nodes,
      options: {
        ...this.toObject()
      }
    }
  }
}
