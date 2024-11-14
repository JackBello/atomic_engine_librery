import type { CollisionShapeComponent } from "@/nodes/class/components/2D/collisions/collision-shape.component";

export const collision_shape = (
	context: CanvasRenderingContext2D,
	collisionShape: CollisionShapeComponent,
) => {
	context.beginPath();

	context.fillStyle = collisionShape.fill;
	context.fillRect(
		collisionShape.position[0],
		collisionShape.position[1],
		collisionShape.width,
		collisionShape.height,
	);

	context.closePath();
};
