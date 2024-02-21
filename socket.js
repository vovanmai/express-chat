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
      console.log(data)
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
      socket.in(channelName).emit('user-just-joined', {user: data.user})
      io.in(channelName).emit('number-user-in-room', numberInRoom)
    });

    socket.on('leave_channel', async (data) => {
      const {channel_name, user} = data
      console.log(channel_name, user)
      console.log('leave_channel: ' + channel_name)
      console.log('=============================')
      socket.leave(channel_name);
      const numberInRoom = (await io.in(channel_name).fetchSockets()).length
      io.in(channel_name).emit('number-user-in-room', numberInRoom)
      io.in(channel_name).emit('user-just-leave', {user: user})
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