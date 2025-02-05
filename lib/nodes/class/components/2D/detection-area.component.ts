import type { GlobalNode } from "@/nodes/global/global-node";
import { ComponentNode } from "@/nodes/global/class/component-node";

export class DetectionArea2DComponent extends ComponentNode {
    readonly NAME_CLASS = "Area2DComponent";

    protected _name = "detection-area";
    protected _description = "detect node entered o leaving this area";

    protected _unique: Set<GlobalNode> = new Set();

    bodyEnteringArea(node: GlobalNode) {
        const _body_entering_area = this.$node.$functions.get("_body_entering_area")

        if (_body_entering_area && !this._unique.has(node)) {
            _body_entering_area(node)
            this._unique.add(node)
        }
    }

    bodyLeavingArea(node: GlobalNode) {
        const _body_leaving_area = this.$node.$functions.get("_body_leaving_area")

        if (_body_leaving_area && this._unique.has(node)) {
            _body_leaving_area(node)
            this._unique.delete(node)
        }
    }
}