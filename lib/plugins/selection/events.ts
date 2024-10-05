import type { EngineCore } from "@/app/engine";
import { moveNodeByKeyboard, moveNodeByMouse } from "./functions";
import { $Canvas, _Drawer, _ROOT_, HiddenPlugin } from "@/symbols";

export const handleMouseDown = async (event: MouseEvent, app: EngineCore) => {
	const panAndZoomConfig = app.plugin("pan-and-zoom")?.config;

	if (!panAndZoomConfig) return;

	if (panAndZoomConfig && panAndZoomConfig.mode === "pan-and-zoom") return;

	if (event.button !== 0) return;

	const _ = app.plugin("selection")?.[HiddenPlugin];

	if (!_) return;

	const { left, top } = app[$Canvas].event.getBoundingClientRect();

	const mouseCoords = {
		x: event.clientX - left,
		y: event.clientY - top,
	};

	const result = await app[_Drawer].editor.selectNode(mouseCoords);

	if (!result) {
		_.node = undefined;
		_.transform = undefined;

		return;
	}

	const { node, transform, position, parentPosition } = result;

	if (node?.options) {
		_.isDragging = true;

		_.startCoords.x =
			(mouseCoords.x - panAndZoomConfig.pan.x) / panAndZoomConfig.zoom;
		_.startCoords.y =
			(mouseCoords.y - panAndZoomConfig.pan.y) / panAndZoomConfig.zoom;

		_.node = node;
		_.transform = transform;
		_.position = position;
		_.parentPosition = parentPosition;
	}

	if (!node) {
		_.isDragging = false;
	}
};

export const handleMouseUp = (event: MouseEvent, app: EngineCore) => {
	const panAndZoomConfig = app.plugin("pan-and-zoom")?.config;

	if (!panAndZoomConfig) return;

	if (panAndZoomConfig && panAndZoomConfig.mode === "pan-and-zoom") return;

	if (event.button !== 0) return;

	const _ = app.plugin("selection")?.[HiddenPlugin];

	if (!_) return;

	// const { left, top } = app.canvas.event.getBoundingClientRect()

	// const mouseCoords = {
	//   x: event.clientX - left,
	//   y: event.clientY - top
	// }

	_.isDragging = false;
};

export const handleMouseMove = async (event: MouseEvent, app: EngineCore) => {
	const panAndZoomConfig = app.plugin("pan-and-zoom")?.config;

	if (!panAndZoomConfig) return;

	if (panAndZoomConfig && panAndZoomConfig.mode === "pan-and-zoom") return;

	const { left, top } = app[$Canvas].event.getBoundingClientRect();

	const mouseCoords = {
		x: event.clientX - left,
		y: event.clientY - top,
	};

	const _ = app.plugin("selection")?.[HiddenPlugin];

	if (!_) return;

	if (!_.isDragging) {
		app.canvas.event.style.cursor =
			await app[_Drawer].editor.cursorNode(mouseCoords);
	}

	if (_.isDragging && _.node) {
		const node = app[_ROOT_].getNodeByPath(_.node.__path__);

		if (node)
			moveNodeByMouse(
				node,
				mouseCoords,
				_.startCoords,
				_.position,
				_.parentPosition,
				panAndZoomConfig.pan,
				panAndZoomConfig.zoom,
			);
	}

	_.startCoords.x =
		(mouseCoords.x - panAndZoomConfig.pan.x) / panAndZoomConfig.zoom;
	_.startCoords.y =
		(mouseCoords.y - panAndZoomConfig.pan.y) / panAndZoomConfig.zoom;
};

export const handleKeyDown = (event: KeyboardEvent, app: EngineCore) => {
	const panAndZoomConfig = app.plugin("pan-and-zoom")?.config;

	if (!panAndZoomConfig) return;

	if (panAndZoomConfig && panAndZoomConfig.mode === "pan-and-zoom") return;

	const _ = app.plugin("selection")?.[HiddenPlugin];

	if (!_) return;

	if (!_.node) return;

	const node = app[_ROOT_].getNodeByPath(_.node.__path__);

	if (node)
		moveNodeByKeyboard(
			node,
			event.key,
			panAndZoomConfig.pan,
			panAndZoomConfig.zoom,
		);
};
