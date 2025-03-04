import type { IHandleNode, TModeSearch } from "../types";
import type { GlobalNode } from "../global-node";
import type { GameCore } from "@/app/game";
import type { EngineCore } from "@/app/engine";

import {
	_Render,
	_Script,
	_Worker,
	DispatchEvent,
	GetApp,
} from "@/app/symbols";
import {
	NodeDestroy,
	NodePropHandlerNodes,
	NodeSetHandlerNodes,
	NodeSetIndex,
	NodeSetParent,
} from "@/nodes/symbols";
import type { TAnything } from "@/app/types";

export class HandlerNode implements IHandleNode {
	private $node: GlobalNode;
	private $app: EngineCore | GameCore;

	[NodePropHandlerNodes]: GlobalNode[];

	get all(): GlobalNode[] {
		return this[NodePropHandlerNodes];
	}

	get size(): number {
		return this[NodePropHandlerNodes].length;
	}

	constructor($node: GlobalNode) {
		this.$node = $node;
		this.$app = this.$node[GetApp];

		this[NodePropHandlerNodes] = [];
	}

	private _updateNodes_(nodes: GlobalNode[]) {
		for (let index = 0; index < nodes.length; index++) {
			const node = nodes[index];

			node[NodeSetIndex](index);

			if (node.nodes.length) {
				this._updateNodes_(node.nodes);
			}
		}
	}

	path(path: string, mode: TModeSearch): GlobalNode | undefined {
		const currentPath = this.$node.getPath(mode)
		const searchPath = path.startsWith("/") ? `${currentPath}${path}` : `${currentPath}/${path}`;

		return this.$app.ROOT.getNodeByPath(searchPath, mode)
	}

	find(search: string | number, mode: TModeSearch): GlobalNode | undefined {
		if (mode === "id" && search === this.$node.id) return this.$node
		if (mode === "index" && search === this.$node.index) return this.$node
		if (mode === "slug" && search === this.$node.slug) return this.$node

		for (const child of this[NodePropHandlerNodes]) {
			const node = child.$nodes.find(search, mode);

			if (node) return node;
		}

		return undefined
	}

	get(index: number): GlobalNode | undefined {
		let left = 0;
		let right = this[NodePropHandlerNodes].length - 1;

		while (left <= right) {
			const mid = Math.floor((left + right) / 2);

			const midValue = this[NodePropHandlerNodes][mid].index;

			if (midValue === index) {
				return this[NodePropHandlerNodes][mid];
			}
			if (midValue < index) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}

		return undefined;
	}

	add(...nodes: GlobalNode[]): void {
		for (const node of nodes) {
			node[NodeSetParent](this.$node);
			node[NodeSetIndex](this.size);
			this[NodePropHandlerNodes].push(node);

			if (this.$app.scenes.currentScene) {
				this.$app[_Render].draw = true;
			}
		}

		this.$node.ROOT.TOP?.[DispatchEvent]("scene:add_node", ...nodes);
	}

	has(index: number): boolean {
		return this.get(index) !== undefined;
	}

	delete(index: number): boolean {
		const $node = this.get(index);

		if ($node === undefined) return false;

		$node.destroy()

		return true;
	}

	clear(): boolean {
		this[NodePropHandlerNodes] = [];

		if (this.$app.scenes.currentScene) {
			this.$app[_Render].draw = true;
		}

		this.$node.ROOT.TOP?.[DispatchEvent]("scene:clear_nodes");

		return true;
	}

	replace(index: number, node: GlobalNode): boolean {
		const $node = this.get(index);

		if ($node === undefined) return false;

		if (index < 0 || index >= this.size) {
			throw new Error("Indexes out ranges");
		}

		node[NodeSetParent]($node.parent);
		this[NodePropHandlerNodes][$node.index] = node;

		this._updateNodes_(this[NodePropHandlerNodes]);

		if (this.$app.scenes.currentScene) {
			this.$app[_Render].draw = true;
		}

		this.$node.ROOT.TOP?.[DispatchEvent]("scene:replace_node", node, $node);

		return true;
	}

	search(slug: string): GlobalNode | undefined {
		const nodes = [this.$node];

		while (nodes.length > 0) {
			const node = nodes.shift();

			if (!node) return undefined;

			if (node.slug === slug) return node;

			nodes.push(...Array.from(node.$nodes.all));
		}

		return undefined;
	}

	move(from: number, to: number): boolean {
		if (from < 0 || from >= this.size) {
			throw new Error("From indexes out ranges");
		}
		if (to < 0 || to >= this.size) throw new Error("To indexes out ranges");

		const $nodeFrom = this.get(from);
		const $nodeTo = this.get(to);

		if ($nodeFrom === undefined) return false;
		if ($nodeTo === undefined) return false;

		this[NodePropHandlerNodes].splice($nodeTo.index + 1, 0, $nodeFrom);
		this[NodePropHandlerNodes].splice($nodeFrom.index, 1);

		this._updateNodes_(this[NodePropHandlerNodes]);

		if (this.$app.scenes.currentScene) {
			this.$app[_Render].draw = true;
		}

		this.$node.ROOT.TOP?.[DispatchEvent]("scene:move_node", { from: $nodeFrom, to: $nodeTo });

		return true;
	}

	traverse(callback: (node: GlobalNode) => void): void {
		callback(this.$node);

		if (this.size > 0) {
			for (const child of this[NodePropHandlerNodes]) {
				child.$nodes.traverse(callback);
			}
		}
	}

	print(indent = ""): void {
		console.log(`${indent}${this.$node.slug}`);

		for (const child of this[NodePropHandlerNodes]) {
			child.$nodes.print(`${indent}  `);
		}
	}

	[NodeSetHandlerNodes](nodes: GlobalNode[]): void {
		this[NodePropHandlerNodes] = nodes;
	}

	[NodeDestroy]() {
		this.$node = null as TAnything;
		this.$app = null as TAnything;
	}
}
