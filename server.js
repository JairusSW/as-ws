const WebSocket = require('ws')

const socket = new WebSocket.Server({
  port: 3000
})

socket.on('connection', (client) => {

  console.log('New Client Connected.')

  client.on('message', (data) => {

    console.log('Got Message:', data)

    client.send('123456789')

  })

})