import { INodeWorker, TCursorOptions } from "@/nodes/global/node.types"
import { RenderNode } from "@/nodes/global/render-node"

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
  parentTransform: {
    x: number
    y: number
    scaleX: number
    scaleY: number
    rotation: number
  } = {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0
  },
  mouseCoords: { x: number; y: number }
): TCursorOptions => {
  let cursor: TCursorOptions = "default"

  for (let index = nodes.length - 1; index >= 0; index--) {
    const node = nodes[index]

    if (node.options) {
      const globalTransform = RenderNode.calculateTransforms(
        {
          x: node.options.calculate.translate.x,
          y: node.options.calculate.translate.y,
          scaleX: node.options.calculate.scale.x,
          scaleY: node.options.calculate.scale.y,
          rotation: node.options.calculate.rotation
        },
        parentTransform
      )

      if (
        intersectionNodeWithCursor({
          zoom: 1,
          pan: {
            x: 0,
            y: 0
          },
          node: {
            x: globalTransform.x,
            y: globalTransform.y,
            width: node.options.width,
            height: node.options.height,
            scaleX: globalTransform.scaleX,
            scaleY: globalTransform.scaleY,
            rotation: globalTransform.rotation
          },
          mouseCoords
        })
      ) {
        cursor =
          node.options.cursor === "default" ? "move" : node.options.cursor

        break
      } else {
        cursor = cursorNode(node.nodes, globalTransform, mouseCoords)
      }
    }
  }

  return cursor
}

const selectNode = (
  nodes: INodeWorker[],
  parentTransform: {
    x: number
    y: number
    scaleX: number
    scaleY: number
    rotation: number
  } = {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0
  },
  mouseCoords: { x: number; y: number }
): any => {
  let result:
    | {
        node: INodeWorker
        transform: {
          x: number
          y: number
          scaleX: number
          scaleY: number
          rotation: number
        }
      }
    | undefined = undefined

  for (let index = nodes.length - 1; index >= 0; index--) {
    const node = nodes[index]

    if (node.options) {
      const globalTransform = RenderNode.calculateTransforms(
        {
          x: node.options.calculate.translate.x,
          y: node.options.calculate.translate.y,
          scaleX: node.options.calculate.scale.x,
          scaleY: node.options.calculate.scale.y,
          rotation: node.options.calculate.rotation
        },
        parentTransform
      )

      if (
        intersectionNodeWithCursor({
          zoom: 1,
          pan: {
            x: 0,
            y: 0
          },
          node: {
            x: globalTransform.x,
            y: globalTransform.y,
            width: node.options.width,
            height: node.options.height,
            scaleX: globalTransform.scaleX,
            scaleY: globalTransform.scaleY,
            rotation: globalTransform.rotation
          },
          mouseCoords
        })
      ) {
        if (node.options.lock) {
          break
        }

        result = {
          transform: globalTransform,
          node
        }

        break
      } else {
        result = selectNode(node.nodes, globalTransform, mouseCoords)
      }
    }
  }

  return result
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
