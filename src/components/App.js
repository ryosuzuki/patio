import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import 'yuki-createjs'

import Panel from './Panel'
import Trace from './Trace'
import Marker from './Marker'

class App extends Component {
  constructor(props) {
    super(props)
    window.app = this
    this.update = true
    this.animate = false
    this.state = {
      coord: 'xy'
    }
  }

  componentDidMount() {
    this.stage = new createjs.Stage(this.refs.canvas)
    this.stage.enableMouseOver(10)
    this.resize()
    createjs.Touch.enable(this.stage)
    createjs.Ticker.on('tick', this.tick.bind(this))
  }

  tick(event) {
    if (this.update || this.animate) {
      this.update = false
      this.stage.update(event)
    }
  }

  updateState(state, callback) {
    this.props.store.dispatch(actions.updateState(state))
  }

  resize() {
    this.stage.canvas.width = window.innerWidth - 250
    this.stage.canvas.height = window.innerHeight
  }

  onClick() {
    if (this.state.coord === 'xy') {
      this.setState({ coord: 'polar' })
    } else {
      this.setState({ coord: 'xy' })
    }
  }

  render() {
    return (
      <div>
        <Panel
          commands={ this.props.commands }
          step={ this.props.step }
        />
        <canvas ref="canvas" id="canvas" width="1000" height="600"></canvas>
        <button className="ui basic button" style={{ position: 'fixed', bottom: 20, right: 20 }} onClick={ this.onClick.bind(this) }>
          Change Coordinates: <b>{ this.state.coord }</b>
        </button>
      </div>
    )
  }
}

window.addEventListener('resize', () => {
  if (window.app) window.app.resize()
}, false)


function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
