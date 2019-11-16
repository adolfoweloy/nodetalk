module.exports = function(app) {
    const authorization = require('../middlewares/auth'),
        chat = app.controllers.chat;
    app.get('/chat', authorization, chat.index);
};
