import type { GlobalNode } from "@/nodes";
import { ComponentNode } from "@/nodes/global/class/component-node";

export class AreaComponent extends ComponentNode {
    protected _name = "area-detect";
    protected _description = "detect node entered o leaving this area";

    bodyEnteringArea(node: GlobalNode) {
        const _body_entering_area = this.$node.$functions.get("_body_entering_area")

        if (_body_entering_area) _body_entering_area(node)
    }

    bodyLeavingArea(node: GlobalNode) {
        const _body_leaving_area = this.$node.$functions.get("_body_leaving_area")

        if (_body_leaving_area) _body_leaving_area(node)
    }
}