
class Marker extends createjs.Shape {
  constructor(app) {
    super()

    this.app = app
    this.select = false

    this.graphics.beginFill('#f00')
    this.graphics.drawRect(-5, -5, 10, 10)

    this.lineX = new createjs.Shape()
    this.lineY = new createjs.Shape()
    this.app.stage.addChild(this.lineX)
    this.app.stage.addChild(this.lineY)

    this.labelX = new createjs.Text("", "18px Arial", "#000")
    this.labelY = new createjs.Text("", "18px Arial", "#000")

    let hit = new createjs.Shape();
    hit.graphics.beginFill("#000")
    hit.graphics.drawRect(0, 0, 50, 30);
    this.labelX.hitArea = hit;
    this.labelY.hitArea = hit;

    this.app.stage.addChild(this.labelX)
    this.app.stage.addChild(this.labelY)

    this.circle = new createjs.Shape()
    this.circle.graphics.beginFill('#00f')
    this.circle.graphics.drawCircle(0, 0, 20)
    this.app.stage.addChild(this.circle)

    this.on('mousedown', this.onMouseDown)
    this.on('pressmove', this.onPressMove)
    this.on('pressup', this.onPressUp)

    this.app.stage.addChild(this)
  }

  clear() {
    this.circle.graphics.clear()
    this.lineX.graphics.clear()
    this.lineY.graphics.clear()
    this.labelX.text = ''
    this.labelY.text = ''
  }

  move(pos) {
    if (!pos) pos = { x: this.app.stage.mouseX, y: this.app.stage.mouseY }
    this.x = pos.x
    this.y = pos.y

    this.clear()

    if (this.select) {
      this.circle.graphics.beginFill('#00f')
      this.circle.graphics.drawCircle(0, 0, 20)
      this.circle.x = pos.x
      this.circle.y = pos.y

      this.lineX.graphics.setStrokeStyle(3)
      this.lineX.graphics.beginStroke('#aaa')
      this.lineX.graphics.moveTo(0, pos.y)
      this.lineX.graphics.lineTo(pos.x, pos.y)
      this.lineX.graphics.endStroke()

      this.lineY.graphics.setStrokeStyle(3)
      this.lineY.graphics.beginStroke('#aaa')
      this.lineY.graphics.moveTo(pos.x, 0)
      this.lineY.graphics.lineTo(pos.x, pos.y)
      this.lineY.graphics.endStroke()

      this.labelX.text = Math.floor(pos.x)
      this.labelX.x = pos.x / 2
      this.labelX.y = pos.y + 10
      this.labelY.text = Math.floor(pos.y)
      this.labelY.x = pos.x + 10
      this.labelY.y = pos.y / 2
    }

    this.app.update = true
  }

  onMouseDown(e) {
    console.log('down')
  }

  onPressMove(e) {
    console.log('move')
    for (let child of this.app.stage.children) {
      if (child.select) {
        child.select = false
        child.clear()
      }
    }
    this.select = true
    this.move()
  }

  onPressUp(e) {
    console.log('pressup')
    this.select = !this.select
    this.move()
  }
}

export default Marker
