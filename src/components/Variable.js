
class Variable extends createjs.Shape {
  constructor() {
    super()

    this.graphics.beginFill('#0f0')
    this.graphics.drawRect(-5, -5, 10, 10)
    this.line = new createjs.Shape()
    stage.addChild(this.line)

    this.label = new createjs.Text("", "18px Arial", "#000");
    stage.addChild(this.label)

    this.on('mousedown', this.onMouseDown)
    this.on('pressmove', this.onPressMove)
    this.on('pressup', this.onPressUp)

    stage.addChild(this)

    this.linked = null
    this.object = null

  }

  clear() {
    this.line.graphics.clear()
  }

  move() {
    this.x = stage.mouseX
    this.object.select = true

    let value = Math.floor(stage.mouseX * 4)
    this.label.text = value
    this.label.x = stage.mouseX / 2
    this.label.y = stage.mouseY + 10

    this.object.move({ x: value, y: this.object.y })
    this.linked.text = 'id-' + this.id + ' = ' + value

    window.update = true
  }

  onMouseDown(e) {
    console.log('down')
  }

  onPressMove(e) {
    if (this.linked) {
      this.move()
      return false
    }

    // console.log('move')
    this.clear()
    this.line.graphics.setStrokeStyle(3)
    this.line.graphics.beginStroke('green')
    this.line.graphics.moveTo(this.x, this.y)
    this.line.graphics.lineTo(window.stage.mouseX, window.stage.mouseY)
    this.line.graphics.endStroke()
    window.update = true
  }

  onPressUp(e) {
    console.log('pressup')

    if (this.linked) {
      this.object.select = true
      window.update = true
      return false
    }

    for (let object of window.stage.children) {
      if (!object.labelX || !object.labelY) continue

      let p = object.labelX.globalToLocal(window.stage.mouseX, window.stage.mouseY)
      let hit = object.labelX.hitTest(p.x, p.y)
      if (hit) {
        object.labelX.text = 'id-' + this.id + ' = ' + object.labelX.text
        this.object = object
        this.linked = object.labelX
      }
    }

    this.clear()
    window.update = true
  }

}

export default Variable
