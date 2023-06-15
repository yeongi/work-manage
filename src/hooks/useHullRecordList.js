import { useCallback, useEffect, useState } from "react";
import AdminHandler from "../lib/handler/AdminHandler";

export const useHullRecordList = (hull) => {
  const [hullRecordList, setList] = useState([{}]);

  const getHullWorkRecordList = useCallback(async () => {
    const hull_work_list = await AdminHandler.getWorkHullRecordList(hull);

    setList(hull_work_list);
  }, [hull]);

  useEffect(() => {
    getHullWorkRecordList(hull);
  }, [getHullWorkRecordList, hull]);

  return { hullRecordList, getHullWorkRecordList };
};
