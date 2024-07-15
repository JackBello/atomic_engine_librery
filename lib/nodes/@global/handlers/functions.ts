import { GlobalNode } from "@/nodes"
import { IHandleFunction, TFunctionTuple } from "../node.types"
import { AtomicGame } from "@/atomic-game"
import { AtomicEngine } from "@/atomic-engine"
import { TFunction } from "@/types"
import { MethodGetApp } from "@/symbols"
import { MethodSetFunctions, PropFunctions } from "@/nodes/symbols"

export class HandlerFunction implements IHandleFunction {
  private $node: GlobalNode
  private $app: AtomicEngine | AtomicGame;

  [PropFunctions]: Map<string, TFunction>

  constructor($node: GlobalNode) {
    this.$node = $node
    this.$app = this.$node[MethodGetApp]()

    this[PropFunctions] = new Map()
  }

  toEntries(): TFunctionTuple[] {
    return [...this[PropFunctions].entries()]
  }

  gelAll(): TFunction[] {
    return [...this[PropFunctions].values()]
  }

  get(name: string): TFunction | undefined {
    return this[PropFunctions].get(name)
  }

  add(name: string, func: TFunction): void {
    this[PropFunctions].set(name, func)

    this.$app.drawer.render.reDraw()

    this.$app.changeGlobal("re-draw", true)
  }

  has(name: string): boolean {
    return this[PropFunctions].has(name)
  }

  delete(name: string): boolean {
    this.$app.drawer.render.reDraw()

    this.$app.changeGlobal("re-draw", true)

    return this[PropFunctions].delete(name)
  }

  execute(name: string, ...args: any[]): void {
    const func = this.get(name)

    if (!func) return

    func(args)
  }

  clear(): void {
    this[PropFunctions].clear()

    this.$app.drawer.render.reDraw()

    this.$app.changeGlobal("re-draw", true)
  }

  [MethodSetFunctions](functions: TFunctionTuple[]): void {
    this[PropFunctions] = new Map(functions)
  }
}
