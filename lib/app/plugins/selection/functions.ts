import type { GlobalNode } from "@/nodes/global/global-node";
import { Vector2 } from "@/nodes/vectors/vector-2";

export const moveNodeByMouse = (
	node: GlobalNode,
	mouseCoords: Vector2,
	startCoords: Vector2,
	relativeChildPosition: {
		position: Vector2;
		scale: Vector2;
	},
	relativeParentPosition: {
		position: Vector2;
		scale: Vector2;
	},
) => {
	// const dx = (mouseCoords.x - (pan.x + startCoords.x * zoom)) / zoom;
	// const dy = (mouseCoords.y - (pan.y + startCoords.y * zoom)) / zoom;

	// const dx = mouseCoords.x - startCoords.x
	// const dy = mouseCoords.y - startCoords.y

	const delta = Vector2.subtract(mouseCoords, startCoords)

	// relativeChildPosition.position[0] += dx;
	// relativeChildPosition.position[1] += dy;

	relativeChildPosition.position.add(delta)

	const vec2 = Vector2.zero()

	vec2.x = (relativeChildPosition.position.x -
		relativeParentPosition.position.x) /
		relativeParentPosition.scale.x
	vec2.y = (relativeChildPosition.position.y -
		relativeParentPosition.position.y) /
		relativeParentPosition.scale.y

	// vec2.x = (relativeChildPosition.position[0] -
	// 	relativeParentPosition.position[0]) /
	// 	relativeParentPosition.scale[0]
	// vec2.y = (relativeChildPosition.position[1] -
	// 	relativeParentPosition.position[1]) /
	// 	relativeParentPosition.scale[1]

	node.position = vec2
};

export const moveNodeByKeyboard = (
	node: GlobalNode,
	direction: string,
) => {
	const vec2 = Vector2.zero()

	// if (direction === "ArrowUp") vec2.y -= 4 / zoom;
	// if (direction === "ArrowDown") vec2.y += 4 / zoom;
	// if (direction === "ArrowLeft") vec2.x -= 4 / zoom;
	// if (direction === "ArrowRight") vec2.x += 4 / zoom;

	if (direction === "ArrowUp") vec2.y -= 4;
	if (direction === "ArrowDown") vec2.y += 4;
	if (direction === "ArrowLeft") vec2.x -= 4;
	if (direction === "ArrowRight") vec2.x += 4;

	node.position.add(vec2)
};
