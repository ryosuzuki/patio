import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import 'yuki-createjs'

import Marker from './Marker'

class App extends Component {
  constructor(props) {
    super(props)
    window.app = this

    this.update = true
  }

  componentDidMount() {
    this.stage = new createjs.Stage(this.refs.canvas)
    this.stage.enableMouseOver(10)
    createjs.Touch.enable(this.stage)
    createjs.Ticker.addEventListener('tick', this.tick.bind(this))
    this.marker = new Marker(this)
  }

  tick(event) {
    if (this.update) {
      this.update = false
      this.stage.update(event)
    }
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" id="canvas" width="1000" height="800"></canvas>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

/*
        <Sidebar />
        <Mode
          mode={ this.props.mode }
          path={ this.props.path }
          store={ this.props.store }
        />
        <Canvas
          mode={ this.props.mode }
          drawing={ this.props.drawing }
          active={ this.props.active }
          point={ this.props.point }
          start={ this.props.start }
          path={ this.props.path }
          offsetX={ this.props.offsetX }
          offsetY={ this.props.offsetY }
          store={ this.props.store }
        />
        <Panel
          active={ this.props.active }
          path={ this.props.path }
          store={ this.props.store }
        />

 */