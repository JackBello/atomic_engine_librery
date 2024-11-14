import type { EngineCore } from "../engine";
import type { GameCore } from "../game";
import type { GlobalNode } from "@/nodes";

import { ExecuteProcess } from "./symbols";
import type { CollisionShapeComponent } from "@/nodes/class/components/2D/collisions/collision-shape.component";
import { CollisionComponent } from "@/nodes/class/components/2D/collisions/collision.component";

export default class CollisionController {
	protected $app: EngineCore | GameCore;

	protected nodesCollision: Set<GlobalNode>;

	constructor(app: EngineCore | GameCore) {
		this.$app = app;
		this.nodesCollision = new Set();
	}

	addNodeToCollision(node: GlobalNode) {
		this.nodesCollision.add(node);
	}

	[ExecuteProcess]() {
		const collisions = new Set<{
			firstCollision: CollisionShapeComponent;
			secondCollision: CollisionShapeComponent;
		}>();

		for (const firstNode of this.nodesCollision) {
			const firstCollision = firstNode.$components.get(
				"collision-shape",
			) as CollisionShapeComponent;

			if (firstCollision.disabled) continue;

			for (const secondNode of this.nodesCollision) {
				if (firstNode.id === secondNode.id) continue;

				const secondCollision = secondNode.$components.get(
					"collision-shape",
				) as CollisionShapeComponent;

				if (secondCollision.disabled) continue;

				if (CollisionComponent.isColliding(firstCollision, secondCollision)) {
					collisions.add({ firstCollision, secondCollision });
				} else {
					CollisionComponent.removeCollider(firstCollision, secondCollision);
				}
			}
		}

		for (const { firstCollision, secondCollision } of collisions) {
			CollisionComponent.resolveCollision(firstCollision, secondCollision);
		}
	}
}
