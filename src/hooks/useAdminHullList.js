import { useCallback, useEffect, useState } from "react";
import AdminHandler from "../lib/handler/AdminHandler";
import { depulicateRemoveHullArray } from "lib/Hull";

export const useAdminHullList = () => {
  const [hullList, setHullList] = useState([]);
  const [hullArray, setHullArray] = useState([]);

  const getHullList = useCallback(async () => {
    const list = await AdminHandler.getHullList();
    const reverseList = [...list].reverse();
    reverseList.pop();
    reverseList.sort((a, b) => a.complete - b.complete);
    setHullArray(depulicateRemoveHullArray(reverseList));
    setHullList(reverseList);
    return;
  }, []);

  useEffect(() => {
    getHullList();
  }, [getHullList]);

  return { hullList, hullArray, getHullList };
};
