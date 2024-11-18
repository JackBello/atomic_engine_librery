import type { TAnything } from "@/app/types";
import type { INodeProcess, TMode } from "../types";

/*
path default (index) = 0/0/2/1

path {
	- id = dcbc3e65506a7e6f15d30a357e884432/dcbc3e65506a7e6f15d30a357e884432/dcbc3e65506a7e6f15d30a357e884432 (string)
	- index = 0/0/2/1 (string)
	- slug = player-0/collision/shape
}

location
	- id = dcbc3e65506a7e6f15d30a357e884432 (string)
	- index = 0 (number)
	- slug = player-0 (string)
*/

export class RootNodeSubProcess {
	private _root_: [INodeProcess] = [
		{
			__path__: "",
			__type__: "global/scene",
			location: {
				id: "",
				index: 0,
				slug: "",
			},
			nodes: [],
		},
	];

	private _nodes_(path: string) {
		return new Function("nodes", `return nodes${path}`);
	}

	private _updateLocationNodes_(
		nodes: INodeProcess[],
		parent?: INodeProcess,
	) {
		for (let index = 0; index < nodes.length; index++) {
			const node = nodes[index];

			node.location.index = index;
			node.__path__ = parent ? `${parent.__path__}/${index}` : `${index}`;

			if (node.nodes.length) {
				this._updateLocationNodes_(node.nodes, node);
			}
		}
	}

	private _propertiesIgnore_(property: string) {
		if (
			property === "__path__" ||
			property === "__root__" ||
			property === "__type__" ||
			property === "location" ||
			property === "parent" ||
			property === "nodes"
		) {
			return true;
		}

		return false;
	}

	get root() {
		return this._root_;
	}

	set root(root: [INodeProcess]) {
		this._root_ = root;
	}

	static isNodeIntersect({
		node,
		intersectionPoint,
	}: {
		node: {
			x: number;
			y: number;
			scaleX: number;
			scaleY: number;
			width: number;
			height: number;
			rotation: number;
			origin: [number, number]
		};
		intersectionPoint: { x: number; y: number };
	}) {
		const WIDTH = node.width * node.scaleX;
		const HEIGHT = node.height * node.scaleY;
		const X = node.x - node.origin[0];
		const Y = node.y - node.origin[1];

		const mouseX = intersectionPoint.x;
		const mouseY = intersectionPoint.y;

		return (
			mouseX >= X && mouseX <= X + WIDTH && mouseY >= Y &&
			mouseY <= Y + HEIGHT
		);
	}

	static invertTransform(transform: {
		x: number;
		y: number;
		scaleX: number;
		scaleY: number;
		rotation: number;
	}) {
		const invScaleX = 1 / transform.scaleX;
		const invScaleY = 1 / transform.scaleY;

		const invX = -transform.x * invScaleX;
		const invY = -transform.y * invScaleY;

		return {
			x: invX,
			y: invY,
			scaleX: invScaleX,
			scaleY: invScaleY,
			rotation: -transform.rotation,
		};
	}

	static calculateTransforms(
		nodeTransform: {
			x: number;
			y: number;
			scaleX: number;
			scaleY: number;
			rotation: number;
			alpha: number;
		},
		parentTransform: {
			x: number;
			y: number;
			scaleX: number;
			scaleY: number;
			rotation: number;
			alpha: number;
		} = { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },
	) {
		const globalX = nodeTransform.x + parentTransform.x;
		const globalY = nodeTransform.y + parentTransform.y;
		const globalScaleX = nodeTransform.scaleX * parentTransform.scaleX;
		const globalScaleY = nodeTransform.scaleY * parentTransform.scaleY;
		const globalRotation = nodeTransform.rotation +
			parentTransform.rotation;
		const globalAlpha = nodeTransform.alpha * parentTransform.alpha;

		return {
			x: globalX,
			y: globalY,
			scaleX: globalScaleX,
			scaleY: globalScaleY,
			rotation: globalRotation,
			alpha: globalAlpha,
		};
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
	static calculatePositionNode(
		parent: { x: number; y: number; scaleX: number; scaleY: number },
		child: { x: number; y: number; scaleX: number; scaleY: number },
	) {
		const x = parent.x + parent.scaleX * child.x;
		const y = parent.y + parent.scaleY * child.y;

		const scaleX = parent.scaleX * child.scaleX;
		const scaleY = parent.scaleY * child.scaleY;

		return {
			x,
			y,
			scaleX,
			scaleY,
		};
	}

	updateNode(
		id: string,
		location: string | number,
		value: Record<string, TAnything>,
		mode: TMode = "index",
	) {
		const $node = this.getNode(location, mode);

		if ($node === undefined) return false;

		if ($node.location.id !== id) return false;

		const properties = Object.keys(value);

		let property: string | undefined = undefined;

		if (properties.length === 1) {
			property = properties[0];
		}

		if (property && !this._propertiesIgnore_(property) && $node.options) {
			$node.options[property] = value[property];

			return true;
		}

		for (const key of properties) {
			if (this._propertiesIgnore_(key)) continue;

			if ($node.options) $node.options[key] = value[key];
		}

		return true;
	}

	updateNodeByPath(
		id: string,
		path: string,
		value: Record<string, TAnything>,
		mode: TMode = "index",
	) {
		const $node = this.getNodeByPath(path, mode);

		if ($node === undefined) return false;

		if ($node.location.id !== id) return false;

		const properties = Object.keys(value);

		let property: string | undefined = undefined;

		if (properties.length === 1) {
			property = properties[0];
		}

		if (property && !this._propertiesIgnore_(property) && $node.options) {
			$node.options[property] = value[property];

			return true;
		}

		for (const key of properties) {
			if (this._propertiesIgnore_(key)) continue;

			if ($node.options) $node.options[key] = value[key];
		}

		return true;
	}

	replaceNode(
		from: string | number,
		value: INodeProcess,
		mode: TMode = "index",
	) {
		const $node = this.getNode(from, mode);

		if ($node === undefined) return false;

		if (
			mode === "index" &&
			(Number(from) < 0 || Number(from) >= $node.nodes.length)
		) {
			throw new Error("Indexes out ranges");
		}

		const $parent = this.getParentNode(from, mode);

		if ($parent === undefined) return false;

		$parent.nodes[$node.location.index] = value;

		this._updateLocationNodes_($parent.nodes, $parent);

		return true;
	}

	replaceNodeByPath(
		from: string,
		value: INodeProcess,
		mode: TMode = "index",
	) {
		const $node = this.getNodeByPath(from, mode);

		if ($node === undefined) return false;

		const $parent = this.getParentNodeByPath(from, mode);

		if ($parent === undefined) return false;

		$parent.nodes[$node.location.index] = value;

		this._updateLocationNodes_($parent.nodes, $parent);

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
			? $parentTo.nodes.splice($nodeTo.location.index + 1, 0, {
				...$nodeFrom,
			})
			: $parentTo.nodes.splice($nodeTo.location.index, 0, {
				...$nodeFrom,
			});

		$parentFrom.nodes.splice($nodeFrom.location.index, 1);

		this._updateLocationNodes_($parentFrom.nodes, $parentFrom);
		this._updateLocationNodes_($parentTo.nodes, $parentTo);

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
			? $parentTo.nodes.splice($nodeTo.location.index + 1, 0, {
				...$nodeFrom,
			})
			: $parentTo.nodes.splice($nodeTo.location.index, 0, {
				...$nodeFrom,
			});

		$parentFrom.nodes.splice($nodeFrom.location.index, 1);

		this._updateLocationNodes_($parentFrom.nodes, $parentFrom);
		this._updateLocationNodes_($parentTo.nodes, $parentTo);

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

		if ($node.nodes.length === 0) return false;

		$node.nodes = [];

		return true;
	}

	protected clearNodesByPathSlug(path: string) {
		const $node = this.getNodeByPathSlug(path);

		if ($node === undefined) return false;

		if ($node.nodes.length === 0) return false;

		$node.nodes = [];

		return true;
	}

	protected clearNodesByPathIndex(path: string) {
		const $node = this.getNodeByPathIndex(path);

		if ($node === undefined) return false;

		if ($node.nodes.length === 0) return false;

		$node.nodes = [];

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

		if ($node.nodes.length === 0) return false;

		$node.nodes = [];

		return true;
	}

	protected clearNodesBySlug(location: string) {
		const $node = this.getNodeBySlug(location);

		if ($node === undefined) return false;

		if ($node.nodes.length === 0) return false;

		$node.nodes = [];

		return true;
	}

	protected clearNodesByIndex(location: number) {
		const $node = this.getNodeByIndex(location);

		if ($node === undefined) return false;

		if ($node.nodes.length === 0) return false;

		$node.nodes = [];

		return true;
	}

	getNodesByPath(path: string, mode: TMode = "index") {
		if (mode === "id") return this.getNodesByPathId(path);

		if (mode === "slug") return this.getNodesByPathSlug(path);

		return this.getNodesByPathIndex(path);
	}

	protected getNodesByPathId(path: string) {
		return this.getNodeByPathId(path)?.nodes;
	}

	protected getNodesByPathSlug(path: string) {
		return this.getNodeByPathSlug(path)?.nodes;
	}

	protected getNodesByPathIndex(path: string) {
		return this.getNodeByPathIndex(path)?.nodes;
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
		return this.getNodeById(location)?.nodes;
	}

	protected getNodesBySlug(location: string) {
		return this.getNodeBySlug(location)?.nodes;
	}

	protected getNodesByIndex(location: number) {
		return this.getNodeByIndex(location)?.nodes;
	}

	deleteNodeByPath(path: string, mode: TMode = "index") {
		if (mode === "id") return this.deleteNodeByPathId(path);

		if (mode === "slug") return this.deleteNodeByPathSlug(path);

		return this.deleteNodeByPathIndex(path);
	}

	protected deleteNodeByPathId(path: string) {
		const $node = this.getNodeByPathId(path);

		if ($node === undefined) return false;

		const $parent = this.getParentNodeByPathId(path);

		if ($parent === undefined) return false;

		$parent.nodes.splice($node.location.index, 1);

		this._updateLocationNodes_($parent.nodes, $parent);

		return true;
	}

	protected deleteNodeByPathSlug(path: string) {
		const $node = this.getNodeByPathSlug(path);

		if ($node === undefined) return false;

		const $parent = this.getParentNodeByPathSlug(path);

		if ($parent === undefined) return false;

		$parent.nodes.splice($node.location.index, 1);

		this._updateLocationNodes_($parent.nodes, $parent);

		return true;
	}

	protected deleteNodeByPathIndex(path: string) {
		const $node = this.getNodeByPathIndex(path);

		if ($node === undefined) return false;

		const $parent = this.getParentNodeByPathIndex(path);

		if ($parent === undefined) return false;

		$parent.nodes.splice($node.location.index, 1);

		this._updateLocationNodes_($parent.nodes, $parent);

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

		$parent.nodes.splice($node.location.index, 1);

		this._updateLocationNodes_($parent.nodes, $parent);

		return true;
	}

	protected deleteNodeBySlug(location: string) {
		const $node = this.getNodeBySlug(location);

		if ($node === undefined) return false;

		const $parent = this.getParentNodeBySlug(location);

		if ($parent === undefined) return false;

		$parent.nodes.splice($node.location.index, 1);

		this._updateLocationNodes_($parent.nodes, $parent);

		return true;
	}

	protected deleteNodeByIndex(location: number) {
		const $node = this.getNodeByIndex(location);

		if ($node === undefined) return false;

		const $parent = this.getParentNodeByIndex(location);

		if ($parent === undefined) return false;

		$parent.nodes.splice($node.location.index, 1);

		this._updateLocationNodes_($parent.nodes, $parent);

		return true;
	}

	addNodeByPath(
		path: string,
		value: INodeProcess,
		mode: TMode = "index",
		insert: "after" | "before" = "before",
	) {
		if (mode === "id") return this.addNodeByPathId(path, value, insert);

		if (mode === "slug") return this.addNodeByPathSlug(path, value, insert);

		return this.addNodeByPathIndex(path, value, insert);
	}

	protected addNodeByPathId(
		path: string,
		value: INodeProcess,
		insert: "after" | "before",
	) {
		const $node = this.getNodeByPathId(path);

		if ($node === undefined) return false;

		insert === "after"
			? $node.nodes.unshift(value)
			: $node.nodes.push(value);

		return true;
	}

	protected addNodeByPathSlug(
		path: string,
		value: INodeProcess,
		insert: "after" | "before",
	) {
		const $node = this.getNodeByPathSlug(path);

		if ($node === undefined) return false;

		insert === "after"
			? $node.nodes.unshift(value)
			: $node.nodes.push(value);

		return true;
	}

	protected addNodeByPathIndex(
		path: string,
		value: INodeProcess,
		insert: "after" | "before",
	) {
		const $node = this.getNodeByPathIndex(path);

		if ($node === undefined) return false;

		insert === "after"
			? $node.nodes.unshift(value)
			: $node.nodes.push(value);

		return true;
	}

	addNode(
		location: string | number,
		value: INodeProcess,
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
		value: INodeProcess,
		insert: "after" | "before",
	) {
		const $node = this.getNodeById(location);

		if ($node === undefined) return false;

		insert === "after"
			? $node.nodes.unshift(value)
			: $node.nodes.push(value);

		return true;
	}

	protected addNodeBySlug(
		location: string,
		value: INodeProcess,
		insert: "after" | "before",
	) {
		const $node = this.getNodeBySlug(location);

		if ($node === undefined) return false;

		insert === "after"
			? $node.nodes.unshift(value)
			: $node.nodes.push(value);

		return true;
	}

	protected addNodeByIndex(
		location: number,
		value: INodeProcess,
		insert: "after" | "before",
	) {
		const $node = this.getNodeByIndex(location);

		if ($node === undefined) return false;

		insert === "after"
			? $node.nodes.unshift(value)
			: $node.nodes.push(value);

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
			(search.value < 0 || search.value >= $node.nodes.length)
		) {
			throw new Error("Indexes out ranges");
		}

		const nodes: INodeProcess[] = [$node];

		while (nodes.length > 0) {
			const node = nodes.shift();

			if (!node) return undefined;

			if (search.mode === "id" && node.location.id === search.value) {
				return node;
			}
			if (search.mode === "slug" && node.location.slug === search.value) {
				return node;
			}
			if (
				search.mode === "index" &&
				typeof search.value === "number" &&
				node.location.index === search.value
			) {
				return node;
			}

			nodes.push(...node.nodes);
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
			(search.value < 0 || search.value >= $node.nodes.length)
		) {
			throw new Error("Indexes out ranges");
		}

		const nodes: INodeProcess[] = [$node];

		while (nodes.length > 0) {
			const node = nodes.shift();

			if (!node) return undefined;

			if (search.mode === "id" && node.location.id === search.value) {
				return node;
			}
			if (search.mode === "slug" && node.location.slug === search.value) {
				return node;
			}
			if (
				search.mode === "index" &&
				typeof search.value === "number" &&
				node.location.index === search.value
			) {
				return node;
			}

			nodes.push(...Array.from(node.nodes));
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
			(search.value < 0 || search.value >= $node.nodes.length)
		) {
			throw new Error("Indexes out ranges");
		}

		const nodes: INodeProcess[] = [$node];

		while (nodes.length > 0) {
			const node = nodes.shift();

			if (!node) return undefined;

			if (search.mode === "id" && node.location.id === search.value) {
				return node;
			}
			if (search.mode === "slug" && node.location.slug === search.value) {
				return node;
			}
			if (
				search.mode === "index" &&
				typeof search.value === "number" &&
				node.location.index === search.value
			) {
				return node;
			}

			nodes.push(...Array.from(node.nodes));
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
			(search.value < 0 || search.value >= $node.nodes.length)
		) {
			throw new Error("Indexes out ranges");
		}

		const nodes: INodeProcess[] = [$node];

		while (nodes.length > 0) {
			const node = nodes.shift();

			if (!node) return undefined;

			if (search.mode === "id" && node.location.id === search.value) {
				return node;
			}
			if (search.mode === "slug" && node.location.slug === search.value) {
				return node;
			}
			if (
				search.mode === "index" &&
				typeof search.value === "number" &&
				node.location.index === search.value
			) {
				return node;
			}

			nodes.push(...Array.from(node.nodes));
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
			(search.value < 0 || search.value >= $node.nodes.length)
		) {
			throw new Error("Indexes out ranges");
		}

		const nodes: INodeProcess[] = [$node];

		while (nodes.length > 0) {
			const node = nodes.shift();

			if (!node) return undefined;

			if (search.mode === "id" && node.location.id === search.value) {
				return node;
			}
			if (search.mode === "slug" && node.location.slug === search.value) {
				return node;
			}
			if (
				search.mode === "index" &&
				typeof search.value === "number" &&
				node.location.index === search.value
			) {
				return node;
			}

			nodes.push(...Array.from(node.nodes));
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
			(search.value < 0 || search.value >= $node.nodes.length)
		) {
			throw new Error("Indexes out ranges");
		}

		const nodes: INodeProcess[] = [$node];

		while (nodes.length > 0) {
			const node = nodes.shift();

			if (!node) return undefined;

			if (search.mode === "id" && node.location.id === search.value) {
				return node;
			}
			if (search.mode === "slug" && node.location.slug === search.value) {
				return node;
			}
			if (
				search.mode === "index" &&
				typeof search.value === "number" &&
				node.location.index === search.value
			) {
				return node;
			}

			nodes.push(...Array.from(node.nodes));
		}

		return undefined;
	}

	getNodeByPath(
		path: string,
		mode: TMode = "index",
	): INodeProcess | undefined {
		if (mode === "id") return this.getNodeByPathId(path);

		if (mode === "slug") return this.getNodeByPathSlug(path);

		return this.getNodeByPathIndex(path);
	}

	protected getNodeByPathId(path: string): INodeProcess | undefined {
		const parts = path.split("/");

		let $node = undefined;

		for (const part of parts) {
			if ($node) {
				$node = $node.nodes.find((node) => node.location.id === part);
			} else {
				$node = this._root_.find((node) => node.location.id === part);
			}
		}

		return $node;
	}

	protected getNodeByPathSlug(path: string): INodeProcess | undefined {
		const parts = path.split("/");

		let $node = undefined;

		for (const part of parts) {
			if ($node) {
				$node = $node.nodes.find((node) => node.location.slug === part);
			} else {
				$node = this._root_.find((node) => node.location.slug === part);
			}
		}

		return $node;
	}

	protected getNodeByPathIndex(path: string): INodeProcess | undefined {
		return this._nodes_(`[${path.replace(/\//g, "].nodes[")}]`)(
			this._root_,
		);
	}

	getNode(
		location: string | number,
		mode: TMode = "index",
	): INodeProcess | undefined {
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

	protected getNodeById(location: string): INodeProcess | undefined {
		return this._root_.find((node) => node.location.id === location);
	}

	protected getNodeBySlug(location: string): INodeProcess | undefined {
		return this._root_.find((node) => node.location.slug === location);
	}

	protected getNodeByIndex(location: number): INodeProcess | undefined {
		let left = 0;
		let right = this._root_.length - 1;

		while (left <= right) {
			const mid = Math.floor((left + right) / 2);

			const midValue = this._root_[mid].location.index;

			if (midValue === location) {
				return this._root_[mid];
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

	getParentNodeByPath(path: string, mode: TMode = "index") {
		if (mode === "id") return this.getParentNodeByPathId(path);
		if (mode === "slug") return this.getParentNodeByPathSlug(path);
		return this.getParentNodeByPathIndex(path);
	}

	protected getParentNodeByPathId(path: string) {
		const $node = this.getNodeByPathId(path);

		if ($node === undefined) return undefined;

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent;
	}

	protected getParentNodeByPathSlug(path: string) {
		const $node = this.getNodeByPathSlug(path);

		if ($node === undefined) return undefined;

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent;
	}

	protected getParentNodeByPathIndex(path: string) {
		const $node = this.getNodeByPathIndex(path);

		if ($node === undefined) return undefined;

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent;
	}

	getParentNode(location: string | number, mode: TMode = "index") {
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

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent;
	}

	protected getParentNodeBySlug(location: string) {
		const $node = this.getNodeBySlug(location);

		if ($node === undefined) return undefined;

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent;
	}

	protected getParentNodeByIndex(location: number) {
		const $node = this.getNodeByIndex(location);

		if ($node === undefined) return undefined;

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent;
	}

	getPreviousSiblingNodeByPath(path: string, mode: TMode = "index") {
		if (mode === "id") return this.getPreviousSiblingNodeByPathId(path);
		if (mode === "slug") return this.getPreviousSiblingNodeByPathSlug(path);
		return this.getPreviousSiblingNodeByPathIndex(path);
	}

	protected getPreviousSiblingNodeByPathId(path: string) {
		const $node = this.getNodeByPathId(path);

		if ($node === undefined) return undefined;

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent.nodes[$node.location.index - 1];
	}

	protected getPreviousSiblingNodeByPathSlug(path: string) {
		const $node = this.getNodeByPathSlug(path);

		if ($node === undefined) return undefined;

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent.nodes[$node.location.index - 1];
	}

	protected getPreviousSiblingNodeByPathIndex(path: string) {
		const $node = this.getNodeByPathIndex(path);

		if ($node === undefined) return undefined;

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent.nodes[$node.location.index - 1];
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

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent.nodes[$node.location.index - 1];
	}

	protected getPreviousSiblingNodeBySlug(location: string) {
		const $node = this.getNodeBySlug(location);

		if ($node === undefined) return undefined;

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent.nodes[$node.location.index - 1];
	}

	protected getPreviousSiblingNodeByIndex(location: number) {
		const $node = this.getNodeByIndex(location);

		if ($node === undefined) return undefined;

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent.nodes[$node.location.index - 1];
	}

	getNextSiblingNodeByPath(path: string, mode: TMode = "index") {
		if (mode === "id") return this.getNextSiblingNodeByPathId(path);
		if (mode === "slug") return this.getNextSiblingNodeByPathSlug(path);
		return this.getNextSiblingNodeByPathIndex(path);
	}

	protected getNextSiblingNodeByPathId(path: string) {
		const $node = this.getNodeByPathId(path);

		if ($node === undefined) return undefined;

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent.nodes[$node.location.index + 1];
	}

	protected getNextSiblingNodeByPathSlug(path: string) {
		const $node = this.getNodeByPathSlug(path);

		if ($node === undefined) return undefined;

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent.nodes[$node.location.index + 1];
	}

	protected getNextSiblingNodeByPathIndex(path: string) {
		const $node = this.getNodeByPathIndex(path);

		if ($node === undefined) return undefined;

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent.nodes[$node.location.index + 1];
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

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent.nodes[$node.location.index + 1];
	}

	protected getNextSiblingNodeBySlug(location: string) {
		const $node = this.getNodeBySlug(location);

		if ($node === undefined) return undefined;

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent.nodes[$node.location.index + 1];
	}

	protected getNextSiblingNodeByIndex(location: number) {
		const $node = this.getNodeByIndex(location);

		if ($node === undefined) return undefined;

		const indexSlash = $node.__path__.lastIndexOf("/");

		let parentPath = indexSlash !== -1
			? $node.__path__.substring(0, indexSlash)
			: $node.__path__;

		parentPath = `[${parentPath.replace(/\//g, "].nodes[")}]`;

		const $parent: INodeProcess | undefined = this._nodes_(parentPath)(
			this._root_,
		);

		if (!$parent) return undefined;

		return $parent.nodes[$node.location.index + 1];
	}

	getFirstChildNodeByPath(path: string, mode: TMode = "index") {
		if (mode === "id") return this.getFirstChildNodeByPathId(path);
		if (mode === "slug") return this.getFirstChildNodeByPathSlug(path);
		return this.getFirstChildNodeByPathIndex(path);
	}

	protected getFirstChildNodeByPathId(path: string) {
		const $node = this.getNodeByPathId(path);

		if (!$node) return undefined;

		return $node.nodes[0];
	}

	protected getFirstChildNodeByPathSlug(path: string) {
		const $node = this.getNodeByPathSlug(path);

		if (!$node) return undefined;

		return $node.nodes[0];
	}

	protected getFirstChildNodeByPathIndex(path: string) {
		const $node = this.getNodeByPathIndex(path);

		if (!$node) return undefined;

		return $node.nodes[0];
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

		return $node.nodes[0];
	}

	protected getFirstChildNodeBySlug(location: string) {
		const $node = this.getNodeBySlug(location);

		if (!$node) return undefined;

		return $node.nodes[0];
	}

	protected getFirstChildNodeByIndex(location: number) {
		const $node = this.getNodeByIndex(location);

		if (!$node) return undefined;

		return $node.nodes[0];
	}

	getLastChildNodeByPath(path: string, mode: TMode = "index") {
		if (mode === "id") return this.getLastChildNodeByPathId(path);
		if (mode === "slug") return this.getLastChildNodeByPathSlug(path);
		return this.getLastChildNodeByPathIndex(path);
	}

	protected getLastChildNodeByPathId(path: string) {
		const $node = this.getNodeByPathId(path);

		if (!$node) return undefined;

		return $node.nodes[$node.nodes.length - 1];
	}

	protected getLastChildNodeByPathSlug(path: string) {
		const $node = this.getNodeByPathSlug(path);

		if (!$node) return undefined;

		return $node.nodes[$node.nodes.length - 1];
	}

	protected getLastChildNodeByPathIndex(path: string) {
		const $node = this.getNodeByPathIndex(path);

		if (!$node) return undefined;

		return $node.nodes[$node.nodes.length - 1];
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

		return $node.nodes[$node.nodes.length - 1];
	}

	protected getLastChildNodeBySlug(location: string) {
		const $node = this.getNodeBySlug(location);

		if (!$node) return undefined;

		return $node.nodes[$node.nodes.length - 1];
	}

	protected getLastChildNodeByIndex(location: number) {
		const $node = this.getNodeByIndex(location);

		if (!$node) return undefined;

		return $node.nodes[$node.nodes.length - 1];
	}
}
