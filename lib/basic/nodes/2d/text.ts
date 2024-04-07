import { DEFAULT_CONFIG_NODE_TEXT } from "../../../configs/nodes/2D/text"
import { AtomicGlobal } from "../../atomic-global"
import { IOptionsNodeText } from "../types"
import { Node2D } from "./node"

export class NodeText extends Node2D {
  protected _options: IOptionsNodeText

  constructor(options: Partial<IOptionsNodeText>) {
    super({ ...DEFAULT_CONFIG_NODE_TEXT, ...options })
    this._options = { ...DEFAULT_CONFIG_NODE_TEXT, ...options }
    this._type = NodeText.name
  }

  public setOptions(options: Partial<IOptionsNodeText>) {
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
      this.getCore().execute("draw:text", "editor", {
        ...this._options
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
      this.getCore().execute("draw:text", "editor", {
        ...this._options
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
