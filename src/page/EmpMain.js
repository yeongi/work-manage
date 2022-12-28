import { useEffect, useState } from "react";
import AddWorkForm from "../component/emp/AddWorkForm";
import AddWorkRecordForm from "../component/emp/AddWorkRecordForm";
import EmpWorkRecord from "../component/emp/EmpWorkRecord";
import LoginState from "../component/emp/LoginState";
import WorkCalendar from "../component/emp/WorkCalendar";
import empHandler from "../lib/handler/EmpHander";
import { useLoginCtx } from "../lib/store/LoginContext";
import classes from "./Employee.module.css";

const EmpMain = (props) => {
  //Work List 불러 오기
  //선체 -> 블럭 불러오기
  const { state } = useLoginCtx();

  const [workList, setWorkList] = useState([]);
  const [workRecordList, setRecordList] = useState([]);

  const getWorkList = async () => {
    const result = await empHandler.getWorkList();
    setWorkList(result);
  };

  const getMyWorkRecordList = async () => {
    const result = await empHandler.getWorkRecordList(state.EMP_NO);
    setRecordList(result);
  };

  useEffect(() => {
    getWorkList();
    getMyWorkRecordList();
  }, []);

  return (
    <>
      <div className={classes["emp-wrapper"]}>
        <section className={classes["emp-main"]}>
          <LoginState />
          {/* to do : 업무 추가 관리자 화면으로 넘기기
          <h1>업무 추가 하기</h1>
          <AddWorkForm workList={workList} refreshHandler={getWorkList} /> */}
          <AddWorkRecordForm
            workList={workList}
            refreshHandler={getMyWorkRecordList}
          />
        </section>
        <section className={classes["emp-calendar"]}>
          <h1> 업무 내역 확인</h1>
          <EmpWorkRecord recordList={workRecordList} />
        </section>
      </div>
    </>
  );
};

export default EmpMain;
