const pool = require("../../config/dbConfig");

module.exports = {
  addEmployee: async (body) => {
    try {
      const conn = await pool.getConnection();

      console.log("DB연결됨");

      conn.release();
    } catch (err) {
      console.log(err);
    }
  },
};
