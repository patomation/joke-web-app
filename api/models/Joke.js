const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jokeSchema = new Schema({
  id: {
    type: String
  },
  likes:{
    type: Number
  },
  dislikes:{
    type: Number
  },
  content:{
    type: String
  }
});

module.exports = mongoose.model('Joke', jokeSchema);
