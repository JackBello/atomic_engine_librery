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
		if (this.thread === "sub") {
			if (operations?.before.size) {
				this.executeSubOperation(
					...(operations.before as Map<string, INodeOperation>).values(),
				);
			}

			this.executeSubDraw(root as INodeProcess);

			if (operations?.after.size) {
				this.executeSubOperation(
					...(operations.after as Map<string, INodeOperation>).values(),
				);
			}
		}

		if (this.thread === "main") {
			if (operations?.before.size) {
				this.executeMainOperation(
					...(operations.before as Map<string, OperationNode>).values(),
				);
			}

			this.executeMainDraw(root as GlobalNode);

			if (operations?.after.size) {
				this.executeMainOperation(
					...(operations.after as Map<string, OperationNode>).values(),
				);
			}
		}
	}

	protected executeSubOperation(...operations: INodeOperation[]) {
		for (const operation of operations) {
			handleDrawContext2D(
				operation.__type__ as TAnything,
				operation.options,
				this.context,
			);
		}
	}

	protected executeMainOperation(...operations: OperationNode[]): void {
		for (const operation of operations) {
			handleDrawContext2D(
				operation.__type__ as TAnything,
				operation.options,
				this.context,
			);
		}
	}

	protected executeSubDraw(
		node: INodeProcess,
		parentTransform: {
			x: number;
			y: number;
			scaleX: number;
			scaleY: number;
			rotation: number;
			alpha: number;
		} = { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },
	) {
		if (node && node.__type__ === "global/scene") {
			for (const child of node.nodes) {
				this.executeSubDraw(child);
			}
		}

		if (node?.options?.visible && node.__type__.startsWith("2D")) {
			const globalTransform = RootNodeSubProcess.calculateTransforms(
				{
					x: node.options.calculate.translate.x,
					y: node.options.calculate.translate.y,
					scaleX: node.options.calculate.scale.x,
					scaleY: node.options.calculate.scale.y,
					rotation: node.options.calculate.rotation,
					alpha: node.options.alpha,
				},
				parentTransform,
			);

			this.context.save();

			this.context.globalAlpha = globalTransform.alpha;

			this.context.translate(
				node.options.calculate.translate.x * this.scaleViewport,
				node.options.calculate.translate.y * this.scaleViewport,
			);

			if (node.options.calculate.rotation !== 0) {
				this.context.rotate(node.options.calculate.rotation);
			}

			this.context.scale(
				node.options.calculate.scale.x * this.scaleViewport,
				node.options.calculate.scale.y * this.scaleViewport,
			);

			handleDrawContext2D(
				node.__type__ as TAnything,
				node.options,
				this.context,
			);

			if (node.nodes.length > 0) {
				for (const child of node.nodes) {
					this.executeSubDraw(child, globalTransform);
				}
			}

			this.context.restore();
		}
	}

	protected executeMainDraw(
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

			const calculate = nodeRef.processCalculate();

			const globalTransform = RootNodeSubProcess.calculateTransforms(
				{
					x: calculate.translate.x,
					y: calculate.translate.y,
					scaleX: calculate.scale.x,
					scaleY: calculate.scale.y,
					rotation: calculate.rotation,
					alpha: nodeRef.alpha,
				},
				parentTransform,
			);

			this.context.save();

			this.context.globalAlpha = globalTransform.alpha;

			this.context.translate(
				calculate.translate.x * this.scaleViewport,
				calculate.translate.y * this.scaleViewport,
			);

			if (calculate.rotation !== 0) {
				this.context.rotate(calculate.rotation);
			}

			this.context.scale(
				calculate.scale.x * this.scaleViewport,
				calculate.scale.y * this.scaleViewport,
			);

			handleDrawContext2D(
				nodeRef[NodePropType] as TAnything,
				{
					...nodeRef.toObject(),
					calculate,
				},
				this.context,
			);

			handleComponent2D(nodeRef, this.context);

			if (nodeRef.$nodes.size > 0) {
				this.executeMainDraw(nodeRef, globalTransform);
			}

			this.context.restore();
		}
	}
}
