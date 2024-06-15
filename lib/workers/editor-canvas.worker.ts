import { INodeWorker, TCursorOptions } from "@/nodes/nodes.types"

let root: INodeWorker[] = []

function intersectionNodeWithCursor({
  zoom,
  pan,
  node,
  mouseCoords
}: {
  zoom: number
  pan: { x: number; y: number }
  node: {
    x: number
    y: number
    scaleX: number
    scaleY: number
    width: number
    height: number
    rotation: number
  }
  mouseCoords: { x: number; y: number }
}) {
  const X = node.x - (node.width * node.scaleX) / 2
  const Y = node.y - (node.height * node.scaleY) / 2
  const WIDTH = node.width * node.scaleX
  const HEIGHT = node.height * node.scaleY

  const mouseX = (mouseCoords.x - pan.x) / zoom
  const mouseY = (mouseCoords.y - pan.y) / zoom

  const rotatedMouseX =
    (mouseX - node.x) * Math.cos((-node.rotation * Math.PI) / 180) -
    (mouseY - node.y) * Math.sin((-node.rotation * Math.PI) / 180) +
    node.x
  const rotatedMouseY =
    (mouseX - node.x) * Math.sin((-node.rotation * Math.PI) / 180) +
    (mouseY - node.y) * Math.cos((-node.rotation * Math.PI) / 180) +
    node.y

  return (
    rotatedMouseX >= X &&
    rotatedMouseX <= X + WIDTH &&
    rotatedMouseY >= Y &&
    rotatedMouseY <= Y + HEIGHT
  )
}

const cursorNode = (
  nodes: INodeWorker[],
  parent: INodeWorker | undefined,
  mouseCoords: { x: number; y: number }
): TCursorOptions => {
  let cursor: TCursorOptions = "default"

  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index]

    const coordsParent = parent
      ? {
          x:
            parent.options?.x +
            (parent.options?.width * parent.options?.scaleX) / 2,
          y:
            parent.options?.y +
            (parent.options?.height * parent.options?.scaleY) / 2,
          scaleX: parent.options?.scaleX,
          scaleY: parent.options?.scaleY
        }
      : {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1
        }

    if (
      node.options &&
      intersectionNodeWithCursor({
        zoom: 1,
        pan: {
          x: 0,
          y: 0
        },
        node: {
          x: node.options.x + coordsParent.x,
          y: node.options.y + coordsParent.y,
          width: node.options.width,
          height: node.options.height,
          scaleX: node.options.scaleX * coordsParent.scaleX,
          scaleY: node.options.scaleY * coordsParent.scaleY,
          rotation: node.options.rotation
        },
        mouseCoords
      })
    ) {
      cursor = "move"

      break
    } else {
      cursor = cursorNode(node.nodes, node, mouseCoords)
    }
  }

  return cursor
}

const selectNode = (
  nodes: INodeWorker[],
  parent: INodeWorker | undefined,
  mouseCoords: { x: number; y: number }
) => {
  let select: INodeWorker | undefined
  let minDistance = Number.MAX_VALUE

  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index]

    const coordsParent = parent
      ? {
          x:
            parent.options?.x +
            (parent.options?.width * parent.options?.scaleX) / 2,
          y:
            parent.options?.y +
            (parent.options?.height * parent.options?.scaleY) / 2,
          scaleX: parent.options?.scaleX,
          scaleY: parent.options?.scaleY
        }
      : {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1
        }

    if (
      node.options &&
      intersectionNodeWithCursor({
        zoom: 1,
        pan: {
          x: 0,
          y: 0
        },
        node: {
          x: node.options.x + coordsParent.x,
          y: node.options.y + coordsParent.y,
          width: node.options.width,
          height: node.options.height,
          scaleX: node.options.scaleX * coordsParent.scaleX,
          scaleY: node.options.scaleY * coordsParent.scaleY,
          rotation: node.options.rotation
        },
        mouseCoords
      })
    ) {
      const centerX = node.options.x + node.options.width / 2
      const centerY = node.options.y + node.options.height / 2

      let distance = Math.sqrt(
        Math.pow(mouseCoords.x - centerX, 2) +
          Math.pow(mouseCoords.y - centerY, 2)
      )

      if (distance < minDistance) {
        minDistance = distance
      }

      select = node

      break
    } else {
      select = selectNode(node.nodes, node, mouseCoords)
    }
  }

  return select
}

self.onmessage = function (event) {
  if (event.data.action === "set:root") {
    root = event.data.root
  } else if (event.data.action === "select:node") {
    if (root.length === 0) return

    const nodes = root[0].nodes
    const mouseCoords = event.data.mouseCoords
    const result = selectNode(nodes, undefined, mouseCoords)

    self.postMessage({
      type: "select:node",
      result
    })
  } else if (event.data.action === "cursor:node") {
    if (root.length === 0) return

    const nodes = root[0].nodes
    const mouseCoords = event.data.mouseCoords
    const result = cursorNode(nodes, undefined, mouseCoords)

    self.postMessage({
      type: "cursor:node",
      result
    })
  }
}
