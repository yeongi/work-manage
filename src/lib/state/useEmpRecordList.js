import { useState, useEffect, useCallback } from "react";
import empHandler from "../handler/EmpHander";

const useEmpRecordList = (EMP_NO) => {
  const [workRecordList, setRecordList] = useState([]);

  const getMyWorkRecordList = useCallback(async () => {
    const result = await empHandler.getWorkRecordList(EMP_NO);
    setRecordList(result);
  }, [EMP_NO]);

  useEffect(() => {
    getMyWorkRecordList();
  }, [getMyWorkRecordList]);

  return [workRecordList, getMyWorkRecordList];
};

export default useEmpRecordList;
