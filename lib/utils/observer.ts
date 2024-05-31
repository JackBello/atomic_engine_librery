import { TFunction } from "../types.ts"

export default class EventObserver {
  protected _eventListeners: Record<string, TFunction[]> = {}

  protected getEventListeners(event: string): TFunction[] {
    if (!(event in this._eventListeners)) this._eventListeners[event] = []

    return this._eventListeners[event]
  }

  public addEventListener(event: string, callback: TFunction) {
    this.getEventListeners(event).push(callback)
  }

  public removeEventListener(event: string, callback: TFunction) {
    this.getEventListeners(event).forEach((stored, index) => {
      if (stored !== callback) return

      if (Array.isArray(this._eventListeners[event])) {
        this._eventListeners[event].splice(index, 1)
      }
    })
  }

  public hasEventListener(event: string) {
    return event in this._eventListeners
  }

  public clearListeners() {
    for (const event in this._eventListeners) this._eventListeners[event] = []
  }

  public emitEvent(event: string, ...args: any[]) {
    if (!(event in this._eventListeners)) return

    this._eventListeners[event].forEach((callback) => callback(...args))
  }
}
