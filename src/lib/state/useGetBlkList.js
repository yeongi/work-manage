import { useCallback, useState } from "react";
import AdminHandler from "../handler/AdminHandler";

const useGetBlkList = () => {
  const [blockList, setBlkList] = useState([]);
  const [hullList, setHullList] = useState([]);

  const getHullList = useCallback(async () => {
    const serverHullList = await AdminHandler.getHullList();
    serverHullList.reverse();
    serverHullList.pop();
    setHullList(serverHullList.filter((list) => list.complete === 0));
  }, []);

  const getBlkList = useCallback(async (hull_no) => {
    //to do : complete 된 블럭은 안가져 오기
    const blkList = await AdminHandler.getBlkList(hull_no);
    setBlkList(blkList);
  }, []);

  return {
    hullList,
    blockList,
    getHullList,
    getBlkList,
  };
};

export default useGetBlkList;
