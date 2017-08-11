
if (window.id === 'map') {

  let pos = []

  function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    img = loadImage('map.png')

    for (let i = 0; i < 5; i++) {
      pos.push([])
      for (let j = 0; j < 10; j++) {
        let p = {
          x: random(window.innerWidth),
          y: random(100, window.innerHeight)
        }
        pos[i][j] = p
      }
    }
  }



  function draw() {
    background(255)
    image(img, 0, 100, window.innerWidth, window.innerHeight-100)

    let colors = ['red', 'purple', 'blue', 'green', 'gray']

    for (let i = 0; i < 5; i++) {
      let color = colors[i]
      fill(color)
      noStroke()
      rectMode(CENTER)
      let offset = window.innerWidth / 5
      rect(offset/2 + i*offset, 50, 50, 50)
    }

    showMarkers()
  }

  function showMarkers() {
    if (window.clicked === undefined) return false
    let points = pos[window.clicked]
    for (let point of points) {
      let marker = new Marker()
      marker.x = point.x
      marker.y = point.y
      marker.display()
    }
  }

  function mouseClicked() {
    let offset = window.innerWidth / 5
    let clicked = null
    for (let i = 0; i < 5; i++) {
      let d = dist(mouseX, mouseY, offset/2 + i*offset, 50)
      if (d < 30) {
        clicked = i
      }
    }
    window.clicked = clicked
  }

}

