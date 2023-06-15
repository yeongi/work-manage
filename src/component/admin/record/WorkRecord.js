import { useState } from "react";
import SelectBlk from "./SelectBlk";
import RecordList from "./block/RecordList";
import SelectMonth from "./SelectMonth";
import classes from "./WorkRecord.module.css";
import { Button } from "antd";
import { v4 } from "uuid";
import HullRecordList from "./hull/HullRecordList";
import useGetBlkList from "hooks/useGetBlkList";
import { useHullRecordList } from "hooks/useHullRecordList";
import { useBlkWorkRecordList } from "hooks/useBlkWorkRecordList";

const HEADER_LIST = ["HULL", "BLOCK"];

const WorkRecord = () => {
  const [header, setHeader] = useState("");
  const {
    blk_sq,
    hull_sq,
    onChangedBlk,
    onChangedHull,
    hullList,
    blockList,
    getHullList,
    getBlkList,
  } = useGetBlkList();

  const { hullRecordList, getHullWorkRecordList } = useHullRecordList(hull_sq);
  const { workRecordList, getBlkWorkRecordList, onChangeKeyword, fileName } =
    useBlkWorkRecordList(blk_sq);

  const resetHandler = () => {
    getHullWorkRecordList();
    getBlkWorkRecordList();
    getBlkList(hull_sq);
  };

  let workList = <h1>업무 기록이 표시됩니다.</h1>;

  switch (header) {
    case "HULL":
      workList = <HullRecordList hullRecordList={hullRecordList} />;
      break;
    case "BLOCK":
      workList = (
        <RecordList
          workRecordList={workRecordList}
          fileName={fileName}
          resetHandler={resetHandler}
          onChangeKeyword={onChangeKeyword}
        />
      );
      break;
    default:
      workList = <h1>업무 기록이 표시됩니다.</h1>;
      break;
  }

  const onClickListBtn = (value) => {
    setHeader(value.target.outerText);
  };

  return (
    <div>
      <div className={classes["select-wrapper"]}>
        <section>
          <h1>블럭 및 선체 선택</h1>
          <SelectBlk
            onChangedBlk={onChangedBlk}
            onChangedHull={onChangedHull}
            hullList={hullList}
            blockList={blockList}
            getHullList={getHullList}
            getBlkList={getBlkList}
          />
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
