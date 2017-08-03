
let update = true

let stage = new createjs.Stage("canvas");
stage.enableMouseOver(10);
// createjs.Touch.enable(stage)

let panel = new createjs.Shape()
panel.graphics.beginFill('#eee')
panel.graphics.drawRect(0, 0, 100, 400)
stage.addChild(panel);

let label = new createjs.Text("Marker", "18px Arial", "#000");
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
  marker.move(e)
})

let line
box.on('pressup', (e) => {
  console.log('up')

  /*
  line = new createjs.Shape()
  line.graphics.setStrokeStyle(3)
  line.graphics.beginStroke('#000')
  line.graphics.moveTo(e.stageX - 100, e.stageY)
  line.graphics.lineTo(e.stageX + 400, e.stageY)
  line.graphics.endStroke()
  stage.addChild(line);

  let label = new createjs.Text("0", "18px Arial", "#000");
  label.x = e.stageX - 100
  label.y = e.stageY - 30
  stage.addChild(label);

  label = new createjs.Text("100", "18px Arial", "#000");
  label.x = e.stageX + 400
  label.y = e.stageY - 30
  stage.addChild(label);

  marker.label = new createjs.Text("20", "18px Arial", "#000");
  marker.label.x = e.stageX
  marker.label.y = e.stageY - 30
  stage.addChild(marker.label);

  marker.start = e.stageX - 100

  update = true
  */
})

stage.addChild(box);


const addMarker = () => {
  let marker = new createjs.Shape()
  marker.graphics.beginFill('#f00')
  marker.graphics.drawRect(-5, -5, 10, 10)

  marker.lineX = new createjs.Shape()
  stage.addChild(marker.lineX);

  marker.lineY = new createjs.Shape()
  stage.addChild(marker.lineY);

  marker.move = (e) => {
    marker.x = e.stageX
    marker.y = e.stageY

    marker.lineX.graphics.clear()
    marker.lineX.graphics.setStrokeStyle(3)
    marker.lineX.graphics.beginStroke('#aaa')
    marker.lineX.graphics.moveTo(0, e.stageY)
    marker.lineX.graphics.lineTo(e.stageX, e.stageY)
    marker.lineX.graphics.endStroke()

    marker.lineY.graphics.clear()
    marker.lineY.graphics.setStrokeStyle(3)
    marker.lineY.graphics.beginStroke('#aaa')
    marker.lineY.graphics.moveTo(e.stageX, 0)
    marker.lineY.graphics.lineTo(e.stageX, e.stageY)
    marker.lineY.graphics.endStroke()


    update = true
  }

  marker.on('mousedown', (e) => {
    console.log('down')
  })

  marker.on('pressmove', (e) => {
    console.log('move')
    marker.x = e.stageX
    marker.label.text = Math.floor((marker.x - marker.start) / 500 * 100)
    marker.label.x = e.stageX
    update = true
  })

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