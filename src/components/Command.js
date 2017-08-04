
import Marker from './Marker'

class Command {
  constructor() {
    this.app = app
  }

  add(type) {
    let step = this.app.props.step + 1
    let commands = this.app.props.commands
    let object = new Marker()
    object.x = 100
    object.y = 100
    let command = {
      id: step,
      type: type,
      object: object,
      attr: { x: 100, y: 100 },
    }
    commands = [...commands, command]
    this.calculate(commands, step)
  }

  calculate(commands, step) {
    if (step === undefined) step = this.app.props.step
    if (!commands) commands = _.clone(this.app.props.commands)
    for (let i = 0; i < commands.length; i++) {
      let command = commands[i]
      let object = command.object
      let prev = i > 0 ? commands[i-1].object : { x: 0, y: 0 }
      if (i <= step) {
        command.attr = {
          x: Math.floor(object.x - prev.x),
          y: Math.floor(object.y - prev.y)
        }
      } else {
        object.x = Math.floor(prev.x + command.attr.x)
        object.y = Math.floor(prev.y + command.attr.y)
      }
      commands[i] = command

      if (i === step) {
        object.show(true)
      } else {
        object.show(false)
      }
      this.app.select.show(object, prev)
    }

    this.app.updateState({ commands: commands, step: step })
  }

  show(commands, step) {
    let command = commands[step]
    let object = command.object
    let prev = commands[step-1]
    if (prev) {
      if (command.type === 'LOCATE') {
        prev.object.show(prev.pos)
      }
      if (command.type === 'MOVE') {
        object.showOriginal(prev.pos)
      }
    }
    object.show(command.pos)
  }

  execute() {
    /*
    let objects = {}
    for (let i = 0; i < this.step; i++) {
      let command = this.app.props.commands[i]
      switch (command.type) {
        case 'LOCATE':
          let object = command.object
          objects[object.id] = {
            x: command.attr.x,
            y: command.attr.y
          }
          object.locate(command.attr)
          break
        case 'MOVE':
          let object = command.object
          let start = objects[object.id]
          let end = {
            x: start.x + command.attr.x,
            y: start.y + command.attr.y,
          }
          objects[object.id] = end
          break
        default:
          break
      }
    }
    */
  }

}

export default Command

/*
if (i === step-1) {
  this.animate = true
  object.locate(start)
  createjs.Tween
  .get(object)
  .to(start, 0)
  .to(end, 500)
  .call(() => {
    this.animate = false
    object.locate(end)
  })
}
*/
