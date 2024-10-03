import type { TAnything, TFunction } from "@/types";
import type { TEventAnimation } from "./event.type";
import type { AtomicGame } from "@/atomic-game";
import type { AtomicEngine } from "@/atomic-engine";

import {
	DispatchEvent,
	_Script,
	_Drawer,
	_Collision,
	SetGlobal,
} from "@/symbols";

import EventObserver from "../utils/observer";

export default class AnimationService {
	private $app: AtomicEngine | AtomicGame;

	protected _loop!: number;
	protected _events: EventObserver = new EventObserver();

	protected _deltaTime = 0;
	protected _lastTime = 0;
	protected _status = {
		pause: false,
		playing: false,
	};

	get DELTA_TIME() {
		return this._deltaTime;
	}

	get TIME_STAMP() {
		return this._lastTime;
	}

	get isPlaying() {
		return this._status.playing;
	}

	get isPause() {
		return this._status.pause;
	}

	constructor(app: AtomicEngine | AtomicGame) {
		this.$app = app;
	}

	protected async loop(timestamp: number) {
		if (!this._lastTime) this._lastTime = timestamp;

		this._deltaTime = timestamp - this._lastTime;

		const isPreview = this.$app.global("mode") === "preview";
		const isPlayingGame =
			this.$app.mode === "game" && this.$app.global("status") === "play";

		if (isPlayingGame || isPreview) {
			this.$app[_Collision].process();

			await this.$app[_Script].process({
				timestamp,
				deltaTime: this._deltaTime,
			});
		}

		if (isPlayingGame || this.$app.mode === "editor") {
			await this.$app[_Drawer].process();

			this.$app[SetGlobal]("re-draw", false);
		}

		this._loop = window.requestAnimationFrame(this.loop.bind(this));
	}

	play() {
		if (!this._status.playing) {
			this[DispatchEvent]("animation:play");

			this._status.playing = true;
			this._status.pause = false;

			this._loop = window.requestAnimationFrame(this.loop.bind(this));
		}

		return this;
	}

	pause() {
		if (this._status.playing) {
			this[DispatchEvent]("animation:pause");

			window.cancelAnimationFrame(this._loop);

			this._status.playing = false;
			this._status.pause = true;

			this._lastTime = 0;
			this._deltaTime = 0;
		}

		return this;
	}

	emit(name: TEventAnimation, callback: TFunction) {
		this._events.addEventListener(name, callback);

		return this;
	}

	[DispatchEvent](name: TEventAnimation, ...args: TAnything[]) {
		this._events.emitEvent(name, args);
	}
}
