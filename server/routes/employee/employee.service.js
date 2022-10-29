const pool = require("../../config/dbConfig");

module.exports = empService = {
  empLogin: async (body) => {
    try {
      const { emp_no, password } = body;
      const conn = await pool.getConnection();
      const query = "SELECT * FROM employee WHERE EMP_NO = ? AND EMP_PW = ?";
      const [result] = await conn.query(query, [emp_no, password]);
      conn.release();
      return result;
    } catch (error) {
      throw error;
    }
  },
};
