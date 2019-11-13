module.exports = function(app) {
    // controllers was registered via express-load (which loads a directory)
    let home = app.controllers.home; // this is referencing home.js within controllers directory
    app.get('/', home.index); // binding methods with its respective path
    app.post('/login', home.login);
    app.get('/logout', home.logout);
};