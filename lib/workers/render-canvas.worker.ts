import type {
	TAnything,
	TContextName,
	TContextObject,
	TDimension,
	TFunction,
	TMode,
} from "@/app/types";
import type { AbstractRender } from "@/nodes/abstract/render.abstract";
import type { INodeOperation, INodeProcess } from "@/nodes/global/types";

import { Render2D } from "@/nodes/context/2d/render";

const rendered: {
	mode?: TMode;
	dimension?: TDimension;
	context?: TContextName;
	canvas?: OffscreenCanvas;
	drawer?: TContextObject[TContextName];
} = {
	dimension: undefined,
	mode: undefined,
	context: undefined,
	canvas: undefined,
	drawer: undefined,
};

let draw = false;

let scaleViewport = 1;

const beforeOperations: Map<string, INodeOperation> = new Map();
const afterOperations: Map<string, INodeOperation> = new Map();

let rootNodes: INodeProcess[] = [];

const loadRendered = ({
	context,
	mode,
	dimension,
	width,
	height,
}: {
	context: TContextName;
	mode: TMode;
	dimension: TDimension;
	width: number;
	height: number;
}) => {
	rendered.mode = mode;
	rendered.dimension = dimension;
	rendered.context = context;
	rendered.canvas = new OffscreenCanvas(width, height);
	rendered.drawer = rendered.canvas.getContext(
		rendered.context.replace("-", "") as
			| "2d"
			| "webgl"
			| "webgl2"
			| "webgpu",
	) as TContextObject[TContextName];
};
const resizeDrawer = ({ width, height }: { width: number; height: number }) => {
	if (rendered.canvas) {
		rendered.canvas.width = width;
		rendered.canvas.height = height;
	}
};

const handleRender = (root: INodeProcess[]) => {
	if (!root) return;
	if (!rendered.mode) return;
	if (!rendered.context) return;
	if (!rendered.canvas) return;
	if (!rendered.drawer) return;

	const _: Record<string, () => AbstractRender> = {
		"2d": () =>
			new Render2D(
				rendered.drawer as CanvasRenderingContext2D,
				"sub",
			),
	};

	const render = _[rendered.context]();

	if (render) {
		render.scaleViewport = scaleViewport;

		render.clear();
		render.draw(root[0], {
			after: afterOperations,
			before: beforeOperations,
		});

		const imageBitMap = rendered.canvas.transferToImageBitmap();

		self.postMessage({ imageBitMap }, [imageBitMap] as object);

		draw = false;
	}
};

const gameLoop = () => {
	if (draw) {
		handleRender(rootNodes);
	}

	requestAnimationFrame(gameLoop);
};

const _nodes_ = (path: string, parent = false) => {
	return new Function(
		"nodes",
		`return nodes[${
			(parent ? path.slice(0, -2) : path).replace(/\//g, "].nodes[")
		}]`,
	);
};

const actions: Record<string, TFunction> = {
	"set:root": ({ root }: { root: INodeProcess[] }) => {
		rootNodes = root;
	},
	"load:rendered": ({ options }: {
		options: {
			context: TContextName;
			mode: TMode;
			dimension: TDimension;
			width: number;
			height: number;
		};
	}) => {
		loadRendered(options);
	},
	"resize:drawer": ({ options }: {
		options: {
			width: number;
			height: number;
		};
	}) => {
		resizeDrawer(options);
	},
	"add:after-operation": ({ operation }: { operation: INodeOperation }) => {
		afterOperations.set(operation.__name__, operation);
	},
	"add:before-operation": ({ operation }: { operation: INodeOperation }) => {
		beforeOperations.set(operation.__name__, operation);
	},
	"delete:after-operation": ({ name }: { name: string }) => {
		afterOperations.delete(name);
	},
	"delete:before-operation": ({ name }: { name: string }) => {
		beforeOperations.delete(name);
	},
	"update:after-operation": (
		{ name, options }: { name: string; options: Record<string, TAnything> },
	) => {
		let searchOperation = afterOperations.get(name);

		if (!searchOperation) return;

		searchOperation.options = options;

		afterOperations.set(name, searchOperation);

		searchOperation = undefined;
	},
	"update:before-operation": (
		{ name, options }: { name: string; options: Record<string, TAnything> },
	) => {
		let searchOperation = beforeOperations.get(name);

		if (!searchOperation) return;

		searchOperation.options = options;

		beforeOperations.set(name, searchOperation);

		searchOperation = undefined;
	},
	"set:scale-viewport": ({ scale }: { scale: number }) => {
		scaleViewport = scale;
	},
	"replace:node": ({ change }: { change: TAnything }) => {
		const node = _nodes_(change.__path__, true)(rootNodes);

		node[change.location.index] = change;
	},
	"update:node": ({ change }: { change: TAnything }) => {
		const node = _nodes_(change.path)(rootNodes);

		node.nodes = change.nodes;
	},
	"update:properties": ({ change }: { change: TAnything }) => {
		const node = _nodes_(change.path)(rootNodes);

		node.options = change.options;
	},
	"draw": () => {
		if (rootNodes.length) draw = true;
	},
	"render": () => {
		gameLoop();
	},
};

self.onmessage = (event) => {
	const actionExecute = actions[event.data.action];

	if (actionExecute) actionExecute(event.data);
};
