import { Button } from "antd";
import * as XLSX from "xlsx";

const NoFilterdtoExcel = ({ list, fileName }) => {
  const getEmpExcelHandler = () => {
    console.log("write Excel ");
    const worksheet = XLSX.utils.json_to_sheet(list);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
    XLSX.writeFile(workbook, `${fileName}.xlsx`, { compression: true });
  };

  return (
    <Button onClick={getEmpExcelHandler}>{fileName + ".xlsx"} 내보내기</Button>
  );
};

export default NoFilterdtoExcel;
