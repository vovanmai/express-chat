const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const multer = require('multer');
const socket = require("./socket");
const cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(cors())
const io = socket(server)


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/messages', (req, res) => {
  const dataEmit = {
    message: req.body.message,
    id: req.body.id,
    is_me: false,
    channel_id: req.body.channel_id,
  }
  const channel = `channel_${dataEmit.channel_id}`
  console.log(_test)
  _socket.broadcast.emit(channel, dataEmit);
  _socket.broadcast.emit(`typing_channel_${dataEmit.channel_id}`, false);
  res.json({ success: req.body })
});

app.get('/api/messages', (req, res) => {
  res.json({ success: true })
});

server.listen(3007, () => {
  console.log("http://localhost:3007");
});