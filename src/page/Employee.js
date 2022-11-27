import LoginState from "../component/emp/LoginState";
import WorkCalendar from "../component/emp/WorkCalendar";
import classes from "./Employee.module.css";

const Employee = (props) => {
  return (
    <>
      <div className={classes["emp-wrapper"]}>
        <section className={classes["emp-main"]}>
          <LoginState />
          <h1>데이터 넣기</h1>
        </section>
        <section className={classes["emp-calendar"]}>
          <h1> 업무 내역 확인</h1>
          <WorkCalendar />
        </section>
      </div>
    </>
  );
};

export default Employee;
