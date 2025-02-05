import { QuadTreeNode } from "@/nodes/global/class/quad-tree-node";
import type { EngineCore } from "../engine";
import type { GameCore } from "../game";

import { ExecuteProcess } from "./symbols";
import type { CollisionShape2DComponent } from "@/nodes/class/components/2D/collisions/collision-shape.component";
import { Collision2DComponent } from "@/nodes/class/components/2D/collisions/collision.component";
import type { GlobalNode } from "@/nodes";

export default class CollisionController {
	protected $app: EngineCore | GameCore;

	protected quadTree: QuadTreeNode

	constructor(app: EngineCore | GameCore) {
		this.$app = app;
		this.quadTree = new QuadTreeNode({
			x: 0,
			y: 0,
			width: 1000 * 2,
			height: 1000 * 2
		})
	}

	addCollision(node: GlobalNode) {
		this.quadTree.insert(node);
	}

	removeCollision(node: GlobalNode) {
		this.quadTree.remove(node);
	}

	clearCollisions() {
		this.quadTree.clear()
	}

	[ExecuteProcess]() {
		const potentialNodes = this.quadTree.retrieve({
			x: 0,
			y: 0,
			width: this.$app.canvas.size.width,
			height: this.$app.canvas.size.height
		}) ?? []

		for (let i = 0; i < potentialNodes.length; i++) {
			const firstNode = potentialNodes[i]
			const firstCollision = firstNode.$components.get("collision-shape") as CollisionShape2DComponent;

			if (firstCollision.disabled) continue
			for (let j = i + 1; j < potentialNodes.length; j++) {
				const secondNode = potentialNodes[j]
				const secondCollision = secondNode.$components.get("collision-shape") as CollisionShape2DComponent

				if (firstNode.id === secondNode.id) continue

				if (secondCollision.disabled) continue

				const isFirstDetectionArea = firstNode.$components.has("detection-area");
				const isSecondDetectionArea = secondNode.$components.has("detection-area");

				if (isFirstDetectionArea || isSecondDetectionArea) {
					Collision2DComponent.resolveArea(firstCollision, secondCollision);
					continue;
				}

				if (Collision2DComponent.isColliding(firstCollision, secondCollision)) {
					Collision2DComponent.resolve(firstCollision, secondCollision);
				} else {
					Collision2DComponent.reset(firstCollision, secondCollision);
				}
			}
		}
	}
}
