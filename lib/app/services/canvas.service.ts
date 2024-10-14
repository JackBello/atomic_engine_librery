import type { AbstractCanvas } from "@/canvas/abstract/canvas.abstract";
import type { TCanvasType } from "@/canvas/canvas.types";
import { EngineCore } from "../engine";
import { GameCore } from "../game";

import { GetOptions } from "@/symbols";

import { CanvasEditor } from "@/canvas/canvas-editor";
import { CanvasGame } from "@/canvas/canvas-game";

export default class CanvasService {
	private $app: EngineCore | GameCore;

	protected _canvas: Map<TCanvasType, AbstractCanvas> = new Map();
	protected _main?: HTMLElement;
	protected _event?: HTMLDivElement;

	get event(): HTMLDivElement {
		return this._event as HTMLDivElement;
	}

	get main(): HTMLElement {
		return this._main as HTMLElement;
	}

	get instance(): HTMLCanvasElement {
		let canvas: HTMLCanvasElement = document.createElement("canvas");

		if (this.$app.mode === "game")
			canvas = (this._canvas.get("game") as AbstractCanvas).canvas;
		if (this.$app.mode === "editor")
			canvas = (this._canvas.get("editor") as AbstractCanvas).canvas;

		return canvas;
	}

	constructor(app: EngineCore | GameCore) {
		this.$app = app;

		const { width, height } = this.processSize();

		if (this.$app.mode === "editor") {
			this._canvas.set(
				"editor",
				new CanvasEditor({
					width,
					height,
				}),
			);
		}

		if (this.$app.mode === "game") {
			this._canvas.set(
				"game",
				new CanvasGame({
					width,
					height,
				}),
			);
		}

		this.initLayerEvent(width, height);
		this.initLayerCanvas(this.$app[GetOptions]().selector, width, height);
	}

	protected processSize() {
		let size = {
			width: 0,
			height: 0,
		};

		if (this.$app instanceof GameCore)
			size = {
				width: this.$app[GetOptions]().viewport.width,
				height: this.$app[GetOptions]().viewport.height,
			};
		else if (this.$app instanceof EngineCore)
			size = {
				width: this.$app[GetOptions]().width,
				height: this.$app[GetOptions]().height,
			};

		return size;
	}

	protected initLayerCanvas(
		selector: string | undefined,
		width: number,
		height: number,
	) {
		if (this._main) return;

		this._main = document.createElement("section");
		this._main.style.userSelect = "none";
		this._main.style.position = "relative";
		this._main.setAttribute("data-canvas-container", this.$app.mode);
		this._main.style.width = `${width}px`;
		this._main.style.height = `${height}px`;
		this._main.style.background = this.$app[GetOptions]().background;

		if (this.$app.mode === "editor")
			this._main.appendChild(
				(this._canvas.get("editor") as AbstractCanvas).canvas,
			);

		if (this.$app.mode === "game")
			this._main.appendChild(
				(this._canvas.get("game") as AbstractCanvas).canvas,
			);

		this._main.appendChild(this.event);

		if (selector) document.querySelector(selector)?.appendChild(this._main);
		else document.body.appendChild(this._main);
	}

	protected initLayerEvent(width: number, height: number) {
		if (this._event) return;

		this._event = document.createElement("div");
		this._event.style.width = `${width}px`;
		this._event.style.height = `${height}px`;
		this._event.style.position = "absolute";
		this._event.style.left = "0px";
		this._event.style.top = "0px";
		this._event.style.cursor = "default";
		this._event.style.userSelect = "none";
		this._event.style.touchAction = "none";
		this._event.setAttribute("data-type-canvas", "events");
	}

	infoText(text: string, font: string) {
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d") as CanvasRenderingContext2D ;

		context.font = font;

		return context.measureText(text)
	}

	setSize(width: number, height: number, ignoreInstance = false) {
		if (!this._main) return;
		if (!this._event) return;

		if (!ignoreInstance) {
			this.instance.width = width;
			this.instance.height = height;
		}

		this._event.style.width = `${width}px`;
		this._event.style.height = `${height}px`;

		this._main.style.width = `${width}px`;
		this._main.style.height = `${height}px`;
	}
}
