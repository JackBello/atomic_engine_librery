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

  for (let index = nodes.length - 1; index >= 0; index--) {
    const node = nodes[index]

    const coordsParent = parent
      ? {
          x: parent.options?.x,
          y: parent.options?.y,
          scaleX: parent.options?.scaleX,
          scaleY: parent.options?.scaleY,
          rotation: parent.options?.rotation
        }
      : {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          rotation: 0
        }

    const globalX = node.options?.x * coordsParent.scaleX + coordsParent.x
    const globalY = node.options?.y * coordsParent.scaleY + coordsParent.y
    const globalScaleX = node.options?.scaleX * coordsParent.scaleX
    const globalScaleY = node.options?.scaleY * coordsParent.scaleY
    const globalRotation = node.options?.rotation + coordsParent.rotation

    if (
      node.options &&
      intersectionNodeWithCursor({
        zoom: 1,
        pan: {
          x: 0,
          y: 0
        },
        node: {
          x: globalX,
          y: globalY,
          width: node.options.width,
          height: node.options.height,
          scaleX: globalScaleX,
          scaleY: globalScaleY,
          rotation: globalRotation
        },
        mouseCoords
      })
    ) {
      cursor = node.options.cursor === "default" ? "move" : node.options.cursor

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

  for (let index = nodes.length - 1; index >= 0; index--) {
    const node = nodes[index]

    const coordsParent = parent
      ? {
          x: parent.options?.x,
          y: parent.options?.y,
          scaleX: parent.options?.scaleX,
          scaleY: parent.options?.scaleY,
          rotation: parent.options?.rotation
        }
      : {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          rotation: 0
        }

    const globalX = node.options?.x * coordsParent.scaleX + coordsParent.x
    const globalY = node.options?.y * coordsParent.scaleY + coordsParent.y
    const globalScaleX = node.options?.scaleX * coordsParent.scaleX
    const globalScaleY = node.options?.scaleY * coordsParent.scaleY
    const globalRotation = node.options?.rotation + coordsParent.rotation

    if (
      node.options &&
      intersectionNodeWithCursor({
        zoom: 1,
        pan: {
          x: 0,
          y: 0
        },
        node: {
          x: globalX,
          y: globalY,
          width: node.options.width,
          height: node.options.height,
          scaleX: globalScaleX,
          scaleY: globalScaleY,
          rotation: globalRotation
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

      if (node.options.lock) {
        break
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
