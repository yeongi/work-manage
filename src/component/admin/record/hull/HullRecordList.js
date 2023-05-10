import { Divider, List } from "antd";
import classes from "./HullRecordList.module.css";
import { HEADER } from "../../../../lib/const/List";
import mappingHeader from "../../../../lib/MappingHeader";
import HullListExport from "../../sheet/HullListExport";

const HullRecordList = ({ hullRecordList }) => {
  return (
    <>
      {hullRecordList.length === 0 && <h1>업무기록이 존재하지 않습니다.</h1>}
      {hullRecordList.length > 0 && (
        <div className={classes.wrapper}>
          <Divider orientation="left">
            <p>선체별 업무 기록 리스트</p>
            <HullListExport
              list={hullRecordList}
              fileName={[
                hullRecordList[0].SHIPYARD,
                hullRecordList[0].HULL_NO,
                hullRecordList[0].HULL_TYPE,
              ].join("-")}
            />
          </Divider>
          <List
            itemLayout="horizontal"
            bordered
            footer={<div>제작자 ＠github : yeongi</div>}
            dataSource={hullRecordList}
            renderItem={({
              BLK_NO,
              HULL_NO,
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
                      renderItem={({ SUM_INP_MH, WORK_DES, WORK_TYPE }) => (
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
      )}
    </>
  );
};

export default HullRecordList;
