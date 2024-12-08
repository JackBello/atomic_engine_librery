import type { TExportNode } from "../types";
import type { GlobalNode } from "../global-node";
import type { TAnything, TClass } from "@/app/types";

import {
	NodeSetHandlerAttributes,
	NodeSetHandlerMetaKeys,
	NodeSetHandlerNodes,
	NodeSetId,
	NodeSetIndex,
	NodeSetParent,
} from "../../symbols";

export class ConstructorNodes {
	private static nodesTypes: Map<string, TClass<GlobalNode>> = new Map();
	private static reserveNodes = [""];

	static addNode(name: string, construct: TClass<GlobalNode>) {
		if (ConstructorNodes.reserveNodes.includes(name)) {
			throw new Error(
				`You can't add this node '${name}' because it is already part of the engine `,
			);
		}

		ConstructorNodes.nodesTypes.set(name, construct);
	}

	static addNodes(nodes: Record<string, TClass<GlobalNode>>) {
		for (const name in nodes) {
			if (ConstructorNodes.nodesTypes.has(name)) continue;

			ConstructorNodes.nodesTypes.set(name, nodes[name]);
		}
	}

	static getNode(name: string) {
		return ConstructorNodes.nodesTypes.get(name);
	}

	static getNodes() {
		return Object.fromEntries(ConstructorNodes.nodesTypes);
	}

	static hasNode(name: string) {
		return ConstructorNodes.nodesTypes.has(name);
	}

	static deleteNode(name: string) {
		if (ConstructorNodes.reserveNodes.includes(name)) {
			throw new Error(
				`You can't delete this node '${name}' because it is already part of the engine `,
			);
		}

		ConstructorNodes.nodesTypes.delete(name);
	}

	static defineProperty(name: string, property: string | symbol, value?: TAnything, options: {
		writable: boolean,
		enumerable: boolean,
		configurable: boolean,
	} = {
			configurable: false,
			writable: true,
			enumerable: true
		}) {
		const node = ConstructorNodes.getNode(name)

		if (!node) return false

		return Reflect.defineProperty(node.prototype, property, {
			value,
			...options
		})
	}

	public makeNode(node: TExportNode<TAnything>): GlobalNode {
		const construct = ConstructorNodes.nodesTypes.get(node.type);

		if (!construct) {
			throw Error(`this is constructor not found ${node.type}`);
		}

		const instance = new construct(node.slug, node.options);

		instance[NodeSetIndex](node.index);
		instance[NodeSetId](node.id);

		if (node.script && node.script !== "NULL") {
			instance.$script.defineScript(node.script);
		}

		instance.$attributes[NodeSetHandlerAttributes](node.attributes);
		instance.$metaKeys[NodeSetHandlerMetaKeys](node.metaKeys);

		if (node.nodes.length > 0) {
			instance.$nodes[NodeSetHandlerNodes](
				this.makeNodes(node.nodes, instance),
			);
		}

		return instance;
	}

	public makeNodes(
		nodes: TExportNode<TAnything>[],
		parent?: GlobalNode,
	): GlobalNode[] {
		const instances: GlobalNode[] = [];

		for (const node of nodes) {
			const construct = ConstructorNodes.nodesTypes.get(node.type);

			if (!construct) {
				throw Error(`this is constructor not found ${node.type}`);
			}

			const instance = new construct(node.slug, node.options);

			if (parent) instance[NodeSetParent](parent);

			instance[NodeSetIndex](node.index);
			instance[NodeSetId](node.id);

			if (node.script && node.script !== "NULL") {
				instance.$script.defineScript(node.script);
			}

			instance.$attributes[NodeSetHandlerAttributes](node.attributes);
			instance.$metaKeys[NodeSetHandlerMetaKeys](node.metaKeys);

			if (node.nodes.length > 0) {
				instance.$nodes[NodeSetHandlerNodes](
					this.makeNodes(node.nodes, instance),
				);
			}

			instances.push(instance);
		}

		return instances;
	}
}
