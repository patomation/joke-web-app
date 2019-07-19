var express = require('express');
var graphqlHTTP = require('express-graphql');
var cors = require('cors');

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);
mongoose.Promise = global.Promise;

const schema = require('./schema.js');
const root = require('./root.js');

var app = express();
app.use(cors());
app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));



module.exports = app;
