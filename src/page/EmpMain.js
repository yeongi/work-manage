import { useEffect, useState, useCallback } from "react";
import AddWorkRecordForm from "../component/emp/AddWorkRecordForm";
import EmpWorkRecord from "../component/emp/EmpWorkRecord";
import LoginState from "../component/emp/LoginState";
import SelectMonthEmp from "../component/emp/SelectMonthEmp";
import empHandler from "../lib/handler/EmpHander";
import useEmpRecordList from "../lib/state/useEmpRecordList";
import useToDidWork from "../lib/state/useToDidWork";
import { useLoginCtx } from "../lib/store/LoginContext";
import classes from "./Employee.module.css";
import noteBookUrl from "../img/note_book.jpg";

const EmpMain = () => {
  const loginCtx = useLoginCtx();
  const [workList, setWorkList] = useState([]);
  const [workRecordList, getMyWorkRecordList] = useEmpRecordList(
    loginCtx.state.EMP_NO
  );
  const [ym, setYm] = useState("");
  const [filteredRecordList, setFilteredList] = useState([]);

  const [myList, addList] = useToDidWork();

  const onSelectYmHandler = (ym) => {
    setYm(ym);
    filteredMonthMyRecordList(ym);
  };

  const getWorkList = async () => {
    const result = await empHandler.getWorkList();
    setWorkList(result);
  };

  const filteredMonthMyRecordList = (yearmonth) => {
    const filteredList = workRecordList.filter((record) => {
      return record.WORK_DATE.includes(yearmonth);
    });
    setFilteredList(filteredList);
  };

  useEffect(() => {
    getWorkList();
  }, []);

  return (
    <>
      <div
        style={{ backgroundImage: `url(${noteBookUrl})` }}
        className={classes["emp-wrapper"]}
      >
        <section className={classes["emp-main"]}>
          <article className={classes.state}>
            <LoginState myList={myList} />
          </article>

          {/* to do : 업무 추가 관리자 화면으로 넘기기
          <h1>업무 추가 하기</h1>
          <AddWorkForm workList={workList} refreshHandler={getWorkList} /> */}
          <article className={classes.form}>
            <h1>업무 내역 추가 하기</h1>
            <AddWorkRecordForm
              workList={workList}
              refreshHandler={getMyWorkRecordList}
              addWorkRecordInfo={addList}
            />
            <hr />
          </article>
          <article className={classes["work-list"]}>
            <h1> 업무 내역 확인</h1>
            <SelectMonthEmp onSelectYmHandler={onSelectYmHandler} />
            <EmpWorkRecord
              EMP_NAME={loginCtx.state.EMP_NAME}
              recordList={filteredRecordList}
            />
          </article>
        </section>
      </div>
    </>
  );
};

export default EmpMain;
