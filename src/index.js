
let update = true

let stage = new createjs.Stage("canvas");
stage.enableMouseOver(10);
// createjs.Touch.enable(stage)

let panel = new createjs.Shape()
panel.graphics.beginFill('#eee')
panel.graphics.drawRect(0, 0, 200, 800)
stage.addChild(panel);


let markers = []
let marker
let variable

const addPanel = (name, color = '#f00', id = 1) => {
  let label = new createjs.Text(name, "18px Arial", "#000");
  label.x = 10
  label.y = 10 + 100 * (id - 1)
  stage.addChild(label);

  let box = new createjs.Shape()
  box.graphics.beginFill(color)
  box.graphics.drawRect(0, 0, 50, 50)
  box.x = 10
  box.y = 30 + 100 * (id - 1)

  box.on('mousedown', (e) => {
    console.log('down')
    if (name === 'Marker') {
      marker = addMarker()
    }
    if (name === 'Variable') {
      variable = addVariable()
    }
  })

  box.on('pressmove', (e) => {
    if (name === 'Marker') {
      marker.move()
    }
    if (name === 'Variable') {
      variable.x = e.stageX
      variable.y = e.stageY
      update = true
    }
  })

  box.on('pressup', (e) => {
    console.log('up')
  })

  stage.addChild(box);
}

let markerPanel = addPanel('Marker', '#f00', 1)
let variablePanel = addPanel('Variable', '#0f0', 2)


const addVariable = () => {
  let variable = new createjs.Shape()
  variable.graphics.beginFill('#0f0')
  variable.graphics.drawRect(-5, -5, 10, 10)
  variable.line = new createjs.Shape()
  stage.addChild(variable.line)

  variable.label = new createjs.Text("", "18px Arial", "#000");
  stage.addChild(variable.label)

  variable.linked = false

  variable.clear = () => {
    variable.line.graphics.clear()
  }

  variable.move = (e) => {
    variable.x = e.stageX
    marker.select = true

    let value = Math.floor(e.stageX * 4)
    variable.label.text = value
    variable.label.x = e.stageX / 2
    variable.label.y = e.stageY + 10

    marker.move({ x: value, y: marker.y })
    variable.linked.text = 'id-' + variable.id + ' = ' + value

    update = true
  }

  variable.on('mousedown', (e) => {
    console.log('down')
  })

  variable.on('pressmove', (e) => {
    if (variable.linked) {
      variable.move(e)
      return false
    }

    // console.log('move')
    variable.clear()
    variable.line.graphics.setStrokeStyle(3)
    variable.line.graphics.beginStroke('green')
    variable.line.graphics.moveTo(variable.x, variable.y)
    variable.line.graphics.lineTo(e.stageX, e.stageY)
    variable.line.graphics.endStroke()
    update = true
  })

  variable.on('pressup', (e) => {
    console.log('pressup')

    if (variable.linked) {
      marker.select = true
      update = true

      return false
    }
    let p = marker.labelX.globalToLocal(stage.mouseX, stage.mouseY)
    let hit = marker.labelX.hitTest(p.x, p.y)
    if (hit) {
      marker.labelX.text = 'id-' + variable.id + ' = ' + marker.labelX.text
      variable.linked = marker.labelX
    }

    p = marker.labelY.globalToLocal(stage.mouseX, stage.mouseY)
    hit = marker.labelY.hitTest(p.x, p.y)
    if (hit) {
      marker.labelY.text = 'id-' + variable.id + ' = ' + marker.labelY.text
      variable.linked = marker.labelY
    }

    variable.clear()
    update = true
  })

  stage.addChild(variable)
  return variable
}


const addMarker = () => {
  let marker = new createjs.Shape()
  marker.graphics.beginFill('#f00')
  marker.graphics.drawRect(-5, -5, 10, 10)

  marker.lineX = new createjs.Shape()
  marker.lineY = new createjs.Shape()
  stage.addChild(marker.lineX)
  stage.addChild(marker.lineY)

  marker.labelX = new createjs.Text("", "18px Arial", "#000");
  marker.labelY = new createjs.Text("", "18px Arial", "#000");

  let hit = new createjs.Shape();
  hit.graphics.beginFill("#000")
  hit.graphics.drawRect(0, 0, 50, 30);
  marker.labelX.hitArea = hit;

  hit = new createjs.Shape();
  hit.graphics.beginFill("#000")
  hit.graphics.drawRect(0, 0, 50, 30);
  marker.labelY.hitArea = hit;

  marker.labelX.on('mousedown', (e) => {
    console.log('down')
  })

  marker.labelX.on('pressmove', (e) => {
    console.log('move')
  })


  stage.addChild(marker.labelX)
  stage.addChild(marker.labelY)

  marker.circle = new createjs.Shape()
  marker.circle.graphics.beginFill('#00f')
  marker.circle.graphics.drawCircle(0, 0, 20)
  stage.addChild(marker.circle)

  marker.clear = () => {
    marker.circle.graphics.clear()
    marker.lineX.graphics.clear()
    marker.lineY.graphics.clear()
    marker.labelX.text = ''
    marker.labelY.text = ''
  }

  marker.move = (pos) => {
    if (!pos) pos = { x: stage.mouseX, y: stage.mouseY }
    marker.x = pos.x
    marker.y = pos.y

    marker.clear()

    if (marker.select) {
      marker.circle.graphics.beginFill('#00f')
      marker.circle.graphics.drawCircle(0, 0, 20)
      marker.circle.x = pos.x
      marker.circle.y = pos.y

      marker.lineX.graphics.setStrokeStyle(3)
      marker.lineX.graphics.beginStroke('#aaa')
      marker.lineX.graphics.moveTo(0, pos.y)
      marker.lineX.graphics.lineTo(pos.x, pos.y)
      marker.lineX.graphics.endStroke()

      marker.lineY.graphics.setStrokeStyle(3)
      marker.lineY.graphics.beginStroke('#aaa')
      marker.lineY.graphics.moveTo(pos.x, 0)
      marker.lineY.graphics.lineTo(pos.x, pos.y)
      marker.lineY.graphics.endStroke()

      marker.labelX.text = Math.floor(pos.x)
      marker.labelX.x = pos.x / 2
      marker.labelX.y = pos.y + 10
      marker.labelY.text = Math.floor(pos.y)
      marker.labelY.x = pos.x + 10
      marker.labelY.y = pos.y / 2
    }

    update = true
  }

  marker.select = false

  marker.on('mousedown', (e) => {
    console.log('down')
    // marker.select = !marker.select
    // marker.move(e)
  })

  marker.on('pressmove', (e) => {
    console.log('move')
    for (let child of stage.children) {
      if (child.select) {
        child.select = false
        child.clear()
      }
    }
    marker.select = true
    marker.move()
  })

  marker.on('pressup', (e) => {
    console.log('pressup')
    marker.select = !marker.select
    marker.move()
  })

  marker.type = 'marker'
  stage.addChild(marker)
  return marker
}


createjs.Ticker.addEventListener('tick', tick);

function tick(event) {
  if (update) {
    update = false
    stage.update(event)
  }
}
