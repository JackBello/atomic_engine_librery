import { _Collision, _Input, _Render, _Script, GetOptions, SetGlobal } from "@/app/symbols";
import type { EngineCore } from "../engine";
import type { GameCore } from "../game";
import { ExecuteProcess } from "./symbols";

export default class FrameController {
	private $app: EngineCore | GameCore;

	private PHYSICS_DELTA_TIME: number
	private RENDER_DELTA_TIME: number

	protected _control = {
		lastTime: performance.now(),
		elapseTime: 0,
		frame: 0,
		physicsAccumulatedTime: 0,
		renderAccumulatedTime: 0
	};

	get FRAME() {
		return this._control.frame;
	}

	get DELTA() {
		return this._control.elapseTime / 1000;
	}

	get ELAPSE_TIME() {
		return this._control.elapseTime;
	}

	set physicsFrame(value: number) {
		this.PHYSICS_DELTA_TIME = 1 / value
	}

	set renderFrame(value: number) {
		this.RENDER_DELTA_TIME = 1 / value
	}

	constructor(app: EngineCore | GameCore) {
		this.$app = app;

		this.PHYSICS_DELTA_TIME = 1 / this.$app[GetOptions]().physics_frame
		this.RENDER_DELTA_TIME = 1 / this.$app[GetOptions]().render_frame
	}

	protected processLogic(deltaTime: number) {
		const isPreview = this.$app.global("mode") === "preview";
		const isPlayingGame =
			this.$app.mode === "game" && this.$app.global("status") === "play";

		if (isPlayingGame || isPreview) {
			this.$app[_Input][ExecuteProcess]();

			this.$app[_Script][ExecuteProcess](deltaTime);

			this.$app[_Collision][ExecuteProcess]();

			this.$app[SetGlobal]("dispatch-event", false);

			this._control.frame++;
		}
	}

	protected processRender() {
		this.$app[_Render][ExecuteProcess]();
	}

	public controlFrame(currentTime: number) {
		this._control.elapseTime = (currentTime - this._control.lastTime) / 1000;
		this._control.lastTime = currentTime;

		this._control.physicsAccumulatedTime += this._control.elapseTime
		this._control.physicsAccumulatedTime = Math.min(this._control.physicsAccumulatedTime, this.PHYSICS_DELTA_TIME * 10);

		while (this._control.physicsAccumulatedTime >= this.PHYSICS_DELTA_TIME) {
			this.processLogic(this.PHYSICS_DELTA_TIME)
			this._control.physicsAccumulatedTime -= this.PHYSICS_DELTA_TIME
		}

		this._control.renderAccumulatedTime += this._control.elapseTime
		if (this._control.renderAccumulatedTime >= this.RENDER_DELTA_TIME) {
			this.processRender()
			this._control.renderAccumulatedTime -= this.RENDER_DELTA_TIME
		}
	}
}
