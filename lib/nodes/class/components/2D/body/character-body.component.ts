import { ComponentNode } from "@/nodes/global/class/component-node";

export class CharacterBodyComponent extends ComponentNode {
    protected _name: string = "character-body";
    protected _description: string = "movement node and apply gravity";

    init(): void {
        this._options = {
            isFloor: false,
        }

        if ("collision" in this.$node)
            this.$node.collision.isOnFloor = () => {
                return this._options.isFloor
            }
    }

    set floor(value: boolean) {
        this._options.isFloor = value
    }
}