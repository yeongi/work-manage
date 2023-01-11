import { useState, useEffect } from "react";
import empHandler from "../handler/EmpHander";

const useEmpRecordList = (EMP_NO) => {
  const [workRecordList, setRecordList] = useState([]);

  const getMyWorkRecordList = async () => {
    const result = await empHandler.getWorkRecordList(EMP_NO);
    setRecordList(result);
  };

  useEffect(() => {
    getMyWorkRecordList();
  }, []);

  return [workRecordList, getMyWorkRecordList];
};

export default useEmpRecordList;
