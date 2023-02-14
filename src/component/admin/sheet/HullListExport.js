import { Button } from "antd";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import { dayJsYMD } from "../../../lib/dayJs";

const HullListExport = ({ list, fileName }) => {
  const getEmpExcelHandler = () => {
    const worksheet = XLSX.utils.json_to_sheet(listToOneJson(list));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
    XLSX.writeFile(workbook, `${fileName}.xlsx`, { compression: true });
  };

  return (
    <Button onClick={getEmpExcelHandler}>{fileName + ".xlsx"} 내보내기</Button>
  );
};

const listToOneJson = (lists) => {
  const arr = [];
  lists.forEach((list) => {
    const {
      BLK_NO,
      BLK_SQ,
      DATE_LIST,
      HULL_NO,
      HULL_SQ,
      HULL_TYPE,
      NORM_MH,
      RES_MH,
      SHIPYARD,
      SUM_INP_MH,
      SUM_OVER_MH,
      WORK_LIST,
    } = list;
    const myList = {
      SHIPYARD,
      HULL_NO,
      HULL_TYPE,
      BLK_NO,
      NORM_MH,
      RES_MH,
      SUM_INP_MH,
      SUM_OVER_MH,
    };
    arr.push(myList);
    arr.push(
      ...WORK_LIST.map(
        ({ SUM_INP_MH, SUM_OVER_MH, WORK_CODE, WORK_DES, WORK_TYPE }) => {
          return {
            WORK_DES,
            WORK_TYPE,
            WORK_SUM_INP_MH: SUM_INP_MH,
            WORK_SUM_OVER_MH: SUM_OVER_MH,
          };
        }
      )
    );
    arr.push(
      ...DATE_LIST.map(
        ({
          SHIPYARD,
          HULL_NO,
          HULL_TYPE,
          BLK_NO,
          EMP_NAME,
          EMP_NO,
          INP_MH,
          NORM_MH,
          OVERTIME_MH,
          RES_MH,
          WORK_CODE,
          WORK_DATE,
          WORK_DES,
          WORK_TYPE,
        }) => {
          return {
            EMP_NAME,
            EMP_NO,
            INP_MH,
            OVERTIME_MH,
            WORK_DATE: dayJsYMD(dayjs(WORK_DATE)),
            업무: WORK_DES + "/" + WORK_TYPE,
          };
        }
      )
    );
  });

  return arr;
};

export default HullListExport;
