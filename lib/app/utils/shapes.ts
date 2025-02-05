// const _rectangle = { x: 50, y: 50, ancho: 100, alto: 100 }
// const _arc = { x: 150, y: 150, radio: 50, start: 0, fin: Math.PI * 2 }
// const _triangle = {
//   p1: { x: 200, y: 50 },
//   p2: { x: 250, y: 150 },
//   p3: { x: 150, y: 150 }
// }
// const _polygon = {
//   points: [
//     { x: 300, y: 50 },
//     { x: 350, y: 50 },
//     { x: 325, y: 100 },
//     { x: 300, y: 100 }
//   ]
// }

import type { CollisionShape2DComponent } from "@/components";
import type { Node2D } from "@/nodes";

export const calculateRectangleWithRectangle = (
	firstCollision: CollisionShape2DComponent,
	secondCollision: CollisionShape2DComponent,
) => {
	const firstCollisionWidth =
		Math.abs(firstCollision.width * firstCollision.NODE.scale.x);
	const firstCollisionHeight =
		Math.abs(firstCollision.height * firstCollision.NODE.scale.y);
	let firstCollisionX = firstCollision.NODE.position.x - (firstCollision.NODE.origin[0] * firstCollision.NODE.scale.x);
	if (firstCollision.NODE.scale.x < 0) {
		firstCollisionX += firstCollision.width * firstCollision.NODE.scale.x;
	}
	firstCollisionX = (firstCollision.position.x * firstCollision.NODE.scale.x) + firstCollisionX;
	let firstCollisionY = firstCollision.NODE.position.y - (firstCollision.NODE.origin[1] * firstCollision.NODE.scale.y);
	if (firstCollision.NODE.scale.y < 0) {
		firstCollisionY += firstCollision.height * firstCollision.NODE.scale.y;
	}
	firstCollisionY = (firstCollision.position.y * firstCollision.NODE.scale.y) + firstCollisionY;

	const secondCollisionWidth =
		Math.abs(secondCollision.width * secondCollision.NODE.scale.x);
	const secondCollisionHeight =
		Math.abs(secondCollision.height * secondCollision.NODE.scale.y);
	let secondCollisionX = secondCollision.NODE.position.x - (secondCollision.NODE.origin[0] * secondCollision.NODE.scale.x);
	if (secondCollision.NODE.scale.x < 0) {
		secondCollisionX += secondCollision.width * secondCollision.NODE.scale.x;
	}
	secondCollisionX = (secondCollision.position.x * secondCollision.NODE.scale.x) + secondCollisionX;
	let secondCollisionY = secondCollision.NODE.position.y - (secondCollision.NODE.origin[1] * secondCollision.NODE.scale.y);
	if (secondCollision.NODE.scale.y < 0) {
		secondCollisionY += secondCollision.height * secondCollision.NODE.scale.y;
	}
	secondCollisionY = (secondCollision.position.y * secondCollision.NODE.scale.y) + secondCollisionY;

	return {
		first: {
			firstCollisionWidth,
			firstCollisionHeight,
			firstCollisionX,
			firstCollisionY,
		},
		second: {
			secondCollisionWidth,
			secondCollisionHeight,
			secondCollisionX,
			secondCollisionY,
		}
	}
}

export const calculateRectangleTouchWithRectangle = (first: {
	firstCollisionWidth: number;
	firstCollisionHeight: number;
	firstCollisionX: number;
	firstCollisionY: number;
}, second: {
	secondCollisionWidth: number;
	secondCollisionHeight: number;
	secondCollisionX: number;
	secondCollisionY: number;
}) => {
	const collisionInfo = {
		top: false,
		bottom: false,
		left: false,
		right: false,
	};

	const bottomDist = second.secondCollisionY + second.secondCollisionHeight - first.firstCollisionY;
	const topDist = first.firstCollisionY + first.firstCollisionHeight - second.secondCollisionY;
	const rightDist = second.secondCollisionX + second.secondCollisionWidth - first.firstCollisionX;
	const leftDist = first.firstCollisionX + first.firstCollisionWidth - second.secondCollisionX;

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
}

export function isInsideArc(x: number, y: number, node: Node2D) {
	const dx = x - node.x;
	const dy = y - node.y;
	const distance = Math.sqrt(dx * dx + dy * dy);
	return distance < node.radio;
}

export function isInsideTriangle(x: number, y: number, node: Node2D) {
	const { p1, p2, p3 } = node;
	const area1 = calculateTriangleArea(x, y, p2.x, p2.y, p3.x, p3.y);
	const area2 = calculateTriangleArea(x, y, p1.x, p1.y, p3.x, p3.y);
	const area3 = calculateTriangleArea(x, y, p1.x, p1.y, p2.x, p2.y);
	const mainArea = calculateTriangleArea(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
	return Math.abs(mainArea - (area1 + area2 + area3)) <= 1;
}

export function calculateTriangleArea(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	x3: number,
	y3: number,
) {
	return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
}

export function isInsidePolygon(x: number, y: number, node: Node2D) {
	const points = node.points;
	let inside = false;
	for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
		const xi = points[i].x;
		const yi = points[i].y;
		const xj = points[j].x;
		const yj = points[j].y;
		const intersect =
			yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
		if (intersect) inside = !inside;
	}
	return inside;
}


export const convertOffsetRectangleToCircle = (offset: number) => -(offset - 0.5);

export const convertOffsetCircleToRectangle = (offset: number) => 0.5 - offset;