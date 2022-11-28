import classes from "./Employee.module.css";

const Employee = () => {
  return (
    <div className={classes["emp-wrapper"]}>
      <h1>EMPLOYEE</h1>
      <hr />
      <div className={classes["emp-item"]}>
        <section className={classes["emp-add"]}>
          <h1>사원 추가</h1>
        </section>
        <section className={classes["emp-list"]}>
          <h1>사원 조회</h1>
        </section>
        <section className={classes["emp-info"]}>
          <h1>사원 정보</h1>
        </section>
      </div>
    </div>
  );
};

export default Employee;
