import type { ISizeCanvas, TCanvasType } from "../canvas.types.ts";

export abstract class AbstractCanvas {
	abstract readonly type: TCanvasType;

	abstract readonly canvas: HTMLCanvasElement;

	protected abstract _size: ISizeCanvas;

	public abstract load(): OffscreenCanvas;

	protected abstract init(): void;
}
