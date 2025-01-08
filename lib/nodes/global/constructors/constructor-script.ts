import type { GlobalNode } from "../global-node";
import type { TAnything, TFunction } from "@/app/types";

import { $Scenes, _Frame, _Input, _Script } from "@/app/symbols";

import type { EngineCore } from "@/app/engine";
import type { GameCore } from "@/app/game";

import { ConstructorNodes } from "./constructor-nodes";
import { NodeDestroy } from "@/nodes/symbols";

export default class ConstructorScript {
    private $node!: GlobalNode;
    private $app!: EngineCore | GameCore;
    private $script!: string | URL;

    protected _restring = `
	const window = undefined;
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
    const console = undefined;
	`;

    protected CLASS = {
        getMethodsFromClass: (instance: GlobalNode, filters: string[] = []) => {
            const result: Record<string, TFunction> = {};

            const prototype = Object.getPrototypeOf(instance);

            const methods = Object.getOwnPropertyNames(prototype).filter(
                (method) =>
                    !Reflect.has(this.$node, method) && typeof prototype[method] === "function" && method !== "constructor",
            );

            if (filters.length > 0) {
                for (const method of methods) {
                    if (filters.includes(method)) {
                        result[method] = instance[method];
                    }
                }
            } else {
                for (const method of methods) {
                    result[method] = instance[method];
                }
            }

            return result;
        },
        getPropsFromClass: (instance: GlobalNode, filters: string[] = []) => {
            const result: Record<string, TAnything> = {};

            const props = Object.getOwnPropertyNames(instance).filter(
                (prop) => !Reflect.has(this.$node, prop)
            );

            if (filters.length > 0) {
                for (const prop of props) {
                    if (filters.includes(prop) && typeof instance[prop] === "function") {
                        result[prop] = instance[prop];
                    }
                    if (filters.includes(prop) && typeof instance[prop] !== "function") {
                        result[prop] = instance[prop];
                    }
                }
            } else {
                for (const prop of props) {
                    if (typeof instance[prop] === "function") {
                        result[prop] = instance[prop];
                    }

                    result[prop] = instance[prop];
                }
            }

            return result;
        },
    };

    protected REGEXP = {
        getNameFromClassIntoCode(code: string) {
            const match = code.match(/class\s+(\w+)/);

            return match ? match[1] : null;
        }
    };

    protected async getCode() {
        const script = this.$script;

        if (!script) return "";

        let code = "";

        if (script instanceof URL) {
            code = await this.$app.getResolver("script")(script) as string;
        } else if (URL.canParse(script)) {
            code = await this.$app.getResolver("script")(new URL(script)) as string;
        } else {
            code = script;
        }

        let result = "";

        result = `${this._restring}\n ${code.trim()}
        return new ${this.REGEXP.getNameFromClassIntoCode(code)}()`;

        return result;
    }

    protected async getExec(code: string) {
        const AsyncFunction = Object.getPrototypeOf(async () => { }).constructor;

        const helpers = this.$app[_Script].getHelpers();

        const $nodes = ConstructorNodes.getAll("nodes")
        const $math = ConstructorNodes.getAll("math")
        const allClass = { ...$nodes, ...$math }

        helpers.CurrentScene = this.$app[$Scenes].currentScene

        const destructuringHelpers = `{ ${Object.keys(helpers).join(", ")} }`
        const destructuringAllClass = `{ ${Object.keys(allClass).join(", ")} }`

        const execute: TFunction<TAnything> = new AsyncFunction(
            `${destructuringHelpers}, ${destructuringAllClass}`,
            code,
        );

        const responseClass = await execute(helpers, allClass);

        this.$node.$attributes.clear()

        if ("_preload" in responseClass) {
            await responseClass._preload.bind(this.$node)()
        }

        const result: {
            __FUNC__: Record<string, TFunction>;
            __VARS__: Record<string, TAnything>;
        } = {
            __FUNC__: this.CLASS.getMethodsFromClass(responseClass),
            __VARS__: this.CLASS.getPropsFromClass(responseClass),
        };

        return result;
    }

    public async executeScript(
        node: GlobalNode,
        app: EngineCore | GameCore,
        script: string | URL,
    ) {
        this.$app = app;
        this.$node = node;
        this.$script = script;

        return await this.getExec(await this.getCode());
    }

    [NodeDestroy]() {
        this.$app = null as TAnything;
        this.$node = null as TAnything;
    }
}
