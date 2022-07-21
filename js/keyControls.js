class KeyControls {
  constructor(_container = window, _keysList = ['KeyW', 'KeyA', 'KeyS', 'KeyD']) {
    this.keysList = _keysList
    this.keys = {}
    this.container = _container
    this.keysList.forEach(function(key) {
      this.keys[key] = {
        pressed: false,
        down: false,
        changed: false
      }
    }.bind(this))
    this.container.addEventListener('blur', (() => {
      this.keysList.forEach(function(key) {
        this.keys[key] = {
          pressed: false,
          down: false,
          changed: false
        }
      }.bind(this))
    }).bind(this))
    this.container.addEventListener('keydown', this.changeState.bind(this))
    this.container.addEventListener('keyup', this.changeState.bind(this))
  }

  changeState(e) {
    if (!this.keysList.includes(e.code)) return
    if (!this.keys[e.code].changed && e.type === 'keydown') {
      this.keys[e.code].down = true
      this.keys[e.code].changed = true
      this.keys[e.code].released = false
    } else if (e.type === 'keyup') {
      this.keys[e.code].down = false
      this.keys[e.code].changed = false
      this.keys[e.code].released = true
    }
    this.keys[e.code].pressed = e.type === 'keydown'
    if (e.type === 'keydown' && (window.keyPressed && typeof window.keyPressed === "function")) keyPressed(e)
    if (e.type === 'keyup' && (window.keyReleased && typeof window.keyReleased === "function")) keyReleased(e)
  }

  update() {
    this.keysList.forEach(function(key) {
      this.keys[key].down = false
      this.keys[key].released = false
    }.bind(this))
  }
}
