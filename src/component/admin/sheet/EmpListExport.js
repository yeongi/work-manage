import { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import * as XLSX from "xlsx";
import AdminHandler from "lib/handler/AdminHandler";

const EmpListExport = () => {
  const [empList, setEmpList] = useState([]);

  const getEmpList = useCallback(async () => {
    const list = await AdminHandler.getEmployeeList();
    setEmpList(list);
    return;
  }, []);

  useEffect(() => {
    getEmpList();
  }, [getEmpList]);

  const getEmpExcelHandler = () => {
    console.log("write Excel ");
    const worksheet = XLSX.utils.json_to_sheet(empList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "employee");
    XLSX.writeFile(workbook, "Employees.xlsx", { compression: true });
  };

  return <Button onClick={getEmpExcelHandler}>사원 목록 가져오기</Button>;
};

export default EmpListExport;
