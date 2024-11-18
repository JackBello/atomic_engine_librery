import type { TAnything } from "@/app/types";
import { handleComponent2D, handleDrawContext2D } from "./handle";
import { AbstractRender } from "../../abstract/render.abstract";
import type { INodeOperation, INodeProcess } from "@/nodes/global/types";
import { RootNodeSubProcess } from "../../global/root/root-node.sub";
import type { GlobalNode } from "@/nodes";
import type { OperationNode } from "@/nodes/global/class/operation-node";
import { NodePropType } from "@/nodes/symbols";

export class Render2D extends AbstractRender {
	scaleViewport = 1;

	constructor(
		protected context: CanvasRenderingContext2D,
		protected thread: "main" | "sub",
	) {
		super();
		this.context = context;
		this.thread = thread;
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
			x: number;
			y: number;
			scaleX: number;
			scaleY: number;
			rotation: number;
			alpha: number;
		} = { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },
	): void {
		for (let index = 0; index < node.$nodes.size; index++) {
			const nodeRef = node.$nodes.all[index];

			if (!nodeRef.visible) continue;

			if (!nodeRef[NodePropType].startsWith("2D")) continue;

			const globalTransform = RootNodeSubProcess.calculateTransforms(
				{
					x: nodeRef.x ?? 0,
					y: nodeRef.y ?? 0,
					scaleX: nodeRef.scaleX ?? 1,
					scaleY: nodeRef.scaleY ?? 1,
					rotation: nodeRef.calculate.angle ?? 0,
					alpha: nodeRef.alpha ?? 1,
				},
				parentTransform,
			);

			this.context.save();

			this.context.globalAlpha = globalTransform.alpha;

			// console.log(nodeRef.slug, nodeRef.originX, nodeRef.calculate);


			this.context.translate(
				(nodeRef.x - nodeRef.calculate.origin[0]) * this.scaleViewport,
				(nodeRef.y - nodeRef.calculate.origin[1]) * this.scaleViewport,
			);

			if (nodeRef.calculate.angle !== 0) {
				this.context.rotate(nodeRef.calculate.angle);
			}

			this.context.transform(1, nodeRef.skewY, nodeRef.skewX, 1, 0, 0);

			this.context.scale(
				nodeRef.scaleX * this.scaleViewport,
				nodeRef.scaleY * this.scaleViewport,
			);

			handleDrawContext2D(
				nodeRef[NodePropType] as TAnything,
				{
					...nodeRef.toObject(),
				},
				this.context,
			);

			handleComponent2D(nodeRef, this.context);

			if (nodeRef.$nodes.size > 0) {
				this.executeDraw(nodeRef, globalTransform);
			}

			this.context.restore();
		}
	}
}
