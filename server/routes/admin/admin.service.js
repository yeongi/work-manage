const dayjs = require("dayjs");
const pool = require("../../config/dbConfig");
const { workRecordArr, dayJsDDMMYYYY } = require("../../lib/dayLib");

module.exports = {
  addEmployee: async (body) => {
    try {
      const conn = await pool.getConnection();

      const { EMP_NO, EMP_NAME, EMP_PW } = body;

      const result = await conn.query(
        "INSERT INTO employee (`EMP_NO`, `EMP_NAME`, `EMP_PW`) VALUES (?, ?, ?);",
        [EMP_NO, EMP_NAME, EMP_PW]
      );

      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  getEmployeeList: async () => {
    try {
      const query = "select EMP_NO, EMP_NAME, EMP_PW, ADMIN from employee";

      // 1주일 업무 내역 조회
      const dayRecordQuery = `
      SELECT EMP_NO ,EMP_NAME, SUM(INP_MH) AS INP_MH , WORK_DATE
      FROM workmanage.ad_work_record 
      WHERE WORK_DATE
      BETWEEN  DATE_ADD(NOW(), INTERVAL -1 WEEK ) AND NOW()
      AND EMP_NO = ?
      GROUP BY WORK_DATE
      ORDER BY WORK_DATE
      ;
      
      `;
      const conn = await pool.getConnection();

      const [empListRes] = await conn.query(query);

      const work_record = await Promise.all(
        empListRes.map(async (emp) => {
          const [dayRecordRes] = await conn.query(dayRecordQuery, [emp.EMP_NO]);

          const tempArray = workRecordArr();

          tempArray.forEach((a) => {
            const dayWorkDate = dayRecordRes.filter(
              (b) => a.WORK_DATE === dayJsDDMMYYYY(dayjs(b.WORK_DATE))
            );
            a.INP_MH = dayWorkDate.reduce((acc, cur) => {
              return acc + cur.INP_MH;
            }, 0);
          });

          return { ...emp, record: tempArray };
        })
      );

      console.log("work_record", work_record);

      conn.release();

      return work_record;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  addHull: async (hull) => {
    try {
      const conn = await pool.getConnection();

      const { HULL_NO, HULL_TYPE, SHIPYARD } = hull;

      const query =
        "Insert INTO hull (HULL_NO, HULL_TYPE, SHIPYARD) value (?,?,?)";
      const result = await conn.query(query, [HULL_NO, HULL_TYPE, SHIPYARD]);

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

  deleteBlk: async (blk) => {
    try {
      const conn = await pool.getConnection();

      const query = "DELETE FROM block WHERE BLK_SQ = ?;";

      const result = await conn.query(query, [blk]);

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

      const query =
        "Insert INTO block (BLK_NO, HULL_SQ, NORM_MH) value (?,?,?)";

      const result = await conn.query(query, [BLK_NO, HULL_SQ, NORM_MH]);

      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  getHullInfo: async (HULL_SQ) => {
    try {
      const conn = await pool.getConnection();

      const query = "select * from hull where HULL_SQ = ? ";

      const [result] = await conn.query(query, [HULL_SQ]);

      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  getBlkList: async (HULL_SQ) => {
    try {
      const conn = await pool.getConnection();

      const query = "select * from block where HULL_SQ = ? ";

      const [result] = await conn.query(query, [HULL_SQ]);

      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  getWorkRecordOfBlk: async (blkSQ) => {
    try {
      const conn = await pool.getConnection();

      const query = "select * from ad_work_record where BLK_SQ = ? ";

      const [result] = await conn.query(query, [blkSQ]);

      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  updateBlkMhInfo: async ({ PRE_MH, AFTER_MH, BLK_SQ, RECORD_NO }) => {
    try {
      const conn = await pool.getConnection();

      const blkUpdateQuery =
        "UPDATE block SET RES_MH = RES_MH - ? + ? WHERE BLK_SQ = ?";

      const workRecordUpdateQuery =
        "UPDATE work_record SET INP_MH = ? WHERE RECORD_NO = ?";

      const [blkRes] = await conn.query(blkUpdateQuery, [
        PRE_MH,
        AFTER_MH,
        BLK_SQ,
      ]);
      const [recordRes] = await conn.query(workRecordUpdateQuery, [
        AFTER_MH,
        RECORD_NO,
      ]);

      conn.release();

      return { blkRes, recordRes };
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  getMonthRecordListOfBLK: async (YM) => {
    const BLK_QUERY = `    
    -- 블럭을 그룹화 해서 그 달의 RES_MH를 구함 --  
    SELECT BLK_SQ, BLK_NO,HULL_SQ,HULL_NO,HULL_TYPE,SHIPYARD
    ,sum(INP_MH) AS SUM_INP_MH
    ,RES_MH ,NORM_MH 
    FROM ad_work_record 
    where DATE_FORMAT(WORK_DATE,'%Y-%m') = ?
    GROUP BY BLK_SQ 
    order by HULL_NO;`;

    const WORK_SUM_QUERY = `
    -- 그 달의 업무에 대한 총합을 가져옴 --
    SELECT WORK_CODE ,WORK_TYPE, WORK_DES, SUM(INP_MH) as SUM_INP_MH
    FROM (
    SELECT * FROM ad_work_record
    where DATE_FORMAT(WORK_DATE,'%Y-%m') = ? and blk_sq = ?
    ORDER BY WORK_DATE) AS MH_RECORD
    GROUP BY WORK_CODE`;

    const WORKLIST_QUERY = `
    -- 그 달의 업무 기록 리스트를 가져옴 --
    SELECT * FROM ad_work_record
    where DATE_FORMAT(WORK_DATE,'%Y-%m') = ? and blk_sq = ?
    ORDER BY WORK_DATE;`;

    try {
      const conn = await pool.getConnection();

      const [BLK_RES] = await conn.query(BLK_QUERY, [YM]);

      const RESULT = await Promise.all(
        BLK_RES.map(async (RES) => {
          const [WORK_LIST] = await conn.query(WORK_SUM_QUERY, [
            YM,
            RES.BLK_SQ,
          ]);

          const [DATE_LIST] = await conn.query(WORKLIST_QUERY, [
            YM,
            RES.BLK_SQ,
          ]);

          return { WORK_LIST, DATE_LIST, ...RES };
        })
      );

      conn.release();

      return RESULT;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  getBlockListOfHull: async (HULL_SQ) => {
    const BlockListOfHull = `    
    SELECT BLK_SQ, BLK_NO,HULL_SQ,HULL_NO,HULL_TYPE,SHIPYARD
    ,sum(INP_MH) AS SUM_INP_MH
    ,RES_MH ,NORM_MH 
    FROM ad_work_record where hull_sq = ?
    GROUP BY BLK_SQ 
    order by BLK_SQ DESC;`;

    const BlockWorkSum = `
    -- 블럭 업무에 대한 총합을 가져옴 --
    SELECT WORK_CODE ,WORK_TYPE, WORK_DES, SUM(INP_MH) as SUM_INP_MH
    FROM (
    SELECT * FROM ad_work_record
    where blk_sq = ?
    ORDER BY WORK_DATE) AS MH_RECORD
    GROUP BY WORK_CODE;`;

    const WORKLIST_QUERY = `
    -- 블럭 업무 기록 리스트를 가져옴 --
    SELECT * FROM ad_work_record where blk_sq = ? ORDER BY WORK_DATE;`;

    try {
      const conn = await pool.getConnection();

      const [BLK_RES] = await conn.query(BlockListOfHull, [HULL_SQ]);

      const RESULT = await Promise.all(
        BLK_RES.map(async (RES) => {
          const [WORK_LIST] = await conn.query(BlockWorkSum, [RES.BLK_SQ]);

          const [DATE_LIST] = await conn.query(WORKLIST_QUERY, [RES.BLK_SQ]);

          return { DATE_LIST, WORK_LIST, ...RES };
        })
      );

      conn.release();

      return RESULT;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  updateCompleteHull: async (hull_sq) => {
    try {
      const conn = await pool.getConnection();

      const [[{ complete }]] = await conn.query(
        "SELECT complete FROM hull WHERE hull_sq=?",
        [hull_sq]
      );

      const updateQuery =
        complete === 1
          ? "UPDATE hull SET complete = 0 WHERE hull_sq = ?"
          : "UPDATE hull SET complete = 1 WHERE hull_sq = ?";

      const [updateResult] = await conn.query(updateQuery, [hull_sq]);

      const getQuery = "select * from hull where HULL_SQ = ? ";

      const [result] = await conn.query(getQuery, [hull_sq]);

      console.log(updateResult, result);
      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  updateHullInfo: async (hull) => {
    try {
      const conn = await pool.getConnection();

      const { HULL_SQ, HULL_NO, HULL_TYPE, SHIPYARD, complete } = hull;

      const updateQuery = `UPDATE hull SET 
      HULL_NO = "${HULL_NO}", 
      HULL_TYPE = "${HULL_TYPE}",
      SHIPYARD = "${SHIPYARD}",
      complete = ${complete}
      WHERE hull_sq = ${HULL_SQ}`;

      const [result] = await conn.query(updateQuery);

      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  updateBlkInfo: async (blk) => {
    try {
      const conn = await pool.getConnection();

      const { BLK_SQ, BLK_NO, NORM_MH } = blk;

      const updateQuery = `UPDATE block SET 
      BLK_NO = "${BLK_NO}", 
      NORM_MH = ${NORM_MH}
      WHERE BLK_SQ = ${BLK_SQ}`;

      const [result] = await conn.query(updateQuery);

      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },
};
