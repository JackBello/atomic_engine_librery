import { INodeWorker } from "@/nodes/nodes.types"
import {
  addNode,
  clearNodes,
  deleteNode,
  getNode,
  getNodes,
  hasNode,
  moveNode,
  replaceNode,
  searchNode,
  updatePropertiesNode,
  updatePropertyNode
} from "@/app/utils/nodes"

let root: INodeWorker[] = []

self.onmessage = function (event) {
  if (event.data.action === "get:root") {
    self.postMessage({
      type: "get:root",
      node: root
    })
  } else if (event.data.action === "set:root") {
    root = [event.data.root]
  } else if (event.data.action === "get:nodes") {
    if (!root.length) return

    const { location, mode = "uuid" } = event.data

    self.postMessage({
      type: "get:nodes",
      node: getNodes(root, location, mode)
    })
  } else if (event.data.action === "get:node") {
    if (!root.length) return

    const { location, mode = "uuid" } = event.data

    self.postMessage({
      type: "get:node",
      node: getNode(root, location, mode)
    })
  } else if (event.data.action === "add:node") {
    if (!root.length) return

    const { node, location, mode = "uuid" } = event.data

    addNode(root, node, location, mode)
  } else if (event.data.action === "update:node") {
    if (!root.length) return

    const { location, type = "property", mode = "uuid" } = event.data

    if (type === "property") {
      const { property, value } = event.data.options

      updatePropertyNode(root, location, property, value, mode)
    }

    if (type === "properties") {
      const { properties } = event.data.options

      updatePropertiesNode(root, location, properties, mode)
    }
  } else if (event.data.action === "has:node") {
    if (!root.length) return

    const { location, mode = "uuid" } = event.data

    self.postMessage({
      type: "has:node",
      node: hasNode(root, location, mode)
    })
  } else if (event.data.action === "delete:node") {
    if (!root.length) return

    const { location, mode = "uuid" } = event.data

    deleteNode(root, location, mode)
  } else if (event.data.action === "clear:nodes") {
    if (!root.length) return

    const { location, mode = "uuid" } = event.data

    clearNodes(root, location, mode)
  } else if (event.data.action === "replace:node") {
    if (!root.length) return

    const { location, node, mode = "uuid" } = event.data

    replaceNode(root, location, node, mode)
  } else if (event.data.action === "search:node") {
    if (!root.length) return

    const { location, mode = "uuid" } = event.data

    self.postMessage({
      type: "search:node",
      node: searchNode(root, location, mode)
    })
  } else if (event.data.action === "move:node") {
    if (!root.length) return

    const {
      position,
      modes = { from: "uuid", to: "uuid" },
      insert = "after"
    } = event.data.options

    moveNode(root, position, modes, insert)
  }
}
