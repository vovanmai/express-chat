const { Server } = require("socket.io");

module.exports = function (server) {
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });
  io.on('connection', (socket) => {
    console.log('connection');
    socket.on("disconnect", (reason, details) => {
      console.log('disconnect');
    });

    socket.on('channel', (data,sendAck) => {
      const dataEmit = {
        message: data.message,
        id: data.id,
        is_me: false,
        channel_id: data.channel_id,
      }
      const channel = `channel_${dataEmit.channel_id}`
      console.log(dataEmit)
      socket.broadcast.emit(channel, dataEmit);
      socket.broadcast.emit(`typing_channel_${dataEmit.channel_id}`, false);
    });

    socket.on('chat', (data) => {
      socket.emit('chat', data);
    });

    socket.on('send_message', (data) => {
      const channelName = `channel_${data.channel_id}`
      socket.in(channelName).emit('receive_message', data)
    });

    socket.on('join_channel', (data) => {
      const channelName = data.channel_name
      // for (let i = 1; i <= 1000000; i++) {
      //   console.log(i)
      // }
      socket.join(channelName);
    });

    socket.on('leave_channel', (data) => {
      const channelName = data.channel_name
      socket.leave(channelName);
    });

    socket.on('typing', (data) => {
      socket.broadcast.emit(`typing_channel_${data.channel_id}`, data.is_typing);
    });
  });

  return io
}