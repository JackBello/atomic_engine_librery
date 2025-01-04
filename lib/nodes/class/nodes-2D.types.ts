import type { IResourceSpriteSheet } from "@/app/services/types";
import type {
	MapFormatSource,
	MapTypeSource,
	SourceType,
	TSize,
	TTypeGlobalFont,
	TTypeOrigin,
	TTypeOriginX,
	TTypeOriginY,
	TVec2,
} from "../global/types";
import type { Vector2 } from "../vectors/vector-2";

export interface IHandleCoords2D {
	center(): void;
	centerX(): void;
	centerY(): void;
}

export interface IControlNode2D {
	setOrigin(origin: TTypeOrigin): void;
	setScale(scale: number): void;
	scaleToWidth(width: number): void;
	scaleToHeight(height: number): void;
	setSkew(skew: number): void;
}

export interface ISize2D {
	width: number;
	height: number;
}

export interface ICoords2D {
	position: TVec2 | Vector2
}

export interface IScale2D {
	scale: TVec2 | Vector2
}

export interface ISkew2D {
	skew: TVec2 | Vector2
}

export interface INode2D {
	flipX: boolean;
	flipY: boolean;
	originX: TTypeOriginX | number;
	originY: TTypeOriginY | number;
	rotation: number;
}

export interface IImage2D {
	smoothing: boolean
	smoothingQuality: "low" | "medium" | "high"
}

export interface ISource<T extends SourceType> {
	element: MapTypeSource[T]
	format: MapFormatSource[T]
	type: T
	loaded: boolean
}

export interface ISprite2D {
	frame: number
	frameCoords: TVec2 | Vector2
	settings: Omit<IResourceSpriteSheet, 'loaded' | 'origin' | 'source'>
}

export interface IDraw2D {
	fill: string;
	stroke?: string;
	lineWidth: number
}

export interface IRectangle2D {
	rounded:
	| number
	| [number, number]
	| {
		topLeft: number;
		topRight: number;
		bottomLeft: number;
		bottomRight: number;
	};
}

export interface ICircle2D {
	radius: number;
	startAngle: number;
	endAngle: number;
	counterclockwise: boolean;
}

export interface ISelection2D {
	endX: number;
	endY: number;
	startX: number;
	startY: number;
	shape: "rectangle" | "circle" | "triangle" | "polygon";
}

export interface IControlEdition2D {
	padding: number | [number, number] | [number, number, number, number];
	cornerSize: number;
	cornerColor: string;
	cornerBorder: boolean;
	cornerColorBorder: string;
	showCorner:
	| {
		"top-left": boolean;
		"top-center": boolean;
		"top-right": boolean;
		"middle-left": boolean;
		"middle-center": boolean;
		"middle-right": boolean;
		"bottom-left": boolean;
		"bottom-center": boolean;
		"bottom-right": boolean;
	}
	| boolean;
}

export interface ILineFlowEffect2D {
	cellSize: number;
	spacing: number;
	radius: number;
}

export interface IText2D {
	text: string;
	fontSize: `${string}${TSize}`;
	fontFamily: string;
	fontStretch:
	| "normal"
	| "ultra-condensed"
	| "extra-condensed"
	| "condensed"
	| "semi-condensed"
	| "semi-expanded"
	| "expanded"
	| "extra-expanded"
	| "ultra-expanded"
	| TTypeGlobalFont
	| `${string}%`;
	fontStyle:
	| "normal"
	| "italic"
	| "oblique"
	| `oblique ${string}deg`
	| TTypeGlobalFont;
	fontWeight:
	| "normal"
	| "bold"
	| "lighter"
	| "bolder"
	| 100
	| 200
	| 300
	| 400
	| 500
	| 600
	| 700
	| 800
	| 900
	| 1000
	| number
	| TTypeGlobalFont;
	fontVariant: string;
	textAlign: "left" | "right" | "center";
	textBaseline:
	| "top"
	| "hanging"
	| "middle"
	| "alphabetic"
	| "ideographic"
	| "bottom";
	textDirection: "ltr" | "rtl" | "inherit";
}

export interface ICalculate {
	origin: [number, number]
	angle: number;
}
