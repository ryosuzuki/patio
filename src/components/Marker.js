
class Marker extends createjs.Shape {
  constructor() {
    super()

    this.app = app
    this.isCopy = false
    this.isSelect = false

    this.graphics.beginFill('#f00')
    this.graphics.drawRect(-5, -5, 10, 10)
    this.circle = new createjs.Shape()

    this.app.stage.addChild(this.circle)
    this.app.stage.addChild(this)

    this.on('mousedown', this.onMouseDown)
    this.on('pressmove', this.onPressMove)
    this.on('pressup', this.onPressUp)

    window.marker = this
  }

  show(select = false) {
    this.graphics.beginFill('#f00')
    this.graphics.drawRect(-5, -5, 10, 10)
    this.isSelect = select
    if (select) {
      this.circle.graphics.beginFill('#00f')
      this.circle.graphics.drawCircle(0, 0, 20)
      this.circle.x = this.x
      this.circle.y = this.y
    } else {
      this.circle.graphics.clear()
    }
    this.app.update = true
  }

  drag() {
    if (this.isCopy) return false
    if (!this.isSelect) return false
    let pos = {
      x: this.app.stage.mouseX,
      y: this.app.stage.mouseY
    }
    window.trace.update(pos)
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
