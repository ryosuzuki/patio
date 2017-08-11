
if (window.id === 'solar') {
  let earth
  let moon

  function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    earth = new Marker()
    moon = new Marker()
  }

  let ea = 0
  let ma = 0
  function draw() {
    background(255)
    showSun()

    let er = 200
    earth.x = er * Math.cos(ea) + window.innerWidth / 2
    earth.y = er * Math.sin(ea) + window.innerHeight / 2
    earth.display()
    ea += 0.01

    let mr = 50
    moon.x = earth.x + mr * Math.cos(ma)
    moon.y = earth.y + mr * Math.sin(ma)
    moon.display()
    ma += 0.05
  }

  function showSun() {
    let pos = [[0, 1, 0], [1, 1, 1], [0, 1, 0]]
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let flag = pos[i][j]
        if (flag) {
          let marker = new Marker()
          marker.x = j * 20 + window.innerWidth / 2
          marker.y = i * 20 + window.innerHeight / 2
          marker.display()
        }
      }
    }
  }

}

