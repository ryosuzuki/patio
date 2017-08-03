import React, { Component } from 'react'
import Marker from './Marker'

class Panel extends Component {
  constructor() {
    super()
    this.state = {
      items: ['Marker', 'Variable', 'Record'],
      commands: []
    }
    this.app = app
    window.panel = this
  }

  componentDidMount() {
  }

  onClick(item) {
    console.log(item)
    if (item === 'Marker') {
      this.object = new Marker()
      this.app.update = true
    }

    if (item === 'Record') {
      let objects = this.app.stage.children.filter(object => object.isSelect)
      if (objects.length > 0) {
        let object = objects[0]
        object.record()

        let command = {
          id: this.state.commands.length+1,
          object: object,
          type: 'MOVE',
          attr: { x: 100, y: 0 }
        }
        this.setState({ commands: [command] })
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
          { this.state.commands.map((command) => {
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


/*
import Marker from './Marker'
import Variable from './Variable'

class Panel extends createjs.Shape {
  constructor(app) {
    super()

    this.app = app
    this.graphics.beginFill('#eee')
    this.graphics.drawRect(0, 0, 200, 800)
    this.app.stage.addChild(this);

    this.count = 0
    this.object = null
  }

  add(name, color) {
    let label = new createjs.Text(name, "18px Arial", "#000");
    label.x = 10
    label.y = 10 + 100 * this.count
    this.app.stage.addChild(label);

    let box = new createjs.Shape()
    box.graphics.beginFill(color)
    box.graphics.drawRect(0, 0, 50, 50)
    box.x = 10
    box.y = 30 + 100 * this.count

    box.on('mousedown', (e) => {
      console.log('down')
      if (name === 'Marker') {
        this.object = new Marker(this.app)
      }
      if (name === 'Variable') {
        this.object = new Variable(this.app)
      }
      if (name === 'Record') {
        let objects = this.app.stage.children.filter(object => object.isSelect)
        if (objects.length > 0) {
          objects[0].record()
        }
      }

    })

    box.on('pressmove', (e) => {
      if (name === 'Marker') {
        this.object.move()
      }
      if (name === 'Variable') {
        this.object.x = this.app.stage.mouseX
        this.object.y = this.app.stage.mouseY
        this.app.update = true
      }
    })

    box.on('pressup', (e) => {
      console.log('up')
    })

    this.app.stage.addChild(box)
    this.count++
  }
}

export default Panel

*/