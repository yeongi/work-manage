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

      const result = await conn.query(query, [WORK_TYPE, WORK_DES]);
      conn.release();
      return result;
    } catch (error) {
      throw error;
    }
  },

  addWorkRecord: async (body) => {
    try {
      const {
        EMP_NO,
        WORK_CODE,
        BLK_SQ,
        HULL_SQ,
        INP_MH,
        DATE_TIME,
        OVERTIME_MH,
      } = body;

      const inputMH = parseFloat(INP_MH) + parseFloat(OVERTIME_MH);
      const conn = await pool.getConnection();
      const insertQuery = `Insert INTO work_record ( 
        EMP_NO,
        WORK_CODE,
        BLK_SQ,
        HULL_SQ,
        INP_MH,
        WORK_DATE,
        OVERTIME_MH) value (?,?,?,?,?,?,?)
       `;

      const updateQuery = ` UPDATE block SET RES_MH = RES_MH + ? WHERE BLK_SQ = ? ;`;

      const insertResult = await conn.query(insertQuery, [
        EMP_NO,
        WORK_CODE,
        BLK_SQ,
        HULL_SQ,
        INP_MH,
        DATE_TIME,
        OVERTIME_MH,
      ]);
      const updateResult = await conn.query(updateQuery, [inputMH, BLK_SQ]);
      conn.release();
      return { insertResult, updateResult };
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

  getWorkRecordOfEmp: async (EMP_NO) => {
    try {
      const conn = await pool.getConnection();

      const query = "select * from ad_work_record where EMP_NO = ? ";

      const [result] = await conn.query(query, [EMP_NO]);

      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  getWorkRecordOfNo: async (NO) => {
    try {
      const conn = await pool.getConnection();

      const query = "select * from ad_work_record where RECORD_NO = ? ";

      const [result] = await conn.query(query, [NO]);

      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },
};
