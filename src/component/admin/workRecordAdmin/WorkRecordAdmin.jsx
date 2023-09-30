import { Select } from "antd";
import AddWorkRecordForm from "component/emp/form/AddWorkRecordForm";
import AdminHandler from "lib/handler/AdminHandler";
import { useEffect, useState } from "react";

import classes from "./WorkRecordAdmin.module.css";

export const WorkRecordAdmin = () => {
  const [empList, setEmpList] = useState({});
  const [selectedEmp, setSelectedEmp] = useState();

  useEffect(() => {
    const getEmpList = async () => {
      const list = await AdminHandler.getEmployeeList();
      setEmpList(list);
    };
    getEmpList();
  }, []);

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.des}>
        아래의 리스트에서 사원 입력하고 넣어주세요 !
      </h1>
      <Select
        placeholder="사원 고르기"
        size="large"
        style={{
          width: "400px",
        }}
        onChange={(value) => setSelectedEmp(value)}
        options={
          empList.length > 0 &&
          empList
            .filter((a) => !a.ADMIN)
            .map(({ EMP_NO, EMP_NAME, ADMIN }) => {
              return {
                value: EMP_NO,
                label: `이름 : ${EMP_NAME} / 사번 : ${EMP_NO}`,
              };
            })
        }
      />
      <AddWorkRecordForm emp_no={selectedEmp} isAdmin />
    </div>
  );
};
