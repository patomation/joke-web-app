const Joke = require('./classes/Joke.js');
const Jokes = require('./classes/Jokes.js');
const Message = require('./classes/Message.js');


//TODO: Use mongodb
var fakeDatabase = {};

const root = {
  getJoke: function ({id}) {
    if (!fakeDatabase[id]) {
      throw new Error('no joke exists with id ' + id);
    }
    return new Joke(id, fakeDatabase[id]);
  },
  getJokes: function ({results}) {
    if (Object.keys(fakeDatabase).length === 0) {
      throw new Error('no jokes exists yet');
    }
    let jokes = []
    for (var id in fakeDatabase) {
      jokes.push( new Joke(id, fakeDatabase[id]) );
    }
    return {jokes: jokes};
  },
  createJoke: function ({input}) {
    // Create a random id for our "database".
    var id = require('crypto').randomBytes(10).toString('hex');
    console.log('CREATE JOKE', input);
    fakeDatabase[id] = input;
    return new Joke(id, input);
  },
  updateJoke: function ({id, input}) {
    if (!fakeDatabase[id]) {
      throw new Error('no joke exists with id ' + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new Joke(id, input);
  },
  likeJoke: function ({id}) {
    if (!fakeDatabase[id]) {
      throw new Error('no joke exists with id ' + id);
    }
    console.log('fakeDatabase[id]',fakeDatabase[id]);
    fakeDatabase[id].likes += 1;
    return new Joke(id, fakeDatabase[id]);
  },
  dislikeJoke: function ({id}) {
    if (!fakeDatabase[id]) {
      throw new Error('no joke exists with id ' + id);
    }
    fakeDatabase[id].dislikes += 1;
    return new Joke(id, fakeDatabase[id]);
  },
  deleteJoke: function ({id}) {
    if (!fakeDatabase[id]) {
      throw new Error('no joke exists with id ' + id);
    }
    console.log(fakeDatabase);
    delete fakeDatabase[id]
    console.log(fakeDatabase);
    return new Message(`Deleted Joke: ${id}`);
  }

};

module.exports = root;
