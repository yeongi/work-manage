import { Button, Divider, List } from "antd";
import classes from "./HullList.module.css";
import mappingHeader from "../../../lib/MappingHeader";
import AdminHandler from "../../../lib/handler/AdminHandler";

const HullList = ({ hullList, refreshHandler }) => {
  const header = ["SHIP_YARD", "HULL_NO", "HULL_TYPE", "완료 여부"];

  const completeHandler = async (hullsq) => {
    const result = await AdminHandler.updateHullComplte(hullsq);
    alert(result.message);
    refreshHandler();
  };

  return (
    <>
      <h1>선체 리스트</h1>
      <List
        size="large"
        header={
          <div className={classes.header}>{header.map(mappingHeader)}</div>
        }
        footer={<div>제작자 ＠github : yeongi</div>}
        dataSource={hullList}
        renderItem={({ HULL_NO, HULL_SQ, HULL_TYPE, SHIPYARD, complete }) => {
          return (
            <List.Item>
              <div className={classes.wrapper}>
                <p>{SHIPYARD}</p>
                <p>{HULL_NO}</p>
                <p>{HULL_TYPE}</p>
                {/* to do: 업데이트 구분 따라 렌더링 바꾸기 */}
                <p>{complete === 0 ? "미완료" : "작업 완료"}</p>
                <Button
                  onClick={() => {
                    completeHandler(HULL_SQ);
                  }}
                >
                  업데이트
                </Button>
              </div>
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default HullList;
