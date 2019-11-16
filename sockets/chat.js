module.exports = function(io) {
    const currentChat = [];
    io.sockets.on('connection', function(client) {
        let session = client.handshake.session,
            user = session.user;

        client.on('send-server', function(data) {
            let msg = '<b>' + user.name + ':</b> ' + data + '<br>';
            currentChat.push(msg);
            client.emit('send-client', msg);
            client.broadcast.emit('send-client', msg);
        });

        client.on('request-initial', function() {
            client.emit('send-initial', currentChat.join(' '));
        });
      });
};
