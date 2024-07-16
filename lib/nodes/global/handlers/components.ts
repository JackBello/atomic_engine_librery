import { AtomicGame } from "@/atomic-game"
import { IHandleComponent, TComponent, TComponentTuple } from "../node.types"
import { AtomicEngine } from "@/atomic-engine"
import { MethodGetApp } from "@/symbols"
import { GlobalNode } from "../global-node"
import { MethodSetComponents, PropComponents } from "@/nodes/symbols"

export class HandlerComponent implements IHandleComponent {
  private $node: GlobalNode
  private $app: AtomicEngine | AtomicGame;

  [PropComponents]: Map<string, TComponent>

  constructor($node: GlobalNode) {
    this.$node = $node
    this.$app = this.$node[MethodGetApp]()

    this[PropComponents] = new Map()
  }

  toEntries(): TComponentTuple[] {
    return [...this[PropComponents].entries()]
  }

  getAll(): TComponent[] {
    return [...this[PropComponents].values()]
  }

  get(name: string): TComponent | undefined {
    return this[PropComponents].get(name)
  }

  add(name: string, component: TComponent): void {
    this[PropComponents].set(name, component)
  }

  has(name: string): boolean {
    return this[PropComponents].has(name)
  }

  delete(name: string): boolean {
    return this[PropComponents].delete(name)
  }

  clear(): void {
    this[PropComponents].clear()
  }

  [MethodSetComponents](components: TComponentTuple[]): void {
    this[PropComponents] = new Map(components)
  }
}
