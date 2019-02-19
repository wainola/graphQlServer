const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

const app = express();
app.use(cors());

const users = {
  1: {
    id: '1',
    username: 'Nicolas Riquelme'
  },
  2: {
    id: '2',
    username: 'Camilo Riquelme'
  }
};

const messages = {
  1: {
    id: '1',
    text: 'Hello world'
  },
  2: {
    id: '2',
    text: 'Poto caca'
  }
};

const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]
    animal: Animal
    animals: [Animal!]
    messages: [Message!]
    message(id: ID!): Message!
  }
  type User {
    id: ID!
    username: String!
  }
  type Message {
    id: ID!
    text: String!
  }
`;

const resolvers = {
  Query: {
    me: (parent, args, { me }) => {
      return me;
    },
    user: (parent, { id }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    }
  },
  User: {
    username: user => {
      return user.username;
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1]
  }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Server on port 8000');
});
