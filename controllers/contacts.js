module.exports = function(app) {
    let ContactsController = {
        index: function(req, res) {
            let user = req.session.user,
                contacts = user.contacts,
                params = { 
                    user: user,
                    contacts: contacts
                };
            res.render('contacts/index', params);
        },
        show: function(req, res) {
            let id = req.params.id,
                contact = req.session.user.contacts[id],
                params = { 
                    contact: contact,
                    id: id
                };
                res.render('contacts/show', params);    
        },
        create: function(req, res) {
            let contact = req.body.contact,
                user = req.session.user;
            user.contacts.push(contact);
            res.redirect('/contacts');
        },
        edit: function(req, res) { 
            let id = req.params.id,
                user = req.session.user,
                contact = user.contacts[id],
                params = {
                    user: user,
                    contact: contact,
                    id: id
                };
            res.render('contacts/edit', params);
        },
        update: function(req, res) { 
            let contact = req.body.contact,
                user = req.session.user;
            user.contacts[req.params.id] = contact;
            res.redirect('/contacts');
        },
        destroy: function(req, res) { 
            let user = req.session.user,
                id = req.params.id;
            user.contacts.splice(id, 1);
            res.redirect('/contacts');
        }
    };
    return ContactsController;
};
