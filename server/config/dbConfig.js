const { createPool } = require("mysql2/promise");

//환경 설정
const dotenv = require("dotenv");
dotenv.config();

// const dbInfo = {
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
// };

const dbInfo = {
  host: "localhost",
  user: "root",
  //회사 환경
  // password: "root",
  password: "1111",

  database: "workmanage",
};

const pool = createPool(dbInfo);

module.exports = pool;
