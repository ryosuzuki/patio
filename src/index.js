
import Marker from './components/Marker'
import Variable from './components/Variable'
import Panel from './components/Panel'


class App {
  constructor() {
    this.update = true
    this.stage = new createjs.Stage("canvas");

    this.stage.enableMouseOver(10);
    createjs.Touch.enable(this.stage)
    createjs.Ticker.addEventListener('tick', tick);
  }
}

let app = new App()

let panel = new Panel(app)
panel.add('Marker', '#f00')
panel.add('Variable', '#0f0')


function tick(event) {
  if (app.update) {
    app.update = false
    app.stage.update(event)
  }
}




