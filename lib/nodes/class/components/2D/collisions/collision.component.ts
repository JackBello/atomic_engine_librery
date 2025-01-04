import { ComponentNode } from "@/nodes/global/class/component-node";
import type { CollisionShapeComponent } from "./collision-shape.component";
import type { GlobalNode } from "@/nodes/global/global-node";
import { AreaComponent } from "../area.component";
import { CharacterBodyComponent } from "../body/character-body.component";
import { StaticBodyComponent } from "../body/static-body.component";

export type TCollisionShape =
	| "rectangle-rectangle"
	| "circle-circle"
	| "rectangle-circle"
	| "circle-rectangle";

export class CollisionComponent extends ComponentNode {
	protected _name = "collision";
	protected _description = "detect collision between nodes";
	protected _collider: GlobalNode | null = null;
	protected _touch: {
		top: boolean;
		bottom: boolean;
		left: boolean;
		right: boolean;
	} = {
			bottom: false,
			top: false,
			left: false,
			right: false,
		};

	get debug() {
		return this._options.debug;
	}

	get disabled() {
		return this._options.disabled;
	}

	get fill() {
		return this._options.fill;
	}

	set debug(value: boolean) {
		this._options.debug = value;
	}

	set fill(value: string) {
		this._options.fill = value;
	}

	set disabled(value: boolean) {
		this._options.disabled = value;
	}

	protected static typeCollisions: Record<
		TCollisionShape,
		(
			firstCollision: CollisionShapeComponent,
			secondCollision: CollisionShapeComponent,
		) => boolean
	> = {
			"rectangle-rectangle": (
				firstCollision: CollisionShapeComponent,
				secondCollision: CollisionShapeComponent,
			) => {
				const firstCollisionWidth =
					Math.abs(firstCollision.width * firstCollision.$node.scale.x);
				const firstCollisionHeight =
					Math.abs(firstCollision.height * firstCollision.$node.scale.y);
				let firstCollisionX = firstCollision.$node.position.x - (firstCollision.$node.origin[0] * firstCollision.$node.scale.x);
				if (firstCollision.$node.scale.x < 0) {
					firstCollisionX += firstCollision.width * firstCollision.$node.scale.x;
				}
				firstCollisionX = (firstCollision.position.x * firstCollision.$node.scale.x) + firstCollisionX;
				let firstCollisionY = firstCollision.$node.position.y - (firstCollision.$node.origin[1] * firstCollision.$node.scale.y);
				if (firstCollision.$node.scale.y < 0) {
					firstCollisionY += firstCollision.height * firstCollision.$node.scale.y;
				}
				firstCollisionY = (firstCollision.position.y * firstCollision.$node.scale.y) + firstCollisionY;

				const secondCollisionWidth =
					Math.abs(secondCollision.width * secondCollision.$node.scale.x);
				const secondCollisionHeight =
					Math.abs(secondCollision.height * secondCollision.$node.scale.y);
				let secondCollisionX = secondCollision.$node.position.x - (secondCollision.$node.origin[0] * secondCollision.$node.scale.x);
				if (secondCollision.$node.scale.x < 0) {
					secondCollisionX += secondCollision.width * secondCollision.$node.scale.x;
				}
				secondCollisionX = (secondCollision.position.x * secondCollision.$node.scale.x) + secondCollisionX;
				let secondCollisionY = secondCollision.$node.position.y - (secondCollision.$node.origin[1] * secondCollision.$node.scale.y);
				if (secondCollision.$node.scale.y < 0) {
					secondCollisionY += secondCollision.height * secondCollision.$node.scale.y;
				}
				secondCollisionY = (secondCollision.position.y * secondCollision.$node.scale.y) + secondCollisionY;

				return (
					firstCollisionX < secondCollisionX + secondCollisionWidth &&
					firstCollisionX + firstCollisionWidth > secondCollisionX &&
					firstCollisionY < secondCollisionY + secondCollisionHeight &&
					firstCollisionY + firstCollisionHeight > secondCollisionY
				);
			},
			"circle-circle": (
				firstCollision: CollisionShapeComponent,
				secondCollision: CollisionShapeComponent,
			) => {
				firstCollision;
				secondCollision;

				return true;
			},
			"rectangle-circle": (
				firstCollision: CollisionShapeComponent,
				secondCollision: CollisionShapeComponent,
			) => {
				firstCollision;
				secondCollision;

				return true;
			},
			"circle-rectangle": (
				firstCollision: CollisionShapeComponent,
				secondCollision: CollisionShapeComponent,
			) => {
				firstCollision;
				secondCollision;

				return true;
			},
		};

	protected static typeTouchCollisions: Record<
		TCollisionShape,
		(
			firstCollision: CollisionShapeComponent,
			secondCollision: CollisionShapeComponent,
		) => {
			top: boolean;
			bottom: boolean;
			left: boolean;
			right: boolean;
		}
	> = {
			"rectangle-rectangle": (
				firstCollision: CollisionShapeComponent,
				secondCollision: CollisionShapeComponent,
			) => {
				const firstCollisionWidth =
					Math.abs(firstCollision.width * firstCollision.$node.scale.x);
				const firstCollisionHeight =
					Math.abs(firstCollision.height * firstCollision.$node.scale.y);
				let firstCollisionX = firstCollision.$node.position.x - (firstCollision.$node.origin[0] * firstCollision.$node.scale.x);
				if (firstCollision.$node.scale.x < 0) {
					firstCollisionX += firstCollision.width * firstCollision.$node.scale.x;
				}
				firstCollisionX = (firstCollision.position.x * firstCollision.$node.scale.x) + firstCollisionX;
				let firstCollisionY = firstCollision.$node.position.y - (firstCollision.$node.origin[1] * firstCollision.$node.scale.y);
				if (firstCollision.$node.scale.y < 0) {
					firstCollisionY += firstCollision.height * firstCollision.$node.scale.y;
				}
				firstCollisionY = (firstCollision.position.y * firstCollision.$node.scale.y) + firstCollisionY;

				const secondCollisionWidth =
					Math.abs(secondCollision.width * secondCollision.$node.scale.x);
				const secondCollisionHeight =
					Math.abs(secondCollision.height * secondCollision.$node.scale.y);
				let secondCollisionX = secondCollision.$node.position.x - (secondCollision.$node.origin[0] * secondCollision.$node.scale.x);
				if (secondCollision.$node.scale.x < 0) {
					secondCollisionX += secondCollision.width * secondCollision.$node.scale.x;
				}
				secondCollisionX = (secondCollision.position.x * secondCollision.$node.scale.x) + secondCollisionX;
				let secondCollisionY = secondCollision.$node.position.y - (secondCollision.$node.origin[1] * secondCollision.$node.scale.y);
				if (secondCollision.$node.scale.y < 0) {
					secondCollisionY += secondCollision.height * secondCollision.$node.scale.y;
				}
				secondCollisionY = (secondCollision.position.y * secondCollision.$node.scale.y) + secondCollisionY;

				const collisionInfo = {
					top: false,
					bottom: false,
					left: false,
					right: false,
				};

				const bottomDist =
					secondCollisionY + secondCollisionHeight - firstCollisionY;
				const topDist = firstCollisionY + firstCollisionHeight - secondCollisionY;
				const rightDist =
					secondCollisionX + secondCollisionWidth - firstCollisionX;
				const leftDist = firstCollisionX + firstCollisionWidth - secondCollisionX;

				const minDist = Math.min(bottomDist, topDist, rightDist, leftDist);

				if (minDist === bottomDist) {
					collisionInfo.bottom = true;
				} else if (minDist === topDist) {
					collisionInfo.top = true;
				} else if (minDist === rightDist) {
					collisionInfo.right = true;
				} else if (minDist === leftDist) {
					collisionInfo.left = true;
				}

				return collisionInfo;
			},
			"circle-circle": (
				firstCollision: CollisionShapeComponent,
				secondCollision: CollisionShapeComponent,
			) => {
				firstCollision;
				secondCollision;

				return {
					top: false,
					bottom: false,
					left: false,
					right: false,
				};
			},
			"rectangle-circle": (
				firstCollision: CollisionShapeComponent,
				secondCollision: CollisionShapeComponent,
			) => {
				firstCollision;
				secondCollision;

				return {
					top: false,
					bottom: false,
					left: false,
					right: false,
				};
			},
			"circle-rectangle": (
				firstCollision: CollisionShapeComponent,
				secondCollision: CollisionShapeComponent,
			) => {
				firstCollision;
				secondCollision;

				return {
					top: false,
					bottom: false,
					left: false,
					right: false,
				};
			},
		};

	protected static resolveArea(
		{
			firstNode,
			secondNode,
		}: { firstNode: GlobalNode; secondNode: GlobalNode },
		mode: "entering" | "leaving",
	) {
		const firstArea = firstNode.$components.get("area-detect");
		const secondArea = secondNode.$components.get("area-detect");

		if (
			firstArea &&
			firstArea instanceof AreaComponent &&
			mode === "entering"
		) {
			firstArea.bodyEnteringArea(secondNode);
		}

		if (firstArea && firstArea instanceof AreaComponent && mode === "leaving") {
			firstArea.bodyLeavingArea(secondNode);
		}

		if (
			secondArea &&
			secondArea instanceof AreaComponent &&
			mode === "entering"
		) {
			secondArea.bodyEnteringArea(firstNode);
		}

		if (
			secondArea &&
			secondArea instanceof AreaComponent &&
			mode === "leaving"
		) {
			secondArea.bodyLeavingArea(firstNode);
		}
	}

	protected static resolveCharacterBody({
		firstNode,
		secondNode,
	}: { firstNode: GlobalNode; secondNode: GlobalNode }) {
		if (firstNode === null || secondNode === null) return;

		let characterBody = firstNode.$components.get("character-body");
		let staticBody = secondNode.$components.get("static-body");

		if (!characterBody) characterBody = secondNode.$components.get("character-body");
		if (!staticBody) staticBody = firstNode.$components.get("static-body");

		if (
			characterBody &&
			characterBody instanceof CharacterBodyComponent &&
			staticBody &&
			staticBody instanceof StaticBodyComponent
		) {
			const touch = staticBody.NODE.collision.getTouch();

			if (touch.top) characterBody.floor = true;
			else characterBody.floor = false;
		} else if (characterBody && characterBody instanceof CharacterBodyComponent) {
			characterBody.floor = false;
		}
	}

	static isColliding(
		firstCollision: CollisionShapeComponent,
		secondCollision: CollisionShapeComponent,
	) {
		const typeCollision =
			`${firstCollision.shape}-${secondCollision.shape}` as TCollisionShape;

		const checkCollision = CollisionComponent.typeCollisions[typeCollision];

		if (checkCollision) {
			return checkCollision(firstCollision, secondCollision)
		}

		return false;
	}

	static isTouch(
		firstCollision: CollisionShapeComponent,
		secondCollision: CollisionShapeComponent,
	) {
		const typeCollision =
			`${firstCollision.shape}-${secondCollision.shape}` as TCollisionShape;

		const checkTouchCollision =
			CollisionComponent.typeTouchCollisions[typeCollision];

		if (checkTouchCollision) {
			return checkTouchCollision(firstCollision, secondCollision);
		}

		return {
			top: false,
			bottom: false,
			left: false,
			right: false,
		};
	}

	static removeCollider(
		firstCollision: CollisionShapeComponent,
		secondCollision: CollisionShapeComponent,
	) {
		if (firstCollision._collider === secondCollision.$node) {
			firstCollision.setCollider(null);
			secondCollision.setCollider(null);

			firstCollision.setTouchCollider({
				top: false,
				bottom: false,
				left: false,
				right: false,
			});
			secondCollision.setTouchCollider({
				top: false,
				bottom: false,
				left: false,
				right: false,
			});

			CollisionComponent.resolveArea(
				{
					firstNode: firstCollision.$node,
					secondNode: secondCollision.$node,
				},
				"leaving",
			);

			CollisionComponent.resolveCharacterBody({
				firstNode: firstCollision.$node,
				secondNode: secondCollision.$node,
			});
		}
	}

	static resolveCollision(
		firstCollision: CollisionShapeComponent,
		secondCollision: CollisionShapeComponent,
	) {
		if (firstCollision._collider !== secondCollision.$node) {
			if (firstCollision.$node === null || secondCollision.$node === null) return

			firstCollision.setTouchCollider(
				CollisionComponent.isTouch(secondCollision, firstCollision),
			);

			secondCollision.setTouchCollider(
				CollisionComponent.isTouch(firstCollision, secondCollision),
			);

			firstCollision.setCollider(secondCollision.$node);
			secondCollision.setCollider(firstCollision.$node);

			CollisionComponent.resolveCharacterBody({
				firstNode: firstCollision.$node,
				secondNode: secondCollision.$node,
			});

			CollisionComponent.resolveArea(
				{
					firstNode: firstCollision.$node,
					secondNode: secondCollision.$node,
				},
				"entering",
			);
		}
	}

	setTouchCollider(touch: {
		top: boolean;
		bottom: boolean;
		left: boolean;
		right: boolean;
	}) {
		this._touch = touch;
	}

	setCollider(node: GlobalNode | null) {
		if (this._collider !== node) this._collider = node;
	}
}
