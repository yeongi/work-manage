import { useEffect, useState } from "react";
import AdminHandler from "../../../../lib/handler/AdminHandler";
import { Button, Divider, List } from "antd";
import classes from "./HullRecordList.module.css";
import { HEADER } from "../../../../lib/const/List";
import mappingHeader from "../../../../lib/MappingHeader";
import HullListExport from "../../sheet/HullListExport";

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
      <Divider orientation="left">
        <p>선체별 업무 기록 리스트</p>
        <HullListExport
          list={recordList}
          fileName={[
            recordList[0].SHIPYARD,
            recordList[0].HULL_NO,
            recordList[0].HULL_TYPE,
          ].join("-")}
        />
      </Divider>
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
          WORK_LIST,
        }) => (
          <>
            <List.Item>
              <div className={classes["item-wrapper"]}>
                <div className={classes["header-wrapper"]}>
                  {HEADER.HULL_LIST.map(mappingHeader)}
                </div>
                <div className={classes["list-wrapper"]}>
                  <p>{SHIPYARD}</p>
                  <p>{HULL_NO}</p>
                  <p>{HULL_TYPE}</p>
                  <p>{BLK_NO}</p>
                  <p>{NORM_MH}</p>
                  <p>{SUM_INP_MH}</p>
                  <p>{RES_MH}</p>
                </div>
                <List
                  header={
                    <div className={classes["work-header"]}>
                      {HEADER.WORK.map(mappingHeader)}
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
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </List.Item>
          </>
        )}
      />
    </div>
  );
};

export default HullRecordList;
