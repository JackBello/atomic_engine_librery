import type { GlobalNode } from "../global-node";

export class QuadTreeNode {
    private map: Record<string, number> = {
        "top-left": 0,
        "top-right": 1,
        "bottom-left": 2,
        "bottom-right": 3
    }
    private bounds: { x: number; y: number; width: number; height: number };
    private capacity: number;
    private nodes: GlobalNode[] = [];
    private divisions: QuadTreeNode[] | null = null;

    constructor(bounds: { x: number; y: number; width: number; height: number }, capacity = 4) {
        this.bounds = bounds;
        this.capacity = capacity;
    }

    clear() {
        this.nodes = []
        this.divisions = null
    }

    remove(target: GlobalNode): boolean {
        const index = this.nodes.findIndex((entry) => entry === target);

        if (index !== -1) {
            this.nodes.splice(index, 1);
            return true;
        }

        if (this.divisions)
            for (const childNode of this.divisions) {
                if (childNode.remove(target)) {
                    return true;
                }
            }

        return false;
    }

    insert(node: GlobalNode): boolean {
        if (!this.intersects(this.bounds, node.getBounds())) return false;

        if (this.nodes.length < this.capacity && !this.divisions) {
            this.nodes.push(node);
            return true;
        }

        if (!this.divisions) this.subdivide();

        if (this.divisions) {
            const divisions = this.getDivisions(node.getBounds())

            for (const division in divisions) {
                if (divisions[division]) {
                    this.divisions[this.map[division]].insert(node)
                }
            }
        }

        return false;
    }

    retrieve(area: { x: number; y: number; width: number; height: number }) {
        const results = [...this.nodes];

        if (this.divisions) {
            const index = this.getDivision(area);

            if (index !== -1) {
                results.push(...this.divisions[index].retrieve(area));
            } else {
                for (const node of this.divisions) {
                    results.push(...node.retrieve(area));
                }
            }
        }

        return results;
    }

    query(range: { x: number; y: number; width: number; height: number }): GlobalNode[] {
        const results: GlobalNode[] = [];

        if (!this.intersects(this.bounds, range)) return results;

        for (const node of this.nodes) {
            if (this.intersects(range, node.getBounds())) {
                results.push(node);
            }
        }

        if (!this.divisions) return results;

        for (const quad of this.divisions) {
            results.push(...quad.query(range));
        }

        return results;
    }

    private getDivision(node: { x: number; y: number; width: number; height: number }): number {
        const midX = this.bounds.x + this.bounds.width / 2;
        const midY = this.bounds.y + this.bounds.height / 2;

        const fitsTop = node.y < midY && node.y + node.height <= midY;
        const fitsBottom = node.y >= midY;
        const fitsLeft = node.x < midX && node.x + node.width <= midX;
        const fitsRight = node.x >= midX;

        if (fitsTop && fitsLeft) return 0;
        if (fitsTop && fitsRight) return 1;
        if (fitsBottom && fitsLeft) return 2;
        if (fitsBottom && fitsRight) return 3;

        return -1;
    }

    private getDivisions(node: { x: number; y: number; width: number; height: number }): Record<string, boolean> {
        const midX = this.bounds.x + this.bounds.width / 2;
        const midY = this.bounds.y + this.bounds.height / 2;

        const fitsTop = node.y <= midY;
        const fitsBottom = node.y + node.height >= midY;
        const fitsLeft = node.x <= midX;
        const fitsRight = node.x + node.width >= midX;

        return {
            "top-left": fitsTop && fitsLeft,
            "top-right": fitsTop && fitsRight,
            "bottom-left": fitsBottom && fitsLeft,
            "bottom-right": fitsBottom && fitsRight
        };
    }

    private subdivide() {
        const { x, y, width, height } = this.bounds;
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        this.divisions = [
            new QuadTreeNode({ x, y, width: halfWidth, height: halfHeight }, this.capacity),
            new QuadTreeNode({ x: x + halfWidth, y, width: halfWidth, height: halfHeight }, this.capacity),
            new QuadTreeNode({ x, y: y + halfHeight, width: halfWidth, height: halfHeight }, this.capacity),
            new QuadTreeNode({ x: x + halfWidth, y: y + halfHeight, width: halfWidth, height: halfHeight }, this.capacity),
        ];
    }

    private intersects(intersection: { x: number; y: number; width: number; height: number }, b: { x: number; y: number; width: number; height: number }): boolean {
        return (
            intersection.x + intersection.width >= b.x &&
            intersection.x <= b.x + b.width &&
            intersection.y + intersection.height >= b.y &&
            intersection.y <= b.y + b.height
        );
    }
}