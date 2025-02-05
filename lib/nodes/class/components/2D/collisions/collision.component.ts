import { ComponentNode } from "@/nodes/global/class/component-node";
import type { CollisionShape2DComponent } from "./collision-shape.component";
import type { GlobalNode } from "@/nodes/global/global-node";
import type { TCollisionComponent } from "../../types";
import type { DetectionArea2DComponent } from "../detection-area.component";
import { calculateRectangleTouchWithRectangle, calculateRectangleWithRectangle } from "@/app/utils/shapes";
import { Vector2 } from "@/nodes";
import type { TAnything } from "@/app/types";

export type TCollisionShape =
	| "rectangle-rectangle"
	| "circle-circle"
	| "rectangle-circle"
	| "circle-rectangle";

export class Collision2DComponent<O extends TCollisionComponent = TCollisionComponent> extends ComponentNode<O> {
	readonly NAME_CLASS: string = "Collision2DComponent";

	protected _name = "collision";
	protected _description = "detect collision between nodes";

	protected _colliders: Map<string, {
		collider: GlobalNode
		touch: {
			bottom: boolean,
			top: boolean,
			left: boolean,
			right: boolean,
		}
		normal: Vector2
		type: string
		calculate: {
			node: TAnything
			collider: TAnything
		}
		shape: string
	}> = new Map();
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

	get colliders() {
		return [...this._colliders.values()];
	}

	get collider() {
		return this._colliders.values().next().value;
	}

	get touch() {
		return this._touch;
	}

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

	set touch(value: {
		top: boolean;
		bottom: boolean;
		left: boolean;
		right: boolean;
	}) {
		this._touch = value;
	}

	protected static typeCollisions: Record<
		TCollisionShape,
		(
			firstCollision: CollisionShape2DComponent,
			secondCollision: CollisionShape2DComponent,
		) => boolean
	> = {
			"rectangle-rectangle": (
				firstCollision: CollisionShape2DComponent,
				secondCollision: CollisionShape2DComponent,
			) => {
				const { first, second } = calculateRectangleWithRectangle(firstCollision, secondCollision);

				return (
					first.firstCollisionX < second.secondCollisionX + second.secondCollisionWidth &&
					first.firstCollisionX + first.firstCollisionWidth > second.secondCollisionX &&
					first.firstCollisionY < second.secondCollisionY + second.secondCollisionHeight &&
					first.firstCollisionY + first.firstCollisionHeight > second.secondCollisionY
				);
			},
			"circle-circle": (
				firstCollision: CollisionShape2DComponent,
				secondCollision: CollisionShape2DComponent,
			) => {
				firstCollision;
				secondCollision;

				return true;
			},
			"rectangle-circle": (
				firstCollision: CollisionShape2DComponent,
				secondCollision: CollisionShape2DComponent,
			) => {
				firstCollision;
				secondCollision;

				return true;
			},
			"circle-rectangle": (
				firstCollision: CollisionShape2DComponent,
				secondCollision: CollisionShape2DComponent,
			) => {
				firstCollision;
				secondCollision;

				return true;
			},
		};

	protected static typeTouchCollisions: Record<
		TCollisionShape,
		(
			firstCollision: CollisionShape2DComponent,
			secondCollision: CollisionShape2DComponent,
		) => {
			top: boolean;
			bottom: boolean;
			left: boolean;
			right: boolean;
		}
	> = {
			"rectangle-rectangle": (
				firstCollision: CollisionShape2DComponent,
				secondCollision: CollisionShape2DComponent,
			) => {
				const { first, second } = calculateRectangleWithRectangle(firstCollision, secondCollision);

				return calculateRectangleTouchWithRectangle(first, second);
			},
			"circle-circle": (
				firstCollision: CollisionShape2DComponent,
				secondCollision: CollisionShape2DComponent,
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
				firstCollision: CollisionShape2DComponent,
				secondCollision: CollisionShape2DComponent,
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
				firstCollision: CollisionShape2DComponent,
				secondCollision: CollisionShape2DComponent,
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

	static isColliding(
		firstCollision: CollisionShape2DComponent,
		secondCollision: CollisionShape2DComponent,
	) {
		const typeCollision =
			`${firstCollision.shape}-${secondCollision.shape}` as TCollisionShape;

		const checkCollision = Collision2DComponent.typeCollisions[typeCollision];

		if (checkCollision)
			return checkCollision(firstCollision, secondCollision)

		return false;
	}

	static isTouch(
		firstCollision: CollisionShape2DComponent,
		secondCollision: CollisionShape2DComponent,
	) {
		const typeCollision =
			`${firstCollision.shape}-${secondCollision.shape}` as TCollisionShape;

		const checkTouchCollision =
			Collision2DComponent.typeTouchCollisions[typeCollision];

		if (checkTouchCollision)
			return checkTouchCollision(firstCollision, secondCollision);

		return {
			top: false,
			bottom: false,
			left: false,
			right: false,
		};
	}

	static reset(firstCollision: CollisionShape2DComponent, secondCollision: CollisionShape2DComponent) {
		if (firstCollision._colliders.has(secondCollision.$node.id))
			firstCollision._colliders.delete(secondCollision.$node.id);
		if (secondCollision._colliders.has(firstCollision.$node.id))
			secondCollision._colliders.delete(firstCollision.$node.id);

		firstCollision.touch = {
			top: false,
			bottom: false,
			left: false,
			right: false,
		};
		secondCollision.touch = {
			top: false,
			bottom: false,
			left: false,
			right: false,
		};
	}

	static resolve(
		firstCollision: CollisionShape2DComponent,
		secondCollision: CollisionShape2DComponent,
	) {
		const { first, second } = calculateRectangleWithRectangle(firstCollision, secondCollision);

		if (!firstCollision._colliders.has(secondCollision.$node.id))
			firstCollision._colliders.set(secondCollision.$node.id, {
				collider: secondCollision.$node,
				touch: Collision2DComponent.isTouch(secondCollision, firstCollision),
				normal: Vector2.normalFromPoints(firstCollision.$node.position, secondCollision.$node.position),
				type: secondCollision.name,
				calculate: {
					node: first,
					collider: second
				},
				shape: secondCollision.shape
			})

		if (!secondCollision._colliders.has(firstCollision.$node.id))
			secondCollision._colliders.set(firstCollision.$node.id, {
				collider: firstCollision.$node,
				touch: Collision2DComponent.isTouch(firstCollision, secondCollision),
				normal: Vector2.normalFromPoints(secondCollision.$node.position, firstCollision.$node.position),
				type: firstCollision.name,
				calculate: {
					node: second,
					collider: first
				},
				shape: firstCollision.shape
			})

		firstCollision.touch = Collision2DComponent.isTouch(secondCollision, firstCollision);
		secondCollision.touch = Collision2DComponent.isTouch(firstCollision, secondCollision);
	}

	static resolveArea(
		firstCollision: CollisionShape2DComponent,
		secondCollision: CollisionShape2DComponent,
	) {
		const detectionAreaNode = firstCollision.NODE.$components.has("detection-area") ? firstCollision.NODE : secondCollision.NODE;
		const otherNode = detectionAreaNode === firstCollision.NODE ? secondCollision.NODE : firstCollision.NODE;

		const detectionComponent = detectionAreaNode.$components.get("detection-area") as DetectionArea2DComponent;

		const CollisionShapeComponentFirst = detectionAreaNode.$components.get("collision-shape") as CollisionShape2DComponent;
		const CollisionShapeComponentSecond = otherNode.$components.get("collision-shape") as CollisionShape2DComponent;

		if (Collision2DComponent.isColliding(
			CollisionShapeComponentFirst,
			CollisionShapeComponentSecond,
		)) {
			detectionComponent.bodyEnteringArea(otherNode);
		} else {
			detectionComponent.bodyLeavingArea(otherNode);
		}
	}
}