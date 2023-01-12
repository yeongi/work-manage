import { useEffect, useState } from "react";
import AdminHandler from "../../../lib/handler/AdminHandler";
import classes from "./MonthRecord.module.css";
import { List, Divider } from "antd";
import dayjs from "dayjs";
import { dayJsMD } from "../../../lib/dayJs";

const MonthRecord = ({ ym }) => {
  const [lists, setList] = useState([]);

  useEffect(() => {
    const getMonthWorkRecord = async () => {
      const result = await AdminHandler.getWorkMonthRecordList(ym);
      setList(result);
    };
    getMonthWorkRecord();
  }, [ym]);
  return (
    <div className={classes.wrapper}>
      <Divider orientation="left">{ym} 업무 기록 리스트</Divider>
      <List
        itemLayout="horizontal"
        bordered
        footer={<div>제작자 ＠github : yeongi</div>}
        dataSource={lists}
        renderItem={({
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
        }) => (
          <List.Item>
            <div className={classes["all-wrapper"]}>
              <div className={classes["header-wrapper"]}>
                <p>선체 번호 </p>
                <p>선체 종류</p>
                <p>블럭 번호 </p>
                <p>조선소</p>
                <p>총합 투입 시수</p>
                <p>총합 야근 시수</p>
                <p>투입 시수</p>
                <p>표준 시수</p>
              </div>
              <div className={classes["list-wrapper"]}>
                <p>{HULL_NO}</p>
                <p>{HULL_TYPE}</p>
                <p>{BLK_NO}</p>
                <p>{SHIPYARD}</p>
                <p>{SUM_INP_MH}</p>
                <p>{SUM_OVER_MH}</p>
                <p>{RES_MH}</p>
                <p>{NORM_MH}</p>
              </div>
              <List
                header={
                  <div className={classes["work-header"]}>
                    <p>업무 종류</p>
                    <p>업무 내용</p>
                    <p>업무 투입시수</p>
                    <p>업무 야근시수</p>
                  </div>
                }
                bordered
                itemLayout="vertical"
                dataSource={WORK_LIST}
                renderItem={({
                  SUM_INP_MH,
                  SUM_OVER_MH,
                  WORK_CODE,
                  WORK_DES,
                  WORK_TYPE,
                }) => (
                  <List.Item>
                    <div className={classes["wlist-wrapper"]}>
                      <p>{WORK_TYPE}</p>
                      <p>{WORK_DES}</p>
                      <p>{SUM_INP_MH}</p>
                      <p>{SUM_OVER_MH}</p>
                    </div>
                  </List.Item>
                )}
              />
              <List
                header={
                  <div className={classes["date-header"]}>
                    <p>업무종류</p>
                    <p>업무내용</p>
                    <p>사원이름</p>
                    <p>사원번호</p>
                    <p>블럭번호</p>
                    <p>선체번호</p>
                    <p>선체종류</p>
                    <p>조선소</p>
                    <p>투입시수</p>
                    <p>야근시수</p>
                    <p>날짜</p>
                  </div>
                }
                bordered
                itemLayout="vertical"
                dataSource={DATE_LIST}
                renderItem={({
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
                }) => (
                  <List.Item>
                    <div className={classes["date-wrapper"]}>
                      <p>{WORK_TYPE}</p>
                      <p>{WORK_DES}</p>
                      <p>{EMP_NAME}</p>
                      <p>{EMP_NO}</p>
                      <p>{BLK_NO}</p>
                      <p>{HULL_NO}</p>
                      <p>{HULL_TYPE}</p>
                      <p>{SHIPYARD}</p>
                      <p>{INP_MH}</p>
                      <p>{OVERTIME_MH}</p>
                      <p>{dayJsMD(dayjs(WORK_DATE))}</p>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default MonthRecord;
