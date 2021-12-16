let layer = new Layer()

let mouseControls = new MouseControls()

let keyControls = new KeyControls(window, ['Space', 'KeyK', 'KeyR', 'KeyL', 'KeyS', 'KeyG', 'KeyC'])

let loadInput = document.createElement('input')
loadInput.type = 'file'

loadInput.addEventListener('input', () => {
  load(loadInput.files[0])
  loadInput.value = ''
})

layer.fullscreen()

let camera = new Camera2D(new Vector(0, 0))

let mouse = {
  pos: new Vector(0, 0),
  isPressed: false,
}

let deltaX, deltaY

let startX, startY

let data = []

let nextData = []

let isLastAlive = false

function mousePressed(e) {
  if (e.which === 3 || isTouch) {
    mouse.isPressed = true
    startX = mouseX
    startY = mouseY
  } else if (e.which === 1 || isTouch) {
    let x = Math.floor(((mouseX - camera.target.x - camera.pos.x) / zoom + camera.target.x) / step)
    let y = Math.floor(((mouseY - camera.target.y - camera.pos.y) / zoom + camera.target.y) / step)
    if ('undefined' === typeof data[x]) {
      data[x] = []
    }
    isLastAlive = data[x][y]
    data[x][y] = !data[x][y]
  }
}

function contextMenu(e) {
  e.preventDefault()
}

function mouseMoved(e) {
  if (mouse.isPressed) {
    deltaX = (startX - mouseX) / zoom
    deltaY = (startY - mouseY) / zoom
    startX = mouseX
    startY = mouseY
    mouse.pos.set(mouse.pos.x + deltaX, mouse.pos.y + deltaY)
  } else if (e.which === 1 || isTouch) {
    if ('undefined' === typeof data[Math.floor(((mouseX - camera.target.x - camera.pos.x) / zoom + camera.target.x) / step)]) {
      data[Math.floor(((mouseX - camera.target.x - camera.pos.x) / zoom + camera.target.x) / step)] = []
    }
    data[Math.floor(((mouseX - camera.target.x - camera.pos.x) / zoom + camera.target.x) / step)][Math.floor(((mouseY - camera.target.y - camera.pos.y) / zoom + camera.target.y) / step)] = !isLastAlive
  }
}

function mouseReleased(e) {
  if (e.which === 3 || isTouch) {
    mouse.isPressed = false
  }
}

function clamp(val, min, max, min2 = min, max2 = max, withIn = false) {
  result = (val - min) / (max - min) * (max2 - min2) + min2
  if (withIn) {
    if (min2 < max2) {
      result = Math.max(Math.min(result, min2), max2)
    } else {
      result = Math.max(Math.min(result, max2), min2)
    }
  }
  return result
}

let x, y

let showGrid = false

function mouseScroll(e) {
  let dir = e.deltaY > 0 ? 1 : -1
  neededZoom = Math.min(Math.max(MIN_ZOOM, neededZoom + dir * ZOOM_STEP * -1), MAX_ZOOM)
}

let startStep = 40

let zoom = 1

const MIN_ZOOM = 0.05
const MAX_ZOOM = 1
const ZOOM_STEP = MIN_ZOOM

let neededZoom = zoom

let step = startStep

let isPlaying = false

let timerTime = 0

function timer() {
  isPlaying = !isPlaying
}

let isMur = true

function neighbors({
  x,
  y,
  createNeighbors = false,
}) {
  let neighbors = 0
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (!isMur && i !== 0 && j !== 0) continue
      if (i === 0 && j === 0) continue
      if (data[x][y] && createNeighbors) {
        if ('undefined' === typeof data[x + i]) {
          data[x + i] = []
        }
        if ('undefined' === typeof data[x + i][y + j]) {
          data[x + i][y + j] = false
        }
      } else {
        if ('undefined' === typeof data[x + i] || 'undefined' === typeof data[x + i][y + j]) continue
      }
      if (!data[x + i][y + j]) continue
      neighbors++
    }
  }
  return neighbors
}

function mapCells(func = () => {}, withEmpty = true) {
  let keys = Object.keys(data).sort()
  for (let i = 0, lenI = keys.length; i < lenI; i++) {
    let keysInner = Object.keys(data[keys[i]]).sort()
    for (let j = 0, lenJ = keysInner.length; j < lenJ; j++) {
      if (!data[keys[i]][keysInner[j]] && !withEmpty) continue
      func(Number(keys[i]), Number(keysInner[j]))
    }
  }
}

let b = [3]

let s = [2, 3]

function nextGeneration() {
  mapCells((x, y) => {
    neighbors({
      x,
      y,
      createNeighbors: true
    })
  })
  mapCells((x, y) => {
    let countNeighbors = neighbors({
      x,
      y
    })
    if ('undefined' === typeof nextData[x]) {
      nextData[x] = []
    }
    nextData[x][y] = data[x][y]
    if (!data[x][y]) {
      if (b.includes(countNeighbors)) nextData[x][y] = true
    } else {
      if (!s.includes(countNeighbors)) nextData[x][y] = false
    }
  })
  mapCells((x, y) => {
    if (!nextData[x][y]) {
      delete nextData[x][y]
    }
  })

  data = nextData
  nextData = []
}

function load(file) {
  if (!(file instanceof File)) return
  if (file.name.substr(-5) !== '.json') return
  data = []
  let fr = new FileReader()
  fr.onload = () => {
    let obj = JSON.parse(fr.result)
    for (let cell in obj) {
      if ('undefined' === typeof data[cell]) data[cell] = []
      for (cell2 of obj[cell]) {
        data[cell][cell2] = true
      }
    }
  }
  fr.readAsText(file)
}

let saveElement = document.createElement('a')

function save() {
  let obj = {}
  mapCells((x, y) => {
    if ('undefined' === typeof obj[x])
      obj[x] = []
    obj[x].push(y)
  }, false)
  saveElement.href = URL.createObjectURL(new Blob([JSON.stringify(obj)], {
    type: "text/plain"
  }))
  let filename = prompt('Введите имя файла:')
  if (filename === '') filename = `${Date.now()}.json`
  if (filename === null) return
  saveElement.download = filename
  saveElement.click()
}

function centered() {
  let xMin = Infinity
  let xMax = -Infinity
  let yMin = Infinity
  let yMax = -Infinity
  let netData = []
  mapCells((x, y) => {
    xMin = x > xMin ? xMin : x
    xMax = x < xMax ? xMax : x
    yMin = y > yMin ? yMin : y
    yMax = y < yMax ? yMax : y
  }, false)

  let xOff = Math.ceil((xMin + xMax) / 2)
  let yOff = Math.ceil((yMin + yMax) / 2)

  mapCells((x, y) => {
    if ('undefined' === typeof netData[x - xOff]) netData[x - xOff] = []
    netData[x - xOff][y - yOff] = data[x][y]
  }, false)
  data = netData
  mouse.pos.set(0, 0)
}

function keyPressed() {
  if (keyControls.keys.KeyL.down) {
    loadInput.click()
  }

  if (keyControls.keys.KeyS.down) {
    save()
  }

  if (keyControls.keys.KeyG.down) {
    showGrid = !showGrid
  }

  if (keyControls.keys.KeyK.down) {
    nextGeneration()
  }

  if (keyControls.keys.KeyC.down) {
    centered()
  }

  if (keyControls.keys.KeyR.down) {
    data = []
    nextData = []
  }

  if (keyControls.keys.Space.down) {
    timer()
  }
}

function loopFunc() {

  if (isPlaying) {
    timerTime = (timerTime + 1) % 2
    if (timerTime === 0) {
      nextGeneration()
    }
  } else {
    timerTime = 0
  }

  step = startStep
  layer.background(15, 20, 30)
  layer.fill(255)
  layer.noStroke()
  layer.strokeWeight(1)
  camera.set(mouse.pos, 0.05)
  zoom = lerp(zoom, neededZoom, 0.05)
  camera.setZoom(zoom)
  camera.follow(() => {

    let left = Math.ceil((camera.pos.x + (Math.max(1 / zoom, 1) * layer.w)) / step) * step * -1
    let top = Math.ceil((camera.pos.y + (Math.max(1 / zoom, 1) * layer.h)) / step) * step * -1
    let right = (Math.max(1 / zoom, 1) * layer.w) - camera.pos.x
    let bottom = (Math.max(1 / zoom, 1) * layer.h) - camera.pos.y

    mapCells((x, y) => {
      if ((step * x) < camera.target.x - layer.w / 2 / zoom - step ||
        (step * x) > camera.target.x + layer.w / 2 / zoom ||
        (step * y) < camera.target.y - layer.h / 2 / zoom - step ||
        (step * y) > camera.target.y + layer.h / 2 / zoom) return
      layer.rect(step * x, step * y, step, step)
    }, false)
    layer.stroke(128)
    if (showGrid) {
      for (let x = left; x < right; x += step) {
        layer.line(x, top, x, bottom)
      }
      for (let y = top; y < bottom; y += step) {
        layer.line(left, y, right, y)
      }
    }
  })
  keyControls.update()
}

let loop = new Loop(loopFunc)