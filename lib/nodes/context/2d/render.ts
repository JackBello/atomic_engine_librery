import type { TAnything, TMode } from "@/types";
import { handleContext2D } from "./handle";
import { AbstractRender } from "../../abstract/render.abstract";
import type { INodeWorker } from "@/nodes/global/node.types";
import type { ISize2D } from "@/nodes/class/nodes-2D.types";
import { RenderNode } from "../../global/render-node";

export class Render2D extends AbstractRender {
	protected node!: INodeWorker;
	protected mode: TMode;
	protected afterDraw: TAnything[] = [];
	protected beforeDraw: TAnything[] = [];
	protected scaleViewport = 1;
	protected gameSize: ISize2D = {
		height: 0,
		width: 0,
	};
	protected editorSize: ISize2D = {
		height: 0,
		width: 0,
	};

	configs: Record<string, TAnything>;
	context: CanvasRenderingContext2D;

	constructor(
		context: CanvasRenderingContext2D,
		configs: Record<string, TAnything>,
		mode: TMode,
	) {
		super();

		this.context = context;
		this.configs = configs;
		this.mode = mode;
	}

	setScaleViewport(scale: number) {
		this.scaleViewport = scale;
	}

	setGameSize(size: ISize2D) {
		this.gameSize = size;
	}

	setEditorSize(size: ISize2D) {
		this.editorSize = size;
	}

	setAfterDraw(draw: TAnything[]) {
		this.afterDraw = draw;
	}

	setBeforeDraw(draw: TAnything[]) {
		this.beforeDraw = draw;
	}

	loadNode(node: INodeWorker) {
		this.node = node;
	}

	clear() {
		this.context.clearRect(
			0,
			0,
			this.context.canvas.width,
			this.context.canvas.height,
		);
	}

	draw() {
		if (this.mode === "editor" && this.beforeDraw.length)
			for (const draw of this.beforeDraw) {
				handleContext2D(draw.__type__, draw.options, this.context);
			}

		if (this.mode === "editor" && this.node) this.executeDrawEditor(this.node);
		if (this.mode === "game" && this.node) this.executeDrawGame(this.node);

		if (this.mode === "editor" && this.afterDraw.length > 0)
			for (const draw of this.afterDraw) {
				handleContext2D(draw.__type__, draw.options, this.context);
			}
	}

	protected executeDrawEditor(
		node: INodeWorker,
		parentTransform: {
			x: number;
			y: number;
			scaleX: number;
			scaleY: number;
			rotation: number;
			alpha: number;
		} = { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },
	) {
		if (node && node.__type__ === "global/scene" && node.nodes.length > 0) {
			for (const child of node.nodes) {
				this.executeDrawEditor(child);
			}
		}

		if (node?.options?.visible && node.__type__.startsWith("2D")) {
			const pan = this.configs.pan ?? { x: 0, y: 0 };
			const zoom = this.configs.zoom ?? 1;

			if (
				RenderNode.isInEditor(
					{
						x: node.options.x + parentTransform.x,
						y: node.options.y + parentTransform.y,
						width: node.options.width,
						height: node.options.height,
						scaleX: node.options.scaleX * parentTransform.scaleX,
						scaleY: node.options.scaleY * parentTransform.scaleY,
					},
					{
						height: this.editorSize.height,
						width: this.editorSize.width,
					},
					pan,
					zoom,
				)
			) {
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

				this.context.save();

				this.context.globalAlpha = globalTransform.alpha;

				this.context.translate(
					node.options.calculate.translate.x,
					node.options.calculate.translate.y,
				);

				if (node.options.calculate.rotation !== 0)
					this.context.rotate(node.options.calculate.rotation);

				this.context.scale(
					node.options.calculate.scale.x,
					node.options.calculate.scale.y,
				);

				handleContext2D(node.__type__ as TAnything, node.options, this.context);

				if (node.nodes.length > 0) {
					for (const child of node.nodes) {
						this.executeDrawEditor(child, globalTransform);
					}
				}

				this.context.restore();
			}
		}
	}

	protected executeDrawGame(
		node: INodeWorker,
		parentTransform: {
			x: number;
			y: number;
			scaleX: number;
			scaleY: number;
			rotation: number;
			alpha: number;
		} = { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },
	) {
		if (node && node.__type__ === "global/scene") {
			for (const child of node.nodes) {
				this.executeDrawGame(child);
			}
		}

		if (node?.options?.visible && node.__type__.startsWith("2D")) {
			if (
				RenderNode.isInViewport(
					{
						x: node.options.x + parentTransform.x,
						y: node.options.y + parentTransform.y,
						width: node.options.width,
						height: node.options.height,
					},
					{
						x: 0,
						y: 0,
						height: this.gameSize.height,
						width: this.gameSize.width,
					},
				)
			) {
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

				this.context.save();

				this.context.globalAlpha = globalTransform.alpha;

				this.context.translate(
					node.options.calculate.translate.x * this.scaleViewport,
					node.options.calculate.translate.y * this.scaleViewport,
				);

				if (node.options.calculate.rotation !== 0)
					this.context.rotate(node.options.calculate.rotation);

				this.context.scale(
					node.options.calculate.scale.x * this.scaleViewport,
					node.options.calculate.scale.y * this.scaleViewport,
				);

				handleContext2D(node.__type__ as TAnything, node.options, this.context);

				if (node.nodes.length > 0) {
					for (const child of node.nodes) {
						this.executeDrawGame(child, globalTransform);
					}
				}

				this.context.restore();
			}
		}
	}
}
