import { TFunction } from "@/types"
import { AtomicEngine } from "../atomic-engine"
import { TEventCanvas } from "../event.type"
import { AtomicGame } from ".."

export type TPlugin = {
  name: string
  install?(app: AtomicEngine | AtomicGame, options: any): void
  config?: Record<string, any>
  providers?: Record<string, any>
  nodes?: Record<string, any>
  events?: Partial<
    Record<
      TEventCanvas,
      null | ((app: AtomicEngine | AtomicGame, event: any) => void)
    >
  >
  inject?: Record<string, TFunction>
  process?: {
    after?: (
      app: AtomicEngine | AtomicGame,
      animation: {
        timestamp: number
        deltaTime: number
      }
    ) => void
    before?: (
      app: AtomicEngine | AtomicGame,
      animation: {
        timestamp: number
        deltaTime: number
      }
    ) => void
  }
}
