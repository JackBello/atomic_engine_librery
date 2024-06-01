import { AtomicEngine } from "../atomic-engine"
import { TEventCanvas } from "../event.type"

export type TPlugin = {
  name: string
  install(app: AtomicEngine, options: any): void
  config?: Record<string, any>
  providers?: Record<string, any>
  nodes?: Record<string, any>
  events?: Record<
    TEventCanvas,
    null | ((app: AtomicEngine, event: Event) => void)
  >
  inject?: Record<string, any>
}
