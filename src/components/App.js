import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import 'yuki-createjs'

import Panel from './Panel'
import Select from './Select'

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

    this.select = new Select()
  }

  tick(event) {
    if (this.update) {
      this.update = false
      this.stage.update(event)
    }
  }

  updateState(state) {
    // debugger
    this.props.store.dispatch(actions.updateState(state))
    // this.props.store.dispatch(actions.updateState(Object.assign(this.props.state, state)))
  }

  render() {
    return (
      <div>
        <Panel
          commands={ this.props.commands }
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
