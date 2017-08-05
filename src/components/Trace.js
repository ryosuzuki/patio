import React, { Component } from 'react'
import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip'
import {SortableContainer, SortableElement,   SortableHandle, arrayMove} from 'react-sortable-hoc'
import _ from 'lodash'
import async from 'async'

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
    window.async = async

  }

  add(type) {
    let step = this.props.step + 1
    let commands = this.props.commands
    if (type === 'LOOP') {
      let start = {
        type: 'LOOP',
        attr: { count: 10 }
      }
      let end = {
        type: 'END_LOOP'
      }
      commands = [...commands, start]
      commands = [...commands, end]
    } else {
      let command = {
        type: type,
        attr: {},
      }
      command.attr = {
        coord: this.props.coord,
        dx: 100,
        dy: 100,
        center: {
          x: this.app.stage.canvas.width / 2,
          y: this.app.stage.canvas.height / 2
        },
        dist: 300,
        angle: -(30 / 180) * Math.PI
      }
      commands = [...commands, command]
    }
    this.app.updateState({ commands: commands, step: step })
    this.setState({ step: this.state.traces.length })
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
      let dist = attr.dist
      if (prev.id) {
        let unit = {
          x: prev.x - center.x,
          y: prev.y - center.y
        }
        let base = Math.atan2(unit.y, unit.x)
        angle = angle + base
        pos = {
          x: center.x + dist * Math.cos(angle),
          y: center.y + dist * Math.sin(angle)
        }
      } else {
        pos = {
          x: center.x + dist * Math.cos(angle),
          y: center.y + dist * Math.sin(angle)
        }
      }
    }
    return pos
  }

  update(pos) {
    let step = this.props.step
    let commands = _.clone(this.props.commands)
    if (step < 0) return false
    let prev = { x: 0, y: 0 }
    for (let i = 0; i < step; i++) {
      let command = commands[i]
      if (command.type === 'LOOP') continue
      if (command.type === 'END_LOOP') continue
      prev = this.getPos(prev, command.attr)
    }
    let command = commands[step]
    let attr = command.attr
    attr.dx = Math.floor(pos.x - prev.x)
    attr.dy = Math.floor(pos.y - prev.y)

    let center = attr.center
    let dx = pos.x - center.x
    let dy = pos.y - center.y
    let dist = Math.sqrt(dx*dx + dy*dy)
    let angle = Math.atan2(dy, dx)
    if (step > 0) {
      let unit = {
        x: prev.x - center.x,
        y: prev.y - center.y
      }
      let base = Math.atan2(unit.y, unit.x)
      angle = angle - base
    }

    attr.dist = Math.floor(dist)
    attr.angle = angle



    command.attr = attr
    commands[step] = command
    this.calculate(step, commands)
    this.app.updateState({ commands: commands, step: step })
  }

  calculate(step, commands) {
    if (!commands) commands = _.clone(this.props.commands)

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
      let attr = command.attr
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
      select.show(object, prev, attr)
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
    this.setState({ step: this.state.traces.length })
  }

  onChange(step) {
    this.setState({ step: step })
  }

  execute() {
    console.log('execute')
    this.setState({ step: 0 })
    this.app.stage.removeAllChildren()
    this.app.update = true

    let traces = this.state.traces
    let indexes = this.state.traces.map((trace, index) => index)
    async.eachSeries(indexes, (index, callback) => {
      console.log(index)
      this.execute2(index, callback)
    })
  }

  execute2(i, callback) {
    this.setState({ step: i })
    let trace = this.state.traces[i]
    let object = trace.object
    this.app.stage.addChild(object)

    let start = { x: 0, y: 0 }
    let end = { x: object.x, y: object.y }
    if (trace.type === 'LOCATE') {
      start = { x: 0, y: 0 }
    }
    if (trace.type === 'MOVE') {
      let prev = this.state.traces[i-1].object
      start = { x: prev.x, y: prev.y }
      this.app.stage.removeChild(prev)
    }
    this.app.animate = true
    object.x = start.x
    object.y = start.y
    createjs.Tween
    .get(object)
    .to(start, 0)
    .to(end, 500)
    .call(() => {
      object.x = end.x
      object.y = end.y
      this.app.animate = false
      callback()
    })


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
        <button className="ui basic primary button" style={{ position: 'fixed', bottom: 20, left: 20 }} onClick={ this.execute.bind(this) }>
          Run
        </button>
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

const SortableItem = SortableElement(({item, step, indent}) => {
  let attr
  if (['LOCATE', 'MOVE'].includes(item.type)) {
    if (item.attr.coord === 'xy') {
      attr = `offset dx: ${item.attr.dx}, dy: ${item.attr.dx}`
    } else {
      attr = `dist ${Math.floor(item.attr.dist)} rotate ${Math.floor(item.attr.angle / Math.PI * 180)}`
    }
  }
  if (['LOOP'].includes(item.type)) {
    attr = `${item.attr.count} times`
  }
  return (
    <div className="event" id={ step }
         style={{ marginLeft: 20 * indent }}
         onClick={ () => { onChange(step) } }>
      <div className="content">
        <div className="summary">
          <DragHandle />
          <b>{ item.type }</b>&nbsp;
        </div>
        <div className="text">
          <span>{ attr }</span>
        </div>
      </div>
    </div>
  )
})

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
  )
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


