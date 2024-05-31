export type TEventCanvas =
  | "canvas/selection:start"
  | "canvas/selection:end"
  | "canvas/selection:moving"
  | "canvas/mouse:down"
  | "canvas/mouse:up"
  | "canvas/mouse:move"
  | "canvas/mouse:leave"
  | "canvas/mouse:out"
  | "canvas/mouse:enter"
  | "canvas/mouse:over"
  | "canvas/mouse:wheel"
  | "canvas/key:down"
  | "canvas/key:up"
  | "canvas/key:press"
  | "canvas/drag"
  | "canvas/drag:start"
  | "canvas/drag:end"
  | "canvas/drag:leave"
  | "canvas/drag:enter"
  | "canvas/drag:over"
  | "canvas/drop"
  | "canvas:draw"