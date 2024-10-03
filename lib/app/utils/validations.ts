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

import type { Node2D, Rectangle2D } from "@/nodes";

export function isInsideRect(x: number, y: number, node: Rectangle2D) {
	return (
		x > node.x &&
		x < node.x + node.width &&
		y > node.y &&
		y < node.y + node.height
	);
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
