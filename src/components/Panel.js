import React, { Component } from 'react'
import Marker from './Marker'

class Panel extends Component {
  constructor() {
    super()
    this.state = {
      items: ['Locate', 'Variable', 'Move'],
    }
    this.app = app
    window.panel = this
  }

  componentDidMount() {
  }

  onClick(item) {
    console.log(item)
    if (item === 'Locate') {
      let object = new Marker()

      let commands = this.props.commands
      let command = {
        id: this.props.commands.length+1,
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
        object.record()

        let commands = this.props.commands
        let command = {
          id: this.props.commands.length+1,
          object: object,
          type: 'MOVE',
          attr: { x: 100, y: 0 }
        }
        commands = [...commands, command]
        this.app.updateState({ commands: commands })
      }
    }
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
          { this.props.commands.map((command) => {
            return (
              <div className={ "event" }  id={ command.id } key={ command.id }>
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

      </div>
    )
  }

}

export default Panel
