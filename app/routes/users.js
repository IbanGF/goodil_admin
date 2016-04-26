var User = require('../models/users.js');
module.exports = function (app) {
    app.post('/user', User.createUser);
    app.put('/user/:id', User.updateUser);
    app.get('/user', User.findAllUsers);
    app.delete('/user/:id', User.deleteUser);
}