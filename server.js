const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

const app = express();
app.use(cors());

const users = {
  1: {
    id: '1',
    username: 'Nicolas Riquelme',
    messageId: [1]
  },
  2: {
    id: '2',
    username: 'Camilo Riquelme',
    messageId: [2]
  }
};

const messages = {
  1: {
    id: '1',
    text: 'Hello world',
    userId: '1'
  },
  2: {
    id: '2',
    text: 'Poto caca',
    userId: '2'
  }
};

const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]
    messages: [Message!]
    message(id: ID!): Message!
  }
  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }
  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;

const resolvers = {
  Query: {
    me: (parent, args, { me }) => {
      return me;
    },
    user: (parent, { id }) => {
      console.log('user');
      return users[id];
    },
    users: () => {
      console.log('users');
      return Object.values(users);
    },
    messages: () => {
      return Object.values(messages);
    },
    message: (parent, { id }) => {
      console.log('message', id);
      return messages[id];
    }
  },
  User: {
    username: user => {
      return user.username;
    },
    messages: user => {
      return Object.values(messages).filter(message => message.userId === user.id);
    }
  },
  Message: {
    user: message => {
      console.log('messages and users', users[message.userId]);
      return users[message.userId];
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
