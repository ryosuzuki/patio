
class Select extends createjs.Shape {
  constructor() {
    super()

    this.app = app

    this.lines = []
    this.labels = []
    for (let i = 0; i < 2; i++) {
      this.lines[i] = new createjs.Shape()
      this.labels[i] = new createjs.Text("", "18px Arial", "#000")
      this.labels[i].hitArea = this.getHitArea()
      this.app.stage.addChild(this.lines[i])
      this.app.stage.addChild(this.labels[i])
    }
  }

  clear() {
    for (let i = 0; i < 2; i++) {
      this.lines[i].graphics.clear()
      this.labels[i].text = ''
    }

    this.app.update = true
  }

  show(current, prev) {
    this.clear()
    if (!prev) {
      let pos = current.pos
      for (let i = 0; i < 2; i++) {
        this.lines[i].graphics.setStrokeStyle(3)
        this.lines[i].graphics.beginStroke('#aaa')
        this.lines[i].graphics.moveTo(pos.x*i, pos.y*(1-i))
        this.lines[i].graphics.lineTo(pos.x, pos.y)
        this.lines[i].graphics.endStroke()
      }
      this.labels[0].text = Math.floor(pos.x)
      this.labels[0].x = pos.x / 2
      this.labels[0].y = pos.y + 10
      this.labels[1].text = Math.floor(pos.y)
      this.labels[1].x = pos.x + 10
      this.labels[1].y = pos.y / 2
    } else {
      let pos1 = current.pos
      let pos0 = prev.pos
      this.lines[0].graphics.setStrokeStyle(3)
      this.lines[0].graphics.beginStroke('#aaa')
      this.lines[0].graphics.moveTo(pos0.x, pos0.y)
      this.lines[0].graphics.lineTo(pos1.x, pos1.y)
      this.lines[0].graphics.endStroke()

      let dist = Math.sqrt(
        (pos1.x - pos0.x)**2 + (pos1.y - pos0.y)**2
      )
      this.labels[0].text = Math.floor(dist)
      this.labels[0].x = (pos0.x + pos1.x) / 2 + 10
      this.labels[0].y = (pos0.y + pos1.y) / 2 + 10
    }
    this.app.update = true
  }

  getHitArea() {
    let hit = new createjs.Shape();
    hit.graphics.beginFill("#000")
    hit.graphics.drawRect(0, 0, 50, 30);
    return hit
  }

}

export default Select
