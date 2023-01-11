import WorkList from "./WorkList";

const EmpWorkRecord = ({ EMP_NAME, recordList }) => {
  return (
    <div>
      <h1> {EMP_NAME}님 업무 기록 내역</h1>
      {recordList.length > 0 && <WorkList list={recordList} />}
    </div>
  );
};

export default EmpWorkRecord;
