import { IOptionsCanvas, TCanvasType } from "../../types"

export abstract class MainCanvas {
  [key: string]: any

  protected abstract _typeCanvas: TCanvasType

  protected abstract _options: IOptionsCanvas

  abstract get type(): TCanvasType

  abstract get canvas(): HTMLCanvasElement

  abstract get width(): number
  abstract set width(value: number)

  abstract get height(): number
  abstract set height(value: number)

  abstract get background(): string | CanvasGradient

  public abstract setSize(width: number, height: number): void;

  public abstract setOptions(options: Partial<IOptionsCanvas>): void

  public abstract load(): OffscreenCanvas

  protected abstract create(): void

  protected abstract init(): void
}
