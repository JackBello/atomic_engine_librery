import type { TAnything, TMode } from "@/types";
import type { INodeWorker } from "../global/node.types";
import type { ISize2D } from "../class/nodes-2D.types";

export abstract class AbstractRender {
	protected abstract node: INodeWorker;
	protected abstract mode: TMode;
	protected abstract afterDraw: TAnything[];
	protected abstract beforeDraw: TAnything[];
	protected abstract scaleViewport: number;
	protected abstract gameSize: ISize2D;
	protected abstract editorSize: ISize2D;

	abstract configs: Record<string, TAnything>;
	abstract context: TAnything;

	abstract setScaleViewport(scale: number): void;

	abstract setGameSize(size: ISize2D): void;

	abstract setEditorSize(size: ISize2D): void;

	abstract setAfterDraw(draw: TAnything): void;

	abstract setBeforeDraw(draw: TAnything): void;

	abstract loadNode(node: INodeWorker): void;

	abstract clear(): void;

	abstract draw(): void;

	protected abstract executeDrawEditor(
		node: INodeWorker,
		parentTransform: {
			x: number;
			y: number;
			scaleX: number;
			scaleY: number;
			rotation: number;
			alpha: number;
		},
	): void;

	protected abstract executeDrawGame(
		node: INodeWorker,
		parentTransform: {
			x: number;
			y: number;
			scaleX: number;
			scaleY: number;
			rotation: number;
			alpha: number;
		},
	): void;
}
