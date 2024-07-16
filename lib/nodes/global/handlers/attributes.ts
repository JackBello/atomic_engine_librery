import { MethodSetAttributes, PropAttributes } from "@/nodes/symbols"
import { GlobalNode } from "../global-node"
import { IHandleAttribute, TAttribute, TAttributeTuple } from "../node.types"
import { AtomicEngine } from "@/atomic-engine"
import { AtomicGame } from "@/atomic-game"
import { MethodGetApp } from "@/symbols"

export class HandlerAttribute implements IHandleAttribute {
  private $node: GlobalNode
  private $app: AtomicEngine | AtomicGame;

  [PropAttributes]: Map<string, TAttribute>

  constructor($node: GlobalNode) {
    this.$node = $node
    this.$app = this.$node[MethodGetApp]()

    this[PropAttributes] = new Map()
  }

  toEntries(): TAttributeTuple[] {
    return [...this[PropAttributes].entries()]
  }

  getAll(): TAttribute[] {
    return [...this[PropAttributes].values()]
  }

  get(name: string): TAttribute | undefined {
    return this[PropAttributes].get(name)
  }

  add(name: string, options: TAttribute): void {
    this[PropAttributes].set(name, options)

    this.$app.drawer.render.reDraw()

    this.$app.changeGlobal("re-draw", true)
  }

  has(name: string): boolean {
    return this[PropAttributes].has(name)
  }

  delete(name: string): boolean {
    this.$app.drawer.render.reDraw()

    this.$app.changeGlobal("re-draw", true)

    return this[PropAttributes].delete(name)
  }

  clear(): void {
    this[PropAttributes].clear()

    this.$app.drawer.render.reDraw()

    this.$app.changeGlobal("re-draw", true)
  }

  [MethodSetAttributes](attributes: TAttributeTuple[]): void {
    this[PropAttributes] = new Map(attributes)
  }
}
