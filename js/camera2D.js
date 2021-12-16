function lerp(start, end, amt) {
  return start + (end - start) * amt;
}

class Camera2D {
  constructor(pos) {
    this.followPos = new Vector(layer.w / 2 - pos.x, layer.h / 2 - pos.y);
    this.pos = new Vector()
    this.zoom = 1
    this.speed = 1
    this.target = new Vector()
    this.follow()
  }

  set(target, speed = 1) {
    this.speed = speed !== this.speed ? speed : this.speed
    this.followPos.set(lerp(this.pos.x, layer.w / 2 - target.x, this.speed), lerp(this.pos.y, layer.h / 2 - target.y, this.speed));
    this.target.set(lerp(layer.w / 2 - this.pos.x, target.x, this.speed), lerp(layer.h / 2 - this.pos.y, target.y, this.speed))
  }

  setZoom(zoom) {
    this.zoom = zoom
  }

  follow(func = function() {}) {
    layer.push();
    this.pos.x = this.followPos.x;
    this.pos.y = this.followPos.y;
    layer.translate(layer.w / 2, layer.h / 2);
    layer.zoom(this.zoom);
    layer.translate(-layer.w / 2 + this.pos.x, -layer.h / 2 + this.pos.y);
    func();
    layer.pop();
  }
}