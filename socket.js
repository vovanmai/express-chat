const { Server } = require("socket.io");

module.exports = function (server) {
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });
  io.on('connection', (socket) => {
    socket.on("disconnect", (reason, details) => {
      console.log('disconnect');
    });

    socket.on('channel', (data) => {
      const dataEmit = {
        message: data.message,
        id: data.id,
        is_me: false,
        channel_id: data.channel_id,
      }
      const channel = `channel_${data.channel_id}`
      console.log(dataEmit)
      socket.broadcast.emit(channel, dataEmit);
    });

    socket.on('chat', (data) => {
      socket.emit('chat', data);
    });
  });

  return io
}