module.exports = function(app) {
    let ChatController = {
        index: function(req, res) {
            let params = { channel: req.query.channel };
            res.render('chat/index', params);
        }
    };
    return ChatController;
};
