import { IOptionsCanvas, TCanvasType } from "../../types"

export abstract class MainCanvas {
  protected abstract _typeCanvas: TCanvasType

  protected abstract _options: IOptionsCanvas

  abstract get type(): TCanvasType

  abstract get canvas(): HTMLCanvasElement

  public abstract load(): OffscreenCanvas

  protected abstract init(): void
}
