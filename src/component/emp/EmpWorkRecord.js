import WorkList from "./WorkList";

const EmpWorkRecord = ({ recordList }) => {
  return (
    <div>
      <h1>본인 업무 기록 내역</h1>
      {recordList.length > 0 && <WorkList list={recordList} />}
    </div>
  );
};

export default EmpWorkRecord;
