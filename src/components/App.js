import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import 'yuki-createjs'

import Panel from './Panel'
import Select from './Select'
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
    let objects = {}
    for (let i = 0; i < step; i++) {
      let command = this.props.commands[i]
      if (command.type === 'LOCATE') {
        let object = command.object
        objects[object.id] = {
          x: command.attr.x,
          y: command.attr.y
        }

        if (i === step-1) {
          object.locate(command.attr)
        }
      }

      if (command.type === 'MOVE') {
        let object = command.object
        let start = objects[object.id]
        let end = {
          x: start.x + command.attr.x,
          y: start.y + command.attr.y,
        }
        objects[object.id] = end

        if (i === step-1) {
          this.animate = true
          object.locate(start)
          createjs.Tween
          .get(object)
          .to(start, 0)
          .to(end, 500)
          .call(() => { this.animate = false })
        }
      }
    }
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
