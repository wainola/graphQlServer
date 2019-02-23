require('dotenv').config();
const { Client } = require('pg');

const { DATABASE_URL } = process.env;

const conn = new Client({
  connectionString: DATABASE_URL
});

conn
  .connect()
  .then(() => console.log('connected to the database'))
  .catch(e => console.log('error on connecting to the database', e));

module.exports = {
  Query: {
    user: async (parent, { id }) => {
      const query = `SELECT * FROM users WHERE id = '${id}';`;
      const q = await conn.query(query);
      const results = await q.rows[0];
      return results;
    },
    users: async () => {
      const query = 'SELECT * FROM users;';
      const q = await conn.query(query);
      const results = await q.rows;
      return results;
    }
  },
  User: {
    messages: async parent => {
      console.log('parent::', parent);
      const query = `SELECT * FROM message WHERE user_id = '${parent.id}'`;
      const q = await conn.query(query);
      const results = await q.rows;
      console.log('results', results);
      return results;
    }
  }
};
