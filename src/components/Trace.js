import React, { Component } from 'react'
import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import _ from 'lodash'

import Marker from './Marker'
import Select from './Select'

class Trace extends Component {
  constructor() {
    super()
    this.app = app
    window._ = _
    window.trace = this
  }

  add(type) {
    let step = this.app.props.step + 1
    let commands = this.app.props.commands
    if (type === 'LOOP') {
      let start = {
        id: step,
        type: 'LOOP'
      }
      let end = {
        id: step+1,
        type: 'END_LOOP'
      }
      commands = [...commands, start]
      commands = [...commands, end]
    } else {
      let object = new Marker()
      let select = new Select()
      object.x = 100
      object.y = 100
      let command = {
        id: step,
        type: type,
        object: object,
        select: select,
        attr: { x: 100, y: 100 },
      }
      commands = [...commands, command]
    }
    this.calculate(commands, step)
  }

  calculate(commands, step) {
    if (step === undefined) step = this.app.props.step
    if (!commands) commands = _.clone(this.app.props.commands)
    let prev = { x: 0, y: 0 }
    for (let i = 0; i < commands.length; i++) {
      let command = commands[i]
      if (command.type === 'LOOP') continue
      if (command.type === 'END_LOOP') continue

      let object = command.object
      let select = command.select
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
      select.show(object, prev)
      prev = command.object
    }

    this.app.updateState({ commands: commands, step: step })
  }



  onChange(step) {
    this.app.updateState({ step: step })
    this.app.execute(step)
  }

  render() {
    return(
      <div id="trace">
        <SortableList items={ this.props.commands } onSortEnd={ this.onSortEnd } />
        <div className="slider-wrapper">
          <Slider
            dots
            min={ 0 }
            max={ this.props.commands.length-1 }
            value={ this.props.step }
            onChange={ this.onChange.bind(this) }
            handle={ handle }
          />
        </div>
      </div>
    )
  }

}

export default Trace

const SortableItem = SortableElement(({item}) =>
  <div className="event"  id={ item.id }>
    <div className="content">
      <div className="summary">
      </div>
      <div className="text">
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
      {items.map((item, index) => (
        <SortableItem key={`item-${index}`} index={index} item={item} />
      ))}
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

/*
execute() {
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
}
*/