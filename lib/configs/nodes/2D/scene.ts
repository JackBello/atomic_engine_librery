import type {
	IControlEdition,
	IControlEditor,
} from "@/nodes/global/node.types";

export const DEFAULT_CONFIG_SCENE_2D: Omit<
	IControlEdition,
	"cursor" | "selectable" | "hovered"
> &
	IControlEditor = {
	description: "",
	title: "",
	lock: false,
	visible: true,
};
