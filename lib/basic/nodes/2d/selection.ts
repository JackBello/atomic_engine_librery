import { DEFAULT_CONFIG_NODE_SELECTION } from "../../../configs/nodes/2D/selection"
import { TFunction } from "../../../types"
import { IOptionsNodeSelection } from "../types"
import { BasicNode } from "./basic"
import { EmptyNode } from "./empty"
import { Node2D } from "./node"

export class NodeSelection extends Node2D {
  protected _options: IOptionsNodeSelection

  protected _selectedNodes: Set<BasicNode | Node2D | EmptyNode> = new Set()

  constructor(options: Partial<IOptionsNodeSelection> = {}) {
    super({ ...DEFAULT_CONFIG_NODE_SELECTION, ...options })
    this._options = { ...DEFAULT_CONFIG_NODE_SELECTION, ...options }
    this._type = NodeSelection.name
  }

  get nodesSelected() {
    return [...this._selectedNodes.values()]
  }

  get background() {
    return this._options.background
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

  get radius() {
    return this._options.radius
  }

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

  set background(value: string) {
    this._redraw = true
    this._options.background = value
  }

  set border(value) {
    this._redraw = true
    this._options.border = value
  }

  set borderColor(value) {
    this._redraw = true
    this._options.borderColor = value
  }

  set borderWidth(value) {
    this._redraw = true
    this._options.borderWidth = value
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
    this._redraw = true
    this._options.radius = value
  }

  set endX(value: number) {
    this._redraw = true
    this._options.endX = value
  }

  set endY(value: number) {
    this._redraw = true
    this._options.endY = value
  }

  set startX(value: number) {
    this._redraw = true
    this._options.startX = value
  }

  set startY(value: number) {
    this._redraw = true
    this._options.startY = value
  }

  public setOptions(options: Partial<IOptionsNodeSelection>) {
    this._redraw = true
    this._options = { ...this._options, ...options }
  }

  public toObject() {
    return {
      ...this._options
    }
  }

  protected validationPositionNode(node: Node2D) {
    const zoomScale = this.getCore().$global.ZOOM.scale
    const panX = this.getCore().$global.PAN.translateX
    const panY = this.getCore().$global.PAN.translateY

    const nodeX = (node.x - (node.width * node.scaleX) / 2 - panX) / zoomScale
    const nodeY = (node.y - (node.height * node.scaleY) / 2 - panY) / zoomScale

    const rotatedNodeX =
      nodeX * Math.cos((-node.rotation * Math.PI) / 180) -
      nodeY * Math.sin((-node.rotation * Math.PI) / 180)
    const rotatedNodeY =
      nodeX * Math.sin((-node.rotation * Math.PI) / 180) +
      nodeY * Math.cos((-node.rotation * Math.PI) / 180)

    const startX = Math.min(this.startX, this.endX) / zoomScale - panX
    const endX = Math.max(this.startX, this.endX) / zoomScale - panX
    const startY = Math.min(this.startY, this.endY) / zoomScale - panY
    const endY = Math.max(this.startY, this.endY) / zoomScale - panY

    const nodeWidth = (node.width * node.scaleX) / zoomScale
    const nodeHeight = (node.height * node.scaleY) / zoomScale

    return (
      rotatedNodeX >= startX - nodeWidth &&
      rotatedNodeX <= endX &&
      rotatedNodeY >= startY - nodeHeight &&
      rotatedNodeY <= endY
    )
  }

  public selectionElements(nodes: BasicNode[] | Node2D[] | EmptyNode[]) {
    for (let childNode of nodes as any) {
      if (this.validationPositionNode(childNode))
        this._selectedNodes.add(childNode)
      else this._selectedNodes.delete(childNode)
    }
  }

  public render(): void {
    this.getCore().execute("canvas:save", this._canvas)

    this.getCore().execute("draw:selection", this._canvas, {
      ...this._options
    })

    if (
      this.hasFunction("_ready") &&
      (this.getCore().$global.MODE === "preview" ||
        this.getCore().$global.MODE === "game")
    )
      (this.getFunction("_ready") as TFunction)()

    if (
      this.hasFunction("_draw") &&
      (this.getCore().$global.MODE === "preview" ||
        this.getCore().$global.MODE === "game")
    )
      (this.getFunction("_draw") as TFunction)()

    this.getCore().execute("canvas:restore", this._canvas)
  }

  public update(object: {
    timestamp: number
    deltaTime: number
    frame: number
  }): void {
    this.getCore().execute("canvas:save", this._canvas)

    this.getCore().execute("draw:selection", this._canvas, {
      ...this._options
    })

    if (
      this.hasFunction("_draw") &&
      (this.getCore().$global.MODE === "preview" ||
        this.getCore().$global.MODE === "game")
    )
      (this.getFunction("_draw") as TFunction)()

    if (
      this.hasFunction("_process") &&
      (this.getCore().$global.MODE === "preview" ||
        this.getCore().$global.MODE === "game")
    )
      (this.getFunction("_process") as TFunction)(object)

    this.getCore().execute("canvas:restore", this._canvas)
  }
}
