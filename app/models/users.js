var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        maxlength: [20, 'nickname can have a maximum of 20 char'],
        required: [true, 'nickname required']
    },
    email:{
        type: String,
        required: [true, 'email required']

    },
    encrypted_password:{
        type: String,
        required: [true, 'encrypted password required']
    },
    reset_password_token: String,

    last_sign_in: Date,

    last_sign_ip: String,

    current_sign_in_ip: String,

    created_at:{
     type: Date, 
     default: Date.now 
    },

     updated_at: {
        type: Date
    },

    confirmation_token: String,

    role: String,

    first_name:{
        type: String,
        maxlength: [50, 'first_name can have a maximum of 50 char'],
        required: [true, 'first_name required']

    },

    last_name:{
        type: String,
        maxlength:[50, 'last_name can have a maximun of 50 char'],
        required: [true, 'last_name required']
    },


});
var User = {

    model: mongoose.model('User', userSchema),

    createUser: function (req, res) {
        User.model.create({
            nickname: req.body.nickname,
            email: req.body.email,
            encrypted_password: req.body.encrypted_password,
            // last_sign_ip:
            // current_sign_in_ip:
            // confirmation_token:
            first_name: req.body.first_name,
            last_name:req.body.last_name,
        }, function (err, data) {
            if (!err) {
                res.send({
                    id: data._id
                });
            } else {
                console.log(err);
                res.sendStatus(400);
            }
        });
    },
    updateUser: function (req, res) {
        console.log(req.body);
        User.model.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            logo: req.body.logo
        }, function () {
            res.sendStatus(200);
        });
    },
    deleteUser: function (req, res) {
        User.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}
module.exports = User;