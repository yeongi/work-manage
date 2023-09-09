import { Button, List } from "antd";
import classes from "./HullList.module.css";
import mappingHeader from "../../../../lib/MappingHeader";
import { useState } from "react";
import HullModal from "./modal/HullModal";

const header = ["SHIP_YARD", "HULL_NO", "HULL_TYPE", "자세히 보기"];

const HullList = ({ hullList, refreshHandler }) => {
  const [selectedHull, setHullselect] = useState();

  return (
    <>
      <HullModal hullInfo={selectedHull} refreshHandler={refreshHandler} />
      <List
        size="large"
        header={
          <div className={classes.header}>{header.map(mappingHeader)}</div>
        }
        footer={<div>제작자 ＠github : yeongi</div>}
        dataSource={hullList}
        renderItem={(hull) => {
          const { HULL_NO, HULL_TYPE, SHIPYARD, complete } = hull;

          if (!complete) {
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
          }

          if (complete) {
            return (
              <List.Item>
                <div className={classes["complete-wrapper"]}>
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
                <b>{"완료"}</b>
              </List.Item>
            );
          }
        }}
      />
    </>
  );
};

export default HullList;
