

class Marker extends createjs.Shape {
  constructor(app) {
    super()

    this.app = app
    this.select = false

    this.graphics.beginFill('#f00')
    this.graphics.drawRect(-5, -5, 10, 10)
    this.circle = new createjs.Shape()

    this.on('mousedown', this.onMouseDown)
    this.on('pressmove', this.onPressMove)
    this.on('pressup', this.onPressUp)

    this.app.stage.addChild(this.circle)
    this.app.stage.addChild(this)
  }

  move(pos) {
    if (!pos) pos = { x: this.app.stage.mouseX, y: this.app.stage.mouseY }
    this.x = pos.x
    this.y = pos.y

    this.app.update = true
  }

  onMouseDown(e) {
    console.log('down')
  }

  onPressMove(e) {
    console.log('move')
    this.select = true
    this.move()
    this.app.select.move()
  }

  onPressUp(e) {
    console.log('pressup')

    this.select = !this.select
    this.move()
    this.app.select.move()
  }
}

export default Marker
