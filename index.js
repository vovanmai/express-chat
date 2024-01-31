const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const socket = require("./socket");
const io = socket(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api', (req, res) => {
  io.emit('chat', Math.random());
  res.end("OK");
});

server.listen(3007, () => {
  console.log("http://localhost:3007");
});