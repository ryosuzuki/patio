
class Variable extends createjs.Shape {
  constructor(app) {
    super()

    this.app = app
    this.graphics.beginFill('#0f0')
    this.graphics.drawRect(-5, -5, 10, 10)
    this.line = new createjs.Shape()
    this.app.stage.addChild(this.line)

    this.label = new createjs.Text("", "18px Arial", "#000");
    this.app.stage.addChild(this.label)

    this.on('mousedown', this.onMouseDown)
    this.on('pressmove', this.onPressMove)
    this.on('pressup', this.onPressUp)

    this.app.stage.addChild(this)

    this.linked = null
    this.object = null

  }

  clear() {
    this.line.graphics.clear()
  }

  move() {
    this.x = this.app.stage.mouseX
    this.object.select = true

    let value = Math.floor(this.app.stage.mouseX * 4)
    this.label.text = value
    this.label.x = this.app.stage.mouseX / 2
    this.label.y = this.app.stage.mouseY + 10

    this.object.move({ x: value, y: this.object.y })
    this.linked.text = 'id-' + this.id + ' = ' + value

    this.app.update = true
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
    this.line.graphics.lineTo(this.app.stage.mouseX, this.app.stage.mouseY)
    this.line.graphics.endStroke()
    this.app.update = true
  }

  onPressUp(e) {
    console.log('pressup')

    if (this.linked) {
      this.object.select = true
      this.app.update = true
      return false
    }

    for (let object of this.app.stage.children) {
      if (!object.labelX || !object.labelY) continue

      let p = object.labelX.globalToLocal(this.app.stage.mouseX, this.app.stage.mouseY)
      let hit = object.labelX.hitTest(p.x, p.y)
      if (hit) {
        object.labelX.text = 'id-' + this.id + ' = ' + object.labelX.text
        this.object = object
        this.linked = object.labelX
      }
    }

    this.clear()
    this.app.update = true
  }

}

export default Variable
