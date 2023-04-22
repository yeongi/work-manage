import { useCallback, useEffect, useState } from "react";
import { dayJsYMD } from "../dayJs";
import dayJs from "dayjs";
import empHandler from "../handler/EmpHander";
import { useLoginCtx } from "../store/LoginContext";

const useToDidWork = () => {
  const [myList, setList] = useState([]);

  const loginCtx = useLoginCtx();

  const fetchMyWork = useCallback(async () => {
    const result = await empHandler.getWorkRecordList(loginCtx.state.EMP_NO);
    if (result.length > 0) {
      const list = result.filter((record) => {
        return record.WORK_DATE.includes(dayJsYMD(dayJs()));
      });

      setList(list);
    }
  }, [loginCtx.state.EMP_NO]);

  useEffect(() => {
    fetchMyWork();
  }, [fetchMyWork]);

  const addWorkRecordInfo = async (NO) => {
    const [list] = await empHandler.getWorkRecord(NO);

    if (list.WORK_DATE.includes(dayJsYMD(dayJs()))) {
      setList((prev) => {
        return [...prev, list];
      });
    }
  };

  return [myList, addWorkRecordInfo];
};

export default useToDidWork;
