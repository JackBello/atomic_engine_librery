import type { EngineCore } from "../engine";
import type { GameCore } from "../game";

import { ExecuteProcess } from "./symbols";
import type { CollisionShapeComponent } from "@/nodes/class/components/2D/collisions/collision-shape.component";
import { CollisionComponent } from "@/nodes/class/components/2D/collisions/collision.component";

export default class CollisionController {
	protected $app: EngineCore | GameCore;

	protected collisions: Set<CollisionShapeComponent>;

	constructor(app: EngineCore | GameCore) {
		this.$app = app;
		this.collisions = new Set();
	}

	addCollision(collision: CollisionShapeComponent) {
		this.collisions.add(collision);
	}

	removeCollision(collision: CollisionShapeComponent) {
		this.collisions.delete(collision);
	}

	[ExecuteProcess]() {
		const collisions = new Set<{
			firstCollision: CollisionShapeComponent;
			secondCollision: CollisionShapeComponent;
		}>();

		for (const firstCollision of this.collisions) {
			if (firstCollision.disabled) continue;

			for (const secondCollision of this.collisions) {
				if (firstCollision.NODE === null || secondCollision.NODE === null) continue;

				if (firstCollision.NODE.id === secondCollision.NODE.id) continue;

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
