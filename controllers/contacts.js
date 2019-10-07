module.exports = function(app) {
    let ContactsController = {
        index: function(req, res) {
            let user = req.session.user,
                params = { user: user };
            res.render('contacts/index', params);
        }
    };
    return ContactsController;
};
