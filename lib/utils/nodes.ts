export function nodeIsInViewport(
  node: any,
  viewport: { x: number; y: number; width: number; height: number }
) {
  return (
    node.x + node.width > viewport.x &&
    node.x < viewport.x + viewport.width &&
    node.y + node.height > viewport.y &&
    node.y < viewport.y + viewport.height
  )
}

export function nodeIsInEditor(
  node: any,
  size: { width: number; height: number },
  pan?: { x: number; y: number },
  zoom?: number
) {
  pan = pan ?? { x: 0, y: 0 }
  zoom = zoom ?? 1

  const visibleWidth = size.width / zoom
  const visibleHeight = size.height / zoom

  const minX = -pan.x
  const minY = -pan.y
  const maxX = minX + visibleWidth
  const maxY = minY + visibleHeight

  return (
    node.x + (node.width * node.scaleX) / 2 > minX &&
    node.x - (node.width * node.scaleX) / 2 < maxX &&
    node.y + (node.height * node.scaleY) / 2 > minY &&
    node.y - (node.height * node.scaleY) / 2 < maxY
  )
}

export function getFirstNode(
  nodes: any,
  value: any,
  mode: "uuid" | "index" | "deep" = "uuid"
) {
  if (value === "root") {
    return nodes[0]
  } else if (value !== undefined && (mode === "index" || mode === "uuid")) {
    return getNode(nodes, value, mode).nodes[0]
  } else if (value !== undefined && mode === "deep") {
    return getNode(nodes, value, mode).nodes[0]
  }
}

export function getLastNode(
  nodes: any,
  value: any,
  mode: "uuid" | "index" | "deep" = "uuid"
) {
  let node = getNode(nodes, value, mode)

  if (value === "root") {
    return nodes[nodes.length - 1]
  } else if (value !== undefined && (mode === "index" || mode === "uuid")) {
    node = getNode(nodes, value, mode)
    return node.nodes[node.nodes.length - 1]
  } else if (value !== undefined && mode === "deep") {
    node = getNode(nodes, value, mode)
    return node.nodes[node.nodes.length - 1]
  }
}

export function getNextSiblingNode(
  nodes: any,
  value: any,
  mode: "uuid" | "index" | "deep" = "uuid"
) {
  let node = getNode(nodes, value, mode)

  if (value !== undefined && (mode === "index" || mode === "uuid") && node) {
    return nodes[node.index + 1]
  } else if (value !== undefined && mode === "deep") {
    const parent = getParentNodeByDeep(nodes, value)
    return parent.nodes[node.index + 1]
  }
}

export function getPreviousSiblingNode(
  nodes: any,
  value: any,
  mode: "uuid" | "index" | "deep" = "uuid"
) {
  let node = getNode(nodes, value, mode)

  if ((mode === "index" || mode === "uuid") && node) {
    return nodes[node.index - 1]
  } else if (mode === "deep") {
    const parent = getParentNodeByDeep(nodes, value)
    return parent.nodes[node.index - 1]
  }
}

export function getNodes(
  nodes: any[],
  value: any,
  mode: "uuid" | "index" | "deep" = "uuid"
) {
  if (mode === "deep") {
    return getNodeByDeep(nodes, value).nodes
  } else if (mode === "index") {
    return nodes[value].nodes
  }

  return nodes.find((node) => node.uuid == value).nodes
}

export function addNode(
  nodes: any[],
  node: any,
  location: any,
  mode: "uuid" | "index" | "deep" = "uuid",
  insert: "before" | "after" = "after"
) {
  if (node !== undefined && location === undefined) {
    insert === "before" ? nodes.unshift(node) : nodes.push(node)
  } else if (
    node !== undefined &&
    location !== undefined &&
    (mode === "index" || mode === "uuid" || mode === "deep")
  ) {
    const search = getNode(nodes, location, mode)

    insert === "before" ? search.nodes.unshift(node) : search.nodes.push(node)
  }
}

export function updatePropertyNode(
  nodes: any[],
  location: any,
  property: any,
  value: any,
  mode: "uuid" | "index" | "deep" = "uuid"
) {
  const node = getNode(nodes, location, mode)

  if (
    property === "uuid" ||
    property === "index" ||
    property === "deep" ||
    property === "nodes" ||
    property === "__type__"
  )
    return false

  if (node.options && node.options[property] !== undefined) {
    node.options[property] = value

    return true
  }

  return false
}

export function updatePropertiesNode(
  nodes: any[],
  location: any,
  properties: any,
  mode: "uuid" | "index" | "deep" = "uuid"
) {
  const node = getNode(nodes, location, mode)

  for (const property in properties) {
    if (
      property === "uuid" ||
      property === "index" ||
      property === "deep" ||
      property === "nodes" ||
      property === "__type__"
    )
      continue

    if (node.options && node.options[property] !== undefined) {
      node.options[property] = properties[property]
    }
  }

  return true
}

export function findNodeWithBinarySearch(
  nodes: any[],
  value: any,
  mode: "uuid" | "index" | "deep" = "uuid"
) {
  let left = 0
  let right = nodes.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    let midValue = nodes[mid].uuid

    if (mode === "index") midValue = nodes[mid].index
    if (mode === "deep") midValue = nodes[mid].deep

    if (midValue === value) {
      return mid
    } else if (midValue < value) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return -1
}

export function getNode(
  nodes: any[],
  value: any,
  mode: "uuid" | "index" | "deep" = "uuid"
) {
  if (mode === "deep") {
    return getNodeByDeep(nodes, value)
  } else if (mode === "index") {
    return nodes[value]
  }

  return nodes.find((node) => node.uuid == value)
}

export function hasNode(
  nodes: any[],
  value: any,
  mode: "uuid" | "index" | "deep" = "uuid"
) {
  if (mode === "deep") {
    return hasNodeByDeep(nodes, value)
  } else if (mode === "index") {
    return nodes.findIndex((node) => node.index === value) !== -1
  }

  return nodes.findIndex((node) => node.uuid === value) !== -1
}

export function deleteNode(
  nodes: any[],
  value: any,
  mode: "uuid" | "index" | "deep" = "uuid"
) {
  let node = getNode(nodes, value, mode)
  let parent

  if (mode === "deep") {
    parent = getParentNodeByDeep(nodes, value)

    parent.nodes.splice(node.index, 1)

    parent = undefined

    node = undefined

    updateDeepAndIndexOnNodes(nodes, undefined)

    return true
  } else if ((mode === "index" || mode === "uuid") && node) {
    nodes.splice(node.index, 1)

    node = undefined

    updateDeepAndIndexOnNodes(nodes, undefined)

    return true
  }

  return false
}

export function clearNodes(
  nodes: any[],
  value?: any,
  mode: "uuid" | "index" | "deep" = "uuid"
) {
  let nodesDelete

  if (value) {
    nodesDelete = getNode(nodes, value, mode)
  }

  if (value && nodesDelete) {
    nodesDelete.nodes.splice(0, nodesDelete.nodes.length)
  } else {
    nodes.splice(0, nodes.length)
  }
}

export function replaceNode(
  nodes: any[],
  value: any,
  replace: any,
  mode: "uuid" | "index" | "deep" = "uuid",
  hasReplaceDeep: boolean = false
) {
  if (mode === "index" && (value < 0 || value >= nodes.length))
    throw new Error("Indexes out ranges")

  let search = getNode(nodes, value, mode)
  let parent

  if (!search) throw new Error("node not found")

  replace.index = search.index
  if (hasReplaceDeep) replace.deep = search.deep

  if (mode === "index" || mode === "uuid") {
    nodes[search.index] = replace

    search = undefined
  } else if (mode === "deep") {
    parent = getParentNodeByDeep(nodes, value)

    parent.nodes[search.index] = replace

    search = undefined

    parent = undefined
  }
}

export function searchNode(
  node: any,
  value: any,
  mode: "uuid" | "index" | "deep" = "uuid"
) {
  if (mode === "index" && (value < 0 || value >= node.nodes.length))
    throw new Error("Indexes out ranges")

  const nodes: any[] = [node]

  while (nodes.length > 0) {
    let node = nodes.shift()

    if (mode === "uuid" && node?.uuid === value) {
      return node
    } else if (mode === "index" && node?.index === value) {
      return node
    } else if (mode === "deep" && node?.deep === value) {
      return node
    }

    nodes.push(...Array.from(node?.nodes ?? []))
  }

  return undefined
}

export function updateDeepAndIndexOnNodes(nodes: any[], parent: any) {
  for (let index = 0; index < nodes.length; index++) {
    nodes[index].index = index
    nodes[index].deep = parent ? `${parent.deep}_${index}` : `${index}`

    if (nodes[index].nodes.length) {
      updateDeepAndIndexOnNodes(nodes[index].nodes, nodes[index])
    }
  }
}

export function moveNode(
  nodes: any[],
  position: { from: any; to: any },
  modes: {
    from: "uuid" | "index" | "deep"
    to: "uuid" | "index" | "deep"
  },
  insert: "before" | "after" = "after"
) {
  let nodeFrom, parentNodeFrom, nodeTo, parentNodeTo

  if (
    modes.from === "index" &&
    (position.from < 0 || position.from >= nodes.length)
  )
    throw new Error("Indexes out ranges")
  else if (
    modes.to === "index" &&
    (position.to < 0 || position.to >= nodes.length)
  )
    throw new Error("Indexes out ranges")

  if (
    (modes.from === "index" || modes.from === "uuid") &&
    (modes.to === "index" || modes.to === "uuid")
  ) {
    nodeFrom = getNode(nodes, position.from, modes.from)
    nodeTo = getNode(nodes, position.to, modes.to)

    const copyNodes = nodes.slice()

    const [nodeMove] = copyNodes.splice(
      modes.from === "index" ? nodeFrom.index : nodeFrom.uuid,
      1
    )

    copyNodes.splice(
      insert === "before" ? nodeTo.index : nodeTo.index + 1,
      0,
      nodeMove
    )

    updateDeepAndIndexOnNodes(copyNodes, undefined)

    nodes.splice(0, nodes.length)
    nodes.push(...copyNodes)

    nodeFrom = undefined
    nodeTo = undefined
  } else if (
    (modes.from === "index" || modes.from === "uuid") &&
    modes.to === "deep"
  ) {
    nodeFrom = getNode(nodes, position.from, modes.from)
    nodeTo = getNode(nodes, position.to, modes.to)
    parentNodeTo = getParentNodeByDeep(nodes, position.to)

    const copyNodes = nodes.slice()

    const [nodeMove] = copyNodes.splice(
      modes.from === "index" ? nodeFrom.index : nodeFrom.uuid,
      1
    )

    const copyNodesDeep = parentNodeTo.nodes.slice()

    copyNodesDeep.splice(
      insert === "before" ? nodeTo.index : nodeTo.index + 1,
      0,
      nodeMove
    )

    modifyNodesByDeep(copyNodes, parentNodeTo.deep, copyNodesDeep)

    updateDeepAndIndexOnNodes(copyNodes, undefined)

    nodes.splice(0, nodes.length)
    nodes.push(...copyNodes)

    nodeFrom = undefined
    nodeTo = undefined
    parentNodeTo = undefined
  } else if (
    modes.from === "deep" &&
    (modes.to === "index" || modes.to === "uuid")
  ) {
    nodeFrom = getNode(nodes, position.from, modes.from)
    parentNodeFrom = getParentNodeByDeep(nodes, position.from)
    nodeTo = getNode(nodes, position.to, modes.to)

    const copyNodesDeep = parentNodeFrom.nodes.slice()

    const [nodeMove] = copyNodesDeep.splice(nodeFrom.index, 1)

    const copyNodes = nodes.slice()

    copyNodes.splice(
      insert === "before" ? nodeTo.index : nodeTo.index + 1,
      0,
      nodeMove
    )

    modifyNodesByDeep(copyNodes, parentNodeFrom.deep, copyNodesDeep)

    updateDeepAndIndexOnNodes(copyNodes, undefined)

    nodes.splice(0, nodes.length)
    nodes.push(...copyNodes)

    nodeFrom = undefined
    parentNodeFrom = undefined
    nodeTo = undefined
  } else if (modes.from === "deep" && modes.to === "deep") {
    nodeFrom = getNode(nodes, position.from, modes.from)
    parentNodeFrom = getParentNodeByDeep(nodes, position.from)
    nodeTo = getNode(nodes, position.to, modes.to)
    parentNodeTo = getParentNodeByDeep(nodes, position.to)

    let originalNodes = nodes.slice()

    const copyNodesDeepFrom = parentNodeFrom.nodes.slice()

    const [nodeMove] = copyNodesDeepFrom.splice(nodeFrom.index, 1)

    const copyNodesDeepTo = parentNodeTo.nodes.slice()

    copyNodesDeepTo.splice(
      insert === "before" ? nodeTo.index : nodeTo.index + 1,
      0,
      nodeMove
    )

    modifyNodesByDeep(originalNodes, parentNodeFrom.deep, copyNodesDeepFrom)
    modifyNodesByDeep(originalNodes, parentNodeTo.deep, copyNodesDeepTo)

    updateDeepAndIndexOnNodes(originalNodes, undefined)

    nodes.splice(0, nodes.length)
    nodes.push(...originalNodes)

    nodeFrom = undefined
    parentNodeFrom = undefined
    nodeTo = undefined
    parentNodeTo = undefined
  }
}

export function modifyNodesByDeep(nodes: any, deep: string, value: any[]) {
  if (deep === "root") {
    nodes.splice(0, nodes.length)
    nodes.push(...value)
  } else {
    const path = "[" + deep.replace(/_/g, "].nodes[") + "]"
    const _ = new Function("nodes", `return nodes${path}`)
    const nodesDeep = _(nodes)

    nodesDeep.nodes = value
  }
}

export function getParentNodeByDeep(nodes: any, deep: string) {
  if (deep.split("_").length > 1) {
    const path = "[" + deep.slice(0, -2).replace(/_/g, "].nodes[") + "]"
    const _ = new Function("nodes", `return nodes${path}`)
    return _(nodes)
  } else {
    return {
      deep: "root",
      nodes
    }
  }
}

export function getNextSiblingNodeByDeep(nodes: any, deep: string) {
  const nextSibling = Number(deep.slice(deep.length - 1)) + 1

  const path =
    "[" +
    deep
      .slice(0, -2)
      .concat("_" + nextSibling)
      .replace(/_/g, "].nodes[") +
    "]"
  const _ = new Function("nodes", `return nodes${path}`)
  return _(nodes)
}

export function getPreviousSiblingNodeByDeep(nodes: any, deep: string) {
  const previousSibling = Number(deep.slice(deep.length - 1)) - 1

  const path =
    "[" +
    deep
      .slice(0, -2)
      .concat("_" + previousSibling)
      .replace(/_/g, "].nodes[") +
    "]"
  const _ = new Function("nodes", `return nodes${path}`)
  return _(nodes)
}

export function getNodeByDeep(nodes: any, deep: string) {
  if (deep === "root") {
    return {
      deep: "root",
      nodes
    }
  } else {
    const path = "[" + deep.replace(/_/g, "].nodes[") + "]"
    const _ = new Function("nodes", `return nodes${path}`)
    return _(nodes)
  }
}

export function hasNodeByDeep(nodes: any, deep: string) {
  const path = "[" + deep.replace(/_/g, "].nodes[") + "]"
  const _ = new Function("nodes", `return nodes${path}`)
  return _(nodes) !== undefined
}
