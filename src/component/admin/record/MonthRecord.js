import { useEffect } from "react";
import AdminHandler from "../../../lib/handler/AdminHandler";

const MonthRecord = ({ ym }) => {
  useEffect(() => {
    const getMonthWorkRecord = async () => {
      console.log(ym);
      const result = await AdminHandler.getWorkMonthRecordList(ym);
      console.log(result);
    };
    getMonthWorkRecord();
  }, [ym]);
  return <h1>여기가 진짜 내용</h1>;
};

export default MonthRecord;
