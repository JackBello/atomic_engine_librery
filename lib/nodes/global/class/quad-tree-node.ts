export class QuadTreeNode {
    private bounds: { x: number; y: number; width: number; height: number };
    private capacity: number;
    private nodes: { x: number; y: number; width: number; height: number }[] = [];
    private divisions: QuadTreeNode[] | null = null;

    constructor(bounds: { x: number; y: number; width: number; height: number }, capacity = 4) {
        this.bounds = bounds;
        this.capacity = capacity;
    }

    insert(node: { x: number; y: number; width: number; height: number; }): boolean {
        if (!this.intersects(this.bounds, node)) return false;

        if (this.nodes.length < this.capacity && !this.divisions) {
            this.nodes.push(node);
            return true;
        }

        if (!this.divisions) this.subdivide();

        for (const quad of this.divisions) {
            if (quad.insert(node)) return true;
        }

        return false;
    }

    query(range: { x: number; y: number; width: number; height: number }): { x: number; y: number; width: number; height: number }[] {
        const results: { x: number; y: number; width: number; height: number }[] = [];

        if (!this.intersects(this.bounds, range)) return results;

        for (const node of this.nodes) {
            if (this.intersects(range, node)) {
                results.push(node);
            }
        }

        if (!this.divisions) return results;

        for (const quad of this.divisions) {
            results.push(...quad.query(range));
        }

        return results;
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

    private intersects(a: { x: number; y: number; width: number; height: number }, b: { x: number; y: number; width: number; height: number }): boolean {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }
}