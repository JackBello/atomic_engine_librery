import type { GlobalNode } from "../global-node";
import type { TAnything, TFunction } from "@/types";

import { GetNodeToConstructorNode } from "@/nodes/symbols";
import { GetOptions, SetGlobal } from "@/symbols";

import { EngineCore } from "@/app/engine";
import { GameCore } from "@/app/game";

import ConstructorNodes from "./constructor-nodes";

export default class ConstructorScript {
	private $node!: GlobalNode;
	private $app!: EngineCore | GameCore;

	protected CLASS = {
		getMethodsFromClass: (instance: GlobalNode, filters: string[] = []) => {
			const result: Record<string, TFunction> = {};

			const prototype = Object.getPrototypeOf(instance);

			const methods = Object.getOwnPropertyNames(prototype).filter(
				(method) =>
					typeof prototype[method] === "function" && method !== "constructor",
			);

			if (filters.length > 0)
				for (const method of methods) {
					if (filters.includes(method)) result[method] = instance[method];
				}
			else
				for (const method of methods) {
					result[method] = instance[method].bind(this.$node);
				}

			return result;
		},
		getPropsFromClass: (instance: GlobalNode, filters: string[] = []) => {
			const ignore = [
				"_omit",
				"_options",
				"_initial",
				"_root",
				"_parent",
				"_events",
				"_index",
				"_slug",
				"_id",
				"NODE_NAME",
				"$attributes",
				"$components",
				"$functions",
				"$metaKeys",
				"$nodes",
				"scriptMode",
				"script",
			];

			const result: Record<string, TAnything> = {};

			const props = Object.getOwnPropertyNames(instance).filter(
				(prop) => !ignore.includes(prop),
			);

			if (filters.length > 0)
				for (const prop of props) {
					if (filters.includes(prop) && typeof instance[prop] === "function")
						result[prop] = instance[prop].bind(this.$node);
					if (filters.includes(prop) && typeof instance[prop] !== "function")
						result[prop] = instance[prop];
				}
			else
				for (const prop of props) {
					result[prop] = instance[prop];
				}

			return result;
		},
	};

	protected REGEXP = {
		getNameFromClassIntoCode(code: string) {
			const match = code.match(/class\s+(\w+)/);

			return match ? match[1] : null;
		},
		getExpressionIntoCode(code: string) {
			const noSingleLineComments = code.replace(/\/\/.*$/gm, "");

			const noComments = noSingleLineComments.replace(/\/\*[\s\S]*?\*\//g, "");

			const functionPattern =
				/@expose\s+(function\s+([a-zA-Z0-9_$]+)|([a-zA-Z0-9_$]+)\s*=\s*function|([a-zA-Z0-9_$]+)\s*=\s*\([^)]*\)\s*=>|var\s+([a-zA-Z0-9_$]+)\s*=|let\s+([a-zA-Z0-9_$]+)\s*=|const\s+([a-zA-Z0-9_$]+)\s*=)|\bfunction\s+(_[a-zA-Z0-9_$]+)|\b(_[a-zA-Z0-9_$]+)\s*=\s*function|\b(_[a-zA-Z0-9_$]+)\s*=\s*\([^)]*\)\s*=>|\b(var|let|const)\s+(_[a-zA-Z0-9_$]+)\s*=/g;

			let propVars = "__VARS__: {";
			let propFunc = "__FUNC__: {";
			let match = functionPattern.exec(noComments);

			while (match !== null) {
				if (match[8]) {
					propFunc = `${propFunc + match[8]},`;
				} else if (match[7]) {
					propVars = `${propVars + match[7]},`;
				} else if (match[2]) {
					propFunc = `${propFunc + match[2]},`;
				}

				match = functionPattern.exec(noComments);
			}

			propVars = `${propVars}}`;
			propFunc = `${propFunc}}`;

			return `\n\nreturn {${propVars},${propFunc}}`;
		},
	};

	protected getViewport() {
		let viewport = {
			width: 0,
			height: 0,
		};

		if (this.$app instanceof EngineCore) {
			viewport = this.$app[GetOptions]().game.viewport;
		} else if (this.$app instanceof GameCore) {
			viewport = this.$app[GetOptions]().viewport;
		}

		return viewport;
	}

	protected getHelpers() {
		const $collider = () => {
			const collision = this.$node.$nodes.all.find(
				(node) => node.NODE_NAME === "CollisionShape2D",
			);

			return collision?.getCollider();
		};

		const $destroyNode = () => {
			this.$app.root.deleteNodeByPath(this.$node.path, "index");
		};

		const $finish = () => {
			this.$app[SetGlobal]("status", "pause");
		};

		return {
			$finish,
			$collider,
			$destroyNode,
		};
	}

	protected async getCode() {
		const script = this.$node.script;

		if (!script) return "";

		let code = "";

		if (typeof script === "string" && URL.canParse(script)) {
			code = await (await fetch(script)).text();
		} else if (typeof script === "string" && !URL.canParse(script)) {
			code = script;
		} else if (script instanceof URL) {
			code = await (await fetch(script)).text();
		}

		let result = "";

		if (this.$node.scriptMode === "function") {
			result = `with(helpers) {\n\nwith (node) {\n\n${code
				.trim()
				.replace(/@expose /g, "")}; ${this.REGEXP.getExpressionIntoCode(
				code.trim(),
			)}\n\n}\n\n}`;
		}

		if (this.$node.scriptMode === "class") {
			result = `${code.trim()}
        return new ${this.REGEXP.getNameFromClassIntoCode(code)}()`;
		}

		return result;
	}

	protected async getExec(code: string, addons: Record<string, TAnything>) {
		const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;

		let execute: TFunction<TAnything>;
		let result: {
			__FUNC__: Record<string, TFunction>;
			__VARS__: Record<string, TAnything>;
		} = {
			__FUNC__: {},
			__VARS__: {},
		};

		if (this.$node.scriptMode === "function") {
			execute = new AsyncFunction("node, helpers, viewport", code);

			result = await execute(this.$node, addons.helpers, addons.viewport);
		} else {
			const extendsClass = ConstructorNodes[GetNodeToConstructorNode](
				this.$node.NODE_NAME,
			);

			const execute = new AsyncFunction(
				`node, helpers, viewport, ${this.$node.NODE_NAME}`,
				code,
			);

			result = await execute(
				this.$node,
				addons.helpers,
				addons.viewport,
				extendsClass,
			);

			if ("NODE_NAME" in result)
				result = {
					__FUNC__: this.CLASS.getMethodsFromClass(result as TAnything),
					__VARS__: this.CLASS.getPropsFromClass(result as TAnything),
				};
		}

		return result;
	}

	public async executeScript(node: GlobalNode, app: EngineCore | GameCore) {
		this.$app = app;
		this.$node = node;

		const viewport = this.getViewport();
		const helpers = this.getHelpers();
		const code = await this.getCode();

		return await this.getExec(code, {
			viewport,
			helpers,
		});
	}
}
