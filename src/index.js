
import Marker from './components/Marker'
import Variable from './components/Variable'
import Panel from './components/Panel'

window.update = true
window.stage = new createjs.Stage("canvas");
window.stage.enableMouseOver(10);
createjs.Touch.enable(window.stage)
createjs.Ticker.addEventListener('tick', tick);

let panel = new Panel()
panel.add('Marker', '#f00')
panel.add('Variable', '#0f0')


let markers = []
let marker
let variable



function tick(event) {
  if (window.update) {
    window.update = false
    window.stage.update(event)
  }
}




