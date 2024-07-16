import { MethodSetMetaKeys, PropMetaKeys } from "@/nodes/symbols"
import { IHandleMetaKey, TMetaKey, TMetaKeyTuple } from "../node.types"
import { MethodGetApp } from "@/symbols"
import { GlobalNode } from "@/nodes"
import { AtomicGame } from "@/atomic-game"
import { AtomicEngine } from "@/atomic-engine"

export class HandlerMetaKey implements IHandleMetaKey {
  private $node: GlobalNode
  private $app: AtomicEngine | AtomicGame;

  [PropMetaKeys]: Map<string, TMetaKey>

  constructor($node: GlobalNode) {
    this.$node = $node
    this.$app = this.$node[MethodGetApp]()

    this[PropMetaKeys] = new Map()
  }

  toEntries(): TMetaKeyTuple[] {
    return [...this[PropMetaKeys].entries()]
  }

  getAll(): TMetaKey[] {
    return [...this[PropMetaKeys].values()]
  }

  get(name: string): TMetaKey | undefined {
    return this[PropMetaKeys].get(name)
  }

  add(name: string, options: TMetaKey): void {
    this[PropMetaKeys].set(name, options)

    this.$app.drawer.render.reDraw()

    this.$app.changeGlobal("re-draw", true)
  }

  has(name: string): boolean {
    return this[PropMetaKeys].has(name)
  }

  delete(name: string): boolean {
    this.$app.changeGlobal("re-draw", true)

    this.$app.drawer.render.reDraw()

    return this[PropMetaKeys].delete(name)
  }

  clear(): void {
    this[PropMetaKeys].clear()

    this.$app.drawer.render.reDraw()

    this.$app.changeGlobal("re-draw", true)
  }

  [MethodSetMetaKeys](metaKeys: TMetaKeyTuple[]): void {
    this[PropMetaKeys] = new Map(metaKeys)
  }
}
