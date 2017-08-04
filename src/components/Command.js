
import Marker from './Marker'


class Command {
  constructor() {
    this.app = app
  }

  add(type) {
    let step = this.app.props.step + 1
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
      attr: { x: 100, y: 100 },
      pos: { x: 100, y: 100 },
    }
    commands = [...commands, command]
    this.calculate(commands, step)
  }

  calculate(commands, step) {
    if (step === undefined) step = this.app.props.step
    if (!commands) commands = _.clone(this.app.props.commands)
    for (let i = 0; i < commands.length; i++) {
      let command = commands[i]
      let prev = commands[i-1]
      let origin = prev
        ? prev.pos
        : { x: 0, y: 0 }
      command.attr = {
        x: Math.floor(command.pos.x - origin.x),
        y: Math.floor(command.pos.y - origin.y)
      }
      commands[i] = command
    }

    this.show(commands, step)
    this.app.updateState({ commands: commands, step: step })
  }

  show(commands, step) {
    let command = commands[step]
    let object = command.object
    let prev = commands[step-1]
    if (prev) {
      prev.object.show(prev.pos)
    }
    object.show(command.pos)
    this.app.select.show(command, prev)
  }

  update(pos) {
    let step = this.app.props.step
    let commands = _.clone(this.app.props.commands)
    let command = commands[step]
    command.pos = pos
    commands[step] = command
    this.calculate(commands)
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
