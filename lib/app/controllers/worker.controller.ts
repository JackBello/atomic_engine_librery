import * as stdUlid from "@std/ulid";

import type { INodeOperation, INodeProcess, TMode } from "@/nodes/global/types";
import { EngineCore } from "../engine";
import type { GameCore } from "../game";

import { $Canvas, GetOptions } from "@/app/symbols";

import EventObserver from "@/app/utils/observer";

import RenderCanvasWorker from "@/workers/render-canvas.worker?worker&inline";
import NodesCanvasWorker from "@/workers/nodes-canvas.worker?worker&inline";
import type { TAnything } from "@/app/types";

export default class WorkerController {
	private $app: EngineCore | GameCore;
	private $context!: ImageBitmapRenderingContext;

	protected _workerRender!: Worker;
	protected _workerNodes!: Worker;

	protected _events: EventObserver = new EventObserver();

	protected _queuePromises = new Map();

	constructor(app: EngineCore | GameCore) {
		this.$app = app;

		if (
			this.$app instanceof EngineCore &&
			this.$app[GetOptions]().renderProcess === "sub-thread"
		) {
			this.$context = this.$app[$Canvas].makeContext(
				"bitmaprenderer",
			) as ImageBitmapRenderingContext;

			this._workerNodes = new NodesCanvasWorker();
			this.listenNodesWorker();

			this._workerRender = new RenderCanvasWorker();
			this.listenRenderWorker();

			this.loadWorker();
			this.loopRenderWorker();
		}
	}

	protected sendToWorkerNodes(
		action: TAnything,
		payload: Record<string, TAnything>,
	) {
		return new Promise((resolve, reject) => {
			const idPromise = stdUlid.monotonicUlid();

			this._queuePromises.set(idPromise, {
				resolve,
				reject,
			});

			this._workerNodes.postMessage({
				action,
				payload,
				idPromise,
			});
		});
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

	protected loopRenderWorker() {
		this._workerRender.postMessage({
			action: "render",
		});
	}

	protected listenRenderWorker() {
		this._workerRender.onmessage = (event) => {
			if (event.data.imageBitMap) {
				this.$context.transferFromImageBitmap(event.data.imageBitMap);
			}
		};
	}

	protected listenNodesWorker() {
		this._workerNodes.onmessage = (event) => {
			if (event.data.type === "set:root") {
				this._workerRender.postMessage({
					action: "set:root",
					root: event.data.node,
				});

				this.render.draw();
			}

			if (event.data.type === "render/replace:node") {
				this._workerRender.postMessage({
					action: "replace:node",
					change: event.data.change,
				});
			}

			if (event.data.type === "render/update:node") {
				this._workerRender.postMessage({
					action: "update:node",
					change: event.data.change,
				});
			}

			if (event.data.type === "render/update:properties") {
				this._workerRender.postMessage({
					action: "update:properties",
					change: event.data.change,
				});
			}

			if (this._queuePromises.has(event.data.idPromise)) {
				const promise = this._queuePromises.get(event.data.idPromise);

				if (event.data.error && promise) {
					promise.reject(event.data.error);
				} else if (promise) {
					promise.resolve(event.data.payload);
				}

				this._queuePromises.delete(event.data.idPromise);
			}
		};
	}

	readonly render = {
		setSize: (width: number, height: number) => {
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

			this._workerRender.postMessage({
				action: "resize:drawer",
				options: {
					width,
					height,
				},
			});
		},
		addAfterOperation: (operation: INodeOperation) => {
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

			this._workerRender.postMessage({
				action: "add:after-operation",
				operation,
			});
		},
		addBeforeOperation: (operation: INodeOperation) => {
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

			this._workerRender.postMessage({
				action: "add:before-operation",
				operation,
			});
		},
		updateAfterOperation: (
			name: string,
			options: Record<string, TAnything>,
		) => {
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

			this._workerRender.postMessage({
				action: "update:after-operation",
				name,
				options,
			});
		},
		updateBeforeOperation: (
			name: string,
			options: Record<string, TAnything>,
		) => {
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

			this._workerRender.postMessage({
				action: "update:before-operation",
				name,
				options,
			});
		},
		setScaleViewport: (scale: number) => {
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

			this._workerRender.postMessage({
				action: "set:scale-viewport",
				scale,
			});
		},
		draw: () => {
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

			this._workerRender.postMessage({
				action: "draw",
			});
		},
	};

	readonly nodes = {
		getRoot: () => {
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

			this._workerNodes.postMessage({
				action: "get:root",
			});
		},
		setRoot: (root: INodeProcess) => {
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

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
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

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
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

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
			node: INodeProcess,
			from: string | number,
			type: "location" | "path" = "location",
			mode: TMode = "index",
			insert: "after" | "before" = "before",
		) => {
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

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
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

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
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

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
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

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
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

			const options: Record<string, TAnything> = {
				action: type === "path" ? "path/clear:nodes" : "clear:nodes",
				mode,
			};

			if (type === "location") options.location = from;
			else options.path = from;

			this._workerNodes.postMessage(options);
		},
		replaceNode: (
			node: INodeProcess,
			from: string | number,
			type: "location" | "path" = "location",
			mode: TMode = "index",
		) => {
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

			this._workerNodes.postMessage({
				action: type === "path" ? "path/replace:node" : "replace:node",
				value: node,
				mode,
				from,
			});
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
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

			this._workerNodes.postMessage({
				action: type === "path" ? "path/get:node" : "get:node",
				mode,
				from,
				search,
			});

			return new Promise((resolve) => {
				this._workerNodes.onmessage = (event) => {
					if (
						event.data.type ===
							(type === "path" ? "path/get:node" : "get:node")
					) {
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
			if (
				this.$app instanceof EngineCore &&
				this.$app[GetOptions]().renderProcess === "main-thread"
			) return;

			this._workerNodes.postMessage({
				action: type === "path" ? "path/get:node" : "get:node",
				from,
				to,
				insert,
			});
		},
	};
}
