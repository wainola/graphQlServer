const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    createUser(username: String!): User!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }
`;
