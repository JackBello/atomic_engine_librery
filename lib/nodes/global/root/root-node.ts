import type { TMode } from "../types";
import type { GlobalNode } from "../global-node";

import {
	NodePropHandlerNodes,
	NodeSetIndex,
	NodeSetParent,
} from "../../symbols";
import { $Scenes, _Collision, _Render, _Script, _Worker } from "@/app/symbols";
import type { EngineCore } from "@/app/engine";
import type { GameCore } from "@/app/game";
import { Vector2 } from "@/nodes/vectors/vector-2";
import type { TAnything } from "@/app/types";

export class RootNode {
	[key: string]: TAnything

	private $app: EngineCore | GameCore;

	get TOP() {
		return this.$app[$Scenes].currentScene;
	}

	constructor(app: EngineCore | GameCore) {
		this.$app = app;
	}

	private _nodes_(path: string) {
		return new Function("nodes", `return nodes${path}`);
	}

	private _updateNodes_(nodes: GlobalNode[]) {
		for (let index = 0; index < nodes.length; index++) {
			const node = nodes[index];

			node[NodeSetIndex](index);

			if (node.$nodes.size > 0) {
				this._updateNodes_(node.$nodes.all);
			}
		}
	}

	defineAction(name: string, func: (root: RootNode, ...args: TAnything[]) => TAnything) {
		this[name] = func.bind(this)
	}

	/**
	 * coord (x & y) is accumulate
	 * extend
	 *
	 * parent x & y, parent scaleX & Y
	 * child x & y, child scaleX & Y
	 *
	 * cX = pX + (pSX * cX)
	 * pSX = pSX * cSX
	 */
	static calculateRelativePosition(
		parent: {
			position: Vector2
			scale: Vector2
		},
		child: {
			position: Vector2
			scale: Vector2
		},
	) {
		return {
			position: Vector2.zero().add(parent.position).add(Vector2.multiply(parent.scale, child.position)),
			scale: Vector2.multiply(parent.scale, child.scale)
		};
	}

	static calculateTransforms(
		child: {
			position: Vector2
			scale: Vector2
			rotation: number;
			alpha: number;
		},
		parent: {
			position: Vector2
			scale: Vector2
			rotation: number;
			alpha: number;
		},
	) {
		return {
			position: Vector2.add(child.position, parent.position),
			scale: Vector2.multiply(child.scale, parent.scale),
			rotation: child.rotation + parent.rotation,
			alpha: child.alpha * parent.alpha
		};
	}

	static invertTransform(position: Vector2, scale: Vector2, rotation: number) {
		return {
			position: position.clone().negate().scale(scale.x || scale.y),
			scale: scale.clone().invert(),
			rotation: -rotation,
		};
	}

	static isNodeIntersect({
		node,
		intersectionPoint,
	}: {
		node: {
			position: Vector2
			scale: Vector2
			width: number;
			height: number;
			rotation: number;
			origin: [number, number]
		};
		intersectionPoint: [number, number];
	}) {
		const WIDTH = node.width * node.scale.x;
		const HEIGHT = node.height * node.scale.y;
		const X = node.position.x - node.origin[0];
		const Y = node.position.y - node.origin[1];

		const mouseX = intersectionPoint[0];
		const mouseY = intersectionPoint[1];

		return (
			mouseX >= X &&
			mouseX <= X + WIDTH &&
			mouseY >= Y &&
			mouseY <= Y + HEIGHT
		);
	}

	traverse(callback: (node: GlobalNode) => void) {
		if (!this.TOP) return;

		for (let index = 0; index < this.TOP.$nodes.all.length; index++) {
			const node = this.TOP.$nodes.all[index];

			callback(node);

			if (node.$nodes.size > 0) {
				this.traverse(callback);
			}
		}
	}

	replaceNode(from: string | number, value: GlobalNode, mode: TMode = "index") {
		const $node = this.getNode(from, mode);

		if ($node === undefined) return false;

		if (
			mode === "index" &&
			(Number(from) < 0 || Number(from) >= $node.$nodes.all.length)
		) {
			throw new Error("Indexes out ranges");
		}

		const $parent = this.getParentNode(from, mode);

		if ($parent === undefined) return false;

		value[NodeSetParent]($node.parent);
		value[NodeSetIndex]($node.index);

		$parent.$nodes[NodePropHandlerNodes][$node.index] = value;

		this._updateNodes_($parent.$nodes[NodePropHandlerNodes]);

		return true;
	}

	replaceNodeByPath(from: string, value: GlobalNode, mode: TMode = "index") {
		const $node = this.getNodeByPath(from, mode);

		if ($node === undefined) return false;

		const $parent = this.getParentNodeByPath(from, mode);

		if ($parent === undefined) return false;

		value[NodeSetParent]($node.parent);
		value[NodeSetIndex]($node.index);

		$parent.$nodes[NodePropHandlerNodes][$node.index] = value;

		this._updateNodes_($parent.$nodes[NodePropHandlerNodes]);

		return true;
	}

	moveNodeByPath(
		from: { search: string; mode: TMode },
		to: { search: string; mode: TMode },
		insert: "after" | "before" = "before",
	) {
		const $nodeFrom = this.getNodeByPath(from.search, from.mode);
		const $nodeTo = this.getNodeByPath(to.search, to.mode);

		if ($nodeFrom === undefined) return false;
		if ($nodeTo === undefined) return false;

		const $parentFrom = this.getParentNodeByPath(from.search, from.mode);
		const $parentTo = this.getParentNodeByPath(to.search, to.mode);

		if ($parentFrom === undefined) return false;
		if ($parentTo === undefined) return false;

		insert === "before"
			? $parentTo.$nodes[NodePropHandlerNodes].splice($nodeTo.index + 1, 0, {
				...$nodeFrom,
			} as GlobalNode)
			: $parentTo.$nodes[NodePropHandlerNodes].splice($nodeTo.index, 0, {
				...$nodeFrom,
			} as GlobalNode);

		$parentFrom.$nodes[NodePropHandlerNodes].splice($nodeFrom.index, 1);

		this._updateNodes_($parentFrom.$nodes[NodePropHandlerNodes]);
		this._updateNodes_($parentTo.$nodes[NodePropHandlerNodes]);

		return true;
	}

	moveNode(
		from: { search: string | number; mode: TMode },
		to: { search: string | number; mode: TMode },
		insert: "after" | "before" = "before",
	) {
		const $nodeFrom = this.getNode(from.search, from.mode);
		const $nodeTo = this.getNode(to.search, to.mode);

		if ($nodeFrom === undefined) return false;
		if ($nodeTo === undefined) return false;

		const $parentFrom = this.getParentNode(from.search, from.mode);
		const $parentTo = this.getParentNode(to.search, to.mode);

		if ($parentFrom === undefined) return false;
		if ($parentTo === undefined) return false;

		insert === "before"
			? $parentTo.$nodes[NodePropHandlerNodes].splice($nodeTo.index + 1, 0, {
				...$nodeFrom,
			} as GlobalNode)
			: $parentTo.$nodes[NodePropHandlerNodes].splice($nodeTo.index, 0, {
				...$nodeFrom,
			} as GlobalNode);

		$parentFrom.$nodes[NodePropHandlerNodes].splice($nodeFrom.index, 1);

		this._updateNodes_($parentFrom.$nodes[NodePropHandlerNodes]);
		this._updateNodes_($parentTo.$nodes[NodePropHandlerNodes]);

		return true;
	}

	clearNodesByPath(path: string, mode: TMode = "index") {
		if (mode === "id") return this.clearNodesByPathId(path);

		if (mode === "slug") return this.clearNodesByPathSlug(path);

		return this.clearNodesByPathIndex(path);
	}

	protected clearNodesByPathId(path: string) {
		const $node = this.getNodeByPathId(path);

		if ($node === undefined) return false;

		if ($node.$nodes.size === 0) return false;

		$node.$nodes[NodePropHandlerNodes] = [];

		return true;
	}

	protected clearNodesByPathSlug(path: string) {
		const $node = this.getNodeByPathSlug(path);

		if ($node === undefined) return false;

		if ($node.$nodes.size === 0) return false;

		$node.$nodes[NodePropHandlerNodes] = [];

		return true;
	}

	protected clearNodesByPathIndex(path: string) {
		const $node = this.getNodeByPathIndex(path);

		if ($node === undefined) return false;

		if ($node.$nodes.size === 0) return false;

		$node.$nodes[NodePropHandlerNodes] = [];

		return true;
	}

	clearNodes(location: string | number, mode: TMode = "index") {
		if (typeof location === "string" && mode === "id") {
			return this.clearNodesById(location);
		}
		if (typeof location === "string" && mode === "slug") {
			return this.clearNodesBySlug(location);
		}
		if (typeof location === "number" && mode === "index") {
			return this.clearNodesByIndex(location);
		}
		return false;
	}

	protected clearNodesById(location: string) {
		const $node = this.getNodeById(location);

		if ($node === undefined) return false;

		if ($node.$nodes.size === 0) return false;

		$node.$nodes[NodePropHandlerNodes] = [];

		return true;
	}

	protected clearNodesBySlug(location: string) {
		const $node = this.getNodeBySlug(location);

		if ($node === undefined) return false;

		if ($node.$nodes.size === 0) return false;

		$node.$nodes[NodePropHandlerNodes] = [];

		return true;
	}

	protected clearNodesByIndex(location: number) {
		const $node = this.getNodeByIndex(location);

		if ($node === undefined) return false;

		if ($node.$nodes.size === 0) return false;

		$node.$nodes[NodePropHandlerNodes] = [];

		return true;
	}

	getNodesByPath(path: string, mode: TMode = "index") {
		if (mode === "id") return this.getNodesByPathId(path);

		if (mode === "slug") return this.getNodesByPathSlug(path);

		return this.getNodesByPathIndex(path);
	}

	protected getNodesByPathId(path: string) {
		return this.getNodeByPathId(path)?.$nodes.all;
	}

	protected getNodesByPathSlug(path: string) {
		return this.getNodeByPathSlug(path)?.$nodes.all;
	}

	protected getNodesByPathIndex(path: string) {
		return this.getNodeByPathIndex(path)?.$nodes.all;
	}

	getNodes(location: string | number, mode: TMode = "index") {
		if (typeof location === "string" && mode === "id") {
			return this.getNodesById(location);
		}
		if (typeof location === "string" && mode === "slug") {
			return this.getNodesBySlug(location);
		}
		if (typeof location === "number" && mode === "index") {
			return this.getNodesByIndex(location);
		}
	}

	protected getNodesById(location: string) {
		return this.getNodeById(location)?.$nodes.all;
	}

	protected getNodesBySlug(location: string) {
		return this.getNodeBySlug(location)?.$nodes.all;
	}

	protected getNodesByIndex(location: number) {
		return this.getNodeByIndex(location)?.$nodes.all;
	}

	deleteNodeByPath(path: string, mode: TMode = "index") {
		const modes = {
			id: {
				child: this.getNodeByPathId.bind(this),
				parent: this.getParentNodeByPathId.bind(this),
			},
			index: {
				child: this.getNodeByPathIndex.bind(this),
				parent: this.getParentNodeByPathIndex.bind(this),
			},
			slug: {
				child: this.getNodeByPathSlug.bind(this),
				parent: this.getParentNodeByPathSlug.bind(this),
			},
		};

		const $node = modes[mode].child(path);

		if ($node === undefined) return false;

		const $parent = modes[mode].parent(path);

		if ($parent === undefined) return false;

		$parent.$nodes[NodePropHandlerNodes].splice($node.index, 1);

		this._updateNodes_($parent.$nodes[NodePropHandlerNodes]);

		this.$app[_Render].draw = true;

		return true;
	}

	deleteNode(location: string | number, mode: TMode = "index") {
		if (typeof location === "string" && mode === "id") {
			return this.deleteNodeById(location);
		}
		if (typeof location === "string" && mode === "slug") {
			return this.deleteNodeBySlug(location);
		}
		if (typeof location === "number" && mode === "index") {
			return this.deleteNodeByIndex(location);
		}
		return false;
	}

	protected deleteNodeById(location: string) {
		const $node = this.getNodeById(location);

		if ($node === undefined) return false;

		const $parent = this.getParentNodeById(location);

		if ($parent === undefined) return false;

		$parent.$nodes[NodePropHandlerNodes].splice($node.index, 1);

		this._updateNodes_($parent.$nodes[NodePropHandlerNodes]);

		return true;
	}

	protected deleteNodeBySlug(location: string) {
		const $node = this.getNodeBySlug(location);

		if ($node === undefined) return false;

		const $parent = this.getParentNodeBySlug(location);

		if ($parent === undefined) return false;

		$parent.$nodes[NodePropHandlerNodes].splice($node.index, 1);

		this._updateNodes_($parent.$nodes[NodePropHandlerNodes]);

		return true;
	}

	protected deleteNodeByIndex(location: number) {
		const $node = this.getNodeByIndex(location);

		if ($node === undefined) return false;

		const $parent = this.getParentNodeByIndex(location);

		if ($parent === undefined) return false;

		$parent.$nodes[NodePropHandlerNodes].splice($node.index, 1);

		this._updateNodes_($parent.$nodes[NodePropHandlerNodes]);

		return true;
	}

	addNodeByPath(
		path: string,
		value: GlobalNode,
		mode: TMode = "index",
		insert: "after" | "before" = "before",
	) {
		if (mode === "id") return this.addNodeByPathId(path, value, insert);

		if (mode === "slug") return this.addNodeByPathSlug(path, value, insert);

		return this.addNodeByPathIndex(path, value, insert);
	}

	protected addNodeByPathId(
		path: string,
		value: GlobalNode,
		insert: "after" | "before",
	) {
		const $node = this.getNodeByPathId(path);

		if ($node === undefined) return false;

		insert === "after"
			? $node.$nodes[NodePropHandlerNodes].unshift(value)
			: $node.$nodes[NodePropHandlerNodes].push(value);

		return true;
	}

	protected addNodeByPathSlug(
		path: string,
		value: GlobalNode,
		insert: "after" | "before",
	) {
		const $node = this.getNodeByPathSlug(path);

		if ($node === undefined) return false;

		insert === "after"
			? $node.$nodes[NodePropHandlerNodes].unshift(value)
			: $node.$nodes[NodePropHandlerNodes].push(value);

		return true;
	}

	protected addNodeByPathIndex(
		path: string,
		value: GlobalNode,
		insert: "after" | "before",
	) {
		const $node = this.getNodeByPathIndex(path);

		if ($node === undefined) return false;

		insert === "after"
			? $node.$nodes[NodePropHandlerNodes].unshift(value)
			: $node.$nodes[NodePropHandlerNodes].push(value);

		return true;
	}

	addNode(
		location: string,
		value: GlobalNode,
		mode: TMode,
		insert: "after" | "before" = "before",
	) {
		if (typeof location === "string" && mode === "id") {
			return this.addNodeById(location, value, insert);
		}
		if (typeof location === "string" && mode === "slug") {
			return this.addNodeBySlug(location, value, insert);
		}
		if (typeof location === "number" && mode === "index") {
			return this.addNodeByIndex(location, value, insert);
		}
		return false;
	}

	protected addNodeById(
		location: string,
		value: GlobalNode,
		insert: "after" | "before",
	) {
		const $node = this.getNodeById(location);

		if ($node === undefined) return false;

		insert === "after"
			? $node.$nodes[NodePropHandlerNodes].unshift(value)
			: $node.$nodes[NodePropHandlerNodes].push(value);

		return true;
	}

	protected addNodeBySlug(
		location: string,
		value: GlobalNode,
		insert: "after" | "before",
	) {
		const $node = this.getNodeBySlug(location);

		if ($node === undefined) return false;

		insert === "after"
			? $node.$nodes[NodePropHandlerNodes].unshift(value)
			: $node.$nodes[NodePropHandlerNodes].push(value);

		return true;
	}

	protected addNodeByIndex(
		location: number,
		value: GlobalNode,
		insert: "after" | "before",
	) {
		const $node = this.getNodeByIndex(location);

		if ($node === undefined) return false;

		insert === "after"
			? $node.$nodes[NodePropHandlerNodes].unshift(value)
			: $node.$nodes[NodePropHandlerNodes].push(value);

		return true;
	}

	searchNodeByPath(
		from: string,
		search: {
			value: string;
			mode: TMode;
		},
		mode: TMode = "index",
	) {
		if (mode === "id") return this.searchNodeByPathId(from, search);

		if (mode === "slug") return this.searchNodeByPathSlug(from, search);

		return this.searchNodeByPathIndex(from, search);
	}

	protected searchNodeByPathId(
		from: string,
		search: {
			value: string;
			mode: TMode;
		},
	) {
		const $node = this.getNodeByPathId(from);

		if ($node === undefined) return undefined;

		if (
			search.mode === "index" &&
			typeof search.value === "number" &&
			(search.value < 0 || search.value >= $node.$nodes.all.length)
		) {
			throw new Error("Indexes out ranges");
		}

		const nodes: GlobalNode[] = [$node];

		while (nodes.length > 0) {
			const node = nodes.shift();

			if (!node) return undefined;

			if (search.mode === "id" && node.id === search.value) {
				return node;
			}
			if (search.mode === "slug" && node.slug === search.value) {
				return node;
			}
			if (
				search.mode === "index" &&
				typeof search.value === "number" &&
				node.index === search.value
			) {
				return node;
			}

			nodes.push(...Array.from(node.$nodes.all));
		}

		return undefined;
	}

	protected searchNodeByPathSlug(
		from: string,
		search: {
			value: string;
			mode: TMode;
		},
	) {
		const $node = this.getNodeByPathSlug(from);

		if ($node === undefined) return undefined;

		if (
			search.mode === "index" &&
			typeof search.value === "number" &&
			(search.value < 0 || search.value >= $node.$nodes.all.length)
		) {
			throw new Error("Indexes out ranges");
		}

		const nodes: GlobalNode[] = [$node];

		while (nodes.length > 0) {
			const node = nodes.shift();

			if (!node) return undefined;

			if (search.mode === "id" && node.id === search.value) {
				return node;
			}
			if (search.mode === "slug" && node.slug === search.value) {
				return node;
			}
			if (
				search.mode === "index" &&
				typeof search.value === "number" &&
				node.index === search.value
			) {
				return node;
			}

			nodes.push(...Array.from(node.$nodes.all));
		}

		return undefined;
	}

	protected searchNodeByPathIndex(
		from: string,
		search: {
			value: string | number;
			mode: TMode;
		},
	) {
		const $node = this.getNodeByPathIndex(from);

		if ($node === undefined) return undefined;

		if (
			search.mode === "index" &&
			typeof search.value === "number" &&
			(search.value < 0 || search.value >= $node.$nodes.all.length)
		) {
			throw new Error("Indexes out ranges");
		}

		const nodes: GlobalNode[] = [$node];

		while (nodes.length > 0) {
			const node = nodes.shift();

			if (!node) return undefined;

			if (search.mode === "id" && node.id === search.value) {
				return node;
			}
			if (search.mode === "slug" && node.slug === search.value) {
				return node;
			}
			if (
				search.mode === "index" &&
				typeof search.value === "number" &&
				node.index === search.value
			) {
				return node;
			}

			nodes.push(...Array.from(node.$nodes.all));
		}

		return undefined;
	}

	searchNode(
		from: string | number,
		search: { value: string | number; mode: TMode },
		mode: TMode = "index",
	) {
		if (typeof from === "string" && mode === "id") {
			return this.searchNodeById(from, search);
		}
		if (typeof from === "string" && mode === "slug") {
			return this.searchNodeBySlug(from, search);
		}
		if (typeof from === "number" && mode === "index") {
			return this.searchNodeByIndex(from, search);
		}
	}

	protected searchNodeById(
		from: string,
		search: { value: string | number; mode: TMode },
	) {
		const $node = this.getNodeById(from);

		if ($node === undefined) return undefined;

		if (
			search.mode === "index" &&
			typeof search.value === "number" &&
			(search.value < 0 || search.value >= $node.$nodes.all.length)
		) {
			throw new Error("Indexes out ranges");
		}

		const nodes: GlobalNode[] = [$node];

		while (nodes.length > 0) {
			const node = nodes.shift();

			if (!node) return undefined;

			if (search.mode === "id" && node.id === search.value) {
				return node;
			}
			if (search.mode === "slug" && node.slug === search.value) {
				return node;
			}
			if (
				search.mode === "index" &&
				typeof search.value === "number" &&
				node.index === search.value
			) {
				return node;
			}

			nodes.push(...Array.from(node.$nodes.all));
		}

		return undefined;
	}

	protected searchNodeBySlug(
		from: string,
		search: { value: string | number; mode: TMode },
	) {
		const $node = this.getNodeBySlug(from);

		if ($node === undefined) return undefined;

		if (
			search.mode === "index" &&
			typeof search.value === "number" &&
			(search.value < 0 || search.value >= $node.$nodes.all.length)
		) {
			throw new Error("Indexes out ranges");
		}

		const nodes: GlobalNode[] = [$node];

		while (nodes.length > 0) {
			const node = nodes.shift();

			if (!node) return undefined;

			if (search.mode === "id" && node.id === search.value) {
				return node;
			}
			if (search.mode === "slug" && node.slug === search.value) {
				return node;
			}
			if (
				search.mode === "index" &&
				typeof search.value === "number" &&
				node.index === search.value
			) {
				return node;
			}

			nodes.push(...Array.from(node.$nodes.all));
		}

		return undefined;
	}

	protected searchNodeByIndex(
		from: number,
		search: { value: string | number; mode: TMode },
	) {
		const $node = this.getNodeByIndex(from);

		if ($node === undefined) return undefined;

		if (
			search.mode === "index" &&
			typeof search.value === "number" &&
			(search.value < 0 || search.value >= $node.$nodes.all.length)
		) {
			throw new Error("Indexes out ranges");
		}

		const nodes: GlobalNode[] = [$node];

		while (nodes.length > 0) {
			const node = nodes.shift();

			if (!node) return undefined;

			if (search.mode === "id" && node.id === search.value) {
				return node;
			}
			if (search.mode === "slug" && node.slug === search.value) {
				return node;
			}
			if (
				search.mode === "index" &&
				typeof search.value === "number" &&
				node.index === search.value
			) {
				return node;
			}

			nodes.push(...Array.from(node.$nodes.all));
		}

		return undefined;
	}

	getNodeByPath(path: string, mode: TMode = "index"): GlobalNode | undefined {
		if (mode === "id") return this.getNodeByPathId(path);

		if (mode === "slug") return this.getNodeByPathSlug(path);

		return this.getNodeByPathIndex(path);
	}

	protected getNodeByPathId(path: string): GlobalNode | undefined {
		const root: GlobalNode[] = [this.TOP as GlobalNode];

		if (!root[0]) return undefined;

		const parts = path.split("/");

		let $node = undefined;

		for (const part of parts) {
			if ($node) {
				$node = $node.$nodes.all.find((node) => node.id === part);
			} else {
				$node = root.find((node) => node.id === part);
			}
		}

		return $node;
	}

	protected getNodeByPathSlug(path: string): GlobalNode | undefined {
		const root: GlobalNode[] = [this.TOP as GlobalNode];

		if (!root[0]) return undefined;

		const parts = path.split("/");

		let $node = undefined;

		for (const part of parts) {
			if ($node) {
				$node = $node.$nodes.all.find((node) => node.slug === part);
			} else {
				$node = root.find((node) => node.slug === part);
			}
		}

		return $node;
	}

	protected getNodeByPathIndex(path: string): GlobalNode | undefined {
		const root: GlobalNode[] = [this.TOP as GlobalNode];

		if (!root[0]) return undefined;

		return this._nodes_(`[${path.replace(/\//g, "].$nodes.all[")}]`)(root);
	}

	getNode(
		location: string | number,
		mode: TMode = "index",
	): GlobalNode | undefined {
		if (typeof location === "string" && mode === "id") {
			return this.getNodeById(location);
		}
		if (typeof location === "string" && mode === "slug") {
			return this.getNodeBySlug(location);
		}
		if (typeof location === "number" && mode === "index") {
			return this.getNodeByIndex(location);
		}
	}

	protected getNodeById(location: string): GlobalNode | undefined {
		const root: GlobalNode[] = [this.TOP as GlobalNode];

		if (!root[0]) return undefined;

		return root.find((node) => node.id === location);
	}

	protected getNodeBySlug(location: string): GlobalNode | undefined {
		const root: GlobalNode[] = [this.TOP as GlobalNode];

		if (!root[0]) return undefined;

		return root.find((node) => node.slug === location);
	}

	protected getNodeByIndex(location: number): GlobalNode | undefined {
		const root: GlobalNode[] = [this.TOP as GlobalNode];

		if (!root[0]) return undefined;

		let left = 0;
		let right = root.length - 1;

		while (left <= right) {
			const mid = Math.floor((left + right) / 2);

			const midValue = root[mid].index;

			if (midValue === location) {
				return root[mid];
			}
			if (midValue < location) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}

		return undefined;
	}

	hasNodeByPath(path: string, mode: TMode = "index") {
		if (mode === "id") return this.hasNodeByPathId(path);

		if (mode === "slug") return this.hasNodeByPathSlug(path);

		return this.hasNodeByPathIndex(path);
	}

	protected hasNodeByPathId(path: string) {
		return this.getNodeByPathId(path) !== undefined;
	}

	protected hasNodeByPathSlug(path: string) {
		return this.getNodeByPathSlug(path) !== undefined;
	}

	protected hasNodeByPathIndex(path: string) {
		return this.getNodeByPathIndex(path) !== undefined;
	}

	hasNode(location: string | number, mode: TMode = "index") {
		if (typeof location === "string" && mode === "id") {
			return this.hasNodeById(location);
		}
		if (typeof location === "string" && mode === "slug") {
			return this.hasNodeBySlug(location);
		}
		if (typeof location === "number" && mode === "index") {
			return this.hasNodeByIndex(location);
		}
		return false;
	}

	protected hasNodeById(location: string) {
		return this.getNodeById(location) !== undefined;
	}

	protected hasNodeBySlug(location: string) {
		return this.getNodeBySlug(location) !== undefined;
	}

	protected hasNodeByIndex(location: number) {
		return this.getNodeByIndex(location) !== undefined;
	}

	getParentNodeByPath(
		path: string,
		mode: TMode = "index",
	): GlobalNode | undefined {
		if (mode === "id") return this.getParentNodeByPathId(path);

		if (mode === "slug") return this.getParentNodeByPathSlug(path);

		return this.getParentNodeByPathIndex(path);
	}

	protected getParentNodeByPathId(path: string) {
		const $node = this.getNodeByPathId(path);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent;
	}

	protected getParentNodeByPathSlug(path: string) {
		const $node = this.getNodeByPathSlug(path);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent;
	}

	protected getParentNodeByPathIndex(path: string) {
		const $node = this.getNodeByPathIndex(path);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent;
	}

	getParentNode(
		location: string | number,
		mode: TMode = "index",
	): GlobalNode | undefined {
		if (typeof location === "string" && mode === "id") {
			return this.getParentNodeById(location);
		}
		if (typeof location === "string" && mode === "slug") {
			return this.getParentNodeBySlug(location);
		}
		if (typeof location === "number" && mode === "index") {
			return this.getParentNodeByIndex(location);
		}
	}

	protected getParentNodeById(location: string) {
		const $node = this.getNodeById(location);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent;
	}

	protected getParentNodeBySlug(location: string) {
		const $node = this.getNodeBySlug(location);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent;
	}

	protected getParentNodeByIndex(location: number) {
		const $node = this.getNodeByIndex(location);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent;
	}

	getPreviousSiblingNodeByPath(path: string, mode: TMode = "index") {
		if (mode === "id") return this.getPreviousSiblingNodeByPathId(path);

		if (mode === "slug") return this.getPreviousSiblingNodeByPathSlug(path);

		return this.getPreviousSiblingNodeByPathIndex(path);
	}

	protected getPreviousSiblingNodeByPathId(path: string) {
		const $node = this.getNodeByPathId(path);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent?.$nodes.all[$node.index - 1];
	}

	protected getPreviousSiblingNodeByPathSlug(path: string) {
		const $node = this.getNodeByPathSlug(path);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent?.$nodes.all[$node.index - 1];
	}

	protected getPreviousSiblingNodeByPathIndex(path: string) {
		const $node = this.getNodeByPathIndex(path);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent?.$nodes.all[$node.index - 1];
	}

	getPreviousSiblingNode(location: string | number, mode: TMode = "index") {
		if (typeof location === "string" && mode === "id") {
			return this.getPreviousSiblingNodeById(location);
		}
		if (typeof location === "string" && mode === "slug") {
			return this.getPreviousSiblingNodeBySlug(location);
		}
		if (typeof location === "number" && mode === "index") {
			return this.getPreviousSiblingNodeByIndex(location);
		}
	}

	protected getPreviousSiblingNodeById(location: string) {
		const $node = this.getNodeById(location);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent?.$nodes.all[$node.index - 1];
	}

	protected getPreviousSiblingNodeBySlug(location: string) {
		const $node = this.getNodeBySlug(location);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent?.$nodes.all[$node.index - 1];
	}

	protected getPreviousSiblingNodeByIndex(location: number) {
		const $node = this.getNodeByIndex(location);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent?.$nodes.all[$node.index - 1];
	}

	getNextSiblingNodeByPath(path: string, mode: TMode = "index") {
		if (mode === "id") return this.getNextSiblingNodeByPathId(path);

		if (mode === "slug") return this.getNextSiblingNodeByPathSlug(path);

		return this.getNextSiblingNodeByPathIndex(path);
	}

	protected getNextSiblingNodeByPathId(path: string) {
		const $node = this.getNodeByPathId(path);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent?.$nodes.all[$node.index + 1];
	}

	protected getNextSiblingNodeByPathSlug(path: string) {
		const $node = this.getNodeByPathSlug(path);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent?.$nodes.all[$node.index + 1];
	}

	protected getNextSiblingNodeByPathIndex(path: string) {
		const $node = this.getNodeByPathIndex(path);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent?.$nodes.all[$node.index + 1];
	}

	getNextSiblingNode(location: string | number, mode: TMode = "index") {
		if (typeof location === "string" && mode === "id") {
			return this.getNextSiblingNodeById(location);
		}
		if (typeof location === "string" && mode === "slug") {
			return this.getNextSiblingNodeBySlug(location);
		}
		if (typeof location === "number" && mode === "index") {
			return this.getNextSiblingNodeByIndex(location);
		}
	}

	protected getNextSiblingNodeById(location: string) {
		const $node = this.getNodeById(location);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent?.$nodes.all[$node.index + 1];
	}

	protected getNextSiblingNodeBySlug(location: string) {
		const $node = this.getNodeBySlug(location);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent?.$nodes.all[$node.index + 1];
	}

	protected getNextSiblingNodeByIndex(location: number) {
		const $node = this.getNodeByIndex(location);

		if ($node === undefined) return undefined;

		if ($node.parent === undefined) return undefined;

		return $node.parent?.$nodes.all[$node.index + 1];
	}

	getFirstChildNodeByPath(path: string, mode: TMode = "index") {
		if (mode === "id") return this.getFirstChildNodeByPathId(path);

		if (mode === "slug") return this.getFirstChildNodeByPathSlug(path);

		return this.getFirstChildNodeByPathIndex(path);
	}

	protected getFirstChildNodeByPathId(path: string) {
		const $node = this.getNodeByPathId(path);

		if (!$node) return undefined;

		return $node.$nodes.all[0];
	}

	protected getFirstChildNodeByPathSlug(path: string) {
		const $node = this.getNodeByPathSlug(path);

		if (!$node) return undefined;

		return $node.$nodes.all[0];
	}

	protected getFirstChildNodeByPathIndex(path: string) {
		const $node = this.getNodeByPathIndex(path);

		if (!$node) return undefined;

		return $node.$nodes.all[0];
	}

	getFirstChildNode(location: string | number, mode: TMode = "index") {
		if (typeof location === "string" && mode === "id") {
			return this.getFirstChildNodeById(location);
		}
		if (typeof location === "string" && mode === "slug") {
			return this.getFirstChildNodeBySlug(location);
		}
		if (typeof location === "number" && mode === "index") {
			return this.getFirstChildNodeByIndex(location);
		}
	}

	protected getFirstChildNodeById(location: string) {
		const $node = this.getNodeById(location);

		if (!$node) return undefined;

		return $node.$nodes.all[0];
	}

	protected getFirstChildNodeBySlug(location: string) {
		const $node = this.getNodeBySlug(location);

		if (!$node) return undefined;

		return $node.$nodes.all[0];
	}

	protected getFirstChildNodeByIndex(location: number) {
		const $node = this.getNodeByIndex(location);

		if (!$node) return undefined;

		return $node.$nodes.all[0];
	}

	getLastChildNodeByPath(path: string, mode: TMode = "index") {
		if (mode === "id") return this.getLastChildNodeByPathId(path);

		if (mode === "slug") return this.getLastChildNodeByPathSlug(path);

		return this.getLastChildNodeByPathIndex(path);
	}

	protected getLastChildNodeByPathId(path: string) {
		const $node = this.getNodeByPathId(path);

		if (!$node) return undefined;

		return $node.$nodes.all[$node.$nodes.size - 1];
	}

	protected getLastChildNodeByPathSlug(path: string) {
		const $node = this.getNodeByPathSlug(path);

		if (!$node) return undefined;

		return $node.$nodes.all[$node.$nodes.size - 1];
	}

	protected getLastChildNodeByPathIndex(path: string) {
		const $node = this.getNodeByPathIndex(path);

		if (!$node) return undefined;

		return $node.$nodes.all[$node.$nodes.size - 1];
	}

	getLastChildNode(location: string | number, mode: TMode = "index") {
		if (typeof location === "string" && mode === "id") {
			return this.getLastChildNodeById(location);
		}
		if (typeof location === "string" && mode === "slug") {
			return this.getLastChildNodeBySlug(location);
		}
		if (typeof location === "number" && mode === "index") {
			return this.getLastChildNodeByIndex(location);
		}
	}

	protected getLastChildNodeById(location: string) {
		const $node = this.getNodeById(location);

		if (!$node) return undefined;

		return $node.$nodes.all[$node.$nodes.size - 1];
	}

	protected getLastChildNodeBySlug(location: string) {
		const $node = this.getNodeBySlug(location);

		if (!$node) return undefined;

		return $node.$nodes.all[$node.$nodes.size - 1];
	}

	protected getLastChildNodeByIndex(location: number) {
		const $node = this.getNodeByIndex(location);

		if (!$node) return undefined;

		return $node.$nodes.all[$node.$nodes.size - 1];
	}
}
