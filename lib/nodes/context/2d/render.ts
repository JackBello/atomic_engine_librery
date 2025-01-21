import type { TAnything } from "@/app/types";
import { handleComponent2D, handleDrawContext2D } from "./handle";
import { AbstractRender } from "../../abstract/render.abstract";
import type { GlobalNode } from "@/nodes";
import type { OperationNode } from "@/nodes/global/class/operation-node";
import { CalculateNode2D, NodePropType } from "@/nodes/symbols";
import { RootNode } from "@/nodes/global/root/root-node";
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
		root: GlobalNode,
	) {
		// if (operations?.before.size)
		// 	this.executeOperation(
		// 		...operations.before.values(),
		// 	);

		this.executeDraw(root);

		// if (operations?.after.size)
		// 	this.executeOperation(
		// 		...operations.after.values(),
		// 	);
	}

	protected executeOperation(...operations: OperationNode[]): void {
		for (const operation of operations) {
			operation.execute(this.context)
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

			if (!nodeRef[NodePropType].startsWith("2D")) {
				this.executeDraw(nodeRef, parentTransform);
				continue
			}

			if (!nodeRef.visible) continue;

			const accumulativeTransform = RootNode.calculateTransforms(
				{
					position: nodeRef.position ?? Vector2.zero(),
					scale: nodeRef.scale ?? Vector2.one(),
					rotation: nodeRef[CalculateNode2D].angle ?? 0,
					alpha: nodeRef.alpha ?? 1,
				},
				parentTransform,
			);

			this.context.save();

			this.context.globalAlpha = accumulativeTransform.alpha;

			this.context.translate(
				nodeRef.position.x * this.scaleViewport,
				nodeRef.position.y * this.scaleViewport,
			);

			if (nodeRef[CalculateNode2D].angle !== 0) {
				this.context.rotate(nodeRef[CalculateNode2D].angle);
			}

			this.context.transform(1, nodeRef.skew.y, nodeRef.skew.x, 1, 0, 0);

			this.context.scale(
				nodeRef.scale.x * this.scaleViewport,
				nodeRef.scale.y * this.scaleViewport,
			);

			this.context.translate(
				-nodeRef[CalculateNode2D].origin[0],
				-nodeRef[CalculateNode2D].origin[1],
			);

			this.context.globalCompositeOperation = nodeRef.compositeOperation

			handleDrawContext2D(
				nodeRef[NodePropType] as TAnything,
				{
					...nodeRef.toObject(),
				},
				this.context,
			);

			handleComponent2D(nodeRef, this.context);

			if (nodeRef.$nodes.size > 0) {
				this.executeDraw(nodeRef, accumulativeTransform);
			}

			this.context.restore();
		}
	}
}
