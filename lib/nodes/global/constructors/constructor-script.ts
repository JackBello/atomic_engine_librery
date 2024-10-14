import type { GlobalNode } from "../global-node";
import type { TAnything, TFunction } from "@/types";

import { GetNodesToConstructorNode, GetNodeToConstructorNode } from "@/nodes/symbols";
import { $Scenes, _Input, GetOptions, SetGlobal } from "@/symbols";

import { EngineCore } from "@/app/engine";
import { GameCore } from "@/app/game";

import ConstructorNodes from "./constructor-nodes";
import type { Scene } from "../scene";

export default class ConstructorScript {
	private $node!: GlobalNode;
	private $app!: EngineCore | GameCore;

	protected _restring = `const window = undefined;
    const document = undefined;
    const alert = undefined;
    const confirm = undefined;
    const prompt = undefined;
    const setTimeout = undefined;
    const setInterval = undefined;
    const fetch = undefined;
    const XMLHttpRequest = undefined;
    const localStorage = undefined;
    const sessionStorage = undefined;
    const indexedDB = undefined;
    const WebSocket = undefined;
    const EventSource = undefined;
    const Worker = undefined;
    const SharedWorker = undefined;
    const Notification = undefined;
    const requestAnimationFrame = undefined;
    const cancelAnimationFrame = undefined;
    const history = undefined;
    const location = undefined;
    const navigator = undefined;
    const screen = undefined;
    const performance = undefined;
    const geolocation = undefined;
    const FileReader = undefined;
    const MutationObserver = undefined;
    const ResizeObserver = undefined;
    const IntersectionObserver = undefined;
    const Crypto = undefined;
    const AudioContext = undefined;
    const CanvasRenderingContext2D = undefined;
    const OffscreenCanvas = undefined;
    const SpeechRecognition = undefined;
    const MediaRecorder = undefined;
    const MediaStream = undefined;
    const URL = undefined;
    const Blob = undefined;
    const Image = undefined;
    const ImageBitmap = undefined;
    const DeviceOrientationEvent = undefined;
    const DeviceMotionEvent = undefined;
    const MediaQueryList = undefined;
    const MediaQueryListEvent = undefined;
    const customElements = undefined;
    const ShadowRoot = undefined;
    const HTMLTemplateElement = undefined;
    const HTMLSlotElement = undefined;
    const CSS = undefined;
    const CSSStyleSheet = undefined;
    const Audio = undefined;
    const Video = undefined;
    const HTMLAudioElement = undefined;
    const HTMLVideoElement = undefined;
    const HTMLCanvasElement = undefined;
    const WebGLRenderingContext = undefined;
    const WebGL2RenderingContext = undefined;
    const Cache = undefined;
    const CacheStorage = undefined;
    const clipboard = undefined;
    const SpeechSynthesis = undefined;
    const SpeechSynthesisUtterance = undefined;
    const BatteryManager = undefined;
    const NetworkInformation = undefined;
    const NotificationEvent = undefined;
    const DataTransfer = undefined;
    const DataTransferItem = undefined;
    const DataTransferItemList = undefined;
    const FormData = undefined;
    const Headers = undefined;
    const Request = undefined;
    const Response = undefined;
    const AbortController = undefined;
    const AbortSignal = undefined;
    const Bluetooth = undefined;
    const PaymentRequest = undefined;
    const PaymentResponse = undefined;
    const PaymentAddress = undefined;
    const URLSearchParams = undefined;
    const DOMParser = undefined;
    const XMLSerializer = undefined;
    const TextDecoder = undefined;
    const TextEncoder = undefined;
    const BroadcastChannel = undefined;
    const MessageChannel = undefined;
    const MessagePort = undefined;
    const MessageEvent = undefined;
    const NotificationPermission = undefined;
    const PerformanceObserver = undefined;
    const PerformanceEntry = undefined;
    const PerformanceNavigation = undefined;
    const PerformanceResourceTiming = undefined;
    const PerformanceTiming = undefined;
    const ServiceWorker = undefined;
    const ServiceWorkerContainer = undefined;
    const ServiceWorkerRegistration = undefined;
    const PushManager = undefined;
    const PushSubscription = undefined;
    const File = undefined;
    const FileList = undefined;
    const DataView = undefined;
    const ArrayBuffer = undefined;
    const Int8Array = undefined;
    const Uint8Array = undefined;
    const Uint8ClampedArray = undefined;
    const Int16Array = undefined;
    const Uint16Array = undefined;
    const Int32Array = undefined;
    const Uint32Array = undefined;
    const Float32Array = undefined;
    const Float64Array = undefined;
    const BigInt64Array = undefined;
    const BigUint64Array = undefined;
    const WebAssembly = undefined;
    const importScripts = undefined;
    const JSON = undefined;
    const atob = undefined;
    const btoa = undefined;
    const console = undefined;`;

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
				"_add",
				"utils",
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
					if (typeof instance[prop] === "function")
						result[prop] = instance[prop].bind(this.$node);

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

	protected getHelpers() {
		const $Timer = {
			timeout: (time: number, callback: TFunction) => 
				setTimeout(callback, time)
			,
			interval: (time: number, callback: TFunction) => 
				setInterval(callback, time)
			,
			clear: (reference: number, type: "interval" | "timeout") => type === "interval" ? clearInterval(reference) : clearTimeout(reference)
		};

		const $Node = {
			collider: () => {
				const collision = this.$node.$nodes.all.find(
					(node) => node.NODE_NAME === "CollisionShape2D",
				);

				return collision?.getCollider();
			},
			destroy: () => {
				this.$app.ROOT.deleteNodeByPath(this.$node.path, "index");

				const _destroy = this.$node.$functions.get("_destroy");

				if (_destroy) _destroy();
			},
		};

		const $Game = {
			finish: () => {
				this.$app[SetGlobal]("status", "pause");
			},
			reset: () => {
				this.$app[SetGlobal]("reset", true);
				this.$app[$Scenes].reset(this.$app[$Scenes].currentScene as Scene);
				this.$app[SetGlobal]("status", "play");
			},
			reload: () => {

			},
			pause: () => {
				this.$app[SetGlobal]("status", "pause");
			},
		};

		const $Logger = {
			message: (...data: TAnything[]) => {
				console.log(...data);
			},
			error: (...data: TAnything[]) => {
				console.error(...data);
			},
			warning: (...data: TAnything[]) => {
				console.warn(...data);
			},
			info: (...data: TAnything[]) => {
				console.info(...data);
			},
		};

		const $Window = {
			viewport: () => {
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
		}

		const $Input = this.$app[_Input];

		const $Nodes = ConstructorNodes[GetNodesToConstructorNode]()

		const $Scene = this.$app.scenes.currentScene;

		return {
			$Input,
			$Logger,
			$Game,
			$Timer,
			$Window,
			$Nodes,
			$Node,
			$Scene
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
			result = `${this._restring} with(helpers) {\n\nwith (node) {\n\n${code
				.trim()
				.replace(/@expose /g, "")}; ${this.REGEXP.getExpressionIntoCode(
				code.trim(),
			)}\n\n}\n\n}`;
		}

		if (this.$node.scriptMode === "class") {
			result = `${this._restring}\n with(helpers) { ${code.trim()}
        return new ${this.REGEXP.getNameFromClassIntoCode(code)}() }`;
		}

		return result;
	}

	protected async getExec(code: string, helpers: Record<string, any>) {
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
			execute = new AsyncFunction("helpers", code);

			result = await execute(helpers);
		} else {
			const extendsClass = ConstructorNodes[GetNodeToConstructorNode](
				this.$node.NODE_NAME,
			);

			const execute = new AsyncFunction(
				`node, helpers, ${this.$node.NODE_NAME}`,
				code,
			);

			result = await execute(
				this.$node,
				helpers,
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

		const helpers = this.getHelpers();
		const code = await this.getCode();

		return await this.getExec(code, helpers);
	}
}
