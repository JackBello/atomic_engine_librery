import { ComponentNode } from "@/nodes/global/class/component-node";
import type { CollisionShapeComponent } from "./collision-shape.component";
import { GlobalNode } from "@/nodes";
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
				firstCollision.width * firstCollision.scale[0];
			const firstCollisionHeight =
				firstCollision.height * firstCollision.scale[1];
			const firstCollisionX =
				firstCollision.position[0] + firstCollision.$node.x;
			const firstCollisionY =
				firstCollision.position[1] + firstCollision.$node.y;

			const secondCollisionWidth =
				secondCollision.width * secondCollision.scale[0];
			const secondCollisionHeight =
				secondCollision.height * secondCollision.scale[1];
			const secondCollisionX =
				secondCollision.position[0] + secondCollision.$node.x;
			const secondCollisionY =
				secondCollision.position[1] + secondCollision.$node.y;

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

	protected static resolveArea({firstNode, secondNode} : {firstNode: GlobalNode, secondNode: GlobalNode}, mode: "entering" | "leaving") {
		const firstArea = firstNode.$components.get("area-detect")
		const secondArea = secondNode.$components.get("area-detect")

		if (firstArea && firstArea instanceof AreaComponent && mode === "entering") {
			firstArea.bodyEnteringArea(secondNode)
		}

		if (firstArea && firstArea instanceof AreaComponent && mode === "leaving") {
			firstArea.bodyLeavingArea(secondNode)
		}

		if (secondArea && secondArea instanceof AreaComponent && mode === "entering") {
			secondArea.bodyEnteringArea(firstNode)
		}

		if (secondArea && secondArea instanceof AreaComponent && mode === "leaving") {
			secondArea.bodyLeavingArea(firstNode)
		}
	}

	protected static resolveCharacterBody({firstNode, secondNode} : {firstNode: GlobalNode, secondNode: GlobalNode}, value: boolean) {
		const characterBody = firstNode.$components.get("character-body")
		const staticBody = secondNode.$components.get("static-body");

		if (characterBody && characterBody instanceof CharacterBodyComponent && staticBody && staticBody instanceof StaticBodyComponent) {
			characterBody.floor = value;
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
			return checkCollision(firstCollision, secondCollision);
		}

		return false;
	}

	static removeCollider(
		firstCollision: CollisionShapeComponent,
		secondCollision: CollisionShapeComponent,
	) {
		if (firstCollision._collider === secondCollision.$node) {
			firstCollision.setCollider(null)
			secondCollision.setCollider(null)

			this.resolveArea({
				firstNode: firstCollision.$node,
				secondNode: secondCollision.$node,
			}, "leaving")

			this.resolveCharacterBody({
				firstNode: firstCollision.$node,
				secondNode: secondCollision.$node
			}, false)
		}
	}

	static resolveCollision(
		firstCollision: CollisionShapeComponent,
		secondCollision: CollisionShapeComponent,
	) {
		if (firstCollision._collider !== secondCollision.$node) {
			firstCollision.setCollider(secondCollision.$node)
			secondCollision.setCollider(firstCollision.$node)
	
			this.resolveArea({
				firstNode: firstCollision.$node,
				secondNode: secondCollision.$node
			}, "entering")

			this.resolveCharacterBody({
				firstNode: firstCollision.$node,
				secondNode: secondCollision.$node
			}, true)
		}
	}

	setCollider(node: GlobalNode | null) {
		if (this._collider !== node) 
			this._collider = node;
	}
}
