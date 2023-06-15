import { useState, useEffect, useCallback } from "react";
import empHandler from "../lib/handler/EmpHander";
import { useLoginCtx } from "../store/LoginContext";

const useEmpRecordList = () => {
  const loginCtx = useLoginCtx();
  const [workRecordList, setRecordList] = useState([]);

  const getMyWorkRecordList = useCallback(async () => {
    const result = await empHandler.getWorkRecordList(loginCtx.state.EMP_NO);
    setRecordList(result);
  }, [loginCtx.state.EMP_NO]);

  useEffect(() => {
    getMyWorkRecordList();
  }, [getMyWorkRecordList]);

  return [workRecordList, getMyWorkRecordList];
};

export default useEmpRecordList;
