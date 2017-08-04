
class Marker extends createjs.Shape {
  constructor() {
    super()

    this.app = app
    this.isSelect = false
    this.isRecord = false

    this.graphics.beginFill('#f00')
    this.graphics.drawRect(-5, -5, 10, 10)
    this.circle = new createjs.Shape()
    this.original = new createjs.Shape()
    this.original.circle = new createjs.Shape()

    this.app.stage.addChild(this.original.circle)
    this.app.stage.addChild(this.original)
    this.app.stage.addChild(this.circle)
    this.app.stage.addChild(this)

    this.on('mousedown', this.onMouseDown)
    this.on('pressmove', this.onPressMove)
    this.on('pressup', this.onPressUp)

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

  show(select = false) {
    this.graphics.beginFill('#f00')
    this.graphics.drawRect(-5, -5, 10, 10)
    if (select) {
      this.circle.graphics.beginFill('#00f')
      this.circle.graphics.drawCircle(0, 0, 20)
      this.circle.x = this.x
      this.circle.y = this.y
    }
    this.app.update = true
  }

  showOriginal(pos) {
    this.original.graphics.beginFill('#f00')
    this.original.graphics.drawRect(-5, -5, 10, 10)
    this.original.circle.graphics.beginFill('#00f')
    this.original.circle.graphics.drawCircle(0, 0, 20)

    this.original.x = pos.x
    this.original.y = pos.y
    this.original.circle.x = pos.x
    this.original.circle.y = pos.y

    this.original.alpha = 0.3
    this.original.circle.alpha = 0.3
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
    this.x = this.app.stage.mouseX
    this.y = this.app.stage.mouseY
    this.app.command.calculate()
  }

  onMouseDown(e) {
    console.log('down')
  }

  onPressMove(e) {
    console.log('move')
    this.drag()
  }

  onPressUp(e) {
    console.log('pressup')
    this.drag()
  }
}

export default Marker
