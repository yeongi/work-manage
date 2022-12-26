import { useEffect, useState } from "react";
import AdminHandler from "../handler/AdminHandler";

const useGetBlkList = () => {
  const [blockList, setBlkList] = useState([]);
  const [hullList, setHullList] = useState([]);

  const getHullList = async () => {
    const serverHullList = await AdminHandler.getHullList();
    setHullList(serverHullList);
  };

  const getBlkList = async (hull_no) => {
    //to do : complete 된 블럭은 안가져 오기
    const blkList = await AdminHandler.getBlkList(hull_no);
    setBlkList(blkList);
  };

  useEffect(() => {
    getHullList();
    getBlkList();
  }, []);

  return {
    hullList,
    blockList,
    getHullList,
    getBlkList,
  };
};

export default useGetBlkList;
