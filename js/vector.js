class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this._x
    this._y
    this._z

    if (arguments.length === 1) {
      y = x
      z = x
    } else if (arguments.length === 2) {
      if (x instanceof Vector) {
        z = y
        y = x.y
        x = x.x
      } else if (y instanceof Vector) {
        z = y.y
        y = y.x
      }
    }

    this.x = x
    this.y = y
    this.z = z
  }

  get x() {
    return this._x
  }

  set x(val) {
    this._x = Number(val)
  }

  get y() {
    return this._y
  }

  set y(val) {
    this._y = Number(val)
  }


  get z() {
    return this._z
  }

  set z(val) {
    this._z = Number(val)
  }

  set(x, y, z = 0) {
    if (arguments.length === 1) {
      y = x
      z = x
    } else if (arguments.length === 2) {
      if (x instanceof Vector) {
        z = y
        y = x.y
        x = x.x
      } else if (y instanceof Vector) {
        z = y.y
        y = y.x
      }
    }

    this.x = x
    this.y = y
    this.z = z
  }

  dot(vec) {
    if (vec instanceof Vector) {
      return this.x * vec.x + this.y * vec.y + this.z * vec.z
    }
  }

  static dot(vec, vec2) {
    if (vec instanceof Vector && vec2 instanceof Vector) {
      return vec.x * vec2.x + vec.y * vec2.y + vec.z * vec2.z
    }
  }

  cross(vec) {
    if (vec instanceof Vector) {
      let x = this.y * vec.z - this.z * vec.y
      let y = this.z * vec.x - this.x * vec.z
      let z = this.x * vec.y - this.y * vec.x;
      [this.x, this.y, this.z] = [x, y, z]
      return this
    }
  }

  static cross(vec, vec2) {
    if (vec instanceof Vector && vec2 instanceof Vector) {
      let x = vec.y * vec2.z - vec.z * vec2.y
      let y = vec.z * vec2.x - vec.x * vec2.z
      let z = vec.x * vec2.y - vec.y * vec2.x
      return new Vector(x, y, z)
    }
  }

  get angle() {
    return Math.atan2(this.y, this.x)
  }

  static fromAngle(angle, length = 1) {
    let x, y
    x = Math.cos(angle)
    y = Math.sin(angle)
    return new Vector(x, y).mult(length)
  }

  static fromAngles(angle1, angle2, length = 1) {
    let x, y, z
    x = Math.sin(angle2) * Math.cos(angle1)
    y = Math.sin(angle2) * Math.sin(angle1)
    z = Math.sin(angle1)
    return new Vector(x, y, z).mult(length)
  }

  setAngle(angle, length = 1) {
    this.x = Math.cos(angle)
    this.y = Math.sin(angle)
    this.mult(length)
  }

  setAngles(angle1, angle2, length = 1) {
    this.x = Math.sin(angle2) * Math.cos(angle1)
    this.y = Math.sin(angle2) * Math.sin(angle1)
    this.z = Math.sin(angle1)
    this.mult(length)
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }


  set length(val) {
    this.norm().mult(val)
  }

  get lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }

  add(vec) {
    if (!(vec instanceof Vector)) {
      vec = new Vector(vec, vec)
    }
    this.x += vec.x
    this.y += vec.y
    this.z += vec.z
    return this
  }

  static add(vec, vec2) {
    if (vec instanceof Vector) {
      if (!(vec2 instanceof Vector)) {
        vec2 = new Vector(vec2, vec2)
      }
      let x, y, z
      x = vec.x + vec2.x
      y = vec.y + vec2.y
      z = vec.z + vec2.z
      return new Vector(x, y, z)
    }
  }

  sub(vec) {
    if (!(vec instanceof Vector)) {
      vec = new Vector(vec, vec)
    }
    this.x -= vec.x
    this.y -= vec.y
    this.z -= vec.z
    return this
  }

  static sub(vec, vec2) {
    if (vec instanceof Vector) {

      if (!(vec2 instanceof Vector)) {
        vec2 = new Vector(vec2, vec2)
      }
      let x = vec.x - vec2.x,
        y = vec.y - vec2.y,
        z = vec.z - vec2.z
      return new Vector(x, y, z)
    }
  }

  mult(vec) {
    if (!(vec instanceof Vector)) {
      vec = new Vector(vec, vec, vec)
    }
    this.x *= vec.x
    this.y *= vec.y
    this.z *= vec.z
    return this
  }

  static mult(vec, vec2) {
    if (vec instanceof Vector) {
      if (!(vec2 instanceof Vector)) {
        vec2 = new Vector(vec2, vec2)
      }
      let x = vec.x * vec2.x,
        y = vec.y * vec2.y,
        z = vec.z * vec2.z
      return new Vector(x, y, z)
    }
  }

  div(vec) {
    if (!(vec instanceof Vector)) {
      vec = new Vector(vec, vec)
    }
    if (this.x !== 0 && vec.x !== 0) {
      this.x = this.x / vec.x
    } else {
      this.x = 0
    }

    if (this.y !== 0 && vec.y !== 0) {
      this.y = this.y / vec.y
    } else {
      this.y = 0
    }

    if (this.z !== 0 && vec.z !== 0) {
      this.z = this.z / vec.z
    } else {
      this.z = 0
    }
    return this
  }

  static div(vec, vec2) {
    if (vec instanceof Vector) {
      if (!(vec2 instanceof Vector)) {
        vec2 = new Vector(vec2, vec2)
      }
      let x, y, z
      if (vec.x !== 0 && vec2.x !== 0) {
        x = vec.x / vec2.x
      } else {
        x = 0
      }

      if (vec.y !== 0 && vec2.y !== 0) {
        y = vec.y / vec2.y
      } else {
        y = 0
      }

      if (vec.z !== 0 && vec2.z !== 0) {
        z = vec.z / vec2.z
      } else {
        z = 0
      }
      return new Vector(x, y, z)
    }
  }

  norm() {
    if (this.length !== 0) {
      let len = new Vector(1 / this.length, 1 / this.length, 1 / this.length)
      return this.mult(len)
    } else {
      return this
    }
  }

  static norm(vec) {
    if (vec instanceof Vector) {
      if (vec.length !== 0) {
        let len = new Vector(1 / vec.length, 1 / vec.length, 1 / vec.length)
        return Vector.mult(vec, len)
      }
    } else {
      return vec
    }
  }


  dist(vec) {
    if (!(vec instanceof Vector)) {
      return
    }
    let a = this.x - vec.x,
      b = this.y - vec.y
    return Math.sqrt(a * a + b * b)
  }

  static dist(vec, vec2) {
    if (vec instanceof Vector && vec2 instanceof Vector) {
      let a = vec.x - vec2.x,
        b = vec.y - vec2.y,
        c = vec.z - vec2.z
      return Math.sqrt(a * a + b * b + c * c)
    }
  }

  toMatrix() {
    let rows = 3
    let matrix = new Matrix(1, rows)
    let values = [this.x, this.y, this.z]
    for (var i = 0; i < 3; i++) {
      matrix.data[i][0] = values[i]
    }
    return matrix
  }

  static toMatrix(vec) {
    let matrix = new Matrix(1, rows)
    let values = [vec.x, vec.y, vec.z]
    for (var i = 0; i < 3; i++) {
      matrix.data[i][0] = values[i]
    }
    return matrix
  }

  copy() {
    return new Vector(this.x, this.y, this.z)
  }

}
