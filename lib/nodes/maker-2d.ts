import { TExportNode } from "./nodes.types"
import {
  MethodSetAttributes,
  MethodSetIndex,
  MethodSetNodes,
  MethodSetParent,
  MethodSetUUID
} from "./symbols"
import { PrimitiveNode } from "./@global/primitive-node"
import { Node2D } from "./2D/2d/node"
import { Scene2D } from "./2D/2d/scene"
import { Rectangle2D } from "./2D/2d/shapes/rectangle"
import { Selection2D } from "./2D/2d/edition/selection"
import { LineFlowEffect2D } from "./2D/2d/effects/line-flow-effect"
import { Text2D } from "./2D/2d/interface/text"
import { ControlEdition2D } from "./2D/2d/edition/control-edition"

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
