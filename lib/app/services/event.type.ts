export type TEventScript = "script:execute" | "script:export" | "script:import"

export type TEventScenes =
  | "scene:add"
  | "scene:delete"
  | "scene:change"
  | "scene:export"
  | "scene:import"

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
