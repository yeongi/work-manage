import { useEffect, useState } from "react";
import AddWorkForm from "../component/emp/AddWorkForm";
import AddWorkRecordForm from "../component/emp/AddWorkRecordForm";
import LoginState from "../component/emp/LoginState";
import WorkCalendar from "../component/emp/WorkCalendar";
import empHandler from "../lib/handler/EmpHander";
import classes from "./Employee.module.css";

const EmpMain = (props) => {
  //Work List 불러 오기
  //선체 -> 블럭 불러오기

  const [workList, setWorkList] = useState([]);

  const getWorkList = async () => {
    const result = await empHandler.getWorkList();
    setWorkList(result);
  };

  const getMyWorkRecordList = async () => {
    // const result = await empHandler.getWorkRecordList();
  };

  useEffect(() => {
    getWorkList();
  }, []);

  return (
    <>
      <div className={classes["emp-wrapper"]}>
        <section className={classes["emp-main"]}>
          <LoginState />
          <h1>업무 추가 하기</h1>
          <AddWorkForm workList={workList} refreshHandler={getWorkList} />
          <AddWorkRecordForm workList={workList} />
        </section>
        <section className={classes["emp-calendar"]}>
          <h1> 업무 내역 확인</h1>
          {/* <WorkCalendar /> */}
        </section>
      </div>
    </>
  );
};

export default EmpMain;
