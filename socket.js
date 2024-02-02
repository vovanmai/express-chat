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
      console.log('=============================')
      socket.in(channelName).emit('receive_message', data)
    });

    socket.on('join_channel', async (data) => {
      const channelName = data.channel_name
      console.log('join_channel: ' + channelName)
      console.log('=============================')
      socket.join(channelName);
      const numberInRoom = (await io.in(channelName).fetchSockets()).length
      console.log('numberInRoom: ' + numberInRoom)
      console.log('=============================')
      io.in(channelName).emit('number-user-in-room', numberInRoom)
    });

    socket.on('leave_channel', async (channelName) => {
      console.log('leave_channel: ' + channelName)
      console.log('=============================')
      socket.leave(channelName);
      const numberInRoom = (await io.in(channelName).fetchSockets()).length
      io.in(channelName).emit('number-user-in-room', numberInRoom)
    });

    socket.on('typing', (data) => {
      const channelName = `channel_${data.channel_id}`
      console.log('typing: ' + channelName)
      console.log('=============================')
      socket.broadcast.emit(`typing_channel_${data.channel_id}`, data.is_typing);
    });
  });

  return io
}