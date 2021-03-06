const Joke = require('./models/Joke.js');
const User = require('./models/User.js');

const root = {
  register: function ({email,password,lastName,firstName}) {
    return User.findOne({email:email})
      .then( result => {

        //User does not exist Create new user
        if(result === null){
          const user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            Roles: 'USER',
            password: password,
            authkey: require('crypto').randomBytes(10).toString('hex')
          });

          return user.save()
            .then( newUser => {
              return {
                error: false,
                authkey: newUser.authkey,
                message: 'Registration Successful',
                userName: newUser.firstName
              }
            }).catch( err => {
              throw err;
            });

        // User already exists send error
        } else {
          return {
            error: true,
            authkey: '',
            message: 'User Name Already Exists'
          }
        }
      }).catch( err => {
        throw err;
      });

  },
  login: function ({email, password}){
    return User.findOne({email:email})
      .then( result => {
        if ( result === null ) {
          return {
            error: true,
            authkey: require('crypto').randomBytes(10).toString('hex'),
            message: 'User Not Found'
          }
        } else if (password === result.password) {
          return {
            error: false,
            authkey: result.authkey,
            message: 'Log in Successful',
            userName: result.firstName
          }
        } else {
          return {
            error: true,
            authkey: '',
            message: 'Wrong password'
          }
        }
      }).catch( err=>{
        throw err;
      });
  },
  authkeyLogin: function ({authkey}){
    return User.findOne({authkey:authkey})
      .then( result => {
        if ( result === null ) {
          return {
            error: true,
            authkey: '',
            message: 'Bad Auth Key'
          }
        } else {
          return {
            error: false,
            authkey: result.authkey,
            message: 'Log in Successful',
            userName: result.firstName
          }
        }
      }).catch( err=>{
        throw err;
      });
  },
  getJoke: function ({id}) {
    return Joke.findOne({_id:id})
      .then( joke => {
        return joke;
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
  likeJoke: function ({id, authkey}) {
    return User.findOneAndUpdate({authkey:authkey},{
      useFindAndModify: false })
      .then( user => {
          return Joke.findOneAndUpdate({_id:id},{
              $inc: {
                dislikes: ( user.dislikes.includes(id) ? -1 : 0),
                likes: (user.likes.includes(id) ? 0 : 1)
              },
              useFindAndModify: false
            })
            .then( result => {
              //Add to list of likes
              !user.likes.includes(id) ? user.likes.push(id) : null;

              //Remove dislike if previously dislike
              user.dislikes.includes(id) ? user.dislikes.splice( user.dislikes.indexOf(id), 1) : null;

              //Save db user
              return user.save()
                .then( result => {
                  return {
                    success: true
                  }
                }).catch( err => {
                  throw err;
                });
            }).catch( err => {
              throw err;
            });


      }).catch( err=>{
        throw err;
      });

  },
  dislikeJoke: function ({id, authkey}) {
    return User.findOneAndUpdate({authkey:authkey})
      .then( user => {
          return Joke.findOneAndUpdate({_id:id},{
              $inc: {
                dislikes: (user.dislikes.includes(id) ? 0 : 1),
                likes: (user.likes.includes(id) ? -1 : 0),
               },
               useFindAndModify: false
            })
            .then( result => {
              //Add to list of dislikes
              !user.dislikes.includes(id) ? user.dislikes.push(id) : null;

              //Remove like if previously liked
              user.likes.includes(id) ? user.likes.splice( user.likes.indexOf(id), 1) : null;

              //Save db user
              return user.save()
                .then( result => {
                    return {
                    success: true
                  }
                }).catch( err => {
                  throw err;
                });
            }).catch( err => {
              throw err;
            });


      }).catch( err=>{
        throw err;
      });

  },
  deleteJoke: function ({id, authkey}) {
    return Joke.findOneAndDelete({_id:id})
      .then( result => {
        return result;
      }).catch( err => {
        throw err;
      });
  }

};

module.exports = root;
