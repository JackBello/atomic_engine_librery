import type { TAnything, TFunction } from "@/app/types";
import type { TEventAnimation } from "./events";
import type { GameCore } from "../game";
import { EngineCore } from "../engine";
import stats from "stats.js"

import {
	$Canvas,
	_Collision,
	_Frame,
	_Script,
	_Worker,
	DispatchEvent,
	GetOptions,
} from "@/app/symbols";

import EventObserver from "../utils/observer";

export default class AnimationService {
	private $app: EngineCore | GameCore;

	protected _stats!: TAnything;
	protected _loop!: number;
	protected _events: EventObserver = new EventObserver();

	protected _status = {
		pause: false,
		playing: false,
	};

	get isPlaying() {
		return this._status.playing;
	}

	get isPause() {
		return this._status.pause;
	}

	constructor(app: EngineCore | GameCore) {
		this.$app = app;

		if (this.$app instanceof EngineCore && this.$app[GetOptions]().analytics) {
			this._stats = new stats()
			this._stats.setMode(0);
		}
	}

	protected loop = () => {
		if (this.$app instanceof EngineCore && this.$app[GetOptions]().analytics)
			this._stats.begin()


		this.$app[_Frame].controlFrame(performance.now());

		this[DispatchEvent]("animation:loop");

		if (this.$app instanceof EngineCore && this.$app[GetOptions]().analytics)
			this._stats.end()

		this._loop = window.requestAnimationFrame(this.loop);
	};

	play() {
		if (!this._status.playing) {
			this[DispatchEvent]("animation:play");

			this._status.playing = true;
			this._status.pause = false;

			this._loop = window.requestAnimationFrame(this.loop);
		}

		return this;
	}

	pause() {
		if (this._status.playing) {
			this[DispatchEvent]("animation:pause");

			window.cancelAnimationFrame(this._loop);

			this._status.playing = false;
			this._status.pause = true;
		}

		return this;
	}

	emit(name: TEventAnimation, callback: TFunction) {
		this._events.addEventListener(name, callback);

		return this;
	}

	analytics() {
		if (this.$app instanceof EngineCore && this.$app[GetOptions]().analytics) {
			this._stats.domElement.style.position = "absolute"
			this._stats.domElement.style.top = "15px"
			this._stats.domElement.style.right = "20px"
			this._stats.domElement.style.left = "initial"
			this._stats.domElement.style.scale = "1.5"

			this.$app[$Canvas].main.appendChild(this._stats.domElement)
		}
	}

	[DispatchEvent](name: TEventAnimation, ...args: TAnything[]) {
		this._events.emitEvent(name, args);
	}
}
