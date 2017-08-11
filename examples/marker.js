function Marker() {
  this.x = 0
  this.y = 0
  this.size = 20

  this.display = function() {
    fill('red')
    noStroke()
    ellipse(this.x, this.y, this.size, this.size)
  }
}