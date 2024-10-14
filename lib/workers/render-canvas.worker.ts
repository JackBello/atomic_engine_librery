import type {
	AllTypesSimple,
	TContextName,
	TContextObject,
	TDimension,
	TMode,
} from "@/types";
import type { ISize2D } from "@/nodes/class/nodes-2D.types";
import type { AbstractRender } from "@/nodes/abstract/render.abstract";
import type { INodeWorker } from "@/nodes/global/node.types";

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

let reDraw = true;

let scaleViewport = 1;

let viewportGame: ISize2D = {
	width: 0,
	height: 0,
};

let sizeEditor: ISize2D = {
	width: 0,
	height: 0,
};

let animationController: {
	timestamp: number;
	deltaTime: number;
} = {
	deltaTime: 0,
	timestamp: 0,
};

const frameController: {
	control: {
		delay: number;
		velocity: number;
	};
	frame: number;
} = {
	control: {
		delay: 0,
		velocity: 0,
	},
	frame: 0,
};

let beforeDraw: object[] = [];
let afterDraw: object[] = [];
let configs: Record<string, AllTypesSimple> = {};

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
		rendered.context.replace("-", "") as "2d" | "webgl" | "webgl2" | "webgpu",
	) as TContextObject[TContextName];
};
const resizeDrawer = ({ width, height }: { width: number; height: number }) => {
	if (rendered.canvas) {
		rendered.canvas.width = width;
		rendered.canvas.height = height;
	}
};

const handleRender = (root: INodeWorker[]) => {
	if (!root) return;
	if (!rendered.mode) return;
	if (!rendered.context) return;
	if (!rendered.canvas) return;
	if (!rendered.drawer) return;

	animationController;
	frameController;

	const _: Record<string, AbstractRender> = {
		"2d": new Render2D(
			rendered.drawer as CanvasRenderingContext2D,
			configs,
			rendered.mode,
		),
	};

	const render = _[rendered.context];

	if (render) {
		if (rendered.mode === "editor") {
			render.setEditorSize(sizeEditor);
		}
		if (rendered.mode === "game") {
			render.setGameSize(viewportGame);
			render.setScaleViewport(scaleViewport);
		}

		render.setAfterDraw(afterDraw);
		render.setBeforeDraw(beforeDraw);

		render.loadNode(root[0]);

		render.clear();

		render.draw();

		const imageBitMap = rendered.canvas.transferToImageBitmap();

		self.postMessage({ imageBitMap }, [imageBitMap] as object);

		reDraw = false;
	}
};

self.onmessage = (event) => {
	if (event.data.action === "status")
		self.postMessage({
			type: "status",
			data: "ready",
		});

	if (event.data.action === "load:rendered") loadRendered(event.data.options);

	if (event.data.action === "resize:drawer") resizeDrawer(event.data.options);

	if (event.data.action === "set:after-draw") afterDraw = event.data.list;

	if (event.data.action === "set:before-draw") beforeDraw = event.data.list;

	if (event.data.action === "set:size-editor") sizeEditor = event.data.size;

	if (event.data.action === "set:viewport-game")
		viewportGame = event.data.viewport;

	if (event.data.action === "set:scale-viewport")
		scaleViewport = event.data.scaleViewport;

	if (event.data.action === "set:animation")
		animationController = event.data.animation;

	if (event.data.action === "set:frame")
		frameController.control = event.data.control;

	if (event.data.action === "set:configs") configs = event.data.configs;

	if (event.data.action === "re-draw") reDraw = true;

	if (event.data.action === "render" && reDraw) handleRender(event.data.root);
};
