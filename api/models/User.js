const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  Roles: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  authkey: {
    type: String
  },
  likes : {
    type:Array
  },
  dislikes : {
    type:Array
  }
});

module.exports = mongoose.model('User', userSchema);
