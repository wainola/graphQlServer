require('dotenv').config();
const { Client } = require('pg');

const conn = new Client({
  connectionString: process.env.DATABASE_URL
});

conn.connect();

const pgCryptoExtension = `
CREATE EXTENSION IF NO EXISTS "pgcrypto";
`;

const userTable = `
CREATE TABLE user (
    id UUID PRIMARY KEY gen_random_uuid(),
    username TEXT NOT NULL
);
`;

const messageTable = `
CREATE TABLE messag (
    id UUID PRIMARY KEY gen_random_uuid(),
    text TEXT NOT NULL
    user_id UUID NOT NULL REFERENCES user(id)
);
`;

const queries = [pgCryptoExtension, userTable, messageTable];

Promise.all(queries.map(async q => {
    
    try {
        
    }
    const r = await conn.query(q)
    const result = await r

}))

console.log('connection', process.env.DATABASE_URL);

conn.query('SELECT NOW()', (err, result) => {
  if (err) console.log('error', err);
  console.log('rows');
  console.log(result.rows);
});

console.log('end connection');
