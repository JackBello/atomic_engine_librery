import { ControlEdition2D, type Node2D, Selection2D } from "..";
import type { TPlugin } from "./types";
import type { TCursorOptions } from "@/nodes/nodes.types";

const pluginSelection: TPlugin = {
	name: "selection",
	install(app, options) {
		const panAndZoomConfig = app.use("@config/pan-and-zoom");
		const config = app.use("@config/selection");

		config.selection = { ...config.selection, ...options };

		const selection = app.use("@nodes/selection").selection as Selection2D;

		selection.setIntersectionNode((node) => {
			const zoom = panAndZoomConfig.zoom;
			const panX = panAndZoomConfig.pan.x;
			const panY = panAndZoomConfig.pan.y;

			const nodeX = (node.x - (node.width * node.scaleX) / 2 - panX) / zoom;
			const nodeY = (node.y - (node.height * node.scaleY) / 2 - panY) / zoom;

			const rotatedNodeX =
				nodeX * Math.cos((-node.rotation * Math.PI) / 180) -
				nodeY * Math.sin((-node.rotation * Math.PI) / 180);
			const rotatedNodeY =
				nodeX * Math.sin((-node.rotation * Math.PI) / 180) +
				nodeY * Math.cos((-node.rotation * Math.PI) / 180);

			const startX = Math.min(selection.startX, selection.endX) / zoom - panX;
			const endX = Math.max(selection.startX, selection.endX) / zoom - panX;
			const startY = Math.min(selection.startY, selection.endY) / zoom - panY;
			const endY = Math.max(selection.startY, selection.endY) / zoom - panY;

			const nodeWidth = (node.width * node.scaleX) / zoom;
			const nodeHeight = (node.height * node.scaleY) / zoom;

			return (
				rotatedNodeX >= startX - nodeWidth &&
				rotatedNodeX <= endX &&
				rotatedNodeY >= startY - nodeHeight &&
				rotatedNodeY <= endY
			);
		});
	},
	providers: {
		moveNodeByMouse(
			node: any,
			mouseCoords: { x: number; y: number },
			startCoords: { x: number; y: number },
			pan: { x: number; y: number },
			zoom: number,
		) {
			node.x = mouseCoords.x - pan.x / zoom - startCoords.x;
			node.y = mouseCoords.y - pan.y / zoom - startCoords.y;
		},
		moveNodeByKeyboard(
			node: any,
			direction: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight",
			pan: { x: number; y: number },
			zoom: number,
		) {
			if (direction === "ArrowUp") node.y -= 2 + pan.y / zoom;
			if (direction === "ArrowDown") node.y += 2 - pan.y / zoom;
			if (direction === "ArrowLeft") node.x -= 2 + pan.x / zoom;
			if (direction === "ArrowRight") node.x += 2 - pan.x / zoom;
		},
		intersectionNodeWithCursor({
			zoom,
			pan,
			node,
			mouseCoords,
		}: {
			zoom: number;
			pan: { x: number; y: number };
			node: {
				x: number;
				y: number;
				scaleX: number;
				scaleY: number;
				width: number;
				height: number;
				rotation: number;
			};
			mouseCoords: { x: number; y: number };
		}) {
			const X = node.x - (node.width * node.scaleX) / 2;
			const Y = node.y - (node.height * node.scaleY) / 2;
			const WIDTH = node.width * node.scaleX;
			const HEIGHT = node.height * node.scaleY;

			const mouseX = (mouseCoords.x - pan.x) / zoom;
			const mouseY = (mouseCoords.y - pan.y) / zoom;

			const rotatedMouseX =
				(mouseX - node.x) * Math.cos((-node.rotation * Math.PI) / 180) -
				(mouseY - node.y) * Math.sin((-node.rotation * Math.PI) / 180) +
				node.x;
			const rotatedMouseY =
				(mouseX - node.x) * Math.sin((-node.rotation * Math.PI) / 180) +
				(mouseY - node.y) * Math.cos((-node.rotation * Math.PI) / 180) +
				node.y;

			return (
				rotatedMouseX >= X &&
				rotatedMouseX <= X + WIDTH &&
				rotatedMouseY >= Y &&
				rotatedMouseY <= Y + HEIGHT
			);
		},
	},
	events: {
		"canvas/mouse:down": (app, event: MouseEvent) => {
			const panAndZoomConfig = app.use("@config/pan-and-zoom");

			if (panAndZoomConfig.mode === "pan-and-zoom") return;

			if (event.button !== 0) return;

			const { left, top } = app.canvas.event.getBoundingClientRect();

			const mouseCoords = {
				x: event.clientX - left,
				y: event.clientY - top,
			};

			const config = app.use("@config/selection");
			const providers = app.use("@providers/selection");
			const selection = app.use("@nodes/selection").selection as Selection2D;
			const controlEdition = app.use("@nodes/selection")
				.control as ControlEdition2D;

			let select: Node2D | undefined;
			let minDistance = Number.MAX_VALUE;

			if (app.scenes.currentScene) {
				const nodes = (app.scenes.currentScene as Node2D).nodes as Node2D[];

				for (let index = nodes.length - 1; index >= 0; index--) {
					const node = nodes[index];

					if (
						providers.intersectionNodeWithCursor({
							zoom: panAndZoomConfig.zoom,
							pan: {
								x: panAndZoomConfig.pan.x,
								y: panAndZoomConfig.pan.y,
							},
							node: {
								x: node.x,
								y: node.y,
								width: node.width,
								height: node.height,
								scaleX: node.scaleX,
								scaleY: node.scaleY,
								rotation: node.rotation,
							},
							mouseCoords,
						})
					) {
						let isDragging = false;
						const centerX = node.x + node.width / 2;
						const centerY = node.y + node.height / 2;

						const distance = Math.sqrt(
							Math.pow(mouseCoords.x - centerX, 2) +
								Math.pow(mouseCoords.y - centerY, 2),
						);

						if (distance < minDistance) {
							minDistance = distance;
							isDragging = true;
						}

						config.isDragging = isDragging;

						select = node;

						config.startCoords.x =
							(mouseCoords.x - panAndZoomConfig.pan.x) / panAndZoomConfig.zoom -
							node.x;
						config.startCoords.y =
							(mouseCoords.y - panAndZoomConfig.pan.y) / panAndZoomConfig.zoom -
							node.y;

						break;
					}
				}
			}

			if (select) {
				config.control.active = true;

				controlEdition.set({
					x: select.x,
					y: select.y,
					width: select.width,
					height: select.height,
					scaleX: select.scaleX,
					scaleY: select.scaleY,
					padding: config.control.padding,
					border: config.control.border,
					borderWidth: config.control.borderWidth,
					borderColor: config.control.borderColor,
					cornerSize: config.control.cornerSize,
					cornerColor: config.control.cornerColor,
					cornerBorder: config.control.cornerBorder,
					cornerColorBorder: config.control.cornerColorBorder,
					showCorner: config.control.showCorner,
				});
			}

			if (!select) {
				config.selection.active = true;
				config.control.active = false;

				controlEdition.set({
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					scaleX: 1,
					scaleY: 1,
					padding: 0,
					border: false,
					borderWidth: 0,
					borderColor: "black",
					cornerSize: 0,
					cornerColor: "black",
					cornerBorder: false,
					cornerColorBorder: "black",
					showCorner: false,
				});

				config.isDragging = true;

				config.startCoords = {
					x: mouseCoords.x - panAndZoomConfig.pan.x,
					y: mouseCoords.y - panAndZoomConfig.pan.y,
				};

				selection.set({
					startX: mouseCoords.x - panAndZoomConfig.pan.x,
					startY: mouseCoords.y - panAndZoomConfig.pan.y,
				});
			}

			config._.node = select;
		},
		"canvas/mouse:up": (app, event: MouseEvent) => {
			const panAndZoomConfig = app.use("@config/pan-and-zoom");

			if (panAndZoomConfig.mode === "pan-and-zoom") return;

			if (event.button !== 0) return;

			const { left, top } = app.canvas.event.getBoundingClientRect();

			const mouseCoords = {
				x: event.clientX - left,
				y: event.clientY - top,
			};

			const config = app.use("@config/selection");
			const selection = app.use("@nodes/selection").selection as Selection2D;

			config.selection.active = false;

			selection.set({
				background: "",
				radius: 0,
				border: false,
				borderColor: "",
				borderWidth: 0,
				width: 0,
				height: 0,
				x: 0,
				y: 0,
				startX: 0,
				startY: 0,
				endX: mouseCoords.x - panAndZoomConfig.pan.x,
				endY: mouseCoords.y - panAndZoomConfig.pan.y,
			});

			config.isDragging = false;
		},
		"canvas/mouse:move": (app, event: MouseEvent) => {
			const panAndZoomConfig = app.use("@config/pan-and-zoom");

			if (panAndZoomConfig.mode === "pan-and-zoom") return;

			let cursor: TCursorOptions = "default";

			const { left, top } = app.canvas.event.getBoundingClientRect();

			const mouseCoords = {
				x: event.clientX - left,
				y: event.clientY - top,
			};

			const config = app.use("@config/selection");
			const providers = app.use("@providers/selection");
			const selection = app.use("@nodes/selection").selection as Selection2D;
			const controlEdition = app.use("@nodes/selection")
				.control as ControlEdition2D;

			if (!config.isDragging && app.scenes.currentScene) {
				const nodes = (app.scenes.currentScene as Node2D).nodes as Node2D[];

				for (let index = nodes.length - 1; index >= 0; index--) {
					const node = nodes[index];

					if (
						providers.intersectionNodeWithCursor({
							zoom: panAndZoomConfig.zoom,
							pan: {
								x: panAndZoomConfig.pan.x,
								y: panAndZoomConfig.pan.y,
							},
							node: {
								x: node.x,
								y: node.y,
								width: node.width,
								height: node.height,
								scaleX: node.scaleX,
								scaleY: node.scaleY,
								rotation: node.rotation,
							},
							mouseCoords,
						})
					) {
						cursor = "default";
						break;
					}
				}
			}

			if (config.isDragging && config._.node) {
				cursor = "move";

				providers.moveNodeByMouse(
					config._.node,
					mouseCoords,
					config.startCoords,
					panAndZoomConfig.pan,
					panAndZoomConfig.zoom,
				);

				controlEdition.set({
					x: config._.node.x,
					y: config._.node.y,
					width: config._.node.width,
					height: config._.node.height,
					scaleX: config._.node.scaleX,
					scaleY: config._.node.scaleY,
				});
			}

			if (config.isDragging && !config._.node) {
				selection.set({
					background: config.selection.background,
					radius: config.selection.radius,
					border: config.selection.border,
					borderColor: config.selection.borderColor,
					borderWidth: config.selection.borderWidth,
					width: mouseCoords.x - panAndZoomConfig.pan.x - config.startCoords.x,
					height: mouseCoords.y - panAndZoomConfig.pan.y - config.startCoords.y,
					x: config.startCoords.x,
					y: config.startCoords.y,
					endX: mouseCoords.x - panAndZoomConfig.pan.x,
					endY: mouseCoords.y - panAndZoomConfig.pan.y,
				});

				selection.select(app.scenes.currentScene.nodes);
			}

			app.canvas.event.style.cursor = cursor;
		},
		"canvas/key:down": (app, event: KeyboardEvent) => {
			const panAndZoomConfig = app.use("@config/pan-and-zoom");

			if (panAndZoomConfig.mode === "pan-and-zoom") return;

			const config = app.use("@config/selection");
			const providers = app.use("@providers/selection");

			if (!config._.node) return;

			providers.moveNodeByKeyboard(
				config._.node,
				event.key,
				panAndZoomConfig.pan,
				panAndZoomConfig.zoom,
			);
		},
	},
	config: {
		_: {
			node: undefined,
		},
		startCoords: {
			x: 0,
			y: 0,
		},
		isDragging: false,
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
	},
	nodes: {
		selection: new Selection2D({
			width: 0,
			height: 0,
		}),
		control: new ControlEdition2D({
			width: 0,
			height: 0,
		}),
	},
	process: {
		before: async (app) => {
			const panAndZoomConfig = app.use("@config/pan-and-zoom");

			const controlEdition = app.use("@nodes/selection")
				.control as ControlEdition2D;

			controlEdition;

			const config = app.use("@config/selection");

			if (config.control.active)
				if (panAndZoomConfig.mode === "pan-and-zoom") return;

			if (config.selection.active) {
				app.execute("canvas:restore");
				app.execute("canvas:save");
				app.execute("canvas:translate", {
					x: panAndZoomConfig.pan.x,
					y: panAndZoomConfig.pan.y,
				});

				const selection = app.use("@nodes/selection").selection as Selection2D;

				selection;

				app.execute("canvas:restore");
			}
		},
	},
};

export default pluginSelection;
