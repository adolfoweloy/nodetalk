module.exports = function(io) {
    const crypto = require('crypto'),
          sockets = io.sockets,
          currentChat = [],
          onlines = {} // such a terrible workaround :(
          ;

    // I don't know where to put this yet (shouldn't be here)
    Array.prototype.del = function(item) { 
        return this.slice(0, this.indexOf(item)).concat(this.slice(this.indexOf(item)+1));
    };

    sockets.on('connection', function(client) {
        let session = client.handshake.session,
            user = session.user;

        // notify onlines
        onlines[user.email] = user;
        for (var email in onlines) {
            client.emit('notify-onlines', email);
            client.broadcast.emit('notify-onlines', email);
        }

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
            client.emit('notify-offlines', user.email);
            client.broadcast.emit('notify-offlines', user.email);
            delete onlines[user.email];
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
