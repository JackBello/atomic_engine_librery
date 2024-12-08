import type { GlobalNode } from "../global-node";

export class ProximityManagerNode {
    private area: { x: number; y: number; width: number; height: number };
    private nodes: GlobalNode[];

    constructor(proximityArea: { x: number; y: number; width: number; height: number }) {
        this.area = proximityArea;
        this.nodes = [];
    }

    setProximityArea(area: { x: number; y: number; width: number; height: number }) {
        this.area = area;

        this.updateNodesStatus();
    }

    addNode(node: GlobalNode) {
        node._active = false

        this.nodes.push(node);

        this.updateNodeStatus(node);
    }

    updateNodesStatus() {
        for (const node of this.nodes) {
            this.updateNodeStatus(node);
        }
    }

    updateNodeStatus(node: GlobalNode) {
        const bounds = node.getBounds()

        const isActive =
            bounds.x + bounds.width > this.area.x &&
            bounds.x < this.area.x + this.area.width &&
            bounds.y + bounds.height > this.area.y &&
            bounds.y < this.area.y + this.area.height;

        node._active = isActive;
    }

    getActiveNodes() {
        return this.nodes.filter((object) => object._active);
    }
}