import { DEFAULT_CONFIG_NODE_SELECTION } from "../../../configs/nodes/2D/selection"
import { IOptionsNodeSelection } from "../types";
import { BasicNode, EmptyNode, Node2D } from "./node";

export class NodeSelection extends Node2D {
    protected _options: IOptionsNodeSelection

    protected _selectedNodes: Set<BasicNode | Node2D | EmptyNode> = new Set()

    constructor(options: Partial<IOptionsNodeSelection>) {
        super({ ...DEFAULT_CONFIG_NODE_SELECTION, ...options });
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
        this._options.background = value;
    }

    set border(value) {
        this._options.border = value;
    }

    set borderColor(value) {
        this._options.borderColor = value;
    }

    set borderWidth(value) {
        this._options.borderWidth = value;
    }

    set radius(value: number | [number, number] | { topLeft: number, topRight: number, bottomLeft: number, bottomRight: number }) {
        this._options.radius = value
    }

    set endX(value: number) {
        this._options.endX = value
    }

    set endY(value: number) {
        this._options.endY = value
    }

    set startX(value: number) {
        this._options.startX = value
    }

    set startY(value: number) {
        this._options.startY = value
    }

    public setOptions(options: Partial<IOptionsNodeSelection>) {
        this._options = { ...this._options, ...options };
    }

    public toObject() {
        return {
            ...this._options
        }
    }

    public render(): void {
        const core = this.getCore();

        core.execute("draw:selection", "editor", {
            ...this._options,
        })
    }

    protected validationPositionNode(node: BasicNode | Node2D | EmptyNode) {
        // return (
        //     node.x + node.width >= Math.min(this.startX, this.endX) &&
        //     node.x <= Math.max(this.startX, this.endX) &&
        //     node.y + node.height >= Math.min(this.startY, this.endY) &&
        //     node.y <= Math.max(this.startY, this.endY)
        // )
        return (
            node.x >= Math.min(this.startX, this.endX) &&
            node.x <= Math.max(this.startX, this.endX) &&
            node.y >= Math.min(this.startY, this.endY) &&
            node.y <= Math.max(this.startY, this.endY)
        )
    }

    public selectionElements(nodes?: BasicNode[] | Node2D[] | EmptyNode[]) {
        if (!this.getCurrentScene()) return;

        if (!nodes) nodes = this.getCurrentScene().getNodes()

        for (let childNode of nodes) {
            if (this.validationPositionNode(childNode)) this._selectedNodes.add(childNode)
            else this._selectedNodes.delete(childNode)
        }
    }
}