import type { TAnything } from "@/app/types";
import { handleComponent2D, handleDrawContext2D } from "./handle";
import { AbstractRender } from "../../abstract/render.abstract";
import type { INodeOperation, INodeProcess } from "@/nodes/global/types";
import type { GlobalNode } from "@/nodes";
import type { OperationNode } from "@/nodes/global/class/operation-node";
import { NodePropType } from "@/nodes/symbols";
import RootNodeMainProcess from "@/nodes/global/root/root-node.main";
import { Vector2 } from "@/nodes/vectors/vector-2";

export class Render2D extends AbstractRender {
	scaleViewport = 1;

	constructor(
		protected context: CanvasRenderingContext2D,
	) {
		super();
		this.context = context;
	}

	clear() {
		this.context.clearRect(
			0,
			0,
			this.context.canvas.width,
			this.context.canvas.height,
		);
	}

	draw(
		root: INodeProcess | GlobalNode,
		operations?: {
			after: Map<string, INodeOperation | OperationNode>;
			before: Map<string, INodeOperation | OperationNode>;
		},
	) {
		if (operations?.before.size) {
			this.executeOperation(
				...(operations.before as Map<string, OperationNode>).values(),
			);
		}

		this.executeDraw(root as GlobalNode);

		if (operations?.after.size) {
			this.executeOperation(
				...(operations.after as Map<string, OperationNode>).values(),
			);
		}
	}

	protected executeOperation(...operations: OperationNode[]): void {
		for (const operation of operations) {
			handleDrawContext2D(
				operation.__type__ as TAnything,
				operation.options,
				this.context,
			);
		}
	}

	protected executeDraw(
		node: GlobalNode,
		parentTransform: {
			position: Vector2
			scale: Vector2
			rotation: number;
			alpha: number;
		} = { position: Vector2.zero(), scale: Vector2.one(), rotation: 0, alpha: 1 },
	): void {
		for (let index = 0; index < node.$nodes.size; index++) {
			const nodeRef = node.$nodes.all[index];

			if (!nodeRef.visible) continue;

			if (!nodeRef[NodePropType].startsWith("2D")) continue;

			const accumulativeTransform = RootNodeMainProcess.calculateTransforms(
				{
					position: nodeRef.position ?? Vector2.zero(),
					scale: nodeRef.scale ?? Vector2.one(),
					rotation: nodeRef.calculate.angle ?? 0,
					alpha: nodeRef.alpha ?? 1,
				},
				parentTransform,
			);

			this.context.save();

			this.context.globalAlpha = accumulativeTransform.alpha;

			this.context.translate(
				(nodeRef.position.x - nodeRef.calculate.origin[0]) * this.scaleViewport,
				(nodeRef.position.y - nodeRef.calculate.origin[1]) * this.scaleViewport,
			);

			if (nodeRef.calculate.angle !== 0) {
				this.context.rotate(nodeRef.calculate.angle);
			}

			this.context.transform(1, nodeRef.skew.y, nodeRef.skew.x, 1, 0, 0);

			this.context.scale(
				nodeRef.scale.x * this.scaleViewport,
				nodeRef.scale.y * this.scaleViewport,
			);

			handleComponent2D(nodeRef, this.context);

			handleDrawContext2D(
				nodeRef[NodePropType] as TAnything,
				{
					...nodeRef.toObject(),
				},
				this.context,
			);

			if (nodeRef.$nodes.size > 0) {
				this.executeDraw(nodeRef, accumulativeTransform);
			}

			this.context.restore();
		}
	}
}
