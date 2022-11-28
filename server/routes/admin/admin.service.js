const pool = require("../../config/dbConfig");

module.exports = {
  addEmployee: async (body) => {
    try {
      const conn = await pool.getConnection();

      const { EMP_NO, EMP_NAME, EMP_PW, ADMIN } = body;

      const result = await conn.query("Insert INTO employee value (?,?,?,?)", [
        EMP_NO,
        EMP_NAME,
        EMP_PW,
        ADMIN,
      ]);

      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },
  getEmployeeList: async () => {
    try {
      const conn = await pool.getConnection();

      const query = "select EMP_NO, EMP_NAME from employee ";

      const result = await conn.query(query);
      console.log(result);
      conn.release();

      // return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },
};
