import SelectBlk from "./SelectBlk";
import RecordList from "./RecordList";
import { useState } from "react";
const WorkRecord = () => {
  //선체, 블럭, 업무 기록 선택
  const [block, setBlk] = useState({});

  const onChangedBlk = async (blk) => {
    //to do : 블럭에 관한 업무 기록 불러오기 구현 하기
    setBlk(blk);
    console.log(blk);
  };

  return (
    <div>
      <h1>{"블럭 선택 => 업무기록 조회"}</h1>
      <SelectBlk onChangedBlk={onChangedBlk} />
      <RecordList block={block} />
    </div>
  );
};

export default WorkRecord;
