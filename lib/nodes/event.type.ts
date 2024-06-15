export type TEventGlobalNode =
  | "global-node:change_script"
  | "global-node:change_properties"
  | "global-node:ready"
  | "global-node:destroy"
  | "global-node:renamed"

export type TEventNode2D =
  | "node2D:modified"
  | "node2D:moving"
  | "node2D:rotated"
  | "node2D:locked"
  | "node2D:visible"
  | "node2D:scaling"
  | "node2D:select"
  | "node2D:unselect"
  | "node2D:hover"

export type TEventSelection2D =
  | "selection2D:start"
  | "selection2D:end"
  | "selection2D:moving"
  | "selection2D:nodes"

export type TEventText2D = ""
