
function setup() {
  createCanvas(1000, 1000)

  panel = new Panel()
}

let origin = { x: 300, y: 30 }

function Marker(x, y) {
  rectMode(CENTER)
  fill(255, 0, 0)
  rect(x, y, 10, 10)
}

function Panel() {

  this.draw = () => {
    rectMode(CORNER)
    fill(200)
    rect(10, 10, 100, 400)

    fill(0)
    text('value class', 30, 100)

    rectMode(CORNER)
    fill(255, 0, 0)
    rect(30, 30, 50, 50)
  }
}


function draw() {
  background(255)

  panel.draw()
  let marker = Marker(mouseX, mouseY)
}




