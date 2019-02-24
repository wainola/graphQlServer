require('dotenv').config();
const { Client } = require('pg');
const users = require('./users');
const messages = require('./messages');

const { DATABASE_URL } = process.env;

const conn = new Client({
  connectionString: DATABASE_URL
});

conn.connect();

const queryUsers = `INSERT INTO users (username) VALUES ($1) RETURNING *;`;
const queryMessages = `INSERT INTO message (text, user_id) VALUES ($1, 
$2) RETURNING *;`;

Promise.all(
  users.map(async user => {
    const userToInsert = [user.username];
    const q = await conn.query(queryUsers, userToInsert);
    const result = await q.rows[0];
    console.log('SUCCESS ON INSERTING USERS', result);
    const { id: user_id } = result;
    for (let i = 0; i < messages.length; i++) {
      const dataToInsert = [messages[i].text, user_id];
      conn.query(queryMessages, dataToInsert).then(data => {
        console.log('SUCCESS ON INSERTING MESSAGE', data);
      });
    }
  })
);
