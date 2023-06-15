import { useEffect, useState } from "react";
import empHandler from "../lib/handler/EmpHander";

const useWorkList = () => {
  const [workList, setWorkList] = useState([]);

  useEffect(() => {
    const getWorkList = async () => {
      const result = await empHandler.getWorkList();
      setWorkList(result.sort((a, b) => a.WORK_TYPE - b.WORK_TYPE));
    };
    getWorkList();
  }, []);

  return [workList];
};

export default useWorkList;
