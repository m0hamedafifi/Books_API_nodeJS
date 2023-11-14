const path = require ('path');
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const db_config = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
    // connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 300000,
    idleTimeoutMillis: 300000,
    max: 20,
  }

  const pool = new Pool(db_config);

  pool.on('connect', () => {
    console.log("database is connect");

  });

  pool.on('remove', () => {
    console.log("database connection removed");
  });

  module.exports = pool;