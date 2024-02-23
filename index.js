const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socket = require("./socket");
const cors = require('cors')
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
require('dotenv').config();
const Joi = require('joi');
const upload = require("./middleware/upload");
app.use("/uploads", express.static("uploads"));

const db = require("./models/index");
db.sequelize.sync({force: process.env.DB_FORCE === '1'}).then(() => {
  console.log('Drop and Resync Db');
});

app.use(cors())
socket(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

require('./routes/user.routes')(app);
require('./routes/channel.routes')(app);
require('./routes/message.routes')(app);

app.post('/api/messages', async (req, res) => {
  const dataEmit = {
    message: req.body.message,
    id: req.body.id,
    is_me: false,
    channel_id: req.body.channel_id,
  }
  // const socketId = req.body.socket_id
  //
  // const channel = `channel_${dataEmit.channel_id}`
  //
  // const socketList = await io.in(channel).fetchSockets()
  //
  // for (const socketItem of socketList) {
  //   if (socketItem.id !== socketId) {
  //     socketItem.emit('message', dataEmit)
  //   }
  // }

  res.json({ success: true, data: dataEmit })
});
const authJwt = require('./middleware/authJwt')

app.get('/api/messages', (req, res) => {
  res.json({ success: true })
});
app.get('/api/test', async (req, res) => {
  const schema = Joi.object({
    a: Joi.string()
      .required()
      .min(5)
      .label('AAAA')
      .messages({
        'string.base': '1212'
      }),
    b: Joi.string()
      .required(),
  })
  const { error } = schema.validate({a: ''}, {abortEarly: false});
  res.json({ error: error })
});
app.post('/api/upload-file', [authJwt.verifyToken, upload.single("file")], (req, res) => {
  res.json({ data: req.file })
});

const PORT = process.env.PORT || 3007;
server.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});