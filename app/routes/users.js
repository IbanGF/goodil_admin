var User = require('../models/users.js');
module.exports = function (app) {
    app.post('/user', User.createUser);
    app.put('/user/:id', User.updateUser);
    app.delete('/user/:id', User.deleteUser);
}