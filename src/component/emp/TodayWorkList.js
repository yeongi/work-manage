import WorkList from "./WorkList";

const TodayWorkList = ({ myList }) => {
  return (
    <>
      {myList.length === 0 ? (
        <h3>"금일 업무내역이 존재 하지 않습니다."</h3>
      ) : (
        <WorkList myList={myList} />
      )}
    </>
  );
};

export default TodayWorkList;
