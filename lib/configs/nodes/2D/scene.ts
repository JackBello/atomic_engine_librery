import { IControlEdition, IControlEditor } from "../../../nodes/nodes.types"

export const DEFAULT_CONFIG_SCENE_2D: Omit<
  IControlEdition,
  "cursor" | "selectable"
> &
  IControlEditor = {
  name: "Scene2D",
  description: "",
  title: "",
  lock: false,
  visible: true
}
