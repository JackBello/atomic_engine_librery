export type TEventScript = "script:execute" | "script:export" | "script:import"

export type TEventScenes =
  | "scenes:add"
  | "scenes:delete"
  | "scenes:change"
  | "scenes:export"
  | "scenes:import"

export type TEventAnimation =
  | "animation:play"
  | "animation:pause"
  | "animation:stop"
  | "animation:export"
  | "animation:import"

export type TEventDrawer =
  | "drawer:draw"
  | "drawer:rectangle"
  | "drawer:circle"
  | "drawer:control"
  | "drawer:selection"
