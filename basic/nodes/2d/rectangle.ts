import { DEFAULT_CONFIG_NODE_RECTANGLE } from "../../../configs/nodes/2D/rectangle"
import { IOptionsNodeRectangle } from "../types";
import { Node2D } from "./node";

export class NodeRectangle extends Node2D {
  protected _options: IOptionsNodeRectangle

  constructor(options: Partial<IOptionsNodeRectangle>) {
    super({ ...DEFAULT_CONFIG_NODE_RECTANGLE, ...options });
    this._type = NodeRectangle.name
  }

  get background() {
    return this._options.background
  }

  get border() {
    return this._options.border
  }

  get borderColor() {
    return this._options.borderColor
  }

  get borderWidth() {
    return this._options.borderWidth
  }

  get radius() {
    return this._options.radius
  }

  set background(value: string) {
    this._options.background = value;
  }

  set border(value: boolean) {
    this._options.border = value;
  }

  set borderColor(value: string) {
    this._options.borderColor = value;
  }

  set borderWidth(value: number) {
    this._options.borderWidth = value;
  }

  set radius(value: number | [number, number] | { topLeft: number, topRight: number, bottomLeft: number, bottomRight: number }) {
    this._options.radius = value
  }

  public render() {
    const { translateX, translateY } = this.pointTranslation();

    this.getCore().execute("draw:rectangle", "scene", {
      ...this._options,
      translateX,
      translateY
    })
  }

  public setOptions(options: Partial<IOptionsNodeRectangle>) {
    this._options = { ...this._options, ...options };
  }

  public toObject() {
    return {
      ...this._options
    }
  }
}
