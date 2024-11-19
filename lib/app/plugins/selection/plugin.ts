import { Plugin } from "@/app/plugin";
import {
	handleKeyDown,
	handleMouseDown,
	handleMouseMove,
	handleMouseUp,
} from "./events";
import type { TAnything } from "@/app/types";
import { ControlEdition2D, Selection2D } from "@/nodes";
import { Vector2 } from "@/nodes/vectors/vector-2";

export default class SelectionPlugin extends Plugin {
	install(options: TAnything): void {
		this.$app.emit("app/mouse:down", handleMouseDown);

		this.$app.emit("app/mouse:up", handleMouseUp);

		this.$app.emit("app/mouse:move", handleMouseMove);

		this.$app.emit("app/key:down", handleKeyDown);

		const panAndZoomConfig = this.$app.plugin("@config/pan-and-zoom")
			?.configs;

		const selection = new Selection2D("selection-editor", {
			width: 0,
			height: 0,
		});

		const control = new ControlEdition2D("control-editor", {
			width: 0,
			height: 0,
		});

		selection.setIntersectionNode((node) => {
			const zoom = panAndZoomConfig?.zoom ?? 1;
			const panX = panAndZoomConfig?.pan.x ?? 0;
			const panY = panAndZoomConfig?.pan.y ?? 0;

			const nodeX = (node.x - (node.width * node.scaleX) / 2 - panX) /
				zoom;
			const nodeY = (node.y - (node.height * node.scaleY) / 2 - panY) /
				zoom;

			const rotatedNodeX =
				nodeX * Math.cos((-node.rotation * Math.PI) / 180) -
				nodeY * Math.sin((-node.rotation * Math.PI) / 180);
			const rotatedNodeY =
				nodeX * Math.sin((-node.rotation * Math.PI) / 180) +
				nodeY * Math.cos((-node.rotation * Math.PI) / 180);

			const startX = Math.min(selection.startX, selection.endX) / zoom -
				panX;
			const endX = Math.max(selection.startX, selection.endX) / zoom -
				panX;
			const startY = Math.min(selection.startY, selection.endY) / zoom -
				panY;
			const endY = Math.max(selection.startY, selection.endY) / zoom -
				panY;

			const nodeWidth = (node.width * node.scaleX) / zoom;
			const nodeHeight = (node.height * node.scaleY) / zoom;

			return (
				rotatedNodeX >= startX - nodeWidth &&
				rotatedNodeX <= endX &&
				rotatedNodeY >= startY - nodeHeight &&
				rotatedNodeY <= endY
			);
		});

		this.OPTIONS = options;

		this.HIDDEN = {
			node: undefined,
			parent: undefined,
			child: undefined,
			startCoords: Vector2.zero(),
			isDragging: false,
			nodes: {
				selection,
				control,
			},
		};

		this.CONFIGS = {
			selection: {
				active: false,
				radius: 1,
				background: "rgba(52, 131, 235, 0.3)",
				borderColor: "rgba(52, 131, 235, 0.8)",
				borderWidth: 2,
				border: true,
			},
			control: {
				active: false,
				padding: 10,
				border: true,
				borderWidth: 1,
				borderColor: "rgb(16 130 212)",
				cornerSize: 6,
				cornerColor: "rgb(16 130 212)",
				cornerBorder: false,
				cornerColorBorder: "blue",
				showCorner: true,
			},
		};
	}
}
