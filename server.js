const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

const { accounts, creditCards } = require('./accounts');

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
    account(id: ID!): Account!
    accounts: [Account!]
    creditCard(id: ID!): CreditCard!
    creditCards: [CreditCard!]
    client(id: ID!): Client!
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
  type Client {
    account: Account!
    credit: CreditCard!
  }
  type Account {
    id: ID!
    name: String!
    balance: Int!
    creditCard: [CreditCard!]
  }
  type CreditCard {
    id: ID!
    cod: String!
    international: Boolean!
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
    },
    account: (parent, { id }) => {
      console.log('account');
      return accounts[id];
    },
    accounts: () => {
      return Object.values(accounts);
    },
    creditCard: (parent, { id }) => {
      return creditCards[id];
    },
    creditCards: () => {
      return Object.values(creditCards);
    }
  },
  User: {
    username: user => {
      console.log('USER::Username');
      return user.username;
    },
    messages: user => {
      console.log(
        'USER::Messages',
        Object.values(messages).filter(message => message.userId === user.id)
      );
      return Object.values(messages).filter(message => message.userId === user.id);
    }
  },
  Message: {
    user: message => {
      console.log('messages and users', users[message.userId]);
      return users[message.userId];
    }
  },
  Account: {
    creditCard: account => {
      console.log(
        'Account::CreditCard',
        Object.values(creditCards).filter(card => card.id === account.id)[0].id,
        account.id
      );
      return Object.values(creditCards).filter(card => card.id === account.id);
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
