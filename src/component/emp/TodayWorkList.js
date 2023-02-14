import { useLoginCtx } from "../../lib/store/LoginContext";
import dayJs from "dayjs";
import { dayJsYMD } from "../../lib/dayJs";
import WorkList from "./WorkList";
import { useEffect } from "react";
import sumMhMyList from "../../lib/sumMhList";

const TodayWorkList = ({ myList }) => {
  const loginCtx = useLoginCtx();

  useEffect(() => {
    loginCtx.setMH(sumMhMyList(myList));
  }, [myList]);

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
