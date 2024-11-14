import {
    _Collision,
    _Input,
    _Render,
    _Script,
    GetOptions,
    SetGlobal,
} from "@/app/symbols";
import { EngineCore } from "../engine";
import type { GameCore } from "../game";
import { ExecuteProcess } from "./symbols";

export default class FrameController {
    private $app: EngineCore | GameCore;

    protected _fps = 75;
    protected _frameDuration = 1000 / this._fps;
    protected _maxFrameSkip = 5;

    protected _control = {
        lastTime: performance.now(),
        deltaTime: 0,
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
        return this._control.deltaTime / 1000;
    }

    constructor(app: EngineCore | GameCore) {
        this.$app = app;
    }

    protected process() {
        const isPreview = this.$app.global("mode") === "preview";
        const isPlayingGame = this.$app.mode === "game" &&
            this.$app.global("status") === "play";

        if (isPlayingGame || isPreview) {
            this.$app[_Input][ExecuteProcess]();

            this.$app[_Collision][ExecuteProcess]();

            this.$app[_Script][ExecuteProcess](
                this._control.deltaTime / 1000,
            );

            this._control.frame++;

            this.$app[SetGlobal]("dispatch-event", false);
        }

        if (
            this.$app instanceof EngineCore &&
            this.$app[GetOptions]().renderProcess === "main-thread"
        ) {
            this.$app[_Render][ExecuteProcess]();
        }
    }

    protected calculateFramesPerSecond() {
        const currentFPS = 1000 / this._control.deltaTime;

        this._control.fps = this._control.fps * 0.9 +
            currentFPS * (1 - 0.9);
    }

    public controlUnlimitedFrame(timestamp: number) {
        this._control.deltaTime = timestamp - this._control.lastTime;

        this.calculateFramesPerSecond();

        this.process();

        this._control.lastTime = timestamp;
    }

    public controlLimitedFrameWithWhile(timestamp: number) {
        this._control.deltaTime += timestamp - this._control.lastTime;
        let framesSkipped = 0;

        while (
            this._control.deltaTime >= this._frameDuration &&
            framesSkipped < this._maxFrameSkip
        ) {
            this.calculateFramesPerSecond();

            this.process();

            this._control.deltaTime -= this._frameDuration;
            framesSkipped++;
        }

        this._control.lastTime = timestamp;
    }

    public controlLimitedFrameWithIf(timestamp: number) {
        this._control.deltaTime = timestamp - this._control.lastTime;

        if (this._control.deltaTime >= this._frameDuration) {
            this.calculateFramesPerSecond();

            this.process();

            this._control.lastTime = timestamp;
        }
    }
}
