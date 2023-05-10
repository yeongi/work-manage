import { useCallback, useEffect, useState } from "react";
import AdminHandler from "../handler/AdminHandler";

export const useAdminHullList = () => {
  const [hullList, setHullList] = useState([]);

  const getHullList = useCallback(async () => {
    const list = await AdminHandler.getHullList();
    const reverseList = [...list].reverse();
    reverseList.pop();
    reverseList.sort((a, b) => a.complete - b.complete);
    setHullList(reverseList);
    return;
  }, []);

  useEffect(() => {
    getHullList();
  }, [getHullList]);

  return { hullList, getHullList };
};
