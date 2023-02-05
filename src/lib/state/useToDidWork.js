import { useEffect, useState } from "react";
import { dayJsYMD } from "../dayJs";
import dayJs from "dayjs";
import empHandler from "../handler/EmpHander";
import { useLoginCtx } from "../store/LoginContext";

const useToDidWork = () => {
  const [myList, setList] = useState([]);
  const loginCtx = useLoginCtx();
  const today = dayJsYMD(dayJs());

  useEffect(() => {
    const fetchMyWork = async (Emp_NO) => {
      const result = await empHandler.getWorkRecordList(Emp_NO);
      if (result.length > 0) {
        const list = result.filter((record) => {
          return record.WORK_DATE.includes(today);
        });
        setList(list);
      }
    };

    fetchMyWork(loginCtx.state.EMP_NO);
  }, []);

  const addMyWork = ([list]) => {
    if (list.WORK_DATE.includes(today)) {
      setList((prev) => {
        return [...prev, list];
      });
    }
  };

  const addWorkRecordInfo = async (NO) => {
    const result = await empHandler.getWorkRecord(NO);
    addMyWork(result);
  };

  return [myList, addWorkRecordInfo];
};

export default useToDidWork;
