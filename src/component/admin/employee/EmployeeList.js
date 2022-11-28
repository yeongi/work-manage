import { useEffect, useState } from "react";
import AdminHandler from "../../../lib/handler/AdminHandler";

const EmployeeList = () => {
  const [empList, setEmpList] = useState({});

  useEffect(() => {
    const getEmpList = async () => {
      const list = await AdminHandler.getEmployeeList();
      setEmpList(list);
      console.log(empList);
    };
    getEmpList();
  }, []);

  //to do Select로 바꾸기
  return (
    <div>
      {empList.map((emp) => {
        return (
          <p>
            사원 이름 :{emp.EMP_NAME}
            <br />
            사원 번호 :{emp.EMP_NO}
          </p>
        );
      })}
    </div>
  );
};

export default EmployeeList;
