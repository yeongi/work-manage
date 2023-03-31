import { Button, List } from "antd";
import classes from "./HullList.module.css";
import mappingHeader from "../../../lib/MappingHeader";
import { useState } from "react";
import HullModal from "./modal/HullModal";

const header = ["SHIP_YARD", "HULL_NO", "HULL_TYPE", "자세히 보기"];

const HullList = ({ hullList, refreshHandler }) => {
  const [selectedHull, setHullselect] = useState();

  const resetHullState = async (sq) => {
    await refreshHandler();
    await setHullselect(hullList.find(({ HULL_SQ }) => HULL_SQ === sq));
  };

  return (
    <>
      <h1>선체 리스트</h1>
      <HullModal hullInfo={selectedHull} resetHullState={resetHullState} />
      <List
        size="large"
        header={
          <div className={classes.header}>{header.map(mappingHeader)}</div>
        }
        footer={<div>제작자 ＠github : yeongi</div>}
        dataSource={hullList}
        renderItem={(hull) => {
          const { HULL_NO, HULL_TYPE, SHIPYARD } = hull;
          return (
            <List.Item>
              <div className={classes.wrapper}>
                <p>{SHIPYARD}</p>
                <p>{HULL_NO}</p>
                <p>{HULL_TYPE}</p>
                <Button
                  onClick={() => {
                    setHullselect(hull);
                  }}
                >
                  선체 자세히 보기
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
