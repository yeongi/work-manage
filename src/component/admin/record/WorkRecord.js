import { useState } from "react";
import SelectBlk from "./SelectBlk";
import RecordList from "./block/RecordList";
import SelectMonth from "./SelectMonth";
import classes from "./WorkRecord.module.css";
import { Button } from "antd";
import { v4 } from "uuid";
import HullRecordList from "./hull/HullRecordList";
import useGetBlkList from "../../../lib/state/useGetBlkList";
import { useHullRecordList } from "../../../lib/state/useHullRecordList";
import { useBlkWorkRecordList } from "../../../lib/state/useBlkWorkRecordList";

const HEADER_LIST = ["HULL", "BLOCK"];

const WorkRecord = () => {
  const [block, setBlk] = useState(0);
  const [hull, setHull] = useState(0);
  const [header, setHeader] = useState("");
  const { hullList, blockList, getHullList, getBlkList } = useGetBlkList();
  // TODO: 언젠가 쓸 예정
  const { hullRecordList, getHullWorkRecordList } = useHullRecordList(hull);
  const { workRecordList, getBlkWorkRecordList, onChangeKeyword, fileName } =
    useBlkWorkRecordList(block);

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
          getBlkWorkRecordList={getBlkWorkRecordList}
          onChangeKeyword={onChangeKeyword}
        />
      );
      break;
    default:
      workList = <h1>업무 기록이 표시됩니다.</h1>;
      break;
  }

  const onChangedBlk = (blk) => {
    setBlk(blk);
  };

  const ohChangedHull = (hull) => {
    setHull(hull);
    setBlk("");
  };

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
            selectHull={ohChangedHull}
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
