import type {
	TCanvasActions,
	TCanvasActionsContext2D,
	TCanvasNode2D,
} from "@/nodes/types";
import type { TAnything, TFunction } from "../../../app/types";
import {
	clear_canvas_2D,
	restore_canvas_2D,
	save_canvas_2D,
	scale_canvas_2D,
	translate_canvas_2D,
} from "./functions";
import { control_edition_2D } from "./nodes/control-edition";
import { effect_line_flow_2D } from "./nodes/effect-line-flow";
import { rectangle_2D } from "./nodes/rectangle";
import { selection_2D } from "./nodes/selection";
import { text_2D } from "./nodes/text";
import { circle_2D } from "./nodes/circle";
import type { GlobalNode } from "@/nodes";
import type { CollisionShapeComponent } from "@/nodes/class/components/2D/collisions/collision-shape.component";
import { collision_shape } from "./components/collision-shape";

export const handleComponent2D = (
	node: GlobalNode,
	context: CanvasRenderingContext2D,
) => {
	if (node.$components.has("collision-shape")) {
		const component = node.$components.get(
			"collision-shape",
		) as CollisionShapeComponent;

		if (component.debug) collision_shape(context, component);
	}
};

export const handleDrawContext2D = (
	action:
		| Exclude<
			TCanvasNode2D,
			"2D/node" | "2D/handler/collision" | "2D/handler/collision-shape"
		>
		| TCanvasActionsContext2D
		| TCanvasActions,
	options: TAnything,
	context: CanvasRenderingContext2D,
) => {
	const actions: Record<
		| Exclude<
			TCanvasNode2D,
			"2D/node" | "2D/handler/collision" | "2D/handler/collision-shape"
		>
		| TCanvasActionsContext2D
		| TCanvasActions,
		TFunction
	> = {
		"2D/rectangle": rectangle_2D,
		"2D/circle": circle_2D,
		"2D/text": text_2D,
		"2D/selection": selection_2D,
		"2D/line-flow-effect": effect_line_flow_2D,
		"2D/control-edition": control_edition_2D,
		"2D/image": () => undefined,
		"canvas:clear": clear_canvas_2D,
		"canvas:rotation": clear_canvas_2D,
		"canvas:scale": scale_canvas_2D,
		"canvas:translate": translate_canvas_2D,
		"canvas:save": save_canvas_2D,
		"canvas:restore": restore_canvas_2D,
	};

	const exec = actions[action];

	if (exec) exec(context, options);
};
