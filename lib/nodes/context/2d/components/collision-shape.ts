import type { CollisionShape2DComponent } from "@/nodes/class/components/2D/collisions/collision-shape.component";

export const collision_shape = (
	context: CanvasRenderingContext2D,
	collisionShape: CollisionShape2DComponent,
) => {
	context.beginPath();

	context.fillStyle = collisionShape.fill;
	context.fillRect(
		collisionShape.position.x,
		collisionShape.position.y,
		collisionShape.width,
		collisionShape.height,
	);

	context.closePath();
};
