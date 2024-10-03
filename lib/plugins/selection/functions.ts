import type { GlobalNode } from "@/nodes/global/global-node";

export const moveNodeByMouse = (
	node: GlobalNode,
	mouseCoords: { x: number; y: number },
	startCoords: { x: number; y: number },
	position: {
		x: number;
		y: number;
		scaleX: number;
		scaleY: number;
	},
	parentPosition: { x: number; y: number; scaleX: number; scaleY: number },
	pan: { x: number; y: number },
	zoom: number,
) => {
	const dx = mouseCoords.x - pan.x / zoom - startCoords.x;
	const dy = mouseCoords.y - pan.y / zoom - startCoords.y;

	position.x += dx;
	position.y += dy;

	node.x = (position.x - parentPosition.x) / parentPosition.scaleX;
	node.y = (position.y - parentPosition.y) / parentPosition.scaleY;
};

export const moveNodeByKeyboard = (
	node: GlobalNode,
	direction: string,
	pan: { x: number; y: number },
	zoom: number,
) => {
	if (direction === "ArrowUp") node.y -= 1 + pan.y / zoom;
	if (direction === "ArrowDown") node.y += 1 - pan.y / zoom;
	if (direction === "ArrowLeft") node.x -= 1 + pan.x / zoom;
	if (direction === "ArrowRight") node.x += 1 - pan.x / zoom;
};
