module.exports = function(io) {
    const currentChat = [],
          crypto = require('crypto');

    io.sockets.on('connection', function(client) {
        let session = client.handshake.session,
            user = session.user;

        client.on('join', function(channel) {
            if (!channel) {
                let timestamp = new Date().toString(),
                    md5 = crypto.createHash('md5');
                channel = md5.update(timestamp).digest('hex');
            }
            session.channel = channel;
            client.join(channel);
        });

        client.on('disconnect', function() {
            client.leave(session.channel);
        });

        client.on('send-server', function(messageContent) {
            let channel = session.channel,
                data = { email: user.email, channel: channel },
                msg = '<b>' + user.name + ':</b> ' + messageContent + '<br>';

            currentChat.push(msg);
            client.in(channel).emit('send-client', msg);
            client.broadcast.emit('new-message', data);
        });

        client.on('request-initial', function() {
            client.emit('send-initial', currentChat.join(' '));
        });
      });
};
