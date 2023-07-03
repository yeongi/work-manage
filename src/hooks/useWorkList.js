import { useCallback, useEffect, useState } from "react";
import empHandler from "../lib/handler/EmpHander";

const useWorkList = () => {
  const [workList, setWorkList] = useState([]);
  const [filteredWorkList, setFilterList] = useState([]);

  const workListFiltered = useCallback((hullsq, list) => {
    // hullsq === 1 은 기타 업무 블럭
    if (hullsq === 1) {
      const filteredList = list.filter((work) => {
        return !(work.WORK_TYPE === "본작업" || work.WORK_TYPE === "개정작업");
      });
      setFilterList(filteredList);
    }
    if (hullsq !== 1) {
      const filteredList = list.filter((work) => {
        return work.WORK_TYPE === "본작업" || work.WORK_TYPE === "개정작업";
      });
      setFilterList(filteredList);
    }
  }, []);

  useEffect(() => {
    const getWorkList = async () => {
      const result = await empHandler.getWorkList();
      setWorkList(result.sort((a, b) => a.WORK_TYPE - b.WORK_TYPE));
    };

    getWorkList();
  }, []);

  return { workList, filteredWorkList, workListFiltered };
};

export default useWorkList;
