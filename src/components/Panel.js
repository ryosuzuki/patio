import React, { Component } from 'react'

import Trace from './Trace'
import Marker from './Marker'

class Panel extends Component {
  constructor() {
    super()
    this.state = {
      items: ['Locate', 'Move', 'Variable', 'Loop']
    }
    this.app = app
    window.panel = this
  }

  componentDidMount() {
  }

  onClick(item) {
    console.log(item)
    let type = item.toUpperCase()
    window.trace.add(type)
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
        <Trace
          commands={ this.props.commands }
          step={ this.props.step }
          coord={ this.props.coord }
        />
      </div>
    )
  }

}

export default Panel
