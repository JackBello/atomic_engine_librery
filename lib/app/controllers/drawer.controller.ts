import type {
	INodeWorker,
	TCursorOptions,
	TMode,
} from "@/nodes/global/node.types";
import type { AtomicEngine } from "@/atomic-engine";
import type { AtomicGame } from "@/atomic-game";

import { $Canvas, GetOptions } from "@/symbols";

import EventObserver from "@/app/utils/observer";

import EditorCanvasWorker from "@/workers/editor-canvas.worker?worker&inline";
import RenderCanvasWorker from "@/workers/render-canvas.worker?worker&inline";
import NodesCanvasWorker from "@/workers/nodes-canvas.worker?worker&inline";
import type { TAnything } from "@/types";

export default class DrawerController {
	private $app: AtomicEngine | AtomicGame;

	protected _workerEditor: Worker;
	protected _workerRender: Worker;
	protected _workerNodes: Worker;
	protected _events: EventObserver = new EventObserver();

	constructor(app: AtomicEngine | AtomicGame) {
		this.$app = app;

		this._workerEditor = new EditorCanvasWorker();
		this._workerRender = new RenderCanvasWorker();
		this._workerNodes = new NodesCanvasWorker();

		this.loadWorker();
		this.listenWorker();
	}

	protected loadWorker() {
		this._workerRender.postMessage({
			action: "load:rendered",
			options: {
				context: this.$app[GetOptions]().context,
				mode: this.$app.mode,
				dimension: this.$app[GetOptions]().dimension,
				width: this.$app[$Canvas].instance.clientWidth,
				height: this.$app[$Canvas].instance.clientHeight,
			},
		});
	}

	protected listenWorker() {
		this._workerRender.onmessage = (event) => {
			const imageBitMap = event.data.imageBitMap as ImageBitmap;

			if (imageBitMap) {
				const context = this.$app[$Canvas].instance.getContext(
					"bitmaprenderer",
				) as ImageBitmapRenderingContext;

				context.transferFromImageBitmap(imageBitMap);
			}
		};
	}

	readonly render = {
		setSize: (width: number, height: number) => {
			this._workerRender.postMessage({
				action: "resize:drawer",
				options: {
					width,
					height,
				},
			});
		},
		setAfterDraw: (afterDraw: TAnything[]) => {
			this._workerRender.postMessage({
				action: "set:after-draw",
				list: afterDraw,
			});
		},
		setBeforeDraw: (beforeDraw: TAnything[]) => {
			this._workerRender.postMessage({
				action: "set:before-draw",
				list: beforeDraw,
			});
		},
		setSizeEditor: (width: number, height: number) => {
			this._workerRender.postMessage({
				action: "set:size-editor",
				size: {
					width,
					height,
				},
			});
		},
		setViewportGame: (width: number, height: number) => {
			this._workerRender.postMessage({
				action: "set:viewport-game",
				viewport: {
					width,
					height,
				},
			});
		},
		setScaleViewport: (scale: number) => {
			this._workerRender.postMessage({
				action: "set:scale-viewport",
				scaleViewport: scale,
			});
		},
		setAnimation: (animation: { timestamp: number; deltaTime: number }) => {
			this._workerRender.postMessage({
				action: "set:animation",
				animation,
			});
		},
		setFrame: (control: { velocity: number; delay: number }) => {
			this._workerRender.postMessage({
				action: "set:frame",
				control,
			});
		},
		setConfigs: (configs: TAnything) => {
			this._workerRender.postMessage({
				action: "set:configs",
				configs,
			});
		},
		reDraw: () => {
			this._workerRender.postMessage({
				action: "re-draw",
			});
		},
	};

	readonly nodes = {
		getRoot: async (): Promise<INodeWorker> => {
			this._workerNodes.postMessage({
				action: "get:root",
			});

			return new Promise((resolve) => {
				this._workerNodes.onmessage = (event) => {
					if (event.data.type === "get:root") {
						resolve(event.data.node);
					}
				};
			});
		},
		setRoot: (root: INodeWorker) => {
			this._workerNodes.postMessage({
				action: "set:root",
				root,
			});
		},
		getNodes: async (
			from: string | number,
			type: "location" | "path" = "location",
			mode: TMode = "index",
		) => {
			const action = type === "path" ? "path/get:nodes" : "get:nodes";

			const options: Record<string, TAnything> = {
				action,
				mode,
			};

			if (type === "location") options.location = from;
			else options.path = from;

			this._workerNodes.postMessage(options);

			return new Promise((resolve) => {
				this._workerNodes.onmessage = (event) => {
					if (event.data.type === action) {
						resolve(event.data.node);
					}
				};
			});
		},
		getNode: async (
			from: string | number,
			type: "location" | "path" = "location",
			mode: TMode = "index",
		) => {
			const action = type === "path" ? "path/get:node" : "get:node";

			const options: Record<string, TAnything> = {
				action,
				mode,
			};

			if (type === "location") options.location = from;
			else options.path = from;

			this._workerNodes.postMessage(options);

			return new Promise((resolve) => {
				this._workerNodes.onmessage = (event) => {
					if (event.data.type === action) {
						resolve(event.data.node);
					}
				};
			});
		},
		addNode: (
			node: INodeWorker,
			from: string | number,
			type: "location" | "path" = "location",
			mode: TMode = "index",
			insert: "after" | "before" = "before",
		) => {
			const options: Record<string, TAnything> = {
				action: type === "path" ? "path/add:node" : "add:node",
				value: node,
				mode,
				insert,
			};

			if (type === "location") options.location = from;
			else options.path = from;

			this._workerNodes.postMessage(options);
		},
		updateNode: (
			id: string,
			value: Record<string, TAnything>,
			from: string | number,
			type: "location" | "path" = "location",
			mode: TMode = "index",
		) => {
			const options: Record<string, TAnything> = {
				action: type === "path" ? "path/update:node" : "update:node",
				value,
				mode,
				id,
			};

			if (type === "location") options.location = from;
			else options.path = from;

			this._workerNodes.postMessage(options);
		},
		hasNode: async (
			from: string | number,
			type: "location" | "path" = "location",
			mode: TMode = "index",
		) => {
			const action = type === "path" ? "path/has:node" : "has:node";

			const options: Record<string, TAnything> = {
				action,
				mode,
			};

			if (type === "location") options.location = from;
			else options.path = from;

			this._workerNodes.postMessage(options);

			return new Promise((resolve) => {
				this._workerNodes.onmessage = (event) => {
					if (event.data.type === action) {
						resolve(event.data.node);
					}
				};
			});
		},
		deleteNode: (
			from: string | number,
			type: "location" | "path" = "location",
			mode: TMode = "index",
		) => {
			const options: Record<string, TAnything> = {
				action: type === "path" ? "path/delete:node" : "delete:node",
				mode,
			};

			if (type === "location") options.location = from;
			else options.path = from;

			this._workerNodes.postMessage(options);
		},
		clearNodes: (
			from: string | number,
			type: "location" | "path" = "location",
			mode: TMode = "index",
		) => {
			const options: Record<string, TAnything> = {
				action: type === "path" ? "path/clear:nodes" : "clear:nodes",
				mode,
			};

			if (type === "location") options.location = from;
			else options.path = from;

			this._workerNodes.postMessage(options);
		},
		replaceNode: (
			node: INodeWorker,
			from: string | number,
			type: "location" | "path" = "location",
			mode: TMode = "index",
		) => {
			const options: Record<string, TAnything> = {
				action: type === "path" ? "path/replace:node" : "replace:node",
				value: node,
				mode,
				from,
			};

			this._workerNodes.postMessage(options);
		},
		searchNode: async (
			from: string | number,
			search: {
				value: string;
				mode: TMode;
			},
			type: "location" | "path" = "location",
			mode: TMode = "index",
		) => {
			const action = type === "path" ? "path/get:node" : "get:node";

			const options: Record<string, TAnything> = {
				action,
				mode,
				from,
				search,
			};

			this._workerNodes.postMessage(options);

			return new Promise((resolve) => {
				this._workerNodes.onmessage = (event) => {
					if (event.data.type === action) {
						resolve(event.data.node);
					}
				};
			});
		},
		moveNode: (
			from: {
				search: string | number;
				mode: TMode;
			},
			to: {
				search: string | number;
				mode: TMode;
			},
			type: "location" | "path" = "location",
			insert: "after" | "before" = "before",
		) => {
			const options: Record<string, TAnything> = {
				action: type === "path" ? "path/get:node" : "get:node",
				from,
				to,
				insert,
			};

			this._workerNodes.postMessage(options);
		},
	};

	readonly editor = {
		selectNode: async (mouseCoords: {
			x: number;
			y: number;
		}): Promise<
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
			| undefined
		> => {
			this._workerEditor.postMessage({
				action: "select:node",
				mouseCoords,
			});

			return new Promise((resolve) => {
				this._workerEditor.onmessage = (event) => {
					if (event.data.type === "select:node") {
						resolve(event.data.result);
					}
				};
			});
		},
		cursorNode: async (mouseCoords: {
			x: number;
			y: number;
		}): Promise<TCursorOptions> => {
			this._workerEditor.postMessage({
				action: "cursor:node",
				mouseCoords,
			});

			return new Promise((resolve) => {
				this._workerEditor.onmessage = (event) => {
					if (event.data.type === "cursor:node") {
						resolve(event.data.result);
					}
				};
			});
		},
	};

	async process() {
		const root = await this.nodes.getRoot();

		this._workerEditor.postMessage({
			action: "set:root",
			root,
		});

		this._workerRender.postMessage({
			action: "render",
			root,
		});
	}
}
