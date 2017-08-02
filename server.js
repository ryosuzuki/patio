const express = require('express')
const path = require('path')
const app = express()
let data = {}

app.use('/', express.static(__dirname))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})


app.listen(8080, function() {
  console.log('listening 8080')
})