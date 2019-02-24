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

const resolveTables = queries =>
  Promise.all(
    queries.map(async q => {
      try {
        const r = await conn.query(q);
        const result = await r;
        console.log('success on creating table!');
      } catch (e) {
        console.log('error:', e);
      }
    })
  );

resolveTables(queries)
  .then(() => console.log('Success on running migrations'))
  .then(() => process.exit())
  .catch(e => console.log('Some error hapened', e));
