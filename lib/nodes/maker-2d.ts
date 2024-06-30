import { TExportNode } from "./nodes.types"
import {
  MethodSetAttributes,
  MethodSetIndex,
  MethodSetNodes,
  MethodSetParent,
  MethodSetUUID
} from "./symbols"
import { PrimitiveNode } from "./@global/primitive-node"
import { Node2D } from "./context/2d/class/2D/node"
import { Scene2D } from "./context/2d/class/2D/scene"
import { Rectangle2D } from "./context/2d/class/2D/shapes/rectangle"
import { Selection2D } from "./context/2d/class/2D/edition/selection"
import { LineFlowEffect2D } from "./context/2d/class/2D/effects/line-flow-effect"
import { Text2D } from "./context/2d/class/2D/window-ui/text"
import { ControlEdition2D } from "./context/2d/class/2D/edition/control-edition"

const allNodes: Record<string, any> = {
  PrimitiveNode,
  Node2D,
  Scene2D,
  Rectangle2D,
  Selection2D,
  LineFlowEffect2D,
  Text2D,
  ControlEdition2D
}

export const makerNodes2D = (
  nodes: TExportNode<any>[],
  parent?: any
): any[] => {
  const nodesInstance = []

  for (const node of nodes) {
    const abstract: PrimitiveNode = new allNodes[node.type](node.options)

    if (parent) abstract[MethodSetParent](parent)

    abstract.script = node.script
    abstract[MethodSetUUID](node.uuid)
    abstract[MethodSetIndex](node.index)
    abstract[MethodSetAttributes](node.attributes)

    abstract[MethodSetNodes](
      makerNodes2D((node as TExportNode<any>).nodes, abstract)
    )

    nodesInstance.push(abstract)
  }

  return nodesInstance
}
