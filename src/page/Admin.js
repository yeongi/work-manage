import { useState } from "react";
import Employee from "../component/admin/Employee";
import HullManage from "../component/admin/HullManage";
import WorkRecord from "../component/admin/WorkRecord";
import classes from "./Admin.module.css";

const pageArr = ["HULL/BLOCK", "WORK", "EMPLOYEE"];

const Admin = () => {
  let myPage;

  const [selected, setSelect] = useState();

  switch (selected) {
    case "HULL/BLOCK":
      myPage = <HullManage />;
      break;
    case "WORK":
      myPage = <WorkRecord />;
      break;
    case "EMPLOYEE":
      myPage = <Employee />;
      break;
    default:
      myPage = <h1>페이지를 선택 하세요.</h1>;
  }

  const pageSelectHanlder = (e) => {
    setSelect(e.target.innerText);
  };

  return (
    <>
      <h1>어드민 페이지 입니다.</h1>
      <section className={classes["nav-wrapper"]}>
        {pageArr.map((item) => {
          return (
            <div onClick={pageSelectHanlder}>
              <h1>{item}</h1>
            </div>
          );
        })}
      </section>
      <section>{myPage}</section>
    </>
  );
};

export default Admin;
