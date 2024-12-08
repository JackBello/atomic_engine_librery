import type { AbstractRender } from "@/nodes/abstract/render.abstract";
import type { EngineCore } from "../engine";
import type { GameCore } from "../game";
import type {
	TAnything,
	TContextName,
	TContextNameCanvas,
	TContextObject,
	TDimension,
	TMode,
} from "../types";
import { ExecuteProcess } from "./symbols";
import { Render2D } from "@/nodes/context/2d/render";
import { $Canvas, $Scenes, _Camera } from "../symbols";
import type { OperationNode } from "@/nodes/global/class/operation-node";

export default class RenderController {
	private $app: EngineCore | GameCore;
	private $context!: CanvasRenderingContext2D;

	protected _options: {
		mode?: TMode;
		dimension?: TDimension;
		context?: TContextName;
	} = {
			dimension: undefined,
			mode: undefined,
			context: undefined,
		};

	protected _canvas?: OffscreenCanvas;
	protected _drawer?: TContextObject[TContextName];

	protected _operations = {
		before: new Map<string, OperationNode>(),
		after: new Map<string, OperationNode>(),
	};

	public draw = true;
	public scaleViewport = 1;

	public get operations() {
		return {
			get: (type: "after" | "before", name: string) => {
				return this._operations[type].get(name);
			},
			exist: (type: "after" | "before", name: string) => {
				return this._operations[type].has(name);
			},
			add: (type: "after" | "before", operation: OperationNode) => {
				this._operations[type].set(operation.name, operation);
			},
			delete: (type: "after" | "before", name: string) => {
				this._operations[type].delete(name);
			},
			update: (
				type: "after" | "before",
				name: string,
				options: Record<string, TAnything>,
			) => {
				let operation = this._operations[type].get(name);

				if (!operation) return;

				operation.options = options;

				this._operations[type].set(name, operation);

				operation = undefined;
			},
			clear: (type: "after" | "before") => {
				this._operations[type].clear();
			},
		};
	}

	constructor(app: EngineCore | GameCore) {
		this.$app = app;

		this.$context = this.$app[$Canvas].makeContext(
			"2d",
		) as CanvasRenderingContext2D;
	}

	public load({
		context,
		mode,
		dimension,
	}: {
		context: TContextName;
		mode: TMode;
		dimension: TDimension;
	}) {
		this._options.mode = mode;
		this._options.dimension = dimension;
		this._options.context = context;
	}

	public init(width: number, height: number) {
		if (!this._options.context) return;

		this._canvas = new globalThis.OffscreenCanvas(width, height);

		this._drawer = this._canvas.getContext(
			this._options.context.replace("-", "") as TContextNameCanvas,
		) as TContextObject[TContextName];

		this.$app[_Camera].setContext(this._drawer as CanvasRenderingContext2D)
	}

	public setSize(width: number, height: number) {
		if (!this._canvas) return

		this._canvas.width = width;
		this._canvas.height = height;
	}

	[ExecuteProcess]() {
		if (!this.$app[$Scenes].currentScene) return;
		if (!this._options.mode) return;
		if (!this._options.context) return;
		if (!this._canvas) return;
		if (!this._drawer) return;
		if (!this.draw) return;

		const _: Record<string, () => AbstractRender> = {
			"2d": () =>
				new Render2D(this._drawer as CanvasRenderingContext2D),
		};

		const render = _[this._options.context]();

		if (!render) return

		render.scaleViewport = this.scaleViewport;

		render.clear();

		this.$app[_Camera].render(() => {
			if (!this.$app[$Scenes].currentScene) return;

			render.draw(this.$app[$Scenes].currentScene, {
				after: this._operations.after,
				before: this._operations.before,
			});
		})

		this.$context.clearRect(0, 0, this.$context.canvas.width, this.$context.canvas.height)
		this.$context.drawImage(
			this._canvas,
			0, 0);

		this.draw = false;
	}
}
