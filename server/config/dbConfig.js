const { createPool } = require("mysql2/promise");

//환경 설정
const dotenv = require("dotenv");
dotenv.config();

const dbInfo = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

const pool = createPool(dbInfo);

console.log(pool);

module.exports = pool;
