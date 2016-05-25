var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    maxlength: [20, 'nickname can have a maximum of 20 char'],
    required: [true, 'nickname required']
  },
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /[\w\-\+]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}/.test(v);
      },
      message: '{VALUE} is not a valid email!'
    },
    required: [true, 'email required']

  },
  encrypted_password: {
    type: String,
    required: [true, 'encrypted password required']
  },
  reset_password_token: String,

  last_sign_in: Date,

  last_sign_ip: String,

  current_sign_in_ip: String,

  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: {
    type: Date
  },
  confirmation_token: String,
  role: String,
  first_name: {
    type: String,
    maxlength: [50, 'first_name can have a maximum of 50 char'],
    required: [true, 'first_name required']
  },
  last_name: {
    type: String,
    maxlength: [50, 'last_name can have a maximun of 50 char'],
    required: [true, 'last_name required']
  },
});

var User = {

  model: mongoose.model('User', userSchema),

  createUser: function(req, res) {
    User.model.create(
      req.body,
      function(err, data) {
        if (!err) {
          res.sendStatus(200);
        } else {
          res.send(err);
        }
      });
  },
  findAllUsers: function(req, res) {
    User.model.find(function(err, data) {
      if (!err) {
        res.send(data);
      } else {
        res.send(err);
      }
    });
  },
  updateUser: function(req, res) {
    User.model.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.sendStatus(200);
      }
    });
  },
  deleteUser: function(req, res) {
    User.model.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.sendStatus(200);
      }
    });
  }
};

module.exports = User;
