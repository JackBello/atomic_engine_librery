import type { IHandleNode, INodeProcess } from "../types";
import type { GlobalNode } from "../global-node";
import type { GameCore } from "@/app/game";
import type { EngineCore } from "@/app/engine";

import { _Render, _Script, _Worker, ExportWorker, GetApp } from "@/app/symbols";
import {
	NodePropHandlerNodes,
	NodeSetHandlerNodes,
	NodeSetIndex,
	NodeSetParent,
} from "@/nodes/symbols";

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
				this.$app[_Worker].nodes.addNode(
					node[ExportWorker]() as INodeProcess,
					this.$node.path,
					"path",
					"index",
				);

				this.$app[_Worker].render.draw();

				this.$app[_Render].draw = true;
			}
		}
	}

	has(index: number): boolean {
		return this.get(index) !== undefined;
	}

	delete(index: number): boolean {
		const $node = this.get(index);

		if ($node === undefined) return false;

		this[NodePropHandlerNodes].splice($node.index, 1);

		this.$app[_Script].removeScript($node);

		this._updateNodes_(this[NodePropHandlerNodes]);

		if (this.$app.scenes.currentScene) {
			this.$app[_Worker].nodes.deleteNode($node.path, "path", "index");

			this.$app[_Worker].render.draw();

			this.$app[_Render].draw = true;
		}

		return true;
	}

	clear(): boolean {
		this[NodePropHandlerNodes] = [];

		if (this.$app.scenes.currentScene) {
			this.$app[_Worker].nodes.clearNodes(this.$node.path, "path", "index");

			this.$app[_Worker].render.draw();

			this.$app[_Render].draw = true;
		}

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
			this.$app[_Worker].nodes.replaceNode(
				node[ExportWorker]() as INodeProcess,
				$node.path,
				"path",
				"index",
			);

			this.$app[_Worker].render.draw();

			this.$app[_Render].draw = true;
		}

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

		this[NodePropHandlerNodes].splice($nodeTo.index + 1, 0, $nodeFrom.clone());
		this[NodePropHandlerNodes].splice($nodeFrom.index, 1);

		this._updateNodes_(this[NodePropHandlerNodes]);

		if (this.$app.scenes.currentScene) {
			this.$app[_Worker].nodes.moveNode(
				{
					mode: "index",
					search: $nodeFrom.path,
				},
				{
					mode: "index",
					search: $nodeTo.path,
				},
				"path",
				"before",
			);

			this.$app[_Worker].render.draw();

			this.$app[_Render].draw = true;
		}

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

	[NodeSetHandlerNodes](nodes: GlobalNode[]): void {
		this[NodePropHandlerNodes] = nodes;
	}
}
