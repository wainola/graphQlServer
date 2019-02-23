require('dotenv').config();
const { Client } = require('pg');

const conn = new Client({
  connectionString: process.env.DATABASE_URL
});

conn.connect();

const pgCryptoExtension = `
CREATE EXTENSION IF NOT EXISTS pgcrypto;
`;

const userTable = `
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL
);
`;

const messageTable = `
CREATE TABLE message (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id)
);
`;

const queries = [pgCryptoExtension, userTable, messageTable];

Promise.all(
  queries.map(async q => {
    try {
      const r = await conn.query(q);
      const result = await r;
      console.log('result:', result);
    } catch (e) {
      console.log('error:', e);
    }
  })
);

console.log('connection', process.env.DATABASE_URL);

conn.query('SELECT NOW()', (err, result) => {
  if (err) console.log('error', err);
  console.log('rows');
  console.log(result.rows);
});

console.log('end connection');
