import type { EngineCore } from "../engine";
import type { GameCore } from "../game";
import type { GlobalNode } from "@/nodes";

import { CollisionShape2D } from "@/nodes";

import { PropCollider } from "@/nodes/symbols";
import { $Scenes } from "@/symbols";

export default class CollisionController {
	private $app: EngineCore | GameCore;

	protected shapesCollisions: Record<
		string,
		(
			firstCollision: CollisionShape2D,
			secondCollision: CollisionShape2D,
		) => boolean
	> = {
		"rectangle-rectangle": (
			firstCollision: CollisionShape2D,
			secondCollision: CollisionShape2D,
		) => {
			const firstCollisionWidth = firstCollision.width * firstCollision.scaleX;
			const firstCollisionHeight =
				firstCollision.height * firstCollision.scaleY;
			const firstCollisionX = firstCollision.parent?.x ?? 0;
			const firstCollisionY = firstCollision.parent?.y ?? 0;

			const secondCollisionWidth =
				secondCollision.width * secondCollision.scaleX;
			const secondCollisionHeight =
				secondCollision.height * secondCollision.scaleY;
			const secondCollisionX = secondCollision.parent?.x ?? 0;
			const secondCollisionY = secondCollision.parent?.y ?? 0;

			return (
				firstCollisionX < secondCollisionX + secondCollisionWidth &&
				firstCollisionX + firstCollisionWidth > secondCollisionX &&
				firstCollisionY < secondCollisionY + secondCollisionHeight &&
				firstCollisionY + firstCollisionHeight > secondCollisionY
			);
		},
		"circle-circle": (
			firstCollision: CollisionShape2D,
			secondCollision: CollisionShape2D,
		) => {
			firstCollision;
			secondCollision;

			return true;
		},
		"rectangle-circle": (
			firstCollision: CollisionShape2D,
			secondCollision: CollisionShape2D,
		) => {
			firstCollision;
			secondCollision;

			return true;
		},
		"circle-rectangle": (
			firstCollision: CollisionShape2D,
			secondCollision: CollisionShape2D,
		) => {
			firstCollision;
			secondCollision;

			return true;
		},
	};

	constructor(app: EngineCore | GameCore) {
		this.$app = app;
	}

	public process() {
		const nodes = this.$app[$Scenes].currentScene?.$nodes.all ?? [];

		this.checkCollisions(nodes);
	}

	protected checkCollisions(nodes: GlobalNode[]) {
		const mode = this.$app.global("mode") === "preview";

		if (this.$app.mode === "game" || mode) {
			let firstNode: GlobalNode | undefined = undefined;
			let secondNode: GlobalNode | undefined = undefined;

			for (let i = 0; i < nodes.length; i++) {
				firstNode = nodes[i]
					? nodes[i].$nodes.all.find(
							(node) => node.NODE_NAME === "CollisionShape2D",
						)
					: undefined;

				for (let j = 0; j < nodes.length; j++) {
					if (nodes[i].id === nodes[j].id) continue;

					secondNode = nodes[j]
						? nodes[j].$nodes.all.find(
								(node) => node.NODE_NAME === "CollisionShape2D",
							)
						: undefined;

					if (
						firstNode &&
						firstNode instanceof CollisionShape2D &&
						secondNode &&
						secondNode instanceof CollisionShape2D &&
						this.isColliding(firstNode, secondNode)
					) {
						this.resolveCollision(firstNode, secondNode);
						break;
					}
					if (firstNode && firstNode instanceof CollisionShape2D) {
						firstNode[PropCollider] = null;
					}
				}

				if (nodes[i].$nodes.size > 0) {
					this.checkCollisions(nodes[i].$nodes.all);
				}
			}
		}
	}

	protected isColliding(
		firstCollision: CollisionShape2D,
		secondCollision: CollisionShape2D,
	) {
		const typeCollision = `${firstCollision.shape}-${secondCollision.shape}`;

		const funcCollision = this.shapesCollisions[typeCollision];

		if (funcCollision) return funcCollision(firstCollision, secondCollision);

		return false;
	}

	protected resolveCollision(
		firstNode: CollisionShape2D,
		secondNode: CollisionShape2D,
	) {
		firstNode[PropCollider] = secondNode;
		secondNode[PropCollider] = firstNode;
	}
}
