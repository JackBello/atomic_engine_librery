import type { INodeWorker, TCursorOptions } from "@/nodes/global/node.types";

import { RenderNode } from "@/nodes/global/render-node";

let root: INodeWorker[] = [];

/**
 * coord (x & y) is accumulate
 * extend
 *
 * parent x & y, parent scaleX & Y
 * child x & y, child scaleX & Y
 *
 * cX = pX + (pSX * cX)
 * pSX = pSX * cSX
 *
 */

const positionNode = (
	parent: { x: number; y: number; scaleX: number; scaleY: number },
	child: { x: number; y: number; scaleX: number; scaleY: number },
) => {
	const x = parent.x + parent.scaleX * child.x;
	const y = parent.y + parent.scaleY * child.y;

	const scaleX = parent.scaleX * child.scaleX;
	const scaleY = parent.scaleY * child.scaleY;

	return {
		x,
		y,
		scaleX,
		scaleY,
	};
};

// const rotatedMouseX =
// (mouseX - node.x) * Math.cos(-node.rotation) -
// (mouseY - node.y) * Math.sin(-node.rotation) +
// node.x
// const rotatedMouseY =
// (mouseX - node.x) * Math.sin(-node.rotation) -
// (mouseY - node.y) * Math.cos(-node.rotation) +
// node.y

function intersectionNodeWithCursor({
	zoom,
	pan,
	node,
	mouseCoords,
}: {
	zoom: number;
	pan: { x: number; y: number };
	node: {
		x: number;
		y: number;
		scaleX: number;
		scaleY: number;
		width: number;
		height: number;
		rotation: number;
	};
	mouseCoords: { x: number; y: number };
}) {
	const WIDTH = node.width * node.scaleX;
	const HEIGHT = node.height * node.scaleY;
	const X = node.x - WIDTH / 2;
	const Y = node.y - HEIGHT / 2;

	const mouseX = (mouseCoords.x - pan.x) / zoom;
	const mouseY = (mouseCoords.y - pan.y) / zoom;

	return (
		mouseX >= X && mouseX <= X + WIDTH && mouseY >= Y && mouseY <= Y + HEIGHT
	);
}

const cursorNode = (
	nodes: INodeWorker[],
	parentTransform: {
		x: number;
		y: number;
		scaleX: number;
		scaleY: number;
		rotation: number;
		alpha: number;
	},
	position: { x: number; y: number; scaleX: number; scaleY: number },
	mouseCoords: { x: number; y: number },
): TCursorOptions => {
	let cursor: TCursorOptions = "default";

	for (let index = nodes.length - 1; index >= 0; index--) {
		const node = nodes[index];

		if (node.options) {
			const globalTransform = RenderNode.calculateTransforms(
				{
					x: node.options.calculate.translate.x,
					y: node.options.calculate.translate.y,
					scaleX: node.options.calculate.scale.x,
					scaleY: node.options.calculate.scale.y,
					rotation: node.options.calculate.rotation,
					alpha: node.options.opacity,
				},
				parentTransform,
			);

			const globalPosition = positionNode(position, {
				scaleX: node.options.calculate.scale.x,
				scaleY: node.options.calculate.scale.y,
				x: node.options.calculate.translate.x,
				y: node.options.calculate.translate.y,
			});

			if (
				intersectionNodeWithCursor({
					zoom: 1,
					pan: {
						x: 0,
						y: 0,
					},
					node: {
						x: globalPosition.x,
						y: globalPosition.y,
						width: node.options.width,
						height: node.options.height,
						scaleX: globalTransform.scaleX,
						scaleY: globalTransform.scaleY,
						rotation: globalTransform.rotation,
					},
					mouseCoords,
				})
			) {
				if (node.options.hovered) {
					cursor =
						node.options.cursor === "default" ? "move" : node.options.cursor;
					break;
				}
				continue;
			}

			cursor = cursorNode(
				node.nodes,
				globalTransform,
				globalPosition,
				mouseCoords,
			);
		}
	}

	return cursor;
};

const selectNode = (
	nodes: INodeWorker[],
	parentTransform: {
		x: number;
		y: number;
		scaleX: number;
		scaleY: number;
		rotation: number;
		alpha: number;
	},
	position: { x: number; y: number; scaleX: number; scaleY: number },
	mouseCoords: { x: number; y: number },
):
	| {
			node: INodeWorker;
			transform: {
				x: number;
				y: number;
				scaleX: number;
				scaleY: number;
				rotation: number;
			};
			position: {
				x: number;
				y: number;
				scaleX: number;
				scaleY: number;
			};
			parentPosition: {
				x: number;
				y: number;
				scaleX: number;
				scaleY: number;
			};
	  }
	| undefined => {
	let result:
		| {
				node: INodeWorker;
				transform: {
					x: number;
					y: number;
					scaleX: number;
					scaleY: number;
					rotation: number;
				};
				position: { x: number; y: number; scaleX: number; scaleY: number };
				parentPosition: {
					x: number;
					y: number;
					scaleX: number;
					scaleY: number;
				};
		  }
		| undefined = undefined;

	for (let index = nodes.length - 1; index >= 0; index--) {
		const node = nodes[index];

		if (node.options) {
			const globalTransform = RenderNode.calculateTransforms(
				{
					x: node.options.calculate.translate.x,
					y: node.options.calculate.translate.y,
					scaleX: node.options.calculate.scale.x,
					scaleY: node.options.calculate.scale.y,
					rotation: node.options.calculate.rotation,
					alpha: node.options.opacity,
				},
				parentTransform,
			);

			const globalPosition = positionNode(position, {
				scaleX: node.options.calculate.scale.x,
				scaleY: node.options.calculate.scale.y,
				x: node.options.calculate.translate.x,
				y: node.options.calculate.translate.y,
			});

			if (
				intersectionNodeWithCursor({
					zoom: 1,
					pan: {
						x: 0,
						y: 0,
					},
					node: {
						x: globalPosition.x,
						y: globalPosition.y,
						width: node.options.width,
						height: node.options.height,
						scaleX: globalTransform.scaleX,
						scaleY: globalTransform.scaleY,
						rotation: globalTransform.rotation,
					},
					mouseCoords,
				})
			) {
				if (node.options.lock) {
					continue;
				}

				result = {
					transform: globalTransform,
					position: globalPosition,
					parentPosition: position,
					node,
				};

				break;
			}

			result = selectNode(
				node.nodes,
				globalTransform,
				globalPosition,
				mouseCoords,
			);
		}
	}

	return result;
};

self.onmessage = (event) => {
	if (event.data.action === "status")
		self.postMessage({
			type: "status",
			data: "ready",
		});

	if (event.data.action === "set:root") root = event.data.root;

	if (event.data.action === "select:node") {
		if (root.length === 0) return;

		const nodes = root[0].nodes;
		const mouseCoords = event.data.mouseCoords;
		const result = selectNode(
			nodes,
			{
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
				x: 0,
				y: 0,
				alpha: 1,
			},
			{
				scaleX: 1,
				scaleY: 1,
				x: 0,
				y: 0,
			},
			mouseCoords,
		);

		self.postMessage({
			type: "select:node",
			result,
		});
	}

	if (event.data.action === "cursor:node") {
		if (root.length === 0) return;

		const nodes = root[0].nodes;
		const mouseCoords = event.data.mouseCoords;
		const result = cursorNode(
			nodes,
			{
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
				x: 0,
				y: 0,
				alpha: 1,
			},
			{
				scaleX: 1,
				scaleY: 1,
				x: 0,
				y: 0,
			},
			mouseCoords,
		);

		self.postMessage({
			type: "cursor:node",
			result,
		});
	}
};
