require('dotenv').config();
const { v4 } = require('uuid');
const { Client } = require('pg');

const { DATABASE_URL } = process.env;

const conn = new Client({
  connectionString: DATABASE_URL
});

conn.connect();

module.exports = {
  Query: {
    messages: async () => {
      const query = 'SELECT * FROM message;';
      const q = await conn.query(query);
      const results = await q.rows;
      return results;
    },
    message: async (parent, { id }) => {
      const query = `SELECT * FROM message WHERE id = '${id}';`;
      const q = await conn.query(query);
      const results = await q.rows[0];
      return results;
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
  Message: {
    user: (message, args, { models }) => {
      return models.users[message.userId];
    }
  }
};
