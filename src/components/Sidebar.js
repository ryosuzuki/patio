import React, { Component } from 'react'

class Sidebar extends Component {
  constructor() {
    super()
    this.state = {
      items: ['hoge', 'foo', 'bar']
    }
    window.sidebar = this
  }

  componentDidMount() {
  }

  onClick(item) {
    console.log(item)
  }

  render() {
    return (
      <div id="sidebar">
        <div className="ui feed">
          { this.state.items.map((item) => {
            return (
              <div className={ "event" }  id={ item } key={ item } onClick={ this.onClick.bind(this, item) }>
                <div className="content">
                  <div className="summary">
                    { item }
                  </div>
                  <div className="text">
                    Hello world
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

export default Sidebar