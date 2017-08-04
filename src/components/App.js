import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import 'yuki-createjs'

import Panel from './Panel'
import Select from './Select'
import Command from './Command'
import Marker from './Marker'

class App extends Component {
  constructor(props) {
    super(props)
    window.app = this
    this.update = true
    this.animate = false
  }

  componentDidMount() {
    this.stage = new createjs.Stage(this.refs.canvas)
    this.stage.enableMouseOver(10)
    createjs.Touch.enable(this.stage)
    createjs.Ticker.on('tick', this.tick.bind(this))

    this.command = new Command()
    this.select = new Select()
  }

  execute(step) {
    this.stage.children.map((object) => {
      if (object.isSelect) object.isSelect = false
      if (object.isRecord) object.isRecord = false
      if (object.graphics) object.graphics.clear()
      if (object.text) object.text = ''
    })
    this.update = true

    console.log(step)
    if (step < 1) return false
    this.props.commands[step].execute()
    this.update = true
  }

  tick(event) {
    if (this.update || this.animate) {
      this.update = false
      this.stage.update(event)
    }
  }

  updateState(state) {
    this.props.store.dispatch(actions.updateState(state))
    // this.props.store.dispatch(actions.updateState(Object.assign(this.props.state, state)))
  }

  render() {
    return (
      <div>
        <Panel
          commands={ this.props.commands }
          step={ this.props.step }
        />
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
