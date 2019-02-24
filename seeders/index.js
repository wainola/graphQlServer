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

// const cleanAllTables = () => {
//   const q1 =
// }

const resolveUsers = data =>
  Promise.all(
    data.map(async item => {
      try {
        const valuesToInsert = [item.username];
        const q = await conn.query(queryUsers, valuesToInsert);
        const results = await q.rows[0];
        console.log('Succes on inserting users', results);
      } catch (e) {
        console.log('Some error happende on inserting users', e);
      }
    })
  );

const resolveMessages = data =>
  Promise.all(
    data.map(async (item, idx) => {
      const s = `SELECT * FROM USERS;`;
      try {
        const q = await conn.query(s);
        const results = await q.rows;

        const u1 = results.filter(item => item.username === 'wainola')[0];
        const u2 = results.filter(item => item.username === 'nrriquel')[0];
        const u3 = results.filter(item => item.username === 'queen')[0];

        if (idx < 2) {
          item.user_id = u1.id;
        }
        if (idx >= 2 && idx < 4) {
          item.user_id = u2.id;
        }
        if (idx >= 4 && idx < 6) {
          item.user_id = u3.id;
        }

        const valuesToInsert = [item.text, item.user_id];
        const q2 = await conn.query(queryMessages, valuesToInsert);
        const r = await q2.rows[0];
        console.log('SUCCESS ON INSERTING MESSAGE', r);
      } catch (e) {
        console.log('Some error happened during message insertion', e);
      }
    })
  );

resolveUsers(users)
  .then(() => resolveMessages(messages))
  .then(() => process.exit())
  .catch(e => console.log('some error happened', e));
