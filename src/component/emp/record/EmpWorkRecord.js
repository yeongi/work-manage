import WorkList from "./list/WorkList";

const EmpWorkRecord = ({ recordList }) => {
  return <div>{recordList.length > 0 && <WorkList myList={recordList} />}</div>;
};

export default EmpWorkRecord;
