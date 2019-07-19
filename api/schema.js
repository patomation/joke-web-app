const { buildSchema } = require('graphql');

const schema = buildSchema(`
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
  }

  type Mutation {
    createJoke(input: JokeInput): Joke
    updateJoke(id: ID!, input: JokeInput): Joke
    likeJoke(id: ID!, input: JokeInput): Joke
    dislikeJoke(id: ID!, input: JokeInput): Joke
    deleteJoke(id: ID!): Joke
  }
`);

module.exports = schema;
