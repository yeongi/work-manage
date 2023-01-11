import { useEffect, useState } from "react";
import { Button } from "antd";
import * as XLSX from "xlsx";
import AdminHandler from "../../../lib/handler/AdminHandler";

const MyExcelBtn = () => {
  const [empList, setEmpList] = useState([]);

  useEffect(() => {
    const getEmpList = async () => {
      const list = await AdminHandler.getWorkMonthRecordList("2023-01");
      setEmpList(list);
      return;
    };
    getEmpList();
    console.log(empList);
  }, []);

  const getEmpExcelHandler = () => {
    console.log("write Excel ");
    const worksheet = XLSX.utils.json_to_sheet(empList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "employee");
    XLSX.writeFile(workbook, "Employees.xlsx", { compression: true });
  };

  return <Button onClick={getEmpExcelHandler}>가져오기</Button>;
};

export default MyExcelBtn;
