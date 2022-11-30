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

      const [result] = await conn.query(query);

      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  addHull: async (hull) => {
    try {
      const conn = await pool.getConnection();

      const { HULL_NO, HULL_TYPE, SHIPYARD } = hull;

      const result = await conn.query(
        "Insert INTO hull (HULL_NO, HULL_TYPE, SHIPYARD) value (?,?,?)",
        [HULL_NO, HULL_TYPE, SHIPYARD]
      );

      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  getHullList: async () => {
    try {
      const conn = await pool.getConnection();

      const query = "select * from hull ";

      const [result] = await conn.query(query);

      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  addHullBlock: async (BLK) => {
    try {
      const conn = await pool.getConnection();

      const { BLK_NO, HULL_SQ, NORM_MH } = BLK;

      const result = await conn.query(
        "Insert INTO block (BLK_NO, HULL_SQ, NORM_MH) value (?,?,?)",
        [BLK_NO, HULL_SQ, NORM_MH]
      );

      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },
};
