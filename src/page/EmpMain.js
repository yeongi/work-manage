import AddWorkForm from "../component/emp/AddWorkForm";
import AddWorkRecordForm from "../component/emp/AddWorkRecordForm";
import LoginState from "../component/emp/LoginState";
import WorkCalendar from "../component/emp/WorkCalendar";
import classes from "./Employee.module.css";

const EmpMain = (props) => {
  //Work List 불러 오기
  //선체 -> 블럭 불러오기
  return (
    <>
      <div className={classes["emp-wrapper"]}>
        <section className={classes["emp-main"]}>
          <LoginState />
          <h1>데이터 넣기</h1>
          <h1>업무 추가 하기</h1>
          <AddWorkForm />
          <li>업무 내역 넣기</li>
          <AddWorkRecordForm />
        </section>
        <section className={classes["emp-calendar"]}>
          <h1> 업무 내역 확인</h1>
          <WorkCalendar />
        </section>
      </div>
    </>
  );
};

export default EmpMain;
