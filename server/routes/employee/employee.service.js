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

  addWork: async (body) => {
    try {
      const { WORK_TYPE, WORK_DES } = body;
      const conn = await pool.getConnection();
      const query = "Insert INTO work (WORK_TYPE, WORK_DES) value (?,?)";

      const [result] = await conn.query(query, [WORK_TYPE, WORK_DES]);
      conn.release();
      return result;
    } catch (error) {
      throw error;
    }
  },

  getWorkList: async () => {
    try {
      const conn = await pool.getConnection();

      const query = "select * from work ";

      const [result] = await conn.query(query);

      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },
};
