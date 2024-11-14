import type { TAnything, TFunction } from "@/app/types";
import type { TEventAnimation } from "./events";
import type { GameCore } from "../game";
import type { EngineCore } from "../engine";

import {
	_Collision,
	_Frame,
	_Script,
	_Worker,
	DispatchEvent,
} from "@/app/symbols";

import EventObserver from "../utils/observer";

export default class AnimationService {
	private $app: EngineCore | GameCore;

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
	}

	protected loop = (timestamp: number) => {
		this.$app[_Frame].controlUnlimitedFrame(timestamp);

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

	[DispatchEvent](name: TEventAnimation, ...args: TAnything[]) {
		this._events.emitEvent(name, args);
	}
}
