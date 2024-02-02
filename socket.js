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

    socket.on('send_message', (data) => {
      const channelName = `channel_${data.channel_id}`
      console.log('send_message: ' + channelName)
      socket.in(channelName).emit('receive_message', data)
    });

    socket.on('join_channel', (data) => {
      const channelName = data.channel_name
      console.log('join_channel: ' + channelName)
      socket.join(channelName);
    });

    socket.on('leave_channel', (channelName) => {
      console.log('leave_channel: ' + channelName)
      socket.leave(channelName);
    });

    socket.on('typing', (data) => {
      const channelName = `channel_${data.channel_id}`
      console.log('typing: ' + channelName)
      socket.broadcast.emit(`typing_channel_${data.channel_id}`, data.is_typing);
    });
  });

  return io
}