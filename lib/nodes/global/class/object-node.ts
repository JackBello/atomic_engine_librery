import { NodeFromObject } from "@/nodes/symbols";
import { CanvasNode } from "./canvas-node";

export abstract class ObjectNode extends CanvasNode {
	get [NodeFromObject]() {
		return this.$nodes.all[0];
	}
}
