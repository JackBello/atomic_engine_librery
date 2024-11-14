import type { TAnything } from "@/app/types";
import type { INodeOperation, INodeProcess } from "../global/types";
import { GlobalNode } from "@/nodes";
import { OperationNode } from "../global/class/operation-node";

export abstract class AbstractRender {
	abstract scaleViewport: number;

	protected abstract context: TAnything;
	protected abstract thread: "main" | "sub";

	abstract clear(): void;

	abstract draw(root: INodeProcess | GlobalNode, operations?: {
		after: Map<string, INodeOperation | OperationNode>;
		before: Map<string, INodeOperation | OperationNode>;
	}): void;

	protected abstract executeSubOperation(
		...operations: INodeOperation[]
	): void;

	protected abstract executeMainOperation(
		...operations: OperationNode[]
	): void;

	protected abstract executeMainDraw(
		node: GlobalNode,
		parentTransform: {
			x: number;
			y: number;
			scaleX: number;
			scaleY: number;
			rotation: number;
			alpha: number;
		},
	): void;

	protected abstract executeSubDraw(
		node: INodeProcess,
		parentTransform: {
			x: number;
			y: number;
			scaleX: number;
			scaleY: number;
			rotation: number;
			alpha: number;
		},
	): void;
}
