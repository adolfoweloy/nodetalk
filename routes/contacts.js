const authorization = require('./../middleware/auth');

module.exports = function(app) {
    let contacts = app.controllers.contacts;

    app.get('/contacts', authorization, contacts.index);
    app.get('/contacts/:id', authorization, contacts.show);
    app.post('/contacts', authorization, contacts.create);
    app.get('/contacts/:id/edit', authorization, contacts.edit);
    app.put('/contacts/:id', authorization, contacts.update);
    app.delete('/contacts/:id', authorization, contacts.destroy);
};
