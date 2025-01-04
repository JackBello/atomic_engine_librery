import type { TAddonTuple, TExportNode } from "../types";
import type { GlobalNode } from "../global-node";
import type { TAnything, TClass } from "@/app/types";
import { ResourceImage } from "../../../app/services/resources/image.resource"

import {
	NodeSetHandlerAttributes,
	NodeSetHandlerMetaKeys,
	NodeSetHandlerNodes,
	NodeSetId,
	NodeSetIndex,
	NodeSetParent,
} from "../../symbols";
import type { TExportResource } from "@/app/services/types";
import { SetID } from "@/app/symbols";
import { ResourceSpriteSheet } from "@/app/services/resources/sprite-sheet.resource";

export class ConstructorNodes {
	private static helpers: Map<string, TClass<TAnything>> = new Map()
	private static nodesTypes: Map<string, TClass<GlobalNode>> = new Map();
	private static reserveHelpers = ["Vector2", "Vector3", "Vector4", "Transform2D", "Transform3D", "Matrix2D", "Matrix3D"]
	private static reserveNodes = ["GlobalNode", "CanvasNode", "Node2D", "Rectangle2D", "Circle2D", "Text2D", "Selection2D", "ControlEdition2D", "LineFlowEffect2D"];

	static addHelper(name: string, construct: TClass<TAnything>) {
		if (ConstructorNodes.reserveHelpers.includes(name)) {
			throw new Error(
				`You can't add this helper '${name}' because it is already part of the engine `,
			);
		}

		ConstructorNodes.helpers.set(name, construct);
	}

	static addHelpers(helpers: Record<string, TClass<TAnything>>) {
		for (const name in helpers) {
			if (ConstructorNodes.helpers.has(name)) continue;

			ConstructorNodes.helpers.set(name, helpers[name]);
		}
	}

	static getHelper(name: string) {
		return ConstructorNodes.helpers.get(name);
	}

	static getHelpers() {
		return Object.fromEntries(ConstructorNodes.helpers);
	}

	static hasHelper(name: string) {
		return ConstructorNodes.helpers.has(name);
	}

	static deleteHelper(name: string) {
		if (ConstructorNodes.reserveHelpers.includes(name)) {
			throw new Error(
				`You can't delete this helper '${name}' because it is already part of the engine `,
			);
		}

		ConstructorNodes.helpers.delete(name);
	}


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

	public async makeNode(node: TExportNode<TAnything>): Promise<GlobalNode> {
		const construct = ConstructorNodes.nodesTypes.get(node.type);

		if (!construct) {
			throw Error(`this is constructor not found ${node.type}`);
		}

		const addons = await this.makeAddons(node.addons)

		const instance = new construct(node.slug, node.options);

		await this.applyAddons(addons, instance)

		instance.wrap = node.wrap

		instance[NodeSetIndex](node.index);
		instance[NodeSetId](node.id);

		if (node.script && node.script !== "NULL") {
			instance.$script.defineScript(node.script);
		}

		instance.$attributes[NodeSetHandlerAttributes](node.attributes);
		instance.$metaKeys[NodeSetHandlerMetaKeys](node.metaKeys);

		if (node.nodes.length > 0) {
			instance.$nodes[NodeSetHandlerNodes](
				await this.makeNodes(node.nodes, instance),
			);
		}

		return instance;
	}

	public async makeNodes(
		nodes: TExportNode<TAnything>[],
		parent?: GlobalNode,
	): Promise<GlobalNode[]> {
		const instances: GlobalNode[] = [];

		for (const node of nodes) {
			const construct = ConstructorNodes.nodesTypes.get(node.type);

			if (!construct) {
				throw Error(`this is constructor not found ${node.type}`);
			}

			const addons = await this.makeAddons(node.addons)

			const instance = new construct(node.slug, node.options);

			await this.applyAddons(addons, instance)

			if (parent) instance[NodeSetParent](parent);

			instance.wrap = node.wrap

			instance[NodeSetIndex](node.index);
			instance[NodeSetId](node.id);

			if (node.script && node.script !== "NULL") {
				instance.$script.defineScript(node.script);
			}

			instance.$attributes[NodeSetHandlerAttributes](node.attributes);
			instance.$metaKeys[NodeSetHandlerMetaKeys](node.metaKeys);

			if (node.nodes.length > 0) {
				instance.$nodes[NodeSetHandlerNodes](
					await this.makeNodes(node.nodes, instance),
				);
			}

			instances.push(instance);
		}

		return instances;
	}

	protected async applyAddons(addons: Map<string, TAnything>, node: GlobalNode) {
		if (addons.size === 0) return

		if (node.NODE_NAME === "Image2D" && addons.has("resource/ResourceImage")) {
			node.changeResource(addons.get("resource/ResourceImage"))
		}

		if (node.NODE_NAME === "Sprite2D" && addons.has("resource/ResourceSpriteSheet")) {
			node.changeResource(addons.get("resource/ResourceSpriteSheet"))
		}
	}

	protected async makeAddons(addons: TAddonTuple[]) {
		const map = new Map()

		if (addons.length === 0) return map

		for (const [name, addon] of addons) {
			if (addon.type === "resource" && addon.name_class === "ResourceImage") {
				const structure: TExportResource = addon

				const resource = new ResourceImage(structure.slug, structure.options)

				resource[SetID](structure.id)

				await resource.load()

				map.set(name, resource)
			}

			if (addon.type === "resource" && addon.name_class === "ResourceSpriteSheet") {
				const structure: TExportResource = addon

				const resource = new ResourceSpriteSheet(structure.slug, structure.options)

				resource[SetID](structure.id)

				await resource.load()

				map.set(name, resource)
			}
		}

		return map
	}
}
