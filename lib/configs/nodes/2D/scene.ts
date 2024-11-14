import type { IControlCanvas, IControlEditor } from "@/nodes/global/types";

export const DEFAULT_CONFIG_SCENE_2D: Omit<
	IControlCanvas,
	"cursor" | "selectable" | "hovered"
> &
	IControlEditor = {
	description: "",
	title: "",
	lock: false,
	visible: true,
};
