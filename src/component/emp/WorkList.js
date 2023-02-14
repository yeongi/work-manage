import { HEADER } from "../../lib/const/List";
import mappingHeader from "../../lib/MappingHeader";
import { List } from "antd";
import dayjs from "dayjs";
import { dayJsYMD } from "../../lib/dayJs";
import classes from "./WorkList.module.css";
import sumMhMyList from "../../lib/sumMhList";

const header = HEADER.BLK_LIST;

const WorkList = ({ myList }) => {
  return (
    <>
      <div className={classes["des-wrapper"]}>
        목록 총 투입 시수 : <b>{sumMhMyList(myList)}</b>
      </div>
      <div className={classes.wrapper}>
        <List
          size="large"
          className={classes.list}
          bordered
          header={
            <div className={classes.header}>{header.map(mappingHeader)}</div>
          }
          footer={<hr />}
          dataSource={myList}
          renderItem={({
            HULL_NO,
            HULL_TYPE,
            SHIPYARD,
            BLK_NO,
            INP_MH,
            OVERTIME_MH,
            WORK_DATE,
            WORK_DES,
            WORK_TYPE,
            EMP_NAME,
            NORM_MH,
            EMP_NO,
          }) => {
            return (
              <List.Item>
                <div className={classes["list-wrapper"]}>
                  <p>{SHIPYARD}</p>
                  <p>{HULL_NO}</p>
                  <p>{HULL_TYPE}</p>
                  <p>{BLK_NO}</p>
                  <p>{WORK_DES}</p>
                  <p>{WORK_TYPE}</p>
                  <p>{EMP_NAME}</p>
                  <p>{EMP_NO}</p>
                  <p>{NORM_MH}</p>
                  <p>
                    <b className={classes.MH}>{INP_MH}</b>
                  </p>
                  <p>
                    <b className={classes.MH}>{OVERTIME_MH}</b>
                  </p>
                  <p>{dayJsYMD(dayjs(WORK_DATE))}</p>
                </div>
              </List.Item>
            );
          }}
        />
      </div>
    </>
  );
};

export default WorkList;
