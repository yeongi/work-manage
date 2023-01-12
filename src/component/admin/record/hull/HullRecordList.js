import { useEffect, useState } from "react";
import AdminHandler from "../../../../lib/handler/AdminHandler";
import { Divider, List } from "antd";
import classes from "./HullRecordList.module.css";
import dayjs from "dayjs";
import { dayJsYMD } from "../../../../lib/dayJs";

const headers = [
  "조선소",
  "블럭 번호",
  "선체 번호",
  "선체 종류",
  "표준 시수",
  "총합 투입 시수",
  "총합 야근 시수",
  "투입 시수",
];

const HullRecordList = ({ hull }) => {
  const [recordList, setList] = useState([{}]);

  const getHullWorkRecordList = async (hull) => {
    const hull_work_list = await AdminHandler.getWorkHullRecordList(hull);
    setList(hull_work_list);
    console.log(recordList);
  };

  useEffect(() => {
    getHullWorkRecordList(hull);
  }, [hull]);

  return (
    <div className={classes.wrapper}>
      <Divider orientation="left">선체별 업무 기록 리스트</Divider>
      <List
        itemLayout="horizontal"
        bordered
        footer={<div>제작자 ＠github : yeongi</div>}
        dataSource={recordList}
        renderItem={({
          BLK_NO,
          BLK_SQ,
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
            <div className={classes["item-wrapper"]}>
              <div className={classes["header-wrapper"]}>
                {headers.map((header) => {
                  return <p>{header}</p>;
                })}
              </div>
              <div className={classes["list-wrapper"]}>
                <p>{SHIPYARD}</p>
                <p>{BLK_NO}</p>
                <p>{HULL_NO}</p>
                <p>{HULL_TYPE}</p>
                <p>{NORM_MH}</p>
                <p>{SUM_INP_MH}</p>
                <p>{SUM_OVER_MH}</p>
                <p>{RES_MH}</p>
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
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default HullRecordList;
