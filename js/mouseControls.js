class MouseControls {
  constructor(container = window) {
    this.container = container;
    this.container.addEventListener('mousemove', this.changePos.bind(this));
    this.container.addEventListener('touchmove', this.changePos.bind(this));
    this.container.addEventListener('click', this.click.bind(this));
    this.container.addEventListener('mousedown', this.press.bind(this));
    this.container.addEventListener('touchstart', this.press.bind(this));
    this.container.addEventListener('contextmenu', this.contextmenu.bind(this));
    this.container.addEventListener('mouseup', this.release.bind(this));
    this.container.addEventListener('touchend', this.release.bind(this));
    this.container.addEventListener('wheel', this.scroll.bind(this));
  }

  changePos(e) {
    if (!(window.mouseMoved && typeof window.mouseMoved === "function")) return;
    if (e.touches && e.touches[0]) {
      window.isTouch = true
      window.mouseX = e.touches[0].clientX;
      window.mouseY = e.touches[0].clientY;
    } else {
      window.isTouch = false
      window.mouseX = e.layerX;
      window.mouseY = e.layerY;
    }
    mouseMoved(e);
  }

  click(e) {
    if (!(window.mouseClicked && typeof window.mouseClicked === "function")) return;
    if (e.touches && e.touches[0]) {
      window.isTouch = true
      window.mouseX = e.touches[0].clientX;
      window.mouseY = e.touches[0].clientY;
    } else {
      window.isTouch = false
      window.mouseX = e.layerX;
      window.mouseY = e.layerY;
    }
    mouseClicked(e);
  }

  press(e) {
    if (!(window.mousePressed && typeof window.mousePressed === "function")) return;
    if (e.touches && e.touches[0]) {
      window.isTouch = true
      window.mouseX = e.touches[0].clientX;
      window.mouseY = e.touches[0].clientY;
    } else {
      window.isTouch = false
      window.mouseX = e.layerX;
      window.mouseY = e.layerY;
    }
    mousePressed(e);
  }

  release(e) {
    if (!(window.mouseReleased && typeof window.mouseReleased === "function")) return;
    if (e.touches && e.touches[0]) {
      window.isTouch = true
      window.mouseX = e.touches[0].clientX;
      window.mouseY = e.touches[0].clientY;
    } else {
      window.isTouch = false
      window.mouseX = e.layerX;
      window.mouseY = e.layerY;
    }
    mouseReleased(e);
  }

  contextmenu(e) {
    if (!(window.contextMenu && typeof window.contextMenu === "function")) return;
    if (e.touches && e.touches[0]) {
      window.isTouch = true
      window.mouseX = e.touches[0].clientX;
      window.mouseY = e.touches[0].clientY;
    } else {
      window.isTouch = false
      window.mouseX = e.layerX;
      window.mouseY = e.layerY;
    }
    contextMenu(e);
  }

  scroll(e) {
    if (!(window.mouseScroll && typeof window.mouseScroll === "function")) return;
    if (e.touches && e.touches[0]) {
      window.isTouch = true
      window.mouseX = e.touches[0].clientX;
      window.mouseY = e.touches[0].clientY;
    } else {
      window.isTouch = false
      window.mouseX = e.layerX;
      window.mouseY = e.layerY;
    }
    mouseScroll(e);
  }
}
