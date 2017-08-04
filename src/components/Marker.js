
class Marker extends createjs.Shape {
  constructor() {
    super()

    this.app = app
    this.isSelect = false
    this.isRecord = false

    this.graphics.beginFill('#f00')
    this.graphics.drawRect(-5, -5, 10, 10)
    this.circle = new createjs.Shape()

    this.on('mousedown', this.onMouseDown)
    this.on('pressmove', this.onPressMove)
    this.on('pressup', this.onPressUp)

    this.app.stage.addChild(this.circle)
    this.app.stage.addChild(this)

    window.marker = this
  }

  clear() {
    this.circle.graphics.clear()
    if (!this.isRecord && this.original) {
      this.original.graphics.clear()
      this.original.circle.graphics.clear()
    }
    this.app.update = true
  }

  show(pos) {
    this.graphics.beginFill('#f00')
    this.graphics.drawRect(-5, -5, 10, 10)
    this.x = pos.x
    this.y = pos.y
    this.circle.graphics.beginFill('#00f')
    this.circle.graphics.drawCircle(0, 0, 20)
    this.circle.x = this.x
    this.circle.y = this.y
    this.app.update = true
  }

  locate(pos) {
    this.graphics.beginFill('#f00')
    this.graphics.drawRect(-5, -5, 10, 10)
    this.x = pos.x
    this.y = pos.y
    this.app.update = true
  }

  drag(pos) {
    this.clear()
    if (!pos) pos = { x: this.app.stage.mouseX, y: this.app.stage.mouseY }
    this.x = pos.x
    this.y = pos.y
    this.app.command.update(pos)
    this.app.update = true
  }

  record() {
    console.log('record')
    this.app.select.clear()

    this.original = new createjs.Shape()
    this.original.graphics.beginFill('#f00')
    this.original.graphics.drawRect(-5, -5, 10, 10)
    this.original.circle = new createjs.Shape()
    this.original.circle.graphics.beginFill('#00f')
    this.original.circle.graphics.drawCircle(0, 0, 20)

    this.original.x = this.x
    this.original.y = this.y
    this.original.circle.x = this.x
    this.original.circle.y = this.y

    this.original.alpha = 0.3
    this.original.circle.alpha = 0.3

    this.app.stage.addChild(this.original.circle)
    this.app.stage.addChild(this.original)

    this.x = this.x + 100
    this.circle.x = this.x
    this.circle.graphics.beginFill('#00f')
    this.circle.graphics.drawCircle(0, 0, 20)

    this.isRecord = true
    this.isSelect = true
    this.original.isSelect = true

    this.app.select.show()
    this.app.update = true
  }

  onMouseDown(e) {
    console.log('down')
  }

  onPressMove(e) {
    console.log('move')
    if (this.isRecord) {
      this.drag()
      this.app.select.show()
    } else {
      this.isSelect = true
      this.drag()
      this.app.select.show()
    }
  }

  onPressUp(e) {
    console.log('pressup')
    if (this.isRecord) {

    } else {
      this.isSelect = !this.isSelect
      this.drag()
      this.app.select.show()
    }
  }
}

export default Marker
