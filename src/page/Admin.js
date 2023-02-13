import { useState } from "react";
import EmpManage from "../component/admin/employee/EmpManage";
import HullManage from "../component/admin/hull/HullManage";
import WorkRecord from "../component/admin/record/WorkRecord";
import classes from "./Admin.module.css";

const pageArr = [
  { id: "HULL/BLOCK", name: "선체/블록 관리" },
  { id: "WORK", name: "업무기록 조회" },
  { id: "EMPLOYEE", name: "사원 관리" },
];

const Admin = () => {
  let myPage;

  const [selected, setSelect] = useState({ id: "WORK", name: "업무기록 조회" });

  switch (selected.id) {
    case "HULL/BLOCK":
      myPage = <HullManage />;
      break;
    case "WORK":
      myPage = <WorkRecord />;
      break;
    case "EMPLOYEE":
      myPage = <EmpManage />;
      break;
    default:
      myPage = <h1>페이지를 선택 하세요.</h1>;
  }

  const pageSelectHanlder = (e) => {
    setSelect(
      pageArr[pageArr.findIndex((item) => item.name === e.target.innerText)]
    );
  };

  return (
    <div className={classes.wrapper}>
      <section className={classes["nav-wrapper"]}>
        {pageArr.map((item) => {
          return (
            <div onClick={pageSelectHanlder}>
              <h1>{item.name}</h1>
            </div>
          );
        })}
      </section>
      <section>{myPage}</section>
    </div>
  );
};

export default Admin;
