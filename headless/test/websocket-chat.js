const io = require('socket.io-client')

const socket = io('ws://localhost:3000')

socket.on('connect', () => {
  console.log('Connected to WebSocket server')

  socket.emit('joinChat', 'Andrii')

  socket.emit('joinChat', 'Alena')

  setTimeout(() => {
    socket.emit('sendMessage', {
      username: 'Andrii',
      message: 'Hello from websocket-chat test script!',
    })
  }, 2000)

  socket.emit('sendMessage', {
    username: 'Alena',
    message: 'I love travelling!',
  })
})

socket.on('receiveMessage', (data) => {
  console.log(`${data.username} ${data.message}`)
})

socket.on('userList', (users) => {
  console.log('Online users: ', users)
})
