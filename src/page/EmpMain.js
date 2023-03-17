import { useEffect, useState, useCallback } from "react";
import AddWorkRecordForm from "../component/emp/AddWorkRecordForm";
import EmpWorkRecord from "../component/emp/EmpWorkRecord";
import LoginState from "../component/emp/LoginState";
import SelectMonthEmp from "../component/emp/SelectMonthEmp";
import empHandler from "../lib/handler/EmpHander";
import useEmpRecordList from "../lib/state/useEmpRecordList";
import useToDidWork from "../lib/state/useToDidWork";
import { useLoginCtx } from "../lib/store/LoginContext";
import classes from "./EmpMain.module.css";
import shipURL from "../img/ship.jpg";
import TodayWorkList from "../component/emp/TodayWorkList";

const EmpMain = () => {
  const loginCtx = useLoginCtx();
  const [workList, setWorkList] = useState([]);
  const [workRecordList, getMyWorkRecordList] = useEmpRecordList(
    loginCtx.state.EMP_NO
  );

  const [filteredRecordList, setFilteredList] = useState([]);

  const [myList, addList] = useToDidWork();

  const onSelectYmHandler = (ym) => {
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
        style={{ backgroundImage: `url(${shipURL})` }}
        className={classes["emp-wrapper"]}
      >
        <section className={classes["emp-main"]}>
          <article className={classes.state}>
            <LoginState />
          </article>
          <article className={classes.form}>
            <AddWorkRecordForm
              workList={workList}
              refreshHandler={getMyWorkRecordList}
              addWorkRecordInfo={addList}
            />
          </article>

          <article className={classes["work-list"]}>
            <h3 className={classes["work-header"]}>금일 업무 내역 확인</h3>
            <TodayWorkList myList={myList} />
            <h3 className={classes["work-header"]}>월별 업무 내역 확인</h3>
            <div className={classes["list-des"]}>
              <div>
                <p>연,월을 선택하면 본인의 업무 내역을 확인할 수 있습니다.</p>
                <h1> {loginCtx.state.EMP_NAME}님 업무 기록 내역</h1>
              </div>
              <SelectMonthEmp onSelectYmHandler={onSelectYmHandler} />
            </div>
            <EmpWorkRecord recordList={filteredRecordList} />
          </article>
        </section>
      </div>
    </>
  );
};

export default EmpMain;
