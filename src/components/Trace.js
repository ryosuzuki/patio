import React, { Component } from 'react'
import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip'
import {SortableContainer, SortableElement,   SortableHandle, arrayMove} from 'react-sortable-hoc'
import _ from 'lodash'

import Marker from './Marker'
import Select from './Select'

class Trace extends Component {
  constructor() {
    super()
    this.app = app
    this.state = {
      traces: [],
      step: 0
    }
    window._ = _
    window.trace = this
  }

  add(type) {
    let step = this.app.props.step + 1
    let commands = this.app.props.commands
    if (type === 'LOOP') {
      let start = {
        type: 'LOOP'
      }
      let end = {
        type: 'END_LOOP'
      }
      commands = [...commands, start]
      commands = [...commands, end]
    } else {
      let command = {
        type: type,
        attr: { coord: 'xy', dx: 400, dy: 200 },
      }

      if (commands.length > 0) {
        command = {
          type: type,
          attr: {
            coord: 'polar',
            center: { x: 200, y: 200},
            angle: (30 / 180) * Math.PI,
          }
        }
      }
      commands = [...commands, command]
    }
    this.app.updateState({ commands: commands, step: step })
    this.calculate(step, commands)
  }

  getPos(prev, attr, iter) {
    let pos
    if (attr.coord === 'xy') {
      let dx = attr.dx
      let dy = attr.dy
      pos = {
        x: Math.floor(prev.x + dx),
        y: Math.floor(prev.y + dy)
      }
    } else {
      let center = attr.center
      let angle = attr.angle
      let unit = {
        x: prev.x - center.x,
        y: prev.y - center.y
      }
      let dist = Math.sqrt(unit.x**2 + unit.y**2)
      let base = Math.atan(unit.y / unit.x)
      if (iter) {
        angle = angle * (10 - iter + 1)
      }
      // angle = angle - base
      pos = {
        x: center.x + Math.floor(dist * Math.cos(angle)),
        y: center.y - Math.floor(dist * Math.sin(angle))
      }
    }
    return pos
  }

  update(pos) {
    let step = this.app.props.step
    let commands = _.clone(this.app.props.commands)

    let prev = { x: 0, y: 0 }
    for (let i = 0; i < step; i++) {
      let command = commands[i]
      if (command.type === 'LOOP') continue
      if (command.type === 'END_LOOP') continue
      prev = this.getPos(prev, command.attr)
    }
    let command = commands[step]
    if (command.attr.coord === 'xy') {
      command.attr = {
        coord: 'xy',
        dx: Math.floor(pos.x - prev.x),
        dy: Math.floor(pos.y - prev.y)
      }
    } else {
      let dist = 200
      let center = { x: 200, y: 200 }
      let a = { x: pos.x - center.x, y: pos.y - center.y }
      let b = { x: prev.x - center.x, y: prev.y - center.y }
      let cos = (a.x * b.x + a.y + b.y) / (Math.sqrt(a.x**2 + a.y**2) * Math.sqrt(b.x**2 + b.y**2))
      let angle = Math.acos(cos)
      command.attr = {
        coord: 'polar',
        center: center,
        angle: angle
      }
    }

    commands[step] = command
    this.calculate(step, commands)
    this.app.updateState({ commands: commands, step: step })
  }

  calculate(step, commands) {
    if (step === undefined) step = this.app.props.step
    if (!commands) commands = _.clone(this.app.props.commands)

    this.app.stage.removeAllChildren()
    let traces = []
    let index = 0
    let i = 0
    let j = 0
    let flag = false
    let prev = { x: 0, y: 0 }
    while (i < commands.length) {
      let command = commands[i]

      if (command.type === 'LOOP') {
        if (j === 0) j = 10
        index = i; flag = true; i++
        continue
      }

      if (command.type === 'END_LOOP') {
        j--; flag = false
        if (j > 0) {
          i = index
        } else {
          i++
        }
        continue
      }

      let object = new Marker()
      let select = new Select()
      let pos = this.getPos(prev, command.attr, j)
      object.x = pos.x
      object.y = pos.y

      if (!flag || j ===10) {
        object.isCopy = false
      } else {
        object.isCopy = true
      }

      if (i === step && !object.isCopy) {
        object.show(true)
      } else {
        object.show(false)
      }
      select.show(object, prev)
      prev = object
      let trace = {
        type: command.type,
        object: object,
        select: select,
      }
      traces.push(trace)
      i++
    }
    this.app.update = true
    this.setState({ traces: traces })
  }

  onSortEnd(event) {
    let commands = arrayMove(this.props.commands, event.oldIndex, event.newIndex)
    this.calculate(this.props.step, commands)
    this.app.updateState({ commands: commands })
  }

  onChange(step) {
    this.setState({ step: step })
  }

  render() {
    return(
      <div id="trace">
        <SortableList
          items={ this.props.commands }
          distance={ 1 }
          onSortEnd={ this.onSortEnd.bind(this) }
        />
        <div className="slider-wrapper">
          <Slider
            dots
            min={ 0 }
            max={ this.state.traces.length-1 }
            value={ this.state.step }
            onChange={ this.onChange.bind(this) }
            handle={ handle }
          />
        </div>
      </div>
    )
  }

}

export default Trace

const DragHandle = SortableHandle(() => <span>::</span>)

const onChange = (step) => {
  console.log(step)
  window.trace.calculate(step)
  window.app.updateState({ step: step })
}

const SortableItem = SortableElement(({item, step, indent}) =>
  <div className="event" id={ step }
       style={{ marginLeft: 20 * indent }}
       onClick={ () => { onChange(step) } }>
    <div className="content">
      <div className="summary">
      </div>
      <div className="text">
        <DragHandle />
        <b>{ item.type }</b>&nbsp;
        <span>{ JSON.stringify(item.attr) }</span>
      </div>
    </div>
  </div>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <div className="ui feed">
      <h4 className="ui header">Program</h4>
      {items.map((item, index) => {
        let indent = 0
        for (let i = 1; i <= index; i++) {
          if (items[i-1].type === 'LOOP') indent++
          if (items[i].type === 'END_LOOP') indent--
        }
        items.map((item, i) => {
        })
        return (
          <SortableItem key={`item-${index}`} index={index} item={item} step={index} indent={indent} />
        )
      })}
    </div>
  );
})

const Handle = Slider.Handle;
const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle {...restProps} />
    </Tooltip>
  );
};

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
