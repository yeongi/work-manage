import AddEmployeeForm from "./AddEmployeeForm";
import EmployeeList from "./EmployeeList";
import { useEffect, useState } from "react";
import AdminHandler from "../../../lib/handler/AdminHandler";
import classes from "./Employee.module.css";

const Employee = () => {
  const [empList, setEmpList] = useState({});

  const getEmpList = async () => {
    const list = await AdminHandler.getEmployeeList();
    setEmpList(list);
  };

  useEffect(() => {
    getEmpList();
  }, []);

  return (
    <div className={classes["emp-wrapper"]}>
      <h1>EMPLOYEE</h1>
      <hr />
      <div className={classes["emp-item"]}>
        <section className={classes["emp-add"]}>
          <h1>사원/관리자 추가</h1>
          <AddEmployeeForm refreshHandler={getEmpList} />
        </section>
        <section className={classes["emp-list"]}>
          <h1>사원 조회</h1>
          <EmployeeList empList={empList} />
        </section>
        <section className={classes["emp-info"]}>
          <h1>사원 정보</h1>
        </section>
      </div>
    </div>
  );
};

export default Employee;
