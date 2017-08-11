
if (window.id === 'timer') {
  let target
  function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    target = new Date().getTime() + 1000 * 60 * 3
  }

  function draw() {
    background(255)

    let now = new Date().getTime()
    let distance = target - now
    if (distance < 0) return false
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((distance % (1000 * 60)) / 1000)
    minutes = minutes.toString().split('')
    seconds = seconds.toString().split('')

    showLetter(minutes[0], -2)
    showLetter(':', -1)
    if (seconds.length > 1) {
      showLetter(seconds[0], 0)
      showLetter(seconds[1], 1)
    } else {
      showLetter('0', 0)
      showLetter(seconds[0], 1)

    }
  }

  function showLetter(ch, order) {
    let pos = window.letters[ch]
    if (!pos) return false
    let offset = {
      x: window.innerWidth / 2 + order * 100,
      y: window.innerHeight / 2 - 50
    }
    for (let i = 0; i < pos.length; i++) {
      for (let j = 0; j < 3; j++) {
        let flag = pos[i][j]
        if (flag) {
          marker = new Marker()
          marker.x = j * 30 + offset.x
          marker.y = i * 30 + offset.y
          marker.display()
        }
      }
    }
  }

}



