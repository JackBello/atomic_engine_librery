import { TExportNode } from "./node.types"
import {
  MethodSetAttributes,
  MethodSetIndex,
  MethodSetNodes,
  MethodSetParent,
  MethodSetId,
  MethodSetMetaKeys
} from "../symbols"
import { GlobalNode } from "./global-node"
import { Node2D } from "../class/2D/node"
import { Scene } from "./scene"
import { Rectangle2D } from "../class/2D/shapes/rectangle"
import { Selection2D } from "../class/2D/edition/selection"
import { LineFlowEffect2D } from "../class/2D/effects/line-flow-effect"
import { Text2D } from "../class/2D/window-ui/text"
import { ControlEdition2D } from "../class/2D/edition/control-edition"
import { Collision2D } from "../class/2D/collision"
import { CollisionShape2D } from "../class/2D/collision-shape"

const allNodes: Record<string, any> = {
  GlobalNode: GlobalNode,
  Scene: Scene,
  Node2D: Node2D,
  Rectangle2D: Rectangle2D,
  Selection2D: Selection2D,
  LineFlowEffect2D: LineFlowEffect2D,
  Text2D: Text2D,
  ControlEdition2D: ControlEdition2D,
  Collision2D: Collision2D,
  CollisionShape2D: CollisionShape2D
}

export const constructorNode = (node: TExportNode<any>): any => {
  const abstract: GlobalNode = new allNodes[node.type](node.slug, node.options)

  abstract.script = node.script

  abstract[MethodSetIndex](node.index)
  abstract[MethodSetId](node.id)

  abstract.$attributes[MethodSetAttributes](node.attributes)
  abstract.$metaKeys[MethodSetMetaKeys](node.metaKeys)

  if (node.nodes.length > 0)
    abstract.$nodes[MethodSetNodes](constructorNodes(node.nodes, abstract))

  return abstract
}

export const constructorNodes = (
  nodes: TExportNode<any>[],
  parent?: GlobalNode
): any[] => {
  const instances: GlobalNode[] = []

  for (const node of nodes) {
    const abstract: GlobalNode = new allNodes[node.type](
      node.slug,
      node.options
    )

    if (parent) abstract[MethodSetParent](parent)

    abstract.script = node.script

    abstract[MethodSetIndex](node.index)
    abstract[MethodSetId](node.id)

    abstract.$attributes[MethodSetAttributes](node.attributes)
    abstract.$metaKeys[MethodSetMetaKeys](node.metaKeys)

    if (node.nodes.length > 0)
      abstract.$nodes[MethodSetNodes](constructorNodes(node.nodes, abstract))

    instances.push(abstract)
  }

  return instances
}
