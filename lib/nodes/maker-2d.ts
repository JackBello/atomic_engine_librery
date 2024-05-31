import { TExportNode, TOptionalNodes } from "./nodes.types"
import {
  MethodSetAttributes,
  MethodSetIndex,
  MethodSetNodes,
  MethodSetParent,
  MethodSetUUID
} from "./symbols"
import { GlobalNode } from "./@global/node"
import { Node2D } from "./2D/node"
import { Scene2D } from "./2D/scene"
import { Rectangle2D } from "./2D/shapes/rectangle"
import { Selection2D } from "./2D/edition/selection"
import { LineFlowEffect2D } from "./2D/effects/line-flow-effect"
import { Text2D } from "./2D/interface/text"
import { ControlEdition2D } from "./2D/edition/control-edition"

const allNodes: Record<string, any> = {
  GlobalNode,
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
    const abstract: GlobalNode = new allNodes[node.type](node.options)

    if (parent) abstract[MethodSetParent](parent)

    abstract.script = node.script
    abstract[MethodSetUUID](node.uuid)
    abstract[MethodSetIndex](node.index)
    abstract[MethodSetAttributes](node.attributes)

    if (node.hierarchy === "children")
      abstract[MethodSetNodes](
        makerNodes2D(
          (node as TExportNode<any> & TOptionalNodes<"children">).nodes,
          abstract
        )
      )

    nodesInstance.push(abstract)
  }

  return nodesInstance
}
