import { useState } from "react";
import SelectBlk from "./SelectBlk";
import RecordList from "./RecordList";
import SelectMonth from "./SelectMonth";
import classes from "./WorkRecord.module.css";

const WorkRecord = () => {
  const [block, setBlk] = useState({});

  const onChangedBlk = async (blk) => {
    setBlk(blk);
  };

  return (
    <div>
      <div className={classes["selet-wrapper"]}>
        <section>
          <h1>{"블럭 별 업무기록 조회"}</h1>
          <SelectBlk onChangedBlk={onChangedBlk} />
        </section>
        <section>
          <h1>{"월 별 업무 기록 조회"}</h1>
          <SelectMonth />
        </section>
      </div>
      <RecordList block={block} />
    </div>
  );
};

export default WorkRecord;
