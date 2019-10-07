module.exports = function(app) {
    // controllers was registered via express-load (which loads a directory)
    let home = app.controllers.home;
    app.get('/', home.index);
    app.post('/login', home.login);
    app.get('/logout', home.logout);
};