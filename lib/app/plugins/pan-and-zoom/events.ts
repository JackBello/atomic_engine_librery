import type { EngineCore } from "@/app/engine";
import { GetHidden } from "@/app/symbols";

export const handleMouseDown = (event: MouseEvent, app: EngineCore) => {
	const config = app.plugin("pan-and-zoom")?.configs;

	if (!config) return;
	if (config.mode === "node") return;

	if (event.button !== 0) return;

	app.canvas.event.style.cursor = "grabbing";

	const _ = app.plugin("pan-and-zoom")?.[GetHidden];

	if (!_) return;

	_.isPanning = true;

	_.startCoords.x = event.clientX;
	_.startCoords.y = event.clientY;
};

export const handleMouseUp = (event: MouseEvent, app: EngineCore) => {
	const config = app.plugin("pan-and-zoom")?.configs;
	const _ = app.plugin("pan-and-zoom")?.[GetHidden];

	if (!config) return;

	if (!_) return;

	if (config.mode === "node") return;

	if (event.button !== 0) return;

	app.canvas.event.style.cursor = "grab";

	_.isPanning = false;
};

export const handleMouseMove = (event: MouseEvent, app: EngineCore) => {
	const config = app.plugin("pan-and-zoom")?.configs;
	const _ = app.plugin("pan-and-zoom")?.[GetHidden];

	if (!config) return;

	if (!_) return;

	if (config.mode === "node") return;

	if (!_.isPanning) return;

	app.canvas.event.style.cursor = "grabbing";

	const dx = event.clientX - _.startCoords.x;
	const dy = event.clientY - _.startCoords.y;

	_.pan.x += dx;
	_.pan.y += dy;

	config.pan.x = _.pan.x;
	config.pan.y = _.pan.y;

	_.startCoords.x = event.clientX;
	_.startCoords.y = event.clientY;
};

export const handleMouseWheel = (event: WheelEvent, app: EngineCore) => {
	const config = app.plugin("pan-and-zoom")?.configs;
	const _ = app.plugin("pan-and-zoom")?.[GetHidden];

	if (!config) return;

	if (!_) return;

	if (config.mode === "node") return;

	const delta = event.deltaY > 0 ? -1 : 1;

	_.zoom.scale += delta * _.zoom.speed;

	_.zoom.scale = Math.max(_.zoom.min, Math.min(_.zoom.max, _.zoom.scale));

	config.zoom = _.zoom.scale;
};
