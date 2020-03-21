const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  socket.on('channel', (timestamp) => {
    const currentTimestamp = new Date().getTime()

    io.emit('channel', {
      org: timestamp,
      current: currentTimestamp,
      diff: `${ currentTimestamp - timestamp}ms`
    })
  })
})

http.listen(port, () => {
  console.log(`Listening on: ${port} 💪`)
})
