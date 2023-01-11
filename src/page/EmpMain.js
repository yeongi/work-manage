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

const EmpMain = () => {
  const { state } = useLoginCtx();
  const [workList, setWorkList] = useState([]);
  const [workRecordList, getMyWorkRecordList] = useEmpRecordList(state.EMP_NO);
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
      <div className={classes["emp-wrapper"]}>
        <section className={classes["emp-main"]}>
          <LoginState myList={myList} />
          {/* to do : 업무 추가 관리자 화면으로 넘기기
          <h1>업무 추가 하기</h1>
          <AddWorkForm workList={workList} refreshHandler={getWorkList} /> */}
          <AddWorkRecordForm
            workList={workList}
            refreshHandler={getMyWorkRecordList}
            addWorkRecordInfo={addList}
          />
        </section>
        <section className={classes["emp-calendar"]}>
          <h1> 업무 내역 확인</h1>
          <SelectMonthEmp onSelectYmHandler={onSelectYmHandler} />
          <EmpWorkRecord recordList={filteredRecordList} />
        </section>
      </div>
    </>
  );
};

export default EmpMain;
