import type { TExportNode } from "../node.types";
import type { GlobalNode } from "../global-node";
import type { TAnything, TClass } from "@/types";

import {
	MethodSetAttributes,
	MethodSetIndex,
	MethodSetNodes,
	MethodSetParent,
	MethodSetId,
	MethodSetMetaKeys,
	AddNodeToConstructorNode,
	AddNodesToConstructorNode,
	GetNodeToConstructorNode,
	GetNodesToConstructorNode,
} from "../../symbols";

export default class ConstructorNodes {
	private static nodesTypes: Map<string, TClass<GlobalNode>> = new Map();

	static [AddNodeToConstructorNode](
		name: string,
		construct: TClass<GlobalNode>,
	) {
		ConstructorNodes.nodesTypes.set(name, construct);
	}

	static [AddNodesToConstructorNode](
		nodes: Record<string, TClass<GlobalNode>>,
	) {
		for (const name of Object.keys(nodes)) {
			if (ConstructorNodes.nodesTypes.has(name)) continue;

			ConstructorNodes.nodesTypes.set(name, nodes[name]);
		}
	}

	static [GetNodeToConstructorNode](name: string) {
		return ConstructorNodes.nodesTypes.get(name);
	}

	static [GetNodesToConstructorNode]() {
		return Object.fromEntries(ConstructorNodes.nodesTypes.entries()); 
	}

	public makeNode(node: TExportNode<TAnything>): GlobalNode {
		const construct = ConstructorNodes.nodesTypes.get(node.type);

		if (!construct) throw Error(`this is constructor not found ${node.type}`);

		const abstract = new construct(node.slug, node.options);

		abstract.script = node.script;

		abstract[MethodSetIndex](node.index);
		abstract[MethodSetId](node.id);

		abstract.$attributes[MethodSetAttributes](node.attributes);
		abstract.$metaKeys[MethodSetMetaKeys](node.metaKeys);

		if (node.nodes.length > 0)
			abstract.$nodes[MethodSetNodes](this.makeNodes(node.nodes, abstract));

		return abstract;
	}

	public makeNodes(
		nodes: TExportNode<TAnything>[],
		parent?: GlobalNode,
	): GlobalNode[] {
		const instances: GlobalNode[] = [];

		for (const node of nodes) {
			const construct = ConstructorNodes.nodesTypes.get(node.type);

			if (!construct) throw Error(`this is constructor not found ${node.type}`);

			const abstract = new construct(node.slug, node.options);

			if (parent) abstract[MethodSetParent](parent);

			abstract.script = node.script;

			abstract[MethodSetIndex](node.index);
			abstract[MethodSetId](node.id);

			abstract.$attributes[MethodSetAttributes](node.attributes);
			abstract.$metaKeys[MethodSetMetaKeys](node.metaKeys);

			if (node.nodes.length > 0)
				abstract.$nodes[MethodSetNodes](this.makeNodes(node.nodes, abstract));

			instances.push(abstract);
		}

		return instances;
	}
}
