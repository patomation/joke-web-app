const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type LoginMessage {
    error: Boolean
    message: String
    authkey: String
    userName: String
  }

  type Result {
    success: Boolean
  }

  input JokeInput {
    content: String
    likes: Int = 0
    dislikes: Int = 0
  }

  type Joke {
    id: ID!
    content: String
    likes: String
    dislikes: String
  }

  type Jokes {
    jokes: [Joke]
  }

  type Query {
    getJoke(id: ID!): Joke
    getJokes(results: Int = 10): Jokes
    login(email: String, password: String): LoginMessage
    authkeyLogin(authkey: String): LoginMessage
  }

  type Mutation {
    register(email: String, password: String, firstName: String, lastName: String): LoginMessage
    createJoke(input: JokeInput): Joke
    updateJoke(id: ID!, input: JokeInput): Joke
    likeJoke(id: ID!, authkey: ID!): Result
    dislikeJoke(id: ID!, authkey: ID!): Result
    deleteJoke(id: ID!, authkey: ID!): Joke
  }
`);

module.exports = schema;
