const { gql } = require('apollo-server-express');

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
  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
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

module.exports = schema;
