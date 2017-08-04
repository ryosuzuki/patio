import React, { Component } from 'react'
import Slider from 'rc-slider'
import _ from 'lodash'
import Tooltip from 'rc-tooltip'
import Marker from './Marker'

class Panel extends Component {
  constructor() {
    super()
    this.state = {
      items: ['Locate', 'Variable', 'Move']
    }
    this.app = app
    window._ = _
    window.panel = this
  }

  componentDidMount() {
  }

  onClick(item) {
    console.log(item)
    let step = this.props.step
    step = step + 1
    this.app.updateState({ step: step })
    if (item === 'Locate') {
      let object = new Marker()

      let commands = this.props.commands
      let command = {
        id: step,
        object: object,
        type: 'LOCATE',
        attr: { x: 100, y: 100 }
      }
      commands = [...commands, command]
      this.app.updateState({ commands: commands })

      this.app.update = true
    }

    if (item === 'Move') {
      let objects = this.app.stage.children.filter(object => object.isSelect)
      if (objects.length > 0) {
        let object = objects[0]
        let commands = this.props.commands
        let command = {
          id: step,
          object: object,
          type: 'MOVE',
          attr: { x: 100, y: 0 }
        }
        commands = [...commands, command]
        this.app.updateState({ commands: commands })

        object.record()
      }
    }
  }

  onChange(step) {
    this.app.updateState({ step: step })
    this.app.execute(step)
  }

  render() {
    return (
      <div id="panel">
        <div className="ui feed">
          <h4 className="ui header">Command</h4>
          { this.state.items.map((item) => {
            return (
              <div className={ "event" }  id={ item } key={ item } onClick={ this.onClick.bind(this, item) }>
                <div className="content">
                  <div className="summary">
                    { item }
                  </div>
                  <div className="text">
                  </div>
                </div>
              </div>
            )
          }) }
        </div>

        <div className="ui feed">
          <h4 className="ui header">Program</h4>
          { this.props.commands.map((command, i) => {
            return (
              <div className={ "event" }  id={ command.id } key={ command.id } onClick={ this.onChange.bind(this, i+1)}>
                <div className="content">
                  <div className="summary">
                    { `${command.type} ${JSON.stringify(command.attr)}` }
                  </div>
                  <div className="text">
                  </div>
                </div>
              </div>
            )
          }) }
        </div>

        <div className="slider-wrapper">
          <Slider
            dots
            min={ 0 }
            max={ this.props.commands.length }
            value={ this.props.step }
            onChange={ this.onChange.bind(this) }
            handle={ handle }
          />
        </div>

      </div>
    )
  }

}

export default Panel

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