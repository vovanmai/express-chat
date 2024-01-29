const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api', (req, res) => {
  res.end("OK");
});



io.on('connection', (socket) => {
  socket.on('channel', (msg) => {
    const data = {
      message: msg.message,
      id: msg.id,
      is_me: false
    }
    socket.broadcast.emit('channel', data);
    console.log(data)
  });
});

server.listen(3007, () => {
  console.log("http://localhost:3007");
});