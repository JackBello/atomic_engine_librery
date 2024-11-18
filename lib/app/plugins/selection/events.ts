import type { EngineCore } from "@/app/engine";
import { moveNodeByKeyboard, moveNodeByMouse } from "./functions";
import { _Frame, GetHidden } from "@/app/symbols";

export const handleMouseDown = (event: MouseEvent, app: EngineCore) => {
	const panAndZoomConfig = app.plugin("pan-and-zoom")?.configs;

	if (!panAndZoomConfig) return;

	if (panAndZoomConfig && panAndZoomConfig.mode === "pan-and-zoom") return;

	if (event.button !== 0) return;

	const _ = app.plugin("selection")?.[GetHidden];

	if (!_) return;

	const { left, top } = app.canvas.event.getBoundingClientRect();

	const mouseCoords = {
		x: event.clientX - left,
		y: event.clientY - top,
	};

	const { node, information } = app.ROOT.intersect({
		x: (mouseCoords.x - panAndZoomConfig.pan.x) /
			panAndZoomConfig.zoom,
		y: (mouseCoords.y - panAndZoomConfig.pan.y) /
			panAndZoomConfig.zoom,
	}, "lock");

	if (!node) {
		_.node = undefined;
		_.parent = undefined;
		_.child = undefined;

		return;
	}

	if (node) {
		// controlEdition.set({
		// 	x: select.x,
		// 	y: select.y,
		// 	width: select.width,
		// 	height: select.height,
		// 	scaleX: select.scaleX,
		// 	scaleY: select.scaleY,
		// 	padding: config.control.padding,
		// 	border: config.control.border,
		// 	borderWidth: config.control.borderWidth,
		// 	borderColor: config.control.borderColor,
		// 	cornerSize: config.control.cornerSize,
		// 	cornerColor: config.control.cornerColor,
		// 	cornerBorder: config.control.cornerBorder,
		// 	cornerColorBorder: config.control.cornerColorBorder,
		// 	showCorner: config.control.showCorner,
		// });

		_.isDragging = true;

		_.startCoords.x = (mouseCoords.x - panAndZoomConfig.pan.x) /
			panAndZoomConfig.zoom;
		_.startCoords.y = (mouseCoords.y - panAndZoomConfig.pan.y) /
			panAndZoomConfig.zoom;

		_.node = node;
		_.parent = information.parent;
		_.child = information.child;
	} else {
		// controlEdition.set({
		//  visible: false
		// });

		// selection.set({
		// 	startX: mouseCoords.x - panAndZoomConfig.pan.x,
		// 	startY: mouseCoords.y - panAndZoomConfig.pan.y,
		// });

		_.isDragging = false;
	}
};

export const handleMouseUp = (event: MouseEvent, app: EngineCore) => {
	const panAndZoomConfig = app.plugin("pan-and-zoom")?.configs;

	if (!panAndZoomConfig) return;

	if (panAndZoomConfig && panAndZoomConfig.mode === "pan-and-zoom") return;

	if (event.button !== 0) return;

	const _ = app.plugin("selection")?.[GetHidden];

	if (!_) return;

	const { left, top } = app.canvas.event.getBoundingClientRect();

	const mouseCoords = {
		x: event.clientX - left,
		y: event.clientY - top,
	};

	_.startCoords.x = (mouseCoords.x - panAndZoomConfig.pan.x) /
		panAndZoomConfig.zoom;
	_.startCoords.y = (mouseCoords.y - panAndZoomConfig.pan.y) /
		panAndZoomConfig.zoom;


	// selection.set({
	// 	background: "",
	// 	radius: 0,
	// 	border: false,
	// 	borderColor: "",
	// 	borderWidth: 0,
	// 	width: 0,
	// 	height: 0,
	// 	x: 0,
	// 	y: 0,
	// 	startX: 0,
	// 	startY: 0,
	// 	endX: mouseCoords.x - panAndZoomConfig.pan.x,
	// 	endY: mouseCoords.y - panAndZoomConfig.pan.y,
	// });

	_.isDragging = false;
};

export const handleMouseMove = async (event: MouseEvent, app: EngineCore) => {
	const panAndZoomConfig = app.plugin("pan-and-zoom")?.configs;

	if (!panAndZoomConfig) return;

	if (panAndZoomConfig && panAndZoomConfig.mode === "pan-and-zoom") return;

	const { left, top } = app.canvas.event.getBoundingClientRect();

	const mouseCoords = {
		x: event.clientX - left,
		y: event.clientY - top,
	};

	const _ = app.plugin("selection")?.[GetHidden];

	if (!_) return;

	if (!_.isDragging) {
		const { node } = app.ROOT.intersect({
			x: (mouseCoords.x - panAndZoomConfig.pan.x) /
				panAndZoomConfig.zoom,
			y: (mouseCoords.y - panAndZoomConfig.pan.y) /
				panAndZoomConfig.zoom,
		}, "hovered");

		if (node) {
			app.canvas.event.style.cursor = node.cursor === "default"
				? "move"
				: node.cursor;
		} else {
			app.canvas.event.style.cursor = "default";
		}
	}

	if (_.isDragging && _.node) {
		moveNodeByMouse(
			_.node,
			mouseCoords,
			_.startCoords,
			_.child.relative,
			_.parent.relative,
			panAndZoomConfig.pan,
			panAndZoomConfig.zoom,
		);
	}

	_.startCoords.x = (mouseCoords.x - panAndZoomConfig.pan.x) /
		panAndZoomConfig.zoom;
	_.startCoords.y = (mouseCoords.y - panAndZoomConfig.pan.y) /
		panAndZoomConfig.zoom;
};

export const handleKeyDown = (event: KeyboardEvent, app: EngineCore) => {
	const panAndZoomConfig = app.plugin("pan-and-zoom")?.configs;

	if (!panAndZoomConfig) return;

	if (panAndZoomConfig && panAndZoomConfig.mode === "pan-and-zoom") return;

	const _ = app.plugin("selection")?.[GetHidden];

	if (!_) return;

	if (!_.node) return;

	const isEdition = app.global("mode") === "edition";

	if (isEdition) {
		moveNodeByKeyboard(
			_.node,
			event.key,
			panAndZoomConfig.zoom,
		);
	}
};
