
import Marker from './Marker'
import Variable from './Variable'

class Panel extends createjs.Shape {
  constructor() {
    super()

    this.graphics.beginFill('#eee')
    this.graphics.drawRect(0, 0, 200, 800)
    window.stage.addChild(this);

    this.count = 0
    this.object = null
  }

  add(name, color) {
    let label = new createjs.Text(name, "18px Arial", "#000");
    label.x = 10
    label.y = 10 + 100 * this.count
    window.stage.addChild(label);

    let box = new createjs.Shape()
    box.graphics.beginFill(color)
    box.graphics.drawRect(0, 0, 50, 50)
    box.x = 10
    box.y = 30 + 100 * this.count

    box.on('mousedown', (e) => {
      console.log('down')
      if (name === 'Marker') {
        this.object = new Marker()
      }
      if (name === 'Variable') {
        this.object = new Variable()
      }
    })

    box.on('pressmove', (e) => {
      if (name === 'Marker') {
        this.object.move()
      }
      if (name === 'Variable') {
        this.object.x = window.stage.mouseX
        this.object.y = window.stage.mouseY
        window.update = true
      }
    })

    box.on('pressup', (e) => {
      console.log('up')
    })

    window.stage.addChild(box)
    this.count++
  }
}

export default Panel

