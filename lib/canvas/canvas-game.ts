import type { ISizeCanvas, TCanvasType } from "./canvas.types";

import { AbstractCanvas } from "./abstract/canvas.abstract";

export class CanvasGame extends AbstractCanvas {
	readonly type: TCanvasType;
	readonly canvas!: HTMLCanvasElement;

	protected _size: ISizeCanvas = {
		height: 0,
		width: 0,
	};

	constructor(size: ISizeCanvas) {
		super();

		this.type = "game";
		this.canvas = document.createElement("canvas");

		this._size = { ...this._size, ...size };

		this.init();
	}

	public load(): OffscreenCanvas {
		return this.canvas.transferControlToOffscreen();
	}

	protected init(): void {
		this.canvas.width = this._size.width;
		this.canvas.height = this._size.height;
		this.canvas.style.position = "absolute";
		this.canvas.style.left = "0px";
		this.canvas.style.top = "0px";
		this.canvas.style.cursor = "default";
		this.canvas.style.userSelect = "none";
		this.canvas.style.touchAction = "none";
		this.canvas.setAttribute("data-type-canvas", this.type);
	}
}
