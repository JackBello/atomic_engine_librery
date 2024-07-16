import { MethodGetApp } from "@/symbols"
import { AbstractNode } from "../abstract/node.abstract"
import { INodeRootWorker, INodeWorker, TMode } from "./node.types"
import { GlobalNode } from ".."

export class RootNode extends AbstractNode {
  private root: [GlobalNode] = [this[MethodGetApp]().scenes.currentScene as any]

  private _nodes_(path: string) {
    return new Function("nodes", `return nodes${path}`)
  }

  private _updateNodes_(nodes: INodeWorker[], parent?: INodeWorker) {
    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index]

      node.location.index = index
      node.__path__ = parent ? `${parent.__path__}/${index}` : `${index}`

      if (node.nodes.length) {
        this._updateNodes_(node.nodes, node)
      }
    }
  }

  traverse(callback: (node: INodeRootWorker | INodeWorker) => void) {}

  replaceNode(
    from: string | number,
    value: INodeWorker,
    mode: TMode = "index"
  ) {
    const $node = this.getNode(from, mode)

    if ($node === undefined) return false

    if (
      mode === "index" &&
      (Number(from) < 0 || Number(from) >= $node.nodes.length)
    )
      throw new Error("Indexes out ranges")

    const $parent = this.getParentNode(from, mode)

    if ($parent === undefined) return false

    $parent.nodes[$node.location.index] = value

    this._updateNodes_($parent.nodes, $parent as any)

    return true
  }

  replaceNodeByPath(from: string, value: INodeWorker, mode: TMode = "index") {
    const $node = this.getNodeByPath(from, mode)

    if ($node === undefined) return false

    const $parent = this.getParentNodeByPath(from, mode)

    if ($parent === undefined) return false

    $parent.nodes[$node.location.index] = value

    this._updateNodes_($parent.nodes, $parent as any)

    return true
  }

  moveNodeByPath(
    from: { search: string; mode: TMode },
    to: { search: string; mode: TMode },
    insert: "after" | "before" = "before"
  ) {
    const $nodeFrom = this.getNodeByPath(from.search, from.mode)
    const $nodeTo = this.getNodeByPath(to.search, to.mode)

    if ($nodeFrom === undefined) return false
    if ($nodeTo === undefined) return false

    const $parentFrom = this.getParentNodeByPath(from.search, from.mode)
    const $parentTo = this.getParentNodeByPath(to.search, to.mode)

    if ($parentFrom === undefined) return false
    if ($parentTo === undefined) return false

    insert === "before"
      ? $parentTo.nodes.splice($nodeTo.location.index + 1, 0, {
          ...($nodeFrom as any)
        })
      : $parentTo.nodes.splice($nodeTo.location.index, 0, {
          ...($nodeFrom as any)
        })

    $parentFrom.nodes.splice($nodeFrom.location.index, 1)

    this._updateNodes_($parentFrom.nodes, $parentFrom as any)
    this._updateNodes_($parentTo.nodes, $parentTo as any)

    return true
  }

  moveNode(
    from: { search: string | number; mode: TMode },
    to: { search: string | number; mode: TMode },
    insert: "after" | "before" = "before"
  ) {
    const $nodeFrom = this.getNode(from.search, from.mode)
    const $nodeTo = this.getNode(to.search, to.mode)

    if ($nodeFrom === undefined) return false
    if ($nodeTo === undefined) return false

    const $parentFrom = this.getParentNode(from.search, from.mode)
    const $parentTo = this.getParentNode(to.search, to.mode)

    if ($parentFrom === undefined) return false
    if ($parentTo === undefined) return false

    insert === "before"
      ? $parentTo.nodes.splice($nodeTo.location.index + 1, 0, {
          ...($nodeFrom as any)
        })
      : $parentTo.nodes.splice($nodeTo.location.index, 0, {
          ...($nodeFrom as any)
        })

    $parentFrom.nodes.splice($nodeFrom.location.index, 1)

    this._updateNodes_($parentFrom.nodes, $parentFrom as any)
    this._updateNodes_($parentTo.nodes, $parentTo as any)

    return true
  }

  clearNodesByPath(path: string, mode: TMode = "index") {
    if (mode === "id") return this.clearNodesByPathId(path)

    if (mode === "slug") return this.clearNodesByPathSlug(path)

    return this.clearNodesByPathIndex(path)
  }

  protected clearNodesByPathId(path: string) {
    const $node = this.getNodeByPathId(path)

    if ($node === undefined) return false

    if ($node.nodes.length === 0) return false

    $node.nodes = []

    return true
  }

  protected clearNodesByPathSlug(path: string) {
    const $node = this.getNodeByPathSlug(path)

    if ($node === undefined) return false

    if ($node.nodes.length === 0) return false

    $node.nodes = []

    return true
  }

  protected clearNodesByPathIndex(path: string) {
    const $node = this.getNodeByPathIndex(path)

    if ($node === undefined) return false

    if ($node.nodes.length === 0) return false

    $node.nodes = []

    return true
  }

  clearNodes(location: string | number, mode: TMode = "index") {
    if (typeof location === "string" && mode === "id")
      return this.clearNodesById(location)
    else if (typeof location === "string" && mode === "slug")
      return this.clearNodesBySlug(location)
    else if (typeof location === "number" && mode === "index")
      return this.clearNodesByIndex(location)
    return false
  }

  protected clearNodesById(location: string) {
    const $node = this.getNodeById(location)

    if ($node === undefined) return false

    if ($node.nodes.length === 0) return false

    $node.nodes = []

    return true
  }

  protected clearNodesBySlug(location: string) {
    const $node = this.getNodeBySlug(location)

    if ($node === undefined) return false

    if ($node.nodes.length === 0) return false

    $node.nodes = []

    return true
  }

  protected clearNodesByIndex(location: number) {
    const $node = this.getNodeByIndex(location)

    if ($node === undefined) return false

    if ($node.nodes.length === 0) return false

    $node.nodes = []

    return true
  }

  getNodesByPath(path: string, mode: TMode = "index") {
    if (mode === "id") return this.getNodesByPathId(path)

    if (mode === "slug") return this.getNodesByPathSlug(path)

    return this.getNodesByPathIndex(path)
  }

  protected getNodesByPathId(path: string) {
    return this.getNodeByPathId(path)?.nodes
  }

  protected getNodesByPathSlug(path: string) {
    return this.getNodeByPathSlug(path)?.nodes
  }

  protected getNodesByPathIndex(path: string) {
    return this.getNodeByPathIndex(path)?.nodes
  }

  getNodes(location: string | number, mode: TMode = "index") {
    if (typeof location === "string" && mode === "id")
      return this.getNodesById(location)
    else if (typeof location === "string" && mode === "slug")
      return this.getNodesBySlug(location)
    else if (typeof location === "number" && mode === "index")
      return this.getNodesByIndex(location)
  }

  protected getNodesById(location: string) {
    return this.getNodeById(location)?.nodes
  }

  protected getNodesBySlug(location: string) {
    return this.getNodeBySlug(location)?.nodes
  }

  protected getNodesByIndex(location: number) {
    return this.getNodeByIndex(location)?.nodes
  }

  deleteNodeByPath(path: string, mode: TMode = "index") {
    if (mode === "id") return this.deleteNodeByPathId(path)

    if (mode === "slug") return this.deleteNodeByPathSlug(path)

    return this.deleteNodeByPathIndex(path)
  }

  protected deleteNodeByPathId(path: string) {
    const $node = this.getNodeByPathId(path)

    if ($node === undefined) return false

    const $parent = this.getParentNodeByPathId(path)

    if ($parent === undefined) return false

    $parent.nodes.splice($node.location.index, 1)

    this._updateNodes_($parent.nodes, $parent as any)

    return true
  }

  protected deleteNodeByPathSlug(path: string) {
    const $node = this.getNodeByPathSlug(path)

    if ($node === undefined) return false

    const $parent = this.getParentNodeByPathSlug(path)

    if ($parent === undefined) return false

    $parent.nodes.splice($node.location.index, 1)

    this._updateNodes_($parent.nodes, $parent as any)

    return true
  }

  protected deleteNodeByPathIndex(path: string) {
    const $node = this.getNodeByPathIndex(path)

    if ($node === undefined) return false

    const $parent = this.getParentNodeByPathIndex(path)

    if ($parent === undefined) return false

    $parent.nodes.splice($node.location.index, 1)

    this._updateNodes_($parent.nodes, $parent as any)

    return true
  }

  deleteNode(location: string | number, mode: TMode = "index") {
    if (typeof location === "string" && mode === "id")
      return this.deleteNodeById(location)
    else if (typeof location === "string" && mode === "slug")
      return this.deleteNodeBySlug(location)
    else if (typeof location === "number" && mode === "index")
      return this.deleteNodeByIndex(location)
    return false
  }

  protected deleteNodeById(location: string) {
    const $node = this.getNodeById(location)

    if ($node === undefined) return false

    const $parent = this.getParentNodeById(location)

    if ($parent === undefined) return false

    $parent.nodes.splice($node.location.index, 1)

    this._updateNodes_($parent.nodes, $parent as any)

    return true
  }

  protected deleteNodeBySlug(location: string) {
    const $node = this.getNodeBySlug(location)

    if ($node === undefined) return false

    const $parent = this.getParentNodeBySlug(location)

    if ($parent === undefined) return false

    $parent.nodes.splice($node.location.index, 1)

    this._updateNodes_($parent.nodes, $parent as any)

    return true
  }

  protected deleteNodeByIndex(location: number) {
    const $node = this.getNodeByIndex(location)

    if ($node === undefined) return false

    const $parent = this.getParentNodeByIndex(location)

    if ($parent === undefined) return false

    $parent.nodes.splice($node.location.index, 1)

    this._updateNodes_($parent.nodes, $parent as any)

    return true
  }

  addNodeByPath(
    path: string,
    value: INodeWorker,
    mode: TMode = "index",
    insert: "after" | "before" = "before"
  ) {
    if (mode === "id") return this.addNodeByPathId(path, value, insert)

    if (mode === "slug") return this.addNodeByPathSlug(path, value, insert)

    return this.addNodeByPathIndex(path, value, insert)
  }

  protected addNodeByPathId(
    path: string,
    value: INodeWorker,
    insert: "after" | "before"
  ) {
    const $node = this.getNodeByPathId(path)

    if ($node === undefined) return false

    insert === "after" ? $node.nodes.unshift(value) : $node.nodes.push(value)

    return true
  }

  protected addNodeByPathSlug(
    path: string,
    value: INodeWorker,
    insert: "after" | "before"
  ) {
    const $node = this.getNodeByPathSlug(path)

    if ($node === undefined) return false

    insert === "after" ? $node.nodes.unshift(value) : $node.nodes.push(value)

    return true
  }

  protected addNodeByPathIndex(
    path: string,
    value: INodeWorker,
    insert: "after" | "before"
  ) {
    const $node = this.getNodeByPathIndex(path)

    if ($node === undefined) return false

    insert === "after" ? $node.nodes.unshift(value) : $node.nodes.push(value)

    return true
  }

  addNode(
    location: string,
    value: INodeWorker,
    mode: TMode,
    insert: "after" | "before" = "before"
  ) {
    if (typeof location === "string" && mode === "id")
      return this.addNodeById(location, value, insert)
    else if (typeof location === "string" && mode === "slug")
      return this.addNodeBySlug(location, value, insert)
    else if (typeof location === "number" && mode === "index")
      return this.addNodeByIndex(location, value, insert)
    return false
  }

  protected addNodeById(
    location: string,
    value: INodeWorker,
    insert: "after" | "before"
  ) {
    const $node = this.getNodeById(location)

    if ($node === undefined) return false

    insert === "after" ? $node.nodes.unshift(value) : $node.nodes.push(value)

    return true
  }

  protected addNodeBySlug(
    location: string,
    value: INodeWorker,
    insert: "after" | "before"
  ) {
    const $node = this.getNodeBySlug(location)

    if ($node === undefined) return false

    insert === "after" ? $node.nodes.unshift(value) : $node.nodes.push(value)

    return true
  }

  protected addNodeByIndex(
    location: number,
    value: INodeWorker,
    insert: "after" | "before"
  ) {
    const $node = this.getNodeByIndex(location)

    if ($node === undefined) return false

    insert === "after" ? $node.nodes.unshift(value) : $node.nodes.push(value)

    return true
  }

  searchNodeByPath(
    from: string,
    search: {
      value: string
      mode: TMode
    },
    mode: TMode = "index"
  ) {
    if (mode === "id") return this.searchNodeByPathId(from, search)

    if (mode === "slug") return this.searchNodeByPathSlug(from, search)

    return this.searchNodeByPathIndex(from, search)
  }

  protected searchNodeByPathId(
    from: string,
    search: {
      value: string
      mode: TMode
    }
  ) {
    const $node = this.getNodeByPathId(from)

    if ($node === undefined) return undefined

    if (
      search.mode === "index" &&
      typeof search.value === "number" &&
      (search.value < 0 || search.value >= $node.nodes.length)
    )
      throw new Error("Indexes out ranges")

    const nodes: INodeWorker[] = [$node as any]

    while (nodes.length > 0) {
      let node = nodes.shift()

      if (!node) return undefined

      if (search.mode === "id" && node.location.id === search.value) {
        return node
      } else if (
        search.mode === "slug" &&
        node.location.slug === search.value
      ) {
        return node
      } else if (
        search.mode === "index" &&
        typeof search.value === "number" &&
        node.location.index === search.value
      ) {
        return node
      }

      nodes.push(...Array.from(node.nodes))
    }

    return undefined
  }

  protected searchNodeByPathSlug(
    from: string,
    search: {
      value: string
      mode: TMode
    }
  ) {
    const $node = this.getNodeByPathSlug(from)

    if ($node === undefined) return undefined

    if (
      search.mode === "index" &&
      typeof search.value === "number" &&
      (search.value < 0 || search.value >= $node.nodes.length)
    )
      throw new Error("Indexes out ranges")

    const nodes: INodeWorker[] = [$node as any]

    while (nodes.length > 0) {
      let node = nodes.shift()

      if (!node) return undefined

      if (search.mode === "id" && node.location.id === search.value) {
        return node
      } else if (
        search.mode === "slug" &&
        node.location.slug === search.value
      ) {
        return node
      } else if (
        search.mode === "index" &&
        typeof search.value === "number" &&
        node.location.index === search.value
      ) {
        return node
      }

      nodes.push(...Array.from(node.nodes))
    }

    return undefined
  }

  protected searchNodeByPathIndex(
    from: string,
    search: {
      value: string | number
      mode: TMode
    }
  ) {
    const $node = this.getNodeByPathIndex(from)

    if ($node === undefined) return undefined

    if (
      search.mode === "index" &&
      typeof search.value === "number" &&
      (search.value < 0 || search.value >= $node.nodes.length)
    )
      throw new Error("Indexes out ranges")

    const nodes: INodeWorker[] = [$node as any]

    while (nodes.length > 0) {
      let node = nodes.shift()

      if (!node) return undefined

      if (search.mode === "id" && node.location.id === search.value) {
        return node
      } else if (
        search.mode === "slug" &&
        node.location.slug === search.value
      ) {
        return node
      } else if (
        search.mode === "index" &&
        typeof search.value === "number" &&
        node.location.index === search.value
      ) {
        return node
      }

      nodes.push(...Array.from(node.nodes))
    }

    return undefined
  }

  searchNode(
    from: string | number,
    search: { value: string | number; mode: TMode },
    mode: TMode = "index"
  ) {
    if (typeof from === "string" && mode === "id")
      return this.searchNodeById(from, search)
    else if (typeof from === "string" && mode === "slug")
      return this.searchNodeBySlug(from, search)
    else if (typeof from === "number" && mode === "index")
      return this.searchNodeByIndex(from, search)
  }

  protected searchNodeById(
    from: string,
    search: { value: string | number; mode: TMode }
  ) {
    const $node = this.getNodeById(from)

    if ($node === undefined) return undefined

    if (
      search.mode === "index" &&
      typeof search.value === "number" &&
      (search.value < 0 || search.value >= $node.nodes.length)
    )
      throw new Error("Indexes out ranges")

    const nodes: INodeWorker[] = [$node as any]

    while (nodes.length > 0) {
      let node = nodes.shift()

      if (!node) return undefined

      if (search.mode === "id" && node.location.id === search.value) {
        return node
      } else if (
        search.mode === "slug" &&
        node.location.slug === search.value
      ) {
        return node
      } else if (
        search.mode === "index" &&
        typeof search.value === "number" &&
        node.location.index === search.value
      ) {
        return node
      }

      nodes.push(...Array.from(node.nodes))
    }

    return undefined
  }

  protected searchNodeBySlug(
    from: string,
    search: { value: string | number; mode: TMode }
  ) {
    const $node = this.getNodeBySlug(from)

    if ($node === undefined) return undefined

    if (
      search.mode === "index" &&
      typeof search.value === "number" &&
      (search.value < 0 || search.value >= $node.nodes.length)
    )
      throw new Error("Indexes out ranges")

    const nodes: INodeWorker[] = [$node as any]

    while (nodes.length > 0) {
      let node = nodes.shift()

      if (!node) return undefined

      if (search.mode === "id" && node.location.id === search.value) {
        return node
      } else if (
        search.mode === "slug" &&
        node.location.slug === search.value
      ) {
        return node
      } else if (
        search.mode === "index" &&
        typeof search.value === "number" &&
        node.location.index === search.value
      ) {
        return node
      }

      nodes.push(...Array.from(node.nodes))
    }

    return undefined
  }

  protected searchNodeByIndex(
    from: number,
    search: { value: string | number; mode: TMode }
  ) {
    const $node = this.getNodeByIndex(from)

    if ($node === undefined) return undefined

    if (
      search.mode === "index" &&
      typeof search.value === "number" &&
      (search.value < 0 || search.value >= $node.nodes.length)
    )
      throw new Error("Indexes out ranges")

    const nodes: INodeWorker[] = [$node as any]

    while (nodes.length > 0) {
      let node = nodes.shift()

      if (!node) return undefined

      if (search.mode === "id" && node.location.id === search.value) {
        return node
      } else if (
        search.mode === "slug" &&
        node.location.slug === search.value
      ) {
        return node
      } else if (
        search.mode === "index" &&
        typeof search.value === "number" &&
        node.location.index === search.value
      ) {
        return node
      }

      nodes.push(...Array.from(node.nodes))
    }

    return undefined
  }

  getNodeByPath(
    path: string,
    mode: TMode = "index"
  ): INodeWorker | INodeRootWorker | undefined {
    if (mode === "id") return this.getNodeByPathId(path)

    if (mode === "slug") return this.getNodeByPathSlug(path)

    return this.getNodeByPathIndex(path)
  }

  protected getNodeByPathId(
    path: string
  ): INodeWorker | INodeRootWorker | undefined {
    const parts = path.split("/")

    let $node = undefined

    for (const part of parts) {
      if ($node) {
        $node = $node.nodes.find((node) => node.location.id === part)
      } else {
        $node = this._root_.find((node) => node.location.id === part)
      }
    }

    return $node
  }

  protected getNodeByPathSlug(
    path: string
  ): INodeWorker | INodeRootWorker | undefined {
    const parts = path.split("/")

    let $node = undefined

    for (const part of parts) {
      if ($node) {
        $node = $node.nodes.find((node) => node.location.slug === part)
      } else {
        $node = this._root_.find((node) => node.location.slug === part)
      }
    }

    return $node
  }

  protected getNodeByPathIndex(
    path: string
  ): INodeWorker | INodeRootWorker | undefined {
    path = "[" + path.replace(/\//g, "].nodes[") + "]"

    return this._nodes_(path)(this._root_)
  }

  getNode(
    location: string | number,
    mode: TMode = "index"
  ): INodeWorker | INodeRootWorker | undefined {
    if (typeof location === "string" && mode === "id")
      return this.getNodeById(location)
    else if (typeof location === "string" && mode === "slug")
      return this.getNodeBySlug(location)
    else if (typeof location === "number" && mode === "index")
      return this.getNodeByIndex(location)
  }

  protected getNodeById(
    location: string
  ): INodeWorker | INodeRootWorker | undefined {
    return this._root_.find((node) => node.location.id === location)
  }

  protected getNodeBySlug(
    location: string
  ): INodeWorker | INodeRootWorker | undefined {
    return this._root_.find((node) => node.location.slug === location)
  }

  protected getNodeByIndex(
    location: number
  ): INodeWorker | INodeRootWorker | undefined {
    let left = 0
    let right = this._root_.length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)

      let midValue = this._root_[mid].location.index

      if (midValue === location) {
        return this._root_[mid]
      } else if (midValue < location) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    return undefined
  }

  hasNodeByPath(path: string, mode: TMode = "index") {
    if (mode === "id") return this.hasNodeByPathId(path)

    if (mode === "slug") return this.hasNodeByPathSlug(path)

    return this.hasNodeByPathIndex(path)
  }

  protected hasNodeByPathId(path: string) {
    return this.getNodeByPathId(path) !== undefined
  }

  protected hasNodeByPathSlug(path: string) {
    return this.getNodeByPathSlug(path) !== undefined
  }

  protected hasNodeByPathIndex(path: string) {
    return this.getNodeByPathIndex(path) !== undefined
  }

  hasNode(location: string | number, mode: TMode = "index") {
    if (typeof location === "string" && mode === "id")
      return this.hasNodeById(location)
    else if (typeof location === "string" && mode === "slug")
      return this.hasNodeBySlug(location)
    else if (typeof location === "number" && mode === "index")
      return this.hasNodeByIndex(location)
    return false
  }

  protected hasNodeById(location: string) {
    return this.getNodeById(location) !== undefined
  }

  protected hasNodeBySlug(location: string) {
    return this.getNodeBySlug(location) !== undefined
  }

  protected hasNodeByIndex(location: number) {
    return this.getNodeByIndex(location) !== undefined
  }

  getParentNodeByPath(path: string, mode: TMode = "index") {
    if (mode === "id") return this.getParentNodeByPathId(path)

    if (mode === "slug") return this.getParentNodeByPathSlug(path)

    return this.getParentNodeByPathIndex(path)
  }

  protected getParentNodeByPathId(path: string) {
    const $node = this.getNodeByPathId(path)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent
  }

  protected getParentNodeByPathSlug(path: string) {
    const $node = this.getNodeByPathSlug(path)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent
  }

  protected getParentNodeByPathIndex(path: string) {
    const $node = this.getNodeByPathIndex(path)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent
  }

  getParentNode(location: string | number, mode: TMode = "index") {
    if (typeof location === "string" && mode === "id")
      return this.getParentNodeById(location)
    else if (typeof location === "string" && mode === "slug")
      return this.getParentNodeBySlug(location)
    else if (typeof location === "number" && mode === "index")
      return this.getParentNodeByIndex(location)
  }

  protected getParentNodeById(location: string) {
    const $node = this.getNodeById(location)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent
  }

  protected getParentNodeBySlug(location: string) {
    const $node = this.getNodeBySlug(location)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent
  }

  protected getParentNodeByIndex(location: number) {
    const $node = this.getNodeByIndex(location)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent
  }

  getPreviousSiblingNodeByPath(path: string, mode: TMode = "index") {
    if (mode === "id") return this.getPreviousSiblingNodeByPathId(path)

    if (mode === "slug") return this.getPreviousSiblingNodeByPathSlug(path)

    return this.getPreviousSiblingNodeByPathIndex(path)
  }

  protected getPreviousSiblingNodeByPathId(path: string) {
    const $node = this.getNodeByPathId(path)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent?.nodes[$node.location.index - 1]
  }

  protected getPreviousSiblingNodeByPathSlug(path: string) {
    const $node = this.getNodeByPathSlug(path)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent?.nodes[$node.location.index - 1]
  }

  protected getPreviousSiblingNodeByPathIndex(path: string) {
    const $node = this.getNodeByPathIndex(path)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent?.nodes[$node.location.index - 1]
  }

  getPreviousSiblingNode(location: string | number, mode: TMode = "index") {
    if (typeof location === "string" && mode === "id")
      return this.getPreviousSiblingNodeById(location)
    else if (typeof location === "string" && mode === "slug")
      return this.getPreviousSiblingNodeBySlug(location)
    else if (typeof location === "number" && mode === "index")
      return this.getPreviousSiblingNodeByIndex(location)
  }

  protected getPreviousSiblingNodeById(location: string) {
    const $node = this.getNodeById(location)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent?.nodes[$node.location.index - 1]
  }

  protected getPreviousSiblingNodeBySlug(location: string) {
    const $node = this.getNodeBySlug(location)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent?.nodes[$node.location.index - 1]
  }

  protected getPreviousSiblingNodeByIndex(location: number) {
    const $node = this.getNodeByIndex(location)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent?.nodes[$node.location.index - 1]
  }

  getNextSiblingNodeByPath(path: string, mode: TMode = "index") {
    if (mode === "id") return this.getNextSiblingNodeByPathId(path)

    if (mode === "slug") return this.getNextSiblingNodeByPathSlug(path)

    return this.getNextSiblingNodeByPathIndex(path)
  }

  protected getNextSiblingNodeByPathId(path: string) {
    const $node = this.getNodeByPathId(path)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent?.nodes[$node.location.index + 1]
  }

  protected getNextSiblingNodeByPathSlug(path: string) {
    const $node = this.getNodeByPathSlug(path)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent?.nodes[$node.location.index + 1]
  }

  protected getNextSiblingNodeByPathIndex(path: string) {
    const $node = this.getNodeByPathIndex(path)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent?.nodes[$node.location.index + 1]
  }

  getNextSiblingNode(location: string | number, mode: TMode = "index") {
    if (typeof location === "string" && mode === "id")
      return this.getNextSiblingNodeById(location)
    else if (typeof location === "string" && mode === "slug")
      return this.getNextSiblingNodeBySlug(location)
    else if (typeof location === "number" && mode === "index")
      return this.getNextSiblingNodeByIndex(location)
  }

  protected getNextSiblingNodeById(location: string) {
    const $node = this.getNodeById(location)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent?.nodes[$node.location.index + 1]
  }

  protected getNextSiblingNodeBySlug(location: string) {
    const $node = this.getNodeBySlug(location)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent?.nodes[$node.location.index + 1]
  }

  protected getNextSiblingNodeByIndex(location: number) {
    const $node = this.getNodeByIndex(location)

    if ($node === undefined) return undefined

    if (!("parent" in $node)) return undefined

    return $node.parent?.nodes[$node.location.index + 1]
  }

  getFirstChildNodeByPath(path: string, mode: TMode = "index") {
    if (mode === "id") return this.getFirstChildNodeByPathId(path)

    if (mode === "slug") return this.getFirstChildNodeByPathSlug(path)

    return this.getFirstChildNodeByPathIndex(path)
  }

  protected getFirstChildNodeByPathId(path: string) {
    const $node = this.getNodeByPathId(path)

    if (!$node) return undefined

    return $node.nodes[0]
  }

  protected getFirstChildNodeByPathSlug(path: string) {
    const $node = this.getNodeByPathSlug(path)

    if (!$node) return undefined

    return $node.nodes[0]
  }

  protected getFirstChildNodeByPathIndex(path: string) {
    const $node = this.getNodeByPathIndex(path)

    if (!$node) return undefined

    return $node.nodes[0]
  }

  getFirstChildNode(location: string | number, mode: TMode = "index") {
    if (typeof location === "string" && mode === "id")
      return this.getFirstChildNodeById(location)
    else if (typeof location === "string" && mode === "slug")
      return this.getFirstChildNodeBySlug(location)
    else if (typeof location === "number" && mode === "index")
      return this.getFirstChildNodeByIndex(location)
  }

  protected getFirstChildNodeById(location: string) {
    const $node = this.getNodeById(location)

    if (!$node) return undefined

    return $node.nodes[0]
  }

  protected getFirstChildNodeBySlug(location: string) {
    const $node = this.getNodeBySlug(location)

    if (!$node) return undefined

    return $node.nodes[0]
  }

  protected getFirstChildNodeByIndex(location: number) {
    const $node = this.getNodeByIndex(location)

    if (!$node) return undefined

    return $node.nodes[0]
  }

  getLastChildNodeByPath(path: string, mode: TMode = "index") {
    if (mode === "id") return this.getLastChildNodeByPathId(path)

    if (mode === "slug") return this.getLastChildNodeByPathSlug(path)

    return this.getLastChildNodeByPathIndex(path)
  }

  protected getLastChildNodeByPathId(path: string) {
    const $node = this.getNodeByPathId(path)

    if (!$node) return undefined

    return $node.nodes[$node.nodes.length - 1]
  }

  protected getLastChildNodeByPathSlug(path: string) {
    const $node = this.getNodeByPathSlug(path)

    if (!$node) return undefined

    return $node.nodes[$node.nodes.length - 1]
  }

  protected getLastChildNodeByPathIndex(path: string) {
    const $node = this.getNodeByPathIndex(path)

    if (!$node) return undefined

    return $node.nodes[$node.nodes.length - 1]
  }

  getLastChildNode(location: string | number, mode: TMode = "index") {
    if (typeof location === "string" && mode === "id")
      return this.getLastChildNodeById(location)
    else if (typeof location === "string" && mode === "slug")
      return this.getLastChildNodeBySlug(location)
    else if (typeof location === "number" && mode === "index")
      return this.getLastChildNodeByIndex(location)
  }

  protected getLastChildNodeById(location: string) {
    const $node = this.getNodeById(location)

    if (!$node) return undefined

    return $node.nodes[$node.nodes.length - 1]
  }

  protected getLastChildNodeBySlug(location: string) {
    const $node = this.getNodeBySlug(location)

    if (!$node) return undefined

    return $node.nodes[$node.nodes.length - 1]
  }

  protected getLastChildNodeByIndex(location: number) {
    const $node = this.getNodeByIndex(location)

    if (!$node) return undefined

    return $node.nodes[$node.nodes.length - 1]
  }
}
