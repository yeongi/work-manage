const EmpWorkRecord = ({ recordList }) => {
  return (
    <div>
      <h1>본인 업무 기록 내역</h1>
      {recordList.length > 0 &&
        recordList.map(
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

export default EmpWorkRecord;
