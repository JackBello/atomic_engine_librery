import type { TAddonTuple, TConstructorClass, TExportComponent, TExportNode } from "../types";
import type { GlobalNode } from "../global-node";
import type { TAnything, TClass } from "@/app/types";

import {
	NodePropHandlerComponents,
	NodeSetHandlerAttributes,
	NodeSetHandlerMetaKeys,
	NodeSetHandlerNodes,
	NodeSetId,
	NodeSetIndex,
	NodeSetParent,
} from "../../symbols";
import type { TExportResource } from "@/app/services/types";
import { SetID, SetOptions } from "@/app/symbols";
import type { ComponentNode } from "@/nodes/global/class/component-node";
import type { Resource } from "@/app/services/resources/resource";

export class ConstructorNodes {
	private static names: Record<TConstructorClass, string> = {
		components: "components",
		math: "math",
		nodes: "nodes",
		resources: "resources"
	}

	private static classes: {
		math: Map<string, TClass<TAnything>>
		nodes: Map<string, TClass<GlobalNode>>
		resources: Map<string, TClass<Resource>>
		components: Map<string, TClass<ComponentNode>>
	} = {
			math: new Map(),
			nodes: new Map(),
			resources: new Map(),
			components: new Map()
		}

	private static reserve = {
		math: ["Vector2", "Vector3", "Vector4", "Transform2D", "Transform3D", "Matrix2D", "Matrix3D"],
		nodes: ["GlobalNode", "CanvasNode", "Node2D", "Image2D", "Sprite2D", "Rectangle2D", "Circle2D", "Text2D", "Selection2D", "ControlEdition2D", "LineFlowEffect2D"],
		resources: ["Resource", "ResourceImage", "ResourceSpriteSheet"],
		components: ["ComponentNode", ""],
	}

	static add(type: TConstructorClass, name: string, construct: TClass<TAnything>) {
		if (ConstructorNodes.reserve[type].includes(name) && ConstructorNodes.has(type, name))
			throw new Error(
				`You can't add this ${ConstructorNodes.names[type]} '${name}' because it is already part of the engine`,
			);

		ConstructorNodes.classes[type].set(name, construct)
	}

	static multiple(type: TConstructorClass, constructs: Record<string, TClass<TAnything>>) {
		for (const name in constructs) {
			ConstructorNodes.add(type, name, constructs[name])
		}
	}

	static get(type: TConstructorClass, name: string) {
		return ConstructorNodes.classes[type].get(name)
	}

	static getAll(type: TConstructorClass) {
		return Object.fromEntries(ConstructorNodes.classes[type]);
	}

	static has(type: TConstructorClass, name: string) {
		return ConstructorNodes.classes[type].has(name)
	}

	static delete(type: TConstructorClass, name: string) {
		if (ConstructorNodes.reserve[type].includes(name))
			throw new Error(
				`You can't delete this ${ConstructorNodes.names[type]} '${name}' because it is already part of the engine`,
			);

		ConstructorNodes.classes[type].delete(name)
	}

	static defineProperty(type: TConstructorClass, name: string, property: string | symbol, value?: TAnything, options: {
		writable: boolean,
		enumerable: boolean,
		configurable: boolean,
	} = {
			configurable: false,
			writable: true,
			enumerable: true
		}) {
		const abstract = ConstructorNodes.classes[type].get(name)

		if (!abstract) return false

		return Reflect.defineProperty(abstract.prototype, property, {
			value,
			...options
		})
	}

	static async makeNode(node: TExportNode<TAnything>): Promise<GlobalNode> {
		const construct = ConstructorNodes.classes.nodes.get(node.type);

		if (!construct) {
			throw Error(`this is constructor not found ${node.type}`);
		}

		const addons = await ConstructorNodes.makeAddons(node.addons);

		const instance = new construct(node.slug, node.options);

		ConstructorNodes.applyComponents(node.components, instance);

		await ConstructorNodes.applyAddons(addons, instance)

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
				await ConstructorNodes.makeNodes(node.nodes, instance),
			);
		}

		return instance;
	}

	static async makeNodes(
		nodes: TExportNode<TAnything>[],
		parent?: GlobalNode,
	): Promise<GlobalNode[]> {
		const instances: GlobalNode[] = [];

		for (const node of nodes) {
			const construct = ConstructorNodes.classes.nodes.get(node.type);

			if (!construct) {
				throw Error(`this is constructor not found ${node.type}`);
			}

			const addons = await ConstructorNodes.makeAddons(node.addons)

			const instance = new construct(node.slug, node.options);

			ConstructorNodes.applyComponents(node.components, instance);

			await ConstructorNodes.applyAddons(addons, instance)

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
					await ConstructorNodes.makeNodes(node.nodes, instance),
				);
			}

			instances.push(instance);
		}

		return instances;
	}

	protected static async applyAddons(addons: Map<string, TAnything>, node: GlobalNode) {
		if (addons.size === 0) return

		for (const [_, addon] of addons) {
			if (['Image2D', 'Sprite2D'].includes(node.NODE_NAME) && addon.CATEGORY === "resource" && addon.HIERARCHY === "resource/image") {
				node.changeResource(addon)
			}
		}
	}

	protected static async makeAddons(addons: TAddonTuple[]) {
		const map = new Map()

		if (!addons) return map

		if (addons.length === 0) return map

		for (const [name, addon] of addons) {
			if (addon.category === "resource") {
				const structure = addon as TExportResource

				const construct = ConstructorNodes.classes.resources.get(structure.type);

				if (!construct) {
					throw Error(`this is constructor not found ${structure.type}`);
				}

				const instance = new construct(structure.slug, structure.options)

				instance[SetID](structure.id)

				await instance.load()

				map.set(name, instance)
			}
		}

		return map
	}

	protected static applyComponents(components: TExportComponent[], node: GlobalNode) {
		const map = new Map()

		if (!components) return

		if (components.length === 0) return

		for (const component of components) {
			const construct = ConstructorNodes.classes.components.get(component.type)

			if (!construct) {
				throw Error(`this is constructor not found ${component.type}`);
			}

			const instance = new construct(node)

			instance[SetOptions](component.name, component.description, component.options);

			instance.init()

			map.set(instance.name, instance)
		}

		node.$components[NodePropHandlerComponents] = map
	}

	async make() {

	}

	async makeMultiple() {

	}
}
