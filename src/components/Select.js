
class Select extends createjs.Shape {
  constructor() {
    super()

    this.app = app
    this.lines = []
    this.labels = []
    for (let i = 0; i < 5; i++) {
      this.lines[i] = new createjs.Shape()
      this.labels[i] = new createjs.Text("", "18px Arial", "#000")
      this.labels[i].hitArea = this.getHitArea()
      this.app.stage.addChild(this.lines[i])
      this.app.stage.addChild(this.labels[i])
    }
    this.arc = new createjs.Shape()
    this.app.stage.addChild(this.arc)
  }

  show(object, prev, attr) {
    for (let i = 0; i < 5; i++) {
      this.lines[i].graphics.setStrokeDash([2, 2])
      this.lines[i].graphics.setStrokeStyle(3)
      this.lines[i].graphics.beginStroke('#ddd')
    }
    this.arc.graphics.setStrokeDash([2, 2])
    this.arc.graphics.setStrokeStyle(3)
    this.arc.graphics.beginStroke('#ddd')

    if (attr.coord === 'xy') {
      this.showXY(object, prev, attr)
    } else {
      this.showPolar(object, prev, attr)
    }
    this.app.update = true
  }

  showPolar(object, prev, attr) {
    let center = attr.center
    let dist = attr.dist
    let angle = attr.angle
    this.lines[0].graphics.moveTo(center.x, center.y)
    this.lines[0].graphics.lineTo(object.x, object.y)

    this.labels[0].text = attr.dist
    this.labels[0].x = (center.x + object.x) / 2 - 20
    this.labels[0].y = (center.y + object.y) / 2

    if (prev.id) {
      let unit = {
        x: prev.x - center.x,
        y: prev.y - center.y
      }
      let base = Math.atan2(unit.y, unit.x)
      this.lines[1].graphics.moveTo(center.x, center.y)
      this.lines[1].graphics.lineTo(prev.x, prev.y)
      this.arc.graphics.arc(center.x, center.y, dist/5, angle + base, base)
      this.labels[1].text = Math.floor((angle / Math.PI) * 180)
      this.labels[1].x = center.x - 10
      this.labels[1].y = center.y - 10
    }
  }

  showXY(object, prev, attr) {
    this.lines[0].graphics.moveTo(prev.x, prev.y)
    this.lines[0].graphics.lineTo(object.x, prev.y)
    this.lines[1].graphics.moveTo(object.x, prev.y)
    this.lines[1].graphics.lineTo(object.x, object.y)
    this.lines[2].graphics.moveTo(prev.x, prev.y)
    this.lines[2].graphics.lineTo(prev.x, object.y)
    this.lines[3].graphics.moveTo(prev.x, object.y)
    this.lines[3].graphics.lineTo(object.x, object.y)

    this.lines[4].graphics.moveTo(prev.x, prev.y)
    this.lines[4].graphics.lineTo(object.x, object.y)

    this.labels[0].text = attr.dx
    this.labels[0].x = (prev.x + object.x) / 2 - 10
    this.labels[0].y = object.y - 10
    this.labels[1].text = attr.dy
    this.labels[1].x = object.x - 10
    this.labels[1].y = (prev.y + object.y)  / 2 - 10
  }


  getHitArea() {
    let hit = new createjs.Shape();
    hit.graphics.beginFill("#000")
    hit.graphics.drawRect(0, 0, 50, 30);
    return hit
  }

}

export default Select



/*
if (!prev || true) {
  for (let i = 0; i < 2; i++) {
    this.lines[i].graphics.setStrokeStyle(3)
    this.lines[i].graphics.beginStroke('#aaa')
    this.lines[i].graphics.moveTo(object.x*i, object.y*(1-i))
    this.lines[i].graphics.lineTo(object.x, object.y)
    this.lines[i].graphics.endStroke()
  }
  this.labels[0].text = Math.floor(object.x)
  this.labels[0].x = object.x / 2
  this.labels[0].y = object.y + 10
  this.labels[1].text = Math.floor(object.y)
  this.labels[1].x = object.x + 10
  this.labels[1].y = object.y / 2
} else {
  this.lines[0].graphics.setStrokeStyle(3)
  this.lines[0].graphics.beginStroke('#aaa')
  this.lines[0].graphics.moveTo(prev.x, prev.y)
  this.lines[0].graphics.lineTo(object.x, object.y)
  this.lines[0].graphics.endStroke()

  let dist = Math.sqrt(
    (object.x - prev.x)**2 + (object.y - prev.y)**2
  )
  this.labels[0].text = Math.floor(dist)
  this.labels[0].x = (prev.x + object.x) / 2 + 10
  this.labels[0].y = (prev.y + object.y) / 2 + 10
}
this.app.update = true
*/