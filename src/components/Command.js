
import Marker from './Marker'


class Command {
  constructor() {
    this.app = app
  }

  add(type) {
    let step = this.app.props.step
    let commands = this.app.props.commands
    let object
    if (type === 'LOCATE') {
      object = new Marker()
    }
    if (type === 'MOVE') {
      object = commands[step-1].object
    }
    let command = {
      id: step,
      type: type,
      object: object,
      attr: { x: 100, y: 0 },
      pos: {},
    }
    commands = [...commands, command]
    this.app.updateState({ step: step + 1 })
    this.calculate(commands)
  }

  show() {
    let command = this.app.props.commands[i]
    let object = command.object
    let prev = this.app.props.commands[i-1]
    let origin = prev ? prev.object : null

    origin.show(prev.pos)
    object.show(object.pos)
  }

  calculate(commands) {
    if (!commands) commands = _.clone(this.app.props.commands)
    for (let i = 0; i < commands.length; i++) {
      let command = commands[i]
      let prev = commands[i-1]

      let origin = prev
        ? prev.pos
        : { x: 0, y: 0 }
      command.pos = {
        x: origin.x + command.attr.x,
        y: origin.y + command.attr.y
      }
      commands[i] = command
    }
    console.log(commands)
    this.app.updateState({ commands: commands })
  }

  update(pos) {
    let step = this.app.props.step
    let commands = this.app.props.commands
    let command = _.clone(commands[step])
    command.attr = {
      x: pos.x,
      y: pos.y
    }
    commands[step] = command
    this.calculate()
    this.show()
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
