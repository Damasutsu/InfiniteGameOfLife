class Layer {
  constructor(container = document.body) {
    this.canvas = document.createElement('canvas')
    this.canvas.setAttribute('tabindex', 0)
    this.canvas.classList.add('layer')
    this.context = this.canvas.getContext('2d')
    container.appendChild(this.canvas)
    this.size(100, 100)
    this.fitToContainer.call(this)
    addEventListener('resize', function() {
      this.fitToContainer.call(this)
    }.bind(this))
  }

  resize(func) {
    addEventListener('resize', func)
  }

  line(x1, y1, x2, y2) {
    this.context.beginPath()
    this.context.moveTo(x1, y1)
    this.context.lineTo(x2, y2)
    if (this.doStroke) this.context.stroke()
  }

  rect(x1, y1, w, h) {
    this.context.beginPath()
    this.context.rect(x1, y1, w, h)
    if (this.doFill) this.context.fill(this.fillMode)
    if (this.doStroke) this.context.stroke()
  }

  rectRounded(x, y, w, h, r) {
    this.context.beginPath()
    this.context.moveTo(x + r, y)
    this.context.lineTo(x + w - r, y)
    this.context.quadraticCurveTo(x + w, y, x + w, y + r)
    this.context.lineTo(x + w, y + h - r)
    this.context.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    this.context.lineTo(x + r, y + h)
    this.context.quadraticCurveTo(x, y + h, x, y + h - r)
    this.context.lineTo(x, y + r)
    this.context.quadraticCurveTo(x, y, x + r, y)
    if (this.doFill) this.context.fill(this.fillMode)
    if (this.doStroke) this.context.stroke()
  }

  circle(x, y, r) {
    this.context.beginPath()
    this.context.arc(x, y, r, 0, 2 * Math.PI, false)
    if (this.doFill) this.context.fill(this.fillMode)
    if (this.doStroke) this.context.stroke()
  }

  text(text, x, y) {
    if (this.doFill) this.context.fillText(text, x, y)
    if (this.doStroke) this.context.strokeText(text, x, y)
  }

  textFont(font) {
    this.context.font = font
  }

  textAlign(align) {
    this.context.textAlign = align
  }


  textBaseline(baseline) {
    this.context.textBaseline = baseline
  }

  beginShape() {
    this.vertexMove = true
    this.context.beginPath()
  }

  vertex(x, y) {
    if (this.vertexMove) {
      this.vertexMove = false
      this.vertexStart = {
        x,
        y
      }
      this.context.moveTo(x, y)
      return
    }

    this.context.lineTo(x, y)
  }

  endShape(flag) {
    if (flag) {
      this.context.closePath()
    }
    if (this.doFill) this.context.fill(this.fillMode)
    if (this.doStroke) this.context.stroke()
  }

  point(x, y) {
    this.context.beginPath()
    let tempColor = this.context.fillStyle
    this.context.fillStyle = this.context.strokeStyle
    this.context.arc(x, y, this.context.lineWidth / 2, 0, 2 * Math.PI, false)
    if (this.doStroke) this.context.fill(this.fillMode)
    this.context.fillStyle = tempColor
  }

  fill(color) {
    let fillColor
    this.doFill = true
    if (arguments.length === 1) {
      if (typeof color == 'number') {
        fillColor = `rgb(${color}, ${color}, ${color})`
      } else {
        fillColor = color
      }
    } else if (arguments.length === 2) {
      fillColor = `rgba(${color}, ${color}, ${color}, ${arguments[1]})`
    } else if (arguments.length === 3) {
      fillColor = `rgb(${color}, ${arguments[1]}, ${arguments[2]})`
    } else if (arguments.length === 4) {
      fillColor = `rgba(${color}, ${arguments[1]}, ${arguments[2]}, ${arguments[3]})`
    }
    this.context.fillStyle = fillColor
  }

  fillRule(rule) {
    this.fillMode = rule
  }

  noFill() {
    this.doFill = false
  }

  stroke(color) {
    let strokeColor
    this.doStroke = true
    if (arguments.length === 1) {
      if (typeof color == 'number') {
        strokeColor = `rgb(${color}, ${color}, ${color})`
      } else {
        strokeColor = color
      }
    } else if (arguments.length === 2) {
      strokeColor = `rgba(${color}, ${color}, ${color}, ${arguments[1]})`
    } else if (arguments.length === 3) {
      strokeColor = `rgb(${color}, ${arguments[1]}, ${arguments[2]})`
    } else if (arguments.length === 4) {
      strokeColor = `rgba(${color}, ${arguments[1]}, ${arguments[2]}, ${arguments[3]})`
    }
    this.context.strokeStyle = strokeColor
  }

  noStroke() {
    this.doStroke = false
    this.context.strokeStyle = `transparent`
  }

  clear() {
    this.context.clearRect(0, 0, this.w, this.h)
  }

  strokeWeight(size) {
    this.context.lineWidth = size
  }

  image(image, x, y, w, h, x2, y2, w2, h2) {
    this.context.drawImage(image, x, y, w, h, x2, y2, w2, h2)
  }

  background(color) {
    let backgroundColor
    if (arguments.length === 1) {
      if (typeof color == 'number') {
        backgroundColor = `rgb(${color}, ${color}, ${color})`
      } else if (color instanceof Image) {
        this.context.drawImage(color, 0, 0)
        return
      } else {
        backgroundColor = color
      }
    } else if (arguments.length === 2) {
      backgroundColor = `rgba(${color}, ${color}, ${color}, ${arguments[1]})`
    } else if (arguments.length === 3) {
      backgroundColor = `rgb(${color}, ${arguments[1]}, ${arguments[2]})`
    } else if (arguments.length === 4) {
      backgroundColor = `rgba(${color}, ${arguments[1]}, ${arguments[2]}, ${arguments[3]})`
    }
    let tempColor = this.context.fillStyle
    this.context.fillStyle = backgroundColor
    this.context.fillRect(0, 0, this.w, this.h)
    this.context.fillStyle = tempColor
  }

  push() {
    this.context.save()
  }

  pop() {
    this.context.restore()
  }

  translate(x, y) {
    this.context.translate(x, y)
  }

  zoom(scale) {
    this.zoomScale = scale
    this.context.scale(scale, scale)
  }

  fullscreen() {
    this._isFullscreen = true
    this.canvas.style.width = `100%`
    this.canvas.style.height = `100%`
    this.fitToContainer.call(this)
  }

  size(w, h) {
    this._isFullscreen = false
    this.w = this.canvas.width = w
    this.h = this.canvas.height = h
    this.canvas.style.width = `${this.w}px`
    this.canvas.style.height = `${this.h}px`
  }

  fitToContainer(e) {
    //this.zoom = e.scale
    //if (e.scale !== 1) return
    if (this._isFullscreen) {
      this.w = this.canvas.width = this.canvas.offsetWidth
      this.h = this.canvas.height = this.canvas.offsetHeight
      return
    }
    this.canvas.width = this.w
    this.canvas.height = this.h
    this.canvas.style.width = `${this.w}px`
    this.canvas.style.height = `${this.h}px`
  }
}