import { useEffect, useState } from "react";
import AdminHandler from "../../../lib/handler/AdminHandler";
import classes from "./MonthRecord.module.css";

const MonthRecord = ({ ym }) => {
  const [lists, setList] = useState([]);

  useEffect(() => {
    const getMonthWorkRecord = async () => {
      const result = await AdminHandler.getWorkMonthRecordList(ym);
      setList(result);
    };
    console.log(lists);
    getMonthWorkRecord();
  }, [ym]);
  return (
    <div>
      {lists.length > 0 &&
        lists.map(
          ({
            BLK_NO,
            BLK_SQ,
            DATE_LIST,
            HULL_NO,
            HULL_SQ,
            HULL_TYPE,
            NORM_MH,
            RES_MH,
            SHIPYARD,
            SUM_INP_MH,
            SUM_OVER_MH,
            WORK_LIST,
          }) => {
            return (
              <div key={BLK_SQ}>
                <section>
                  <p>선체 번호 : {HULL_NO} </p>
                  <p>선체 종류 : {HULL_TYPE} </p>
                  <p>블럭 번호 : {BLK_NO} </p>
                  <p>조선소 : {SHIPYARD}</p>
                  <p>총합 투입 시수 : {SUM_INP_MH}</p>
                  <p>총합 야근 시수 : {SUM_OVER_MH}</p>
                  <p>투입 시수 : {RES_MH}</p>
                  <p>표준 시수 : {NORM_MH}</p>
                </section>
                <section className={classes["work-wrap"]}>
                  {WORK_LIST.length > 0 &&
                    WORK_LIST.map(
                      ({
                        SUM_INP_MH,
                        SUM_OVERTIME_MH,
                        WORK_CODE,
                        WORK_DES,
                        WORK_TYPE,
                      }) => {
                        return (
                          <div key={WORK_CODE}>
                            <p>업무 종류 : {WORK_TYPE}</p>
                            <p>업무 내용 : {WORK_DES}</p>
                            <p>업무 투입 시수 : {SUM_INP_MH}</p>
                            <p>업무 야근 시수 : {SUM_OVERTIME_MH}</p>
                          </div>
                        );
                      }
                    )}
                </section>
                <section>
                  {DATE_LIST.length > 0 &&
                    DATE_LIST.map(
                      ({
                        BLK_SQ,
                        BLK_NO,
                        EMP_NAME,
                        EMP_NO,
                        HULL_NO,
                        HULL_SQ,
                        HULL_TYPE,
                        INP_MH,
                        NORM_MH,
                        OVERTIME_MH,
                        RECORD_NO,
                        RES_MH,
                        SHIPYARD,
                        WORK_CODE,
                        WORK_DATE,
                        WORK_DES,
                        WORK_TYPE,
                      }) => {
                        return (
                          <div
                            key={RECORD_NO}
                            className={classes["record-wrap"]}
                          >
                            <p>업무 종류: {WORK_TYPE}</p>
                            <p>업무 내용: {WORK_DES}</p>
                            <p>사원 이름: {EMP_NAME}</p>
                            <p>사원 이름: {EMP_NO}</p>
                            <p>선체 번호: {HULL_NO}</p>
                            <p>선체 종류: {HULL_TYPE}</p>
                            <p>조선소: {SHIPYARD}</p>
                            <p>투입 시수: {INP_MH}</p>
                            <p>표준 시수: {NORM_MH}</p>
                            <p>야근 시수: {OVERTIME_MH}</p>
                            <p>실적 시수: {RES_MH}</p>
                          </div>
                        );
                      }
                    )}
                </section>
                <hr />
              </div>
            );
          }
        )}
    </div>
  );
};

export default MonthRecord;
