
let update = true

let stage = new createjs.Stage("canvas");
stage.enableMouseOver(10);

let panel = new createjs.Shape()
panel.graphics.beginFill('#eee')
panel.graphics.drawRect(0, 0, 100, 400)
stage.addChild(panel);

let label = new createjs.Text("Value", "18px Arial", "#000");
label.x = 10
label.y = 10
stage.addChild(label);

let box = new createjs.Shape()
box.graphics.beginFill('#f00')
box.graphics.drawRect(0, 0, 50, 50)
box.x = 10
box.y = 30

let marker
box.on('mousedown', (e) => {
  console.log('down')
  marker = addMarker()
})

box.on('pressmove', (e) => {
  marker.x = e.stageX
  marker.y = e.stageY
  update = true
})

stage.addChild(box);


const addMarker = () => {
  let marker = new createjs.Shape()
  marker.graphics.beginFill('#f00')
  marker.graphics.drawRect(-5, -5, 10, 10)
  stage.addChild(marker)
  return marker
}


createjs.Ticker.addEventListener('tick', tick);

function tick(event) {
  if (update) {
    update = false
    stage.update(event)
  }
}

// for (let i = 0; i < 1; i++) {
//   let circle = new createjs.Shape();
//   circle.graphics.beginFill("red")
//   circle.graphics.drawCircle(0, 0, 10)
//   circle.x = Math.random() * 1000
//   circle.y = Math.random() * 400

//   circle.on('mouseover', (e) => {
//     console.log('mouseover' + i)
//   })

//   circle.on('mouseout', (e) => {
//     console.log('mouseout' + i)
//   })

//   circle.on('click', (e) => {
//     console.log('click' + i)
//     circle.graphics.clear()
//     circle.graphics.beginFill('green')
//     circle.graphics.drawCircle(0, 0, 10)

//     stage.update()
//   })

//   stage.addChild(circle);
// }

// stage.update();