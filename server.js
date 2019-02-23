const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const schema = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');
const models = require('./models/models');

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1]
  }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Server on port 8000');
});
