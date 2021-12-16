class Loop {
  constructor(...funcs) {
    this.funcs = funcs;
    this.deltaTime = 0;
    this.lastUpdate = window.performance.now();
    this._frameRate = 0;
    this._frameCount = 0;
    this._targetFrameRate = 60;
    this._loop = true;
    this.update();
  }

  frameRate(frameRate = -1) {
    if (frameRate >= 0) {
      this._targetFrameRate = frameRate;
      if (frameRate === 0) {
        this._frameRate = frameRate;
      }
    } else {
      return this._frameRate;
    }
  }

  update() {
    let now = window.performance.now();

    this.deltaTime = now - this.lastUpdate;

    if (this.deltaTime >= 1000 / this._targetFrameRate - 5) {
      this._frameRate = 1000 / this.deltaTime;

      now = window.performance.now();

      this.deltaTime = now - this.lastUpdate;

      this.lastUpdate = window.performance.now();
      this._frameCount++;
      if (this._frameRate < 1000 / this.deltaTime) return;
      for (var i = 0; i < this.funcs.length; i++) {
        this.funcs[i](this.deltaTime / 1000);
      }
    }

    if (this._loop) {
      requestAnimationFrame(this.update.bind(this));
    }

  }

  stop() {
    this._loop = false;
  }

  start() {
    if (!this._loop) {
      this._loop = true;
      this.update();
    }
  }

  add(...funcs) {
    this.funcs.push(...funcs);
  }
}