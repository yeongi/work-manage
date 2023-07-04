import { useCallback, useState } from "react";
import { useLoginCtx } from "store/LoginContext";
import useEmpRecordList from "hooks/useEmpRecordList";
import useToDidWork from "hooks/useToDidWork";
import AddWorkRecordForm from "component/emp/form/AddWorkRecordForm";
import EmpWorkRecord from "component/emp/record/EmpWorkRecord";
import LoginState from "component/emp/profile/LoginState";
import SelectMonthEmp from "component/emp/record/SelectMonthEmp";
import classes from "./EmpMain.module.css";
import shipURL from "asset/img/ship.jpg";
import TodayWorkList from "component/emp/record/TodayWorkList";

const EmpMain = () => {
  const loginCtx = useLoginCtx();
  const [workRecordList, getMyWorkRecordList] = useEmpRecordList();
  const [filteredRecordList, setFilteredList] = useState([]);
  const [myList, addList] = useToDidWork(workRecordList);

  const onSelectYmHandler = (ym) => {
    filteredMonthMyRecordList(ym);
  };

  const filteredMonthMyRecordList = useCallback(
    (yearmonth) => {
      const filteredList = workRecordList.filter((record) => {
        return record.WORK_DATE.includes(yearmonth);
      });
      setFilteredList(filteredList);
    },
    [workRecordList]
  );

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
              refreshHandler={getMyWorkRecordList}
              addWorkRecordInfo={addList}
              emp_no={loginCtx.state.EMP_NO}
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
