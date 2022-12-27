import { useEffect, useState } from "react";
import AdminHandler from "../../../lib/handler/AdminHandler";

const RecordList = ({ block }) => {
  const [workRecordList, setList] = useState([{}]);

  const getWorkRecordList = async (block) => {
    const list = await AdminHandler.getWorkRecordList(block);
    setList(list);
  };

  useEffect(() => {
    getWorkRecordList(block);
  }, [block]);

  return (
    <div>
      <h1>업무 기록 리스트</h1>
      {workRecordList.map(
        ({
          RECORD_NO,
          BLK_NO,
          BLK_SQ,
          EMP_NAME,
          EMP_NO,
          HULL_SQ,
          HULL_NO,
          HULL_TYPE,
          INP_MH,
          NORM_MH,
          OVERTIME_MH,
          RES_MH,
          SHIPYARD,
          WORK_CODE,
          WORK_DATE,
          WORK_DES,
          WORK_TYPE,
        }) => {
          return (
            <p key={RECORD_NO}>
              NO: {RECORD_NO} 업무 내용: {WORK_TYPE} 업무 종류: {WORK_DES}
              블럭 번호: {BLK_NO} 사원 이름: {EMP_NAME} 사원 번호: {EMP_NO}
              조선소: {SHIPYARD} 선체 종류: {HULL_TYPE} 선체 번호: {HULL_NO}
              표준 시수: {NORM_MH} 투입 시수: {INP_MH} 야근 시수:{OVERTIME_MH}
              업무 날짜 : {WORK_DATE}
            </p>
          );
        }
      )}
    </div>
  );
};

export default RecordList;
