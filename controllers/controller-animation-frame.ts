export class ControllerAnimationFrame {
  protected _velocityFramesPerSeconds = 0;
  protected _delayTime = 0
  protected _delayWithFramePerSeconds = this._delayTime / this._velocityFramesPerSeconds;
  protected _time: number | null = null;
  protected _frame = -1
  protected _animationFrameRef!: number;
  protected _status = {
    pause: false,
    playing: false
  }
  protected _state = {
    frames: 0,
    startTime: performance.now(),
    fps: 0
  }
  protected callback!: (object: { time: number, frame: number }) => void;

  get isPlaying() {
    return this._status.playing
  }

  get isPause() {
    return this._status.pause
  }

  set delay(value: number) {
    this._delayTime = value;
    this._delayWithFramePerSeconds = value / this._velocityFramesPerSeconds;
    this._frame = -1;
    this._time = null;
  }

  get delay() {
    return this._delayTime
  }

  get fps() {
    return this._velocityFramesPerSeconds;
  }

  set fps(fps: number) {
    this._velocityFramesPerSeconds = fps;
    this._delayWithFramePerSeconds = this._delayTime / fps;
    this._frame = -1;
    this._time = null;
  }

  get watchFPS() {
    return this._state.fps;
  }

  protected calculateFPS() {
    const time = performance.now();
    const delayTime = time - this._state.startTime;

    if (delayTime > this._delayTime) {
      this._state.fps = Math.round(this._state.frames * this._delayTime / delayTime);

      this._state.frames = 0;
      this._state.startTime = time;
    }

    this._state.frames++;
  }

  protected loop(timestamp: number, self: any) {
    if (self._time === null) self._time = timestamp;

    let seconds = Math.floor((timestamp - self._time) / self._delayWithFramePerSeconds)

    if (seconds > self._frame) {
      self._frame = seconds;

      self.calculateFPS();

      self.callback({
        time: timestamp,
        frame: self._frame
      })
    }

    self._animationFrameRef = window.requestAnimationFrame((ts) => self.loop(ts, self))
  }

  public handler(callback: (object: { time: number, frame: number }) => void) {
    this.callback = callback;
  }

  public play() {
    if (!this._status.playing) {
      this._status.playing = true;
      this._status.pause = false;
      this._animationFrameRef = window.requestAnimationFrame((ts) => this.loop(ts, this));
    }
  }

  public pause() {
    if (this._status.playing) {
      window.cancelAnimationFrame(this._animationFrameRef);
      this._status.playing = false;
      this._status.pause = true;

      this._time = null;
      this._frame = -1;
    }
  }
}
