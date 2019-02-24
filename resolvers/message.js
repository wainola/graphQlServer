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
    createMessage: async (parent, { text, userId }) => {
      const query = `
      INSERT INTO MESSAGE (text, user_id) VALUES ($1, $2) RETURNING *;
      `;
      const valuesToInsert = [text, userId];
      const q = await conn.query(query, valuesToInsert);
      const results = await q.rows[0];
      return results;
    },
    deleteMessage: async (parend, { id }) => {
      const query = `DELETE FROM message WHERE id = '${id}' RETURNING *;`;
      const q = await conn.query(query);
      const results = await q.rows;
      console.log('results', results);
      if (results.length) {
        return true;
      }
      return false;
    }
  },
  Message: {
    user: async parent => {
      const query = `SELECT * FROM users WHERE id = '${parent.user_id}';`;
      const q = await conn.query(query);
      const results = await q.rows[0];
      return results;
    }
  }
};
