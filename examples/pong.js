
if (window.id === 'pong') {
  function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    marker = new Marker()
  }

  let dirX = 5
  let dirY = 5

  function draw() {
    background(255)
    if (marker.x > window.innerWidth) {
      dirX *= -1
    }
    if (marker.y > window.innerHeight || marker.y < 0) {
      dirY *= -1
    }
    marker.x += 1 * dirX
    marker.y += 1 * dirY
    marker.display()

    if (120 < marker.x && marker.x < 130 && mouseY - 30 < marker.y && marker.y < mouseY + 100) {
      dirX *= -1
    }

    if (marker.x < 0) {
      marker.x = 300
      dirX *= -1
    }

    showPaddle()
  }

  function showPaddle() {
    let pos = window.letters['1']
    for (let i = 0; i < pos.length; i++) {
      for (let j = 0; j < 3; j++) {
        let flag = pos[i][j]
        if (flag) {
          let marker = new Marker()
          marker.x = j * 20 + 100
          marker.y = i * 20 + mouseY
          marker.display()
        }
      }
    }
  }
}

