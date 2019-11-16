const crypto = require('crypto');

// all the functions declared within the controller are called actions
module.exports = function(app) {
    let HomeController = {
        index: function(req, res) {
            res.render('home/index');
        },
        login: function(req, res) {
            let user = req.body.user;
            let name = user.name,
                email = user.email;

            user.key = crypto
                    .createHash('md5')
                    .update(name)
                    .digest('hex');

            if (email && name) {
                user['contacts'] = [];
                req.session.user = user;
                res.redirect('/contacts');
            } else {
                res.redirect('/');
            }
        },
        logout: function(req, res) {
            req.session.destroy();
            res.redirect('/');
        }
    };
    return HomeController;
}