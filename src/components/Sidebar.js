import React, { Component } from 'react'

class Sidebar extends Component {
  constructor() {
    super()
    this.state = {}
    window.sidebar = this
  }

  componentDidMount() {

  }


  onClick() {
    window.canvas.addObject()
  }

  render() {
    return (
      <div id="sidebar">
        <div className="ui feed">
          <div className={ "event" } onClick={ this.onClick.bind(this) }>
            Value
          </div>
        </div>
      </div>
    )
  }

}

export default Sidebar