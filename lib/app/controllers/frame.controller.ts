import { _Collision, _Input, _Render, _Script, SetGlobal } from "@/app/symbols";
import type { EngineCore } from "../engine";
import type { GameCore } from "../game";
import { ExecuteProcess } from "./symbols";

export default class FrameController {
	private $app: EngineCore | GameCore;

	protected _fps = 75;
	protected _frameDuration = 1000 / this._fps;
	protected _maxFrameSkip = 5;

	protected _control = {
		lastTime: performance.now(),
		elapseTime: 0,
		timestamp: 0,
		frame: 0,
		fps: 0,
	};

	get FPS() {
		return this._control.fps.toFixed(0);
	}

	get FRAME() {
		return this._control.frame;
	}

	get DELTA() {
		return this._control.elapseTime / 1000;
	}

	get ELAPSE_TIME() {
		return this._control.elapseTime;
	}

	constructor(app: EngineCore | GameCore) {
		this.$app = app;
	}

	protected process() {
		const isPreview = this.$app.global("mode") === "preview";
		const isPlayingGame =
			this.$app.mode === "game" && this.$app.global("status") === "play";

		if (isPlayingGame || isPreview) {
			this.$app[_Input][ExecuteProcess]();

			this.$app[_Script][ExecuteProcess](this._control.elapseTime / 1000);

			this.$app[_Collision][ExecuteProcess]();

			this.$app[SetGlobal]("dispatch-event", false);

			this._control.frame++;
		}
	}

	protected calculateFramesPerSecond() {
		const currentFPS = 1000 / this._control.elapseTime;

		this._control.fps = this._control.fps * 0.9 + currentFPS * (1 - 0.9);
	}

	public controlUnlimitedFrame(timestamp: number) {
		this._control.elapseTime = timestamp - this._control.lastTime;

		this.calculateFramesPerSecond();

		this.process();

		this.$app[_Render][ExecuteProcess]();

		this._control.lastTime = timestamp;
	}

	public controlLimitedFrameWithWhile(timestamp: number) {
		this._control.elapseTime += timestamp - this._control.lastTime;
		let framesSkipped = 0;

		while (
			this._control.elapseTime >= this._frameDuration &&
			framesSkipped < this._maxFrameSkip
		) {
			this.calculateFramesPerSecond();

			this.process();

			this._control.elapseTime -= this._frameDuration;
			framesSkipped++;
		}

		this.$app[_Render][ExecuteProcess]();

		this._control.lastTime = timestamp;
	}

	public controlLimitedFrameWithIf(timestamp: number) {
		this._control.elapseTime = timestamp - this._control.lastTime;

		if (this._control.elapseTime >= this._frameDuration) {
			this.calculateFramesPerSecond();

			this.process();

			this._control.lastTime = timestamp;
		}

		this.$app[_Render][ExecuteProcess]();
	}
}
