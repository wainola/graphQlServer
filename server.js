const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

const app = express();
app.use(cors());

let users = {
  1: {
    id: '1',
    username: 'Nicolas Riquelme'
  },
  2: {
    id: '2',
    username: 'Camilo Riquelme'
  }
};

const me = users[1];

const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]
    animal: Animal
    animals: [Animal!]
  }
  type User {
    id: ID!
    username: String!
  }
  type Animal {
    type: String!
    name: String!
    age: Int!
  }
`;

const resolvers = {
  Query: {
    me: () => {
      return me;
    },
    user: (parent, { id }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    },
    animal: () => {
      return {
        type: 'Mammal',
        name: 'Bruno',
        age: 7
      };
    },
    animals: () => {
      return Object.values({
        1: {
          type: 'Mammal',
          name: 'Kat',
          age: 1
        },
        2: {
          type: 'Bird',
          name: 'Birdman',
          age: 13
        }
      });
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Server on port 8000');
});
