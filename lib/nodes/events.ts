export type TEventNode =
	| "node:change_script"
	| "node:change_properties"
	| "node:ready"
	| "node:destroy"
	| "node:renamed"
	| "node:three_nodes_open"
	| "node:three_nodes_close"
	| "node:three_nodes_remove_child"
	| "node:three_nodes_add_child"
	| "node:three_nodes_clear";

export type TEventScene =
	| "scene:preload"
	| "scene:ready"
	| "scene:finish"
	| "scene:remove_node"
	| "scene:add_node"
	| "scene:move_node"
	| "scene:replace_node"
	| "scene:clear_nodes";

export type TEventNode2D =
	| "node/2D:modified"
	| "node/2D:moving"
	| "node/2D:rotated"
	| "node/2D:locked"
	| "node/2D:visible"
	| "node/2D:scaling"
	| "node/2D:select"
	| "node/2D:unselect"
	| "node/2D:hover";

export type TEventSelection =
	| "selection:start"
	| "selection:end"
	| "selection:moving"
	| "selection:nodes";

export type TEventText2D = "";
