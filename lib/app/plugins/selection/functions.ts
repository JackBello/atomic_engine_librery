import type { GlobalNode } from "@/nodes/global/global-node";

export const moveNodeByMouse = (
	node: GlobalNode,
	mouseCoords: { x: number; y: number },
	startCoords: { x: number; y: number },
	relativeChildPosition: {
		position: number[];
		scale: number[];
	},
	relativeParentPosition: {
		position: number[];
		scale: number[];
	},
	pan: { x: number; y: number },
	zoom: number,
) => {
	const dx = (mouseCoords.x - (pan.x + startCoords.x * zoom)) / zoom;
	const dy = (mouseCoords.y - (pan.y + startCoords.y * zoom)) / zoom;

	relativeChildPosition.position[0] += dx;
	relativeChildPosition.position[1] += dy;

	node.x = (relativeChildPosition.position[0] -
		relativeParentPosition.position[0]) /
		relativeParentPosition.scale[0];
	node.y = (relativeChildPosition.position[1] -
		relativeParentPosition.position[1]) /
		relativeParentPosition.scale[1];
};

export const moveNodeByKeyboard = (
	node: GlobalNode,
	direction: string,
	zoom: number,
) => {
	if (direction === "ArrowUp") node.y -= 4 / zoom;
	if (direction === "ArrowDown") node.y += 4 / zoom;
	if (direction === "ArrowLeft") node.x -= 4 / zoom;
	if (direction === "ArrowRight") node.x += 4 / zoom;
};
