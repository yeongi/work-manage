import { useState } from "react";
import SelectBlk from "./SelectBlk";
import RecordList from "./block/RecordList";
import SelectMonth from "./SelectMonth";
import classes from "./WorkRecord.module.css";
import { Button } from "antd";
import { v4 } from "uuid";
import HullRecordList from "./hull/HullRecordList";

const HEADER_LIST = ["HULL", "BLOCK"];

const WorkRecord = () => {
  const [block, setBlk] = useState("");
  const [hull, setHull] = useState("");
  const [header, setHeader] = useState("");

  let workList = <h1>업무 기록이 표시됩니다.</h1>;

  switch (header) {
    case "HULL":
      workList = <HullRecordList hull={hull} />;
      break;
    case "BLOCK":
      workList = <RecordList block={block} />;
      break;
    default:
      workList = <h1>업무 기록이 표시됩니다.</h1>;
      break;
  }

  const onChangedBlk = async (blk) => {
    setBlk(blk);
  };

  const ohChangedHull = async (hull) => {
    setHull(hull);
  };

  const onClickListBtn = (value) => {
    setHeader(value.target.outerText);
  };

  return (
    <div>
      <div className={classes["select-wrapper"]}>
        <section>
          <h1>블럭 및 선체 선택</h1>
          <SelectBlk onChangedBlk={onChangedBlk} selectHull={ohChangedHull} />
        </section>
        <section>
          <h1>업무 기록 조회 하기</h1>
          <hr />
          {HEADER_LIST.map((header) => {
            return (
              <Button key={v4()} onClick={onClickListBtn} value={header}>
                {header}
              </Button>
            );
          })}
        </section>
        <section>
          <h1>{"월 별 업무 기록 조회"}</h1>
          <SelectMonth />
        </section>
      </div>
      <div className={classes["list-wrapper"]}>{workList}</div>
    </div>
  );
};

export default WorkRecord;
