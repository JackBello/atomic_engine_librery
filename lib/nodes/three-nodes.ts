import { INodeWorker } from "./nodes.types"

export class ThreeNodes {
  private ROOT_NODES: INodeWorker[]

  constructor(rootNodes: INodeWorker[]) {
    this.ROOT_NODES = rootNodes
  }

  getRoot() {
    return this.ROOT_NODES
  }

  getFirstNode() {}

  getLastNode() {}

  getNode(nodes: any[], value: any, mode: "uuid" | "index" | "deep" = "uuid") {
    if (mode === "deep") {
      return this.getNodeByDeep(nodes, value)
    } else if (mode === "index") {
      return nodes[value]
    }

    return nodes.find((node) => node.uuid == value)
  }

  getNodes(
    value: string | number,
    mode: "uuid" | "index" | "deep"
  ): INodeWorker[]
  getNodes(
    location: string,
    value: string | number,
    mode: "uuid" | "index" | "deep"
  ): INodeWorker[]
  getNodes(
    location?: unknown,
    value?: unknown,
    mode?: unknown
  ): INodeWorker[] | undefined {
    let nodesLocation

    if (
      location &&
      typeof location === "string" &&
      value &&
      typeof value === "string" &&
      mode &&
      typeof mode === "string" &&
      mode === "deep"
    ) {
      nodesLocation = this.getNodeByDeep(location)?.nodes

      return this.getNodeByDeep(nodesLocation ?? [], value)?.nodes
    }

    if (
      location &&
      typeof location === "string" &&
      value &&
      typeof value === "number" &&
      mode &&
      typeof mode === "string" &&
      mode === "index"
    ) {
      nodesLocation = this.getNodeByDeep(location)?.nodes

      return (nodesLocation ?? [])[value].nodes
    }

    if (
      location &&
      typeof location === "string" &&
      value &&
      typeof value === "string" &&
      mode &&
      typeof mode === "string" &&
      mode === "uuid"
    ) {
      nodesLocation = this.getNodeByDeep(location)?.nodes

      return (nodesLocation ?? []).find((node) => node.uuid == value)?.nodes
    }
  }

  hasNodeByDeep(deep: string): boolean
  hasNodeByDeep(nodes: INodeWorker[], deep: string): boolean
  hasNodeByDeep(nodes?: unknown, deep?: unknown): boolean {
    if (
      nodes &&
      Array.isArray(nodes) &&
      deep &&
      typeof deep === "string" &&
      deep === "root"
    ) {
      const path = "[" + deep.replace(/_/g, "].nodes[") + "]"
      const _ = new Function("nodes", `return nodes${path}`)
      return _(this.ROOT_NODES) !== undefined
    }

    if (
      nodes === undefined &&
      deep &&
      typeof deep === "string" &&
      deep === "root"
    ) {
      const path = "[" + deep.replace(/_/g, "].nodes[") + "]"
      const _ = new Function("nodes", `return nodes${path}`)
      return _(this.ROOT_NODES) !== undefined
    }

    if (
      nodes &&
      Array.isArray(nodes) &&
      deep &&
      typeof deep === "string" &&
      deep !== "root"
    ) {
      const path = "[" + deep.replace(/_/g, "].nodes[") + "]"
      const _ = new Function("nodes", `return nodes${path}`)
      return _(nodes) !== undefined
    }

    if (
      nodes === undefined &&
      deep &&
      typeof deep === "string" &&
      deep !== "root"
    ) {
      const path = "[" + deep.replace(/_/g, "].nodes[") + "]"
      const _ = new Function("nodes", `return nodes${path}`)
      return _(this.ROOT_NODES) !== undefined
    }

    return false
  }

  getNodeByDeep(
    deep: string
  ): INodeWorker | { deep: "root"; nodes: INodeWorker[] } | undefined
  getNodeByDeep(
    nodes: INodeWorker[],
    deep: string
  ): INodeWorker | { deep: "root"; nodes: INodeWorker[] } | undefined
  getNodeByDeep(
    nodes?: unknown,
    deep?: unknown
  ): INodeWorker | { deep: "root"; nodes: INodeWorker[] } | undefined {
    if (
      nodes &&
      Array.isArray(nodes) &&
      deep &&
      typeof deep === "string" &&
      deep === "root"
    ) {
      return {
        deep: "root",
        nodes: this.ROOT_NODES
      }
    }

    if (
      nodes === undefined &&
      deep &&
      typeof deep === "string" &&
      deep === "root"
    ) {
      return {
        deep: "root",
        nodes: this.ROOT_NODES
      }
    }

    if (
      nodes &&
      Array.isArray(nodes) &&
      deep &&
      typeof deep === "string" &&
      deep !== "root"
    ) {
      const path = "[" + deep.replace(/_/g, "].nodes[") + "]"
      const _ = new Function("nodes", `return nodes${path}`)
      return _(nodes)
    }

    if (
      nodes === undefined &&
      deep &&
      typeof deep === "string" &&
      deep !== "root"
    ) {
      const path = "[" + deep.replace(/_/g, "].nodes[") + "]"
      const _ = new Function("nodes", `return nodes${path}`)
      return _(this.ROOT_NODES)
    }

    return undefined
  }
}
