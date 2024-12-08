import type { ISize2D } from "../nodes/class/nodes-2D.types";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type TAnything = any;

export type TClass<C = TAnything, P = TAnything> = new (...params: P[]) => C;

export type ValueOf<T> = T[keyof T];

export type KeyOf<T> = keyof Partial<T>;

export type TFunction<T = void, P = TAnything> = (
	...params: P[]
) => T | Promise<T>;

export type TSerialize = "JSON" | "YAML" | "TOML" | "INI";

export type TDimension = "2D" | "3D";

export type TContextObject = {
	"2d": CanvasRenderingContext2D;
	"web-gl": WebGLRenderingContext;
	"web-gl2": WebGL2RenderingContext;
	"web-gpu": GPUCanvasContext;
};

export type TContextNameCanvas =
	| "2d"
	| "webgl"
	| "webgl2"
	| "webgpu";

export type TContextName = "2d" | "web-gl" | "web-gl2" | "web-gpu";

export type TContext = ValueOf<TContextObject>;

export interface IOptionsFramePerSecond {
	delay: number;
	velocity: number;
}

export type TMode = "game" | "editor";

export interface IOptionsGame {
	background: string;
	full_size?: boolean;
	full_screen?: boolean;
	x: number;
	y: number;
	center?: boolean;
	title?: string;
	icon?: string | URL | null;
	resizable?: boolean;
	viewport: ISize2D;
	scene?: string;
}
export interface IOptionsEngineCore extends ISize2D {
	background: string;
	context: TContextName;
	selector: string;
	dimension: TDimension;
	game: IOptionsGame;
	physics_frame: number
	render_frame: number
	analytics: boolean
}

export interface IOptionsGameCore extends IOptionsGame {
	context: TContextName;
	selector: string;
	physics_frame: number
	render_frame: number
	dimension: TDimension;
}

export type TEventApp =
	| "app/mouse:down"
	| "app/mouse:up"
	| "app/mouse:move"
	| "app/mouse:leave"
	| "app/mouse:enter"
	| "app/mouse:wheel"
	| "app/key:down"
	| "app/key:up"
	| "app/key:press"
	| "app/drag"
	| "app/drag:start"
	| "app/drag:end"
	| "app/drag:leave"
	| "app/drag:enter"
	| "app/drag:over"
	| "app/drop"
	| "app/touch:start"
	| "app/touch:move"
	| "app/touch:end"
	| "app/joyPad:connected"
	| "app/joyPad:disconnected";
