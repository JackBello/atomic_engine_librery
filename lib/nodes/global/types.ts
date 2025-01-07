import type { TAnything, TClass, TFunction } from "../../app/types";
import type { GlobalNode } from "./global-node";
import type { HandlerAttribute } from "./handlers/attributes";
import type { HandlerComponent } from "./handlers/components";
import type { HandlerFunction } from "./handlers/functions";
import type { HandlerMetaKey } from "./handlers/meta-keys";
import type { HandlerNode } from "./handlers/nodes";

import {
	NodePropHandlerAttributes,
	NodePropHandlerComponents,
	NodePropHandlerFunctions,
	NodePropHandlerMetaKeys,
	NodePropHandlerNodes,
	NodeSetHandlerAttributes,
	NodeSetHandlerComponents,
	NodeSetHandlerFunctions,
	NodeSetHandlerMetaKeys,
	NodeSetHandlerNodes,
} from "../symbols";
import type { ComponentNode } from "./class/component-node";
import type { HandlerScript } from "./handlers/script";
import type { ResourceImage } from "@/app/services/resources/image.resource";

export type TVec2 = `Vec2(${number}, ${number})`;

export type TTypeNodeGlobal = "Scene" | "GlobalNode" | "CanvasNode";

export type TTypeNode2D =
	| "Node2D"
	| "Rectangle2D"
	| "Circle2D"
	| "Text2D"
	| "LineFlowEffect2D"
	| "Selection2D"
	| "ControlEdition2D"
	| "Collision2D"
	| "CollisionShape2D"
	| "Image2D"
	| "Sprite2D";

export type TTypeNode3D = "Cube3D" | "Sphere3D";

export type TTypeNodes = TTypeNodeGlobal | TTypeNode2D | TTypeNode3D;

export type TSize = "px" | "em" | "pc" | "cm" | "rem" | "pt" | "inch" | "%";

export type TCursorOptions =
	| "auto"
	| "default"
	| "pointer"
	| "grabbing"
	| "grab"
	| "progress"
	| "help"
	| "wait"
	| "cell"
	| "crosshair"
	| "text"
	| "vertical-text"
	| "alias"
	| "copy"
	| "move"
	| "no-drop"
	| "not-allowed"
	| "all-scroll"
	| "col-resize"
	| "e-resize"
	| "ew-resize"
	| "n-resize"
	| "ne-resize"
	| "nesw-resize"
	| "ns-resize"
	| "nw-resize"
	| "nwse-resize"
	| "row-resize"
	| "s-resize"
	| "se-resize"
	| "sw-resize"
	| "w-resize"
	| "none";

export type TTypeGlobalFont =
	| "inherit"
	| "initial"
	| "revert"
	| "revert-layer"
	| "unset";

export type TTypeOriginX = "center" | "left" | "right";
export type TTypeOriginY = "center" | "top" | "bottom";
export type TTypeOrigin =
	| "center"
	| "top-left"
	| "top-center"
	| "top-right"
	| "center-left"
	| "center-center"
	| "center-right"
	| "bottom-left"
	| "bottom-center"
	| "bottom-right";

export type TVariablesTuple = [string, TAnything];

export type TFunctionTuple = [string, TFunction];

export type TAttributeTuple = [string, TAttribute];

export type TMetaKeyTuple = [string, TMetaKey];

export type TComponentTuple = [string, ComponentNode];

export type TAddonTuple = [string, TAnything]

export type TExportNode<O> = {
	id: string;
	slug: string;
	attributes: TAttributeTuple[];
	metaKeys: TMetaKeyTuple[];
	type: TTypeNodes | TTypeNode2D | TTypeNode3D;
	script: string | URL | null;
	nodes: TExportNode<TAnything>[];
	path: string;
	index: number;
	wrap: boolean;
	options: O;
	addons: TAddonTuple[];
};

export type TMetaKey = {
	value: TAnything;
	type:
	| "string"
	| "int"
	| "float"
	| "boolean"
	| "set"
	| "map"
	| "object"
	| "list";
};

export type TAttribute = {
	value: TAnything;
	group?: string;
	label: string;
	type: "string" | "int" | "float" | "boolean" | "set" | "map" | "object" | "list" | "color" | "file" | "resource";
	input:
	| "text"
	| "number"
	| "slider"
	| "checkbox"
	| "radio"
	| "file"
	| "color"
	| "date"
	| "time"
	| "date-time";
	options?: Record<string, TAnything>;
};

export type TUpdateProp = {
	update: boolean
}

export type TMode = "id" | "index" | "slug";

export interface IGlobalNode {
	get index(): number;
	get path(): string;
	get id(): string;

	get slug(): string;
	set slug(slug: string);
}

export interface IControlEditor {
	title: string;
	description: string;
}

export interface IControlCanvas {
	visible: boolean;
	selectable: boolean;
	lock: boolean;
	cursor: TCursorOptions;
	hovered: boolean;
	alpha: number;
	compositeOperation:
	| "source-over"
	| "source-in"
	| "source-out"
	| "source-atop"
	| "destination-over"
	| "destination-in"
	| "destination-out"
	| "destination-atop"
	| "lighter"
	| "copy"
	| "xor"
	| "multiply"
	| "screen"
	| "overlay"
	| "darken"
	| "lighten"
	| "color-dodge"
	| "color-burn"
	| "hard-light"
	| "soft-light"
	| "difference"
	| "exclusion"
	| "hue"
	| "saturation"
	| "color"
	| "luminosity";
}

export type ImageFormat = "png" | "jpg" | "svg" | "avif" | "webp" | "gif";
export type AudioFormat = "mp3" | "waw";
export type VideoFormat = "mp4" | "avi" | "mkv";
export type EngineFormat = "js" | "ts" | "json" | "xml" | "html" | "css" | "object" | "scene";

export type MapFormatSource = {
	image: ImageFormat;
	audio: AudioFormat;
	video: VideoFormat;
	engine: EngineFormat
};

export type MapTypeSource = {
	image: HTMLImageElement;
	audio: HTMLAudioElement;
	video: HTMLVideoElement;
	engine: string
};

export type MapTypeResource = {
	image: ResourceImage;
	audio: TAnything;
	video: TAnything;
	engine: TAnything;
};

export type SourceType = "image" | "audio" | "video" | "engine";

export interface IControlNode {
	readonly $attributes: HandlerAttribute;
	readonly $components: HandlerComponent;
	readonly $functions: HandlerFunction;
	readonly $metaKeys: HandlerMetaKey;
	readonly $nodes: HandlerNode;
	readonly $script: HandlerScript;
}

export interface IControlHierarchy {
	get parent(): GlobalNode | undefined;
	get first(): GlobalNode | undefined;
	get last(): GlobalNode | undefined;
	get nextSibling(): GlobalNode | undefined;
	get previousSibling(): GlobalNode | undefined;
}

export interface IHandleNode {
	[NodePropHandlerNodes]: GlobalNode[];

	get all(): GlobalNode[];
	get size(): number;

	get(index: number): GlobalNode | undefined;
	add(...nodes: GlobalNode[]): void;
	has(index: number): boolean;
	delete(index: number): boolean;
	clear(): boolean;
	replace(index: number, node: GlobalNode): boolean;
	search(slug: string): GlobalNode | undefined;
	move(from: number, to: number): boolean;
	traverse(callback: (node: GlobalNode) => void): void;

	[NodeSetHandlerNodes](nodes: GlobalNode[]): void;
}

export interface IHandleFunction {
	[NodePropHandlerFunctions]: Map<string, TFunction>;

	toEntries(): TFunctionTuple[];
	gelAll(): TFunction[];
	get(name: string): TFunction | undefined;
	add(name: string, func: TFunction): void;
	has(name: string): boolean;
	delete(name: string): boolean;
	execute(name: string, ...args: TAnything[]): void;
	clear(): void;

	[NodeSetHandlerFunctions](functions: TFunctionTuple[]): void;
}

export interface IHandleAttribute {
	[NodePropHandlerAttributes]: Map<string, TAttribute>;

	toEntries(): TAttributeTuple[];
	getAll(): TAttribute[];
	get(name: string): TAttribute | undefined;
	set(name: string, options: TAttribute): boolean;
	change(name: string, options: TAttribute): boolean;
	has(name: string): boolean;

	[NodeSetHandlerAttributes](attributes: TAttributeTuple[]): void;
}

export interface IHandleMetaKey {
	[NodePropHandlerMetaKeys]: Map<string, TMetaKey>;

	toEntries(): TMetaKeyTuple[];
	getAll(): TMetaKey[];
	get(name: string): TMetaKey | undefined;
	add(name: string, options: TMetaKey): void;
	has(name: string): boolean;
	delete(name: string): boolean;
	clear(): void;

	[NodeSetHandlerMetaKeys](metaKeys: TMetaKeyTuple[]): void;
}

export interface IHandleComponent {
	[NodePropHandlerComponents]: Map<string, ComponentNode>;

	toEntries(): TComponentTuple[];
	getAll(): ComponentNode[];
	resetAll(): void;
	get(name: string): ComponentNode | undefined;
	add(component: TClass<ComponentNode>): void;
	has(name: string): boolean;
	delete(name: string): boolean;
	reset(name: string): void;
	clear(): void;

	[NodeSetHandlerComponents](attributes: TComponentTuple[]): void;
}
