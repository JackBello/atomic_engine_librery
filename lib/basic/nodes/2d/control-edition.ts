import { DEFAULT_CONFIG_NODE_CONTROL_EDITION } from "../../../configs/nodes/2D/control-edition"
import { AtomicGlobal } from "../../atomic-global"
import { IOptionsNodeControlEdition } from "../types"
import { Node2D } from "./node"

export class NodeControlEdition extends Node2D {
  protected _options: IOptionsNodeControlEdition

  constructor(options: Partial<IOptionsNodeControlEdition> = {}) {
    super({ ...DEFAULT_CONFIG_NODE_CONTROL_EDITION, ...options })
    this._options = { ...DEFAULT_CONFIG_NODE_CONTROL_EDITION, ...options }
    this._type = NodeControlEdition.name
  }

  public setOptions(options: Partial<IOptionsNodeControlEdition>) {
    this._redraw = true
    this._options = { ...this._options, ...options }
  }

  public toObject() {
    return {
      ...this._options
    }
  }

  public render(): void {
    if (this._redraw) {
      const { translateX, translateY } = this.processNode()

      this.getCore().execute("draw:control-edition", "editor", {
        ...this._options,
        translateX,
        translateY
      })

      // this._redraw = false
    }

    if (
      this._functions?._ready &&
      (AtomicGlobal.MODE === "preview" || AtomicGlobal.MODE === "game")
    )
      this._functions._ready()
  }

  public update(frame: number, time: number): void {
    if (this._redraw) {
      const { translateX, translateY } = this.processNode()

      this.getCore().execute("draw:control-edition", "editor", {
        ...this._options,
        translateX,
        translateY
      })

      // this._redraw = false
    }

    if (
      this._functions?._process &&
      (AtomicGlobal.MODE === "preview" || AtomicGlobal.MODE === "game")
    )
      this._functions._process(frame, time)
  }
}
