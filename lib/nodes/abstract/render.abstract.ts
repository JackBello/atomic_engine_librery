import type { TAnything } from "@/app/types";
import type { GlobalNode } from "@/nodes";
import type { OperationNode } from "../global/class/operation-node";
import type { Vector2 } from "../vectors/vector-2";

export abstract class AbstractRender {
	abstract scaleViewport: number;

	protected abstract context: TAnything;

	abstract clear(): void;

	abstract draw(root: GlobalNode, operations?: {
		after: Map<string, OperationNode>;
		before: Map<string, OperationNode>;
	}): void;

	protected abstract executeOperation(
		...operations: OperationNode[]
	): void;

	protected abstract executeDraw(
		node: GlobalNode,
		parentTransform: {
			position: Vector2
			scale: Vector2
			rotation: number;
			alpha: number;
		},
	): void;
}
