var User = require('../models/users.js');
module.exports = function (app) {
    app.post('/user', User.createUser); // poster
    app.put('/user/:id', User.updateUser); // mettre
    app.get('/user', User.findAllUsers); // obtenir
    app.delete('/user/:id', User.deleteUser); // supprimez
}