import type { TMode } from "@/types";
import type { INodeWorker } from "../global/node.types";
import type { ISize2D } from "../class/nodes-2D.types";

export abstract class AbstractRender {
	protected abstract node: INodeWorker;
	protected abstract mode: TMode;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	protected abstract afterDraw: any[];
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	protected abstract beforeDraw: any[];
	protected abstract scaleViewport: number;
	protected abstract gameSize: ISize2D;
	protected abstract editorSize: ISize2D;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	abstract configs: Record<string, any>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	abstract context: any;

	abstract setScaleViewport(scale: number): void;

	abstract setGameSize(size: ISize2D): void;

	abstract setEditorSize(size: ISize2D): void;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	abstract setAfterDraw(draw: any): void;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	abstract setBeforeDraw(draw: any): void;

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
