module.exports = function(app) {
    let ChatController = {
        index: function(req, res) {
            res.render('chat/index');
        }
    };
    return ChatController;
};
