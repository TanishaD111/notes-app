import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config();
const connection = mysql.createPool({
  host: process.env.APP_HOST,
  user: process.env.APP_USER,
  password: process.env.APP_PASSWORD,
  database: process.env.PP_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection;
