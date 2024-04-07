import { DEFAULT_CONFIG_NODE_SELECTION } from "../../../configs/nodes/2D/selection"
import { AtomicGlobal } from "../../atomic-global"
import { IOptionsNodeSelection } from "../types"
import { BasicNode, EmptyNode, Node2D } from "./node"

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

  public render(): void {
    if (this._redraw) {
      this.getCore().execute("draw:selection", "editor", {
        ...this._options
      })

      // this._redraw = false
    }

    if (
      this._functions?._ready &&
      (AtomicGlobal.MODE === "preview" || AtomicGlobal.MODE === "game")
    )
      this._functions._ready()
  }

  public update(frame: number, time: number): void {
    if (this._redraw) {
      this.getCore().execute("draw:selection", "editor", {
        ...this._options
      })

      // this._redraw = false
    }

    if (
      this._functions?._process &&
      (AtomicGlobal.MODE === "preview" || AtomicGlobal.MODE === "game")
    )
      this._functions._process(frame, time)
  }

  protected validationPositionNode(node: BasicNode | Node2D | EmptyNode) {
    const zoomScale = AtomicGlobal.ZOOM.scale
    const panX = AtomicGlobal.PAN.translateX
    const panY = AtomicGlobal.PAN.translateY

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

  public selectionElements(nodes?: BasicNode[] | Node2D[] | EmptyNode[]) {
    if (!this.getCurrentScene()) return

    if (!nodes) nodes = this.getCurrentScene().getNodes()

    for (let childNode of nodes) {
      if (this.validationPositionNode(childNode))
        this._selectedNodes.add(childNode)
      else this._selectedNodes.delete(childNode)
    }
  }
}
