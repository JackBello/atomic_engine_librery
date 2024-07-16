import { GlobalNode } from "@/nodes"
import { IHandleNode, INodeWorker, TMode } from "../node.types"
import {
  MethodSetIndex,
  MethodSetNodes,
  MethodSetParent,
  PropNodes
} from "@/nodes/symbols"
import { MethodExportWorker, MethodGetApp } from "@/symbols"
import { AtomicEngine } from "@/atomic-engine"
import { AtomicGame } from "@/atomic-game"

export class HandlerNode implements IHandleNode {
  private $node: GlobalNode
  private $app: AtomicEngine | AtomicGame;

  [PropNodes]: GlobalNode[]

  get all(): GlobalNode[] {
    return this[PropNodes]
  }

  get size(): number {
    return this[PropNodes].length
  }

  constructor($node: GlobalNode) {
    this.$node = $node
    this.$app = this.$node[MethodGetApp]()

    this[PropNodes] = []
  }

  private _updateNodes_(nodes: GlobalNode[]) {
    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index]

      node[MethodSetIndex](index)

      if (node.nodes.length) {
        this._updateNodes_(node.nodes)
      }
    }
  }

  get(index: number): GlobalNode | undefined {
    let left = 0
    let right = this[PropNodes].length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)

      let midValue = this[PropNodes][mid].index

      if (midValue === index) {
        return this[PropNodes][mid]
      } else if (midValue < index) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    return undefined
  }

  add(...nodes: GlobalNode[]): void {
    for (const node of nodes) {
      node[MethodSetParent](this.$node)
      node[MethodSetIndex](this.size)
      this[PropNodes].push(node)

      this.$app.drawer.nodes.addNode(
        node[MethodExportWorker]() as INodeWorker,
        this.$node.path,
        "path",
        "index"
      )
    }

    this.$app.drawer.render.reDraw()

    this.$app.changeGlobal("re-draw", true)
  }

  has(index: number): boolean {
    return this.get(index) !== undefined
  }

  delete(index: number): boolean {
    const $node = this.get(index)

    if ($node === undefined) return false

    this[PropNodes].splice($node.index, 1)

    this.$app.drawer.nodes.deleteNode($node.path, "path", "index")

    this._updateNodes_(this[PropNodes])

    this.$app.drawer.render.reDraw()

    this.$app.changeGlobal("re-draw", true)

    return true
  }

  clear(): boolean {
    this[PropNodes] = []

    this.$app.drawer.nodes.clearNodes(this.$node.path, "path", "index")

    this.$app.drawer.render.reDraw()

    this.$app.changeGlobal("re-draw", true)

    return true
  }

  replace(index: number, node: GlobalNode): boolean {
    const $node = this.get(index)

    if ($node === undefined) return false

    if (index < 0 || index >= this.size) throw new Error("Indexes out ranges")

    node[MethodSetParent]($node.parent)
    this[PropNodes][$node.index] = node

    this.$app.drawer.nodes.replaceNode(
      node[MethodExportWorker]() as INodeWorker,
      $node.path,
      "path",
      "index"
    )

    this._updateNodes_(this[PropNodes])

    this.$app.drawer.render.reDraw()

    this.$app.changeGlobal("re-draw", true)

    return true
  }

  search(slug: string): GlobalNode | undefined {
    const nodes = [this.$node]

    while (nodes.length > 0) {
      let node = nodes.shift()

      if (!node) return undefined

      if (node.slug === slug) return node

      nodes.push(...Array.from(node.$nodes.all))
    }

    return undefined
  }

  move(from: number, to: number): boolean {
    if (from < 0 || from >= this.size)
      throw new Error("From indexes out ranges")
    if (to < 0 || to >= this.size) throw new Error("To indexes out ranges")

    const $nodeFrom = this.get(from)
    const $nodeTo = this.get(to)

    if ($nodeFrom === undefined) return false
    if ($nodeTo === undefined) return false

    this[PropNodes].splice($nodeTo.index + 1, 0, $nodeFrom.clone())
    this[PropNodes].splice($nodeFrom.index, 1)

    this.$app.drawer.nodes.moveNode(
      {
        mode: "index",
        search: $nodeFrom.path
      },
      {
        mode: "index",
        search: $nodeTo.path
      },
      "path",
      "before"
    )

    this._updateNodes_(this[PropNodes])

    this.$app.drawer.render.reDraw()

    this.$app.changeGlobal("re-draw", true)

    return true
  }

  traverse(callback: (node: GlobalNode) => void): void {
    callback(this.$node)

    if (this.size > 0)
      for (const child of this[PropNodes]) {
        child.$nodes.traverse(callback)
      }
  }

  path(
    path: string,
    mode: TMode
  ): {
    get(index: number): GlobalNode | undefined
    add(...nodes: GlobalNode[]): void
    has(index: number): boolean
    delete(index: number): boolean
    clear(): boolean
    replace(index: number, node: GlobalNode): boolean
    search(slug: string): GlobalNode | undefined
    move(from: number, index: number): boolean
    traverse(callback: (node: GlobalNode) => void): void
  } {
    throw new Error("Method not implemented.")
  }

  [MethodSetNodes](nodes: GlobalNode[]): void {
    this[PropNodes] = nodes
  }
}
