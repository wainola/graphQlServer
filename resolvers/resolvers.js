const { v4 } = require('uuid');

const resolvers = {
  Query: {
    me: (parent, args, { me }) => {
      return me;
    },
    user: (parent, { id }, { models }) => {
      return models.users[id];
    },
    users: (parent, args, { models }) => {
      return Object.values(models.users);
    },
    messages: (parent, args, { models }) => {
      return Object.values(models.messages);
    },
    message: (parent, { id }, { models }) => {
      return models.messages[id];
    }
  },
  Mutation: {
    createMessage: (parent, { text }, { me, models }) => {
      const id = v4();
      const message = {
        id,
        text,
        userId: me.id
      };

      models.messages[id] = message;
      models.users[me.id].messageId.push(id);
      return message;
    },
    deleteMessage: (parend, { id }, { models }) => {
      const { [id]: message, ...otherMessages } = models.messages;

      if (!message) return false;

      models.messages = otherMessages;

      return true;
    }
  },
  User: {
    username: user => {
      return user.username;
    },
    messages: (user, args, { models }) => {
      return Object.values(models.messages).filter(message => message.userId === user.id);
    }
  },
  Message: {
    user: (message, args, { models }) => {
      return models.users[message.userId];
    }
  }
};

module.exports = resolvers;
