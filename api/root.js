const Joke = require('./models/Joke.js');

const root = {
  getJoke: function ({id}) {
    return Joke.find({_id:id})
      .then( joke => {
        return joke[0];
      }).catch( err => {
        throw err;
      });
  },
  getJokes: function ({results}) {
    return Joke.find()
      .then( jokes =>{
        return {
          jokes: jokes.map(result => {
            return {...result._doc};
          })}

      }).catch(err => {
        throw err;
      });
  },
  createJoke: function ({input}) {
    const joke = new Joke({
      content: input.content,
      likes: 0,
      dislikes: 0
    })
    //use db created id
    joke.id = joke._id;

    return joke.save()
      .then( result => {
        return {...result._doc};
      }).catch( err => {
        throw err;
      });
  },
  updateJoke: function ({id, input}) {
    return Joke.findOneAndUpdate({_id:id},{
        content: input.content
      })
      .then( result => {
        return result;
      }).catch( err => {
        throw err;
      });
  },
  likeJoke: function ({id}) {
    return Joke.findOneAndUpdate({_id:id},{
        $inc: { likes: 1 }
      })
      .then( result => {
        return result;
      }).catch( err => {
        throw err;
      });
  },
  dislikeJoke: function ({id}) {
    return Joke.findOneAndUpdate({_id:id},{
        $inc: { dislikes: 1 }
      })
      .then( result => {
        return result;
      }).catch( err => {
        throw err;
      });
  },
  deleteJoke: function ({id}) {
    return Joke.findOneAndDelete({_id:id})
      .then( result => {
        return result;
      }).catch( err => {
        throw err;
      });
  }

};

module.exports = root;
