/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { dayJsYMD } from "utils/dayJs";
import dayJs from "dayjs";
import empHandler from "lib/handler/EmpHander";
import { useLoginRecoilState } from "atom/Hook";

const useToDidWork = (workRecordList) => {
  const [myList, setList] = useState([]);
  const [, setLoginState] = useLoginRecoilState();

  useEffect(() => {
    const fetchMyWork = async () => {
      if (workRecordList.length === 0) return;

      const list = workRecordList.filter((record) => {
        return record.WORK_DATE.includes(dayJsYMD(dayJs()));
      });

      setList(list);

      const mh = myList.reduce((acc, cur) => {
        return acc + cur.INP_MH;
      }, 0);

      setLoginState((prev) => {
        return { ...prev, mh };
      });
    };

    fetchMyWork();
  }, [workRecordList]);

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
