var express = require('express');
var graphqlHTTP = require('express-graphql');
var cors = require('cors');

const schema = require('./schema.js');
const root = require('./root.js');

var app = express();
app.use(cors());
app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

module.exports = app;
