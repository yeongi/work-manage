import { useState, useEffect, useCallback } from "react";
import empHandler from "../lib/handler/EmpHander";
import { useLoginStateGetEmpNo } from "atom/Hook";

const useEmpRecordList = () => {
  const emp_no = useLoginStateGetEmpNo();
  const [workRecordList, setRecordList] = useState([]);

  const getMyWorkRecordList = useCallback(async () => {
    const result = await empHandler.getWorkRecordList(emp_no);
    setRecordList(result);
  }, [emp_no]);

  useEffect(() => {
    getMyWorkRecordList();
  }, [getMyWorkRecordList]);

  return [workRecordList, getMyWorkRecordList];
};

export default useEmpRecordList;
