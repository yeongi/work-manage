import { useEffect, useState } from "react";
import AdminHandler from "../../../../lib/handler/AdminHandler";
import classes from "./RecordList.module.css";
import { Divider, List, Typography } from "antd";
import HeaderItem from "./HeaderItem";
import ListItem from "./ListItem";
import dayjs from "dayjs";
import { dayJsYMD } from "../../../../lib/dayJs";
import NoFilterdtoExcel from "../../sheet/NoFilterdtoExcel";
import { HEADER } from "../../../../lib/const/List";
const headers = HEADER.BLK_LIST;

const RecordList = ({ block }) => {
  const [workRecordList, setList] = useState([{}]);
  const [fileName, setFileName] = useState("");

  const getWorkRecordList = async (block) => {
    const list = await AdminHandler.getWorkRecordList(block);
    setList(list);
    //to do : 파일 이름 설정 하기
    if (list.length > 0) {
      const { BLK_NO, HULL_NO, HULL_TYPE, SHIPYARD } = list[0];
      setFileName(
        `${SHIPYARD}-${HULL_TYPE}-${HULL_NO}-${BLK_NO}-${dayJsYMD(
          dayjs(new Date())
        )}`
      );
    }
  };

  useEffect(() => {
    getWorkRecordList(block);
  }, [block]);

  return (
    <div className={classes.wrapper}>
      <Divider orientation="left"> 블럭별 업무 기록 리스트</Divider>
      <List
        size="large"
        header={
          <div>
            <NoFilterdtoExcel list={workRecordList} fileName={fileName} />
            <HeaderItem items={headers} />
          </div>
        }
        footer={<div>제작자 ＠github : yeongi</div>}
        bordered
        dataSource={workRecordList}
        renderItem={({
          RECORD_NO,
          BLK_NO,
          BLK_SQ,
          EMP_NAME,
          EMP_NO,
          HULL_SQ,
          HULL_NO,
          HULL_TYPE,
          INP_MH,
          NORM_MH,
          OVERTIME_MH,
          RES_MH,
          SHIPYARD,
          WORK_CODE,
          WORK_DATE,
          WORK_DES,
          WORK_TYPE,
        }) => {
          return (
            <List.Item>
              <ListItem
                items={[
                  SHIPYARD,
                  BLK_NO,
                  HULL_NO,
                  HULL_TYPE,
                  WORK_TYPE,
                  WORK_DES,
                  EMP_NAME,
                  EMP_NO,
                  NORM_MH,
                  INP_MH,
                  OVERTIME_MH,
                  dayJsYMD(dayjs(WORK_DATE)),
                ]}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default RecordList;
